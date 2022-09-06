import { useState, useEffect } from 'react'
import adventureImage from '../assets/adventure1.jpg'
import boatImage from '../assets/boat1.jpg'
import cottageImage from '../assets/cottage1.jpg'
import adventureImg from '../assets/adventure2.jpg'
import boatImg from '../assets/boat2.jpg'
import cottageImg from '../assets/cottage2.jpg'

import styles from './HomePage.module.css'
import { useRouter } from 'next/router'

const HomePage = () => {
  const [idx, setIdx] = useState(0)
  const router = useRouter()

  const delay = (ms) => new Promise((res) => setTimeout(res, ms))
  let i = 0
  const showSlides = async () => {
    while (i < 4) {
      if (i === 3) i = 0
      setIdx(i)
      i++
      await delay(3000)
    }
  }

  useEffect(() => {
    showSlides()
  }, [])

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <section style={{ maxWidth: '600px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <img src={adventureImage.src} alt="image" style={{ display: idx === 0 ? 'block' : 'none', width: '600px' }} />
        <img src={boatImage.src} alt="image" style={{ display: idx === 1 ? 'block' : 'none', width: '600px' }} />
        <img
          src={cottageImage.src}
          alt="image"
          style={{ display: idx === 2 ? 'block' : 'none', maxHeight: '20%', width: '600px', height: '401px' }}
        />
      </section>
      <section style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', maxWidth: '600px' }}>
        <h2>FishNChill</h2>
        <p>
          <i>We appreciate your time</i>
        </p>
        <p>
          We have created a fictional band website. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
          velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum consectetur adipiscing elit, sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua.
        </p>
      </section>
      <section
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'flex-start',
          width: '1000px',
          height: '300px',
        }}
      >
        <article
          onClick={() => router.push('/adventures')}
          className={styles.article}
          style={{
            width: '200px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
          }}
        >
          <b>Adventures</b>
          <img src={adventureImg.src} alt="Random Name" style={{ width: '100%', borderRadius: '50%' }} />
          <i>The best adventures you are going to experience</i>
        </article>
        <article
          onClick={() => router.push('/boats')}
          className={styles.article}
          style={{
            width: '200px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
          }}
        >
          <b>Boats</b>
          <img src={boatImg.src} alt="Random Name" style={{ width: '100%', borderRadius: '50%' }} />
          <i>Go fishing or rent a yacht</i>
        </article>
        <article
          onClick={() => router.push('/cottages')}
          className={styles.article}
          style={{
            width: '200px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
          }}
        >
          <b>Cottages</b>
          <img src={cottageImg.src} alt="Random Name" style={{ width: '100%', borderRadius: '50%' }} />
          <i>Take a timeout from the world</i>
        </article>
      </section>
    </div>
  )
}

export default HomePage
