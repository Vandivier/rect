const ChatAssistant = () => (
  <>
    <h2>Rect Custom Chat Assistant</h2>
    <div style={{ margin: "auto", maxWidth: "600px" }}>
      <p>Rect can turn your short-form social media posts into a chatbot!</p>
      <p>
        To do this, simply paste{" "}
        <a
          href="https://github.com/Vandivier/rect/blob/main/be/transcript_service/outputs/prompt-for-chat.txt"
          rel="noreferrer"
          target="_blank"
        >
          this prompt for chat file
        </a>{" "}
        into ChatGPT. ChatGPT will load relevant information into memory, and will then be able to
        answer your questions with this context included.
      </p>
      <p>
        Learn more about how to customize this prompt based on your own social media content in this{" "}
        <a
          href="https://github.com/Vandivier/rect/tree/main/be/transcript_service"
          rel="noreferrer"
          target="_blank"
        >
          README.md file for the open source Rect Transcript Service
        </a>
        !
      </p>
    </div>
    <style jsx>{`
      a {
        text-decoration: underline;
      }
    `}</style>
  </>
)

export default ChatAssistant
