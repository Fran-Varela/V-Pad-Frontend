import { useState } from "react";

const Contacto = () => {
  const [message, setMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    setMessage("Mensaje enviado correctamente!");
  };

  return (
    <div className="contact-wrapper">

      {/* LEFT COLUMN — INFO + MAP */}
      <div className="contact-info-box">
        <h2 className="contact-title">Contacto</h2>

        <div className="contact-info-item">
          <p>Av. Ejemplo 123, Ciudad, España</p>
        </div>

        <div className="contact-info-item">
          <a href="tel:+34123456789" className="contact-link">+34 123 456 789</a>
        </div>

        <div className="contact-info-item">
          <a href="mailto:restaurante@correo.com" className="contact-link">restaurante@correo.com</a>
        </div>

        <div className="contact-info-item">
          <p>Lunes a Domingo — 12:00–16:00 / 20:00–00:00</p>
        </div>

        <a 
          href="https://wa.me/34123456789"
          target="_blank"
          className="whatsapp-btn"
        >
        Contactar por WhatsApp
        </a>

        <div className="contact-map">
          <iframe
            title="Mapa restaurante"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d997.123456789!2d-0.123456!3d37.123456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd123456789abcdef%3A0xabcdef123456789!2sRestaurante%20Ejemplo!5e0!3m2!1ses!2es!4v0000000000000"
            width="100%"
            height="100%"
            style={{ border: 0, borderRadius: "12px" }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </div>

      {/* RIGHT COLUMN — FORM */}
      <div className="contact-form-box">
        <h2 className="contact-title">Escríbenos</h2>

        <form id="contactForm" onSubmit={handleSubmit} className="contact-form">
          
          <label htmlFor="name">Nombre</label>
          <input type="text" id="name" name="name" required />

          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" required />

          <label htmlFor="message">Mensaje</label>
          <textarea id="message" name="message" required />

          <button type="submit" className="contact-btn">Enviar</button>

          <div className="form-message">{message}</div>
        </form>
      </div>

    </div>
  );
};

export default Contacto;
