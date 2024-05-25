import React, { useState } from "react";
import "./NotificationStructure.css";
import e from "./e.png";

function NotificationStructure({ isOpen, choosen, handleCardClick, close }) {
  const [image, setImage] = useState(null);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [from, setFrom] = useState("");

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleSend = async () => {
    if (!subject || !message || !from) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      let base64Image = null;
      if (image) {
        base64Image = await convertToBase64(image);
      }

      const notificationData = {
        senderName: from,
        header: subject,
        body: message,
        photo: base64Image,
        sendDate: new Date().toISOString(),
        recipient: choosen,
      };

      const response = await fetch(
        "https://blocbuddyapi.azurewebsites.net/api/Create_Notifications?",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(notificationData),
        }
      );

      if (response.status === 201) {
        alert("Notification sent successfully!");
        close("NS");
      } else {
        alert("Failed to send notification.");
        console.log(JSON.stringify(notificationData));
      }
    } catch (error) {
      console.error("Error sending notification:", error);
      alert("An error occurred while sending notification.");
    }
  };

  return (
    <article
      className={
        isOpen ? "NotificationStructure" : "NotificationStructure_close"
      }
    >
      <section className="Section1">
        <input
          type="text"
          placeholder="Subject"
          className="SubjectInput"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
        <p className="x" onClick={() => close("NS")}>
          <p>x</p>
        </p>
      </section>
      <section className="Section2">
        <section className="To">
          <label htmlFor="To">SendTo</label>
          <input
            onClick={() => handleCardClick("dropDown")}
            type="button"
            value={choosen ?? "SendTo"}
          />
        </section>
        <section className="time">
          <p>00:00</p>
        </section>
      </section>
      <section className="Section3">
        <section className="Bodyy">
          <input
            type="text"
            placeholder="Write the message here...."
            className="Body_text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </section>
        <section className="img">
          <section className="choose">
            <input
              type="file"
              placeholder="chooseImage"
              accept="image/*"
              onChange={handleImageChange}
            />
          </section>
          {image && (
            <section className="image">
              <img
                src={URL.createObjectURL(image)}
                style={{ maxWidth: "100%" }}
                alt="Chosen"
              />
            </section>
          )}
        </section>
      </section>
      <section className="Section4">
        <section className="from">
          <label htmlFor="from">from:</label>
          <input
            type="text"
            placeholder="Your Name.."
            value={from}
            onChange={(e) => setFrom(e.target.value)}
          />
        </section>
        <section className="send">
          <button className="send_" onClick={handleSend}>
            Send
          </button>
        </section>
      </section>
    </article>
  );
}

export default NotificationStructure;
