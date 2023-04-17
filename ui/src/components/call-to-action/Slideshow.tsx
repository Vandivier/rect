const Slideshow = () => (
  <>
    <h2>Generating a Slideshow with Rect</h2>
    <div style={{ margin: "auto", maxWidth: "600px" }}>
      <p>
        Rect can turn your short-form social media posts into a slideshow! To learn more, check out
        this{" "}
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

export default Slideshow
