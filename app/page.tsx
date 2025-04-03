export default function Home() {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="prose dark:prose-invert">
        <h1 className="text-3xl font-bold mb-6">Welcome!</h1>
        
        <p className="text-lg mb-4">
          Mustafa is a Graduate student at Carnegie Mellon University, aspiring to be a Product Manager.
        </p>

        <div className="flex flex-col gap-3 mt-8">
          <p className="text-lg">Connect with him:</p>
          <a 
            href="https://www.linkedin.com/in/saifeemustafa/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
            </svg>
            LinkedIn
          </a>
          <a 
            href="mailto:saifeestudy@gmail.com"
            className="text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
            </svg>
            Email
          </a>
        </div>
      </div>
    </div>
  )
}
