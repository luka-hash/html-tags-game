import { useState } from 'react';
import './App.css';
import data from './assets/data.json' with { type: "json" };


function App() {
  const [foundTags, setFoundTags] = useState<typeof data>([]);

  const handleGuess = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== 'Enter') return;
    const input = event.currentTarget;
    const guess = input.value.toLowerCase().trim()

    const matchingTag = data.find(tag => {
      const cleanTagName = tag.tag_name.replace(/[<>]/g, '').toLowerCase()
      return cleanTagName === guess && !foundTags.includes(tag)
    })

    if (matchingTag) {
      if (foundTags.includes(matchingTag)) {
        // ...
      } else {
        setFoundTags(prev => [...prev, matchingTag])
        input.value = ''
      }
    }
  };

  return (
    <div className="p-2">
      <h1>html-tags-game</h1>
      <input
        className='mt-1 p-4 border-b-2'
        type="text"
        placeholder="Enter tag name"
        onKeyDown={handleGuess}
      />
      <span className='ml-10 text-sm text-gray-600'>
        Found {foundTags.length}/{data.length} tags
      </span>
      <span>
        <a className="ml-10" href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element">
          Give up
        </a>
      </span>
      <div className="mt-1 flex flex-col-reverse border-b">
        {foundTags.map((tag, index) => {
          return (
            <div
              key={index}
              className='p-2 border-t'
            >
              <span className='font-extrabold'>
                {tag.tag_name}
              </span>
              <p>
                {tag.description}
              </p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default App
