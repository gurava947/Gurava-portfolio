import "./index.css";

function ChatData({ data }) {
  return (
    <div className="background-image-section p-3 p-md-4 shadow-lg">
      {/* Header Card */}
      <div className="background-content-card rounded-3 shadow mb-4">
        <h1 className="h3 fw-bold text-white mb-0">
          {data.heading}
        </h1>
      </div>

      {/* Chat Messages */}
      <div className="d-flex flex-column gap-3 chat-message-list">
        {data.messages.map((message) => (
          <p
            key={message.id}
            className={`chat-message ${
              message.type === "right"
                ? "align-self-end rounded-start rounded-top"
                : "align-self-start rounded-end rounded-top"
            }`}
          >
            {message.text}
          </p>
        ))}
      </div>
    </div>
  );
}

export default ChatData;
