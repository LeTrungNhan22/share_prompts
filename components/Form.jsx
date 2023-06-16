

import Link from "next/link"

const Form = ({ type, post, setPost, submitting, handleSubmit }) => {

  return (
    <section
      className="w-full max-w-full flex-start flex-col h-screen mb-5"
    >
      <h1 className="head_text text-left">
        <span className="blue_gradient">
          {type} Prompt
        </span>
      </h1>
      <p
        className="desc text-left max-w-md"
      >
        {type} and share amazing prompts with the world!
        Let your imagination run wild with any of the following prompts:
      </p>

      {/* form start */}
      <form
        onSubmit={handleSubmit}
        className="mt-10 max-w-2xl w-full flex flex-col glassmorphism gap-7"
      >
        <label>
          <span
            className="font-satoshi font-semibold text-base text-gray-700"
          >
            Your AI Prompt
          </span>
          <textarea
            value={post.prompt}
            onChange={(e) => setPost({ ...post, prompt: e.target.value })}
            placeholder="Write your prompt here..."
            required
            className="form_textarea"
          />

        </label>
        <label>
          <span
            className="font-satoshi font-semibold text-base text-gray-700"
          >
            Tag {` `}
            <span
              className="font-normal"
            >
              (#product, #web, #idea, )
            </span>
          </span>
          <input
            value={post.tag}
            onChange={(e) => setPost({ ...post, tag: e.target.value })}
            placeholder="#tag"
            required
            className="form_input"
          />
        </label>

        <div
          className="flex-end mx-3 mb-5 gap-4"
        >
          <Link href="/" className="text-gray-500 text-sm">
            Cancel
          </Link>
          <button
            type="submit"
            disabled={submitting}
            className="px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white font-semibold"
          >
            {submitting ? "Processing..." : type}

          </button>
        </div>
      </form>


      {/* form end */}


    </section>
  )
}

export default Form