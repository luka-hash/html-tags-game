import { useState } from 'react';
import './App.css';
import data from './assets/data.json' with { type: "json" };

interface Tag {
  tag_name: string;
  description: string;
  category: string;
}

function getCategories(data: Tag[]) {
  const categoryCount = new Map<string, number>();
  data.forEach(tag => {
    const category = tag.category;
    categoryCount.set(category, (categoryCount.get(category) || 0) + 1);
  });
  return Array.from(categoryCount).map(([category, count]) => ({
    category,
    count
  }));
}

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
        if (foundTags.length === data.length) {
          alert("You found all tags!")
        }
        setFoundTags(prev => [...prev, matchingTag])
        input.value = ''
      }
    }
  };

  return (
    <div className="p-2">
      <h1>html-tags-game</h1>
      <div
        className='flex flex-col gap-4 pb-4 md:flex-row md:items-center md:justify-start md:pb-0'
      >
      <input
        className='mt-1 p-4 border-b-2'
        type="text"
        placeholder="Enter tag name"
        onKeyDown={handleGuess}
      />
      <span className='ml-5 mr-5 text-sm text-gray-600'>
        Found {foundTags.length}/{data.length} tags
      </span>
      <button className='ml-5 mr-5 p-2 border-2 rounded-md hover:bg-gray-200 w-fit' onClick={() => setFoundTags([])}>
        Reset
      </button>
      <span>
        <a target="_blank" className="ml-5 mr-5 external-link" href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element">
          Give up
        </a>
      </span>
      <span>
        <a target="_blank" className="ml-5 mr-5 external-link" href="https://github.com/luka-hash/html-tags-game">
          Source
      </a>
      </span>
      </div>
      <div className='border-t-1'>
      {getCategories(data).map((c, index)=>{
        return (
        <div
          key={index}
          className='border-1 m-2 p-2'>
          <div className='flex flex-row justify-between'>
            <h2>{c.category}</h2>
            <span className='text-sm text-gray-600'>
              {foundTags.filter(tag => tag.category === c.category).length === c.count ? (
                <span className='before:content-["🎉_"] before:mr-1'>
                  Found all tags in this category
                </span>
              ) : (
                <>
                  Found {foundTags.filter(tag => tag.category === c.category).length}/
                  {c.count} tag{c.count > 1 ? 's' : ''} in this category
                </>
              )}
            </span>
          </div>
          <div>
            {foundTags.filter(tag => tag.category === c.category).map((tag, index) => {
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
      })}
      </div>
    </div>
  )
}

export default App
