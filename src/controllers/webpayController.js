const { WebpayPlus } = require('transbank-sdk');

exports.initTransaction = async (req, res) => {
  try {
    const { total } = req.body; // El monto total del carrito
    const sessionId = `sesion-${Date.now()}`; // ID de sesión único
    const buyOrder = `orden-${Date.now()}`; // Orden única
    const returnUrl = 'http://localhost:3000/success'; // URL de éxito
    const finalUrl = 'http://localhost:3000/failure'; // URL de fallo

    // Crear transacción en Webpay
    const response = await WebpayPlus.Transaction.create(
      buyOrder,
      sessionId,
      total,
      returnUrl
    );

    return res.status(200).json({
      url: response.url,
      token: response.token,
    });
  } catch (error) {
    console.error('Error iniciando transacción:', error);
    res.status(500).json({ error: 'Hubo un problema al iniciar el pago. Intenta nuevamente.' });
  }
};

exports.confirmTransaction = async (req, res) => {
  try {
    const { token_ws } = req.body;

    // Confirmar transacción en Webpay
    const response = await WebpayPlus.Transaction.commit(token_ws);

    if (response.status === 'AUTHORIZED') {
      return res.status(200).json({ message: 'Pago confirmado', response });
    } else {
      return res.status(400).json({ message: 'El pago no fue autorizado', response });
    }
  } catch (error) {
    console.error('Error confirmando transacción:', error);
    res.status(500).json({ error: 'Hubo un problema al confirmar el pago.' });
  }
};
