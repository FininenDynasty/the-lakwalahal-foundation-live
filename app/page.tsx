export default function Home() {
  return (
    <main style={{fontFamily: 'Arial, sans-serif'}}>
      <header style={{background: 'white', padding: '20px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', position: 'sticky', top: 0, zIndex: 50}}>
        <div style={{maxWidth: '1200px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
          <h1 style={{color: '#2563eb', fontSize: '24px', margin: 0}}>❤️ Lakwalahal Foundation</h1>
          <nav style={{display: 'flex', gap: '20px'}}>
            <a href="#about" style={{color: '#64748b', textDecoration: 'none'}}>About</a>
            <a href="#programs" style={{color: '#64748b', textDecoration: 'none'}}>Programs</a>
            <a href="#contact" style={{color: '#64748b', textDecoration: 'none'}}>Contact</a>
          </nav>
        </div>
      </header>

      <section style={{background: 'linear-gradient(135deg, #eff6ff 0%, #f0fdf4 100%)', padding: '100px 20px', textAlign: 'center'}}>
        <div style={{maxWidth: '800px', margin: '0 auto'}}>
          <h1 style={{fontSize: '60px', fontWeight: 'bold', color: '#1f2937', marginBottom: '20px', lineHeight: '1.2'}}>The Lakwalahal Foundation</h1>
          <p style={{fontSize: '28px', color: '#2563eb', marginBottom: '20px', fontWeight: '600'}}>No one forgotten. Everyone protected.</p>
          <p style={{fontSize: '20px', color: '#6b7280', marginBottom: '50px', lineHeight: '1.6'}}>A legacy of healing, protection, and sacred remembrance. Join us in creating a world where every person feels valued, supported, and remembered.</p>
          <div style={{display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap'}}>
            <button onClick={() => alert('Thank you for your interest! We will contact you soon.')} style={{background: '#2563eb', color: 'white', padding: '15px 30px', border: 'none', borderRadius: '25px', fontSize: '18px', fontWeight: '600', cursor: 'pointer'}}>Join Our Mission</button>
            <button onClick={() => alert('Learn more about our healing programs and community impact!')} style={{background: 'transparent', color: '#2563eb', padding: '15px 30px', border: '2px solid #2563eb', borderRadius: '25px', fontSize: '18px', fontWeight: '600', cursor: 'pointer'}}>Learn More</button>
          </div>
        </div>
      </section>

      <section id="about" style={{padding: '100px 20px', background: 'white'}}>
        <div style={{maxWidth: '1200px', margin: '0 auto', textAlign: 'center'}}>
          <h2 style={{fontSize: '48px', fontWeight: 'bold', color: '#1f2937', marginBottom: '30px'}}>Our Sacred Mission</h2>
          <p style={{fontSize: '20px', color: '#6b7280', marginBottom: '80px', maxWidth: '700px', margin: '0 auto 80px auto', lineHeight: '1.6'}}>The Lakwalahal Foundation stands as a beacon of hope, dedicated to ensuring that no individual is forgotten and everyone receives the protection they deserve.</p>
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '40px'}}>
            <div style={{background: '#eff6ff', padding: '50px 30px', borderRadius: '15px', textAlign: 'center', boxShadow: '0 4px 15px rgba(0,0,0,0.1)'}}>
              <div style={{fontSize: '60px', marginBottom: '25px'}}>❤️</div>
              <h3 style={{fontSize: '28px', fontWeight: 'bold', marginBottom: '20px', color: '#1f2937'}}>Healing</h3>
              <p style={{color: '#6b7280', fontSize: '16px', lineHeight: '1.6'}}>We provide pathways to emotional, spiritual, and community healing through compassionate support and understanding.</p>
            </div>
            <div style={{background: '#f0fdf4', padding: '50px 30px', borderRadius: '15px', textAlign: 'center', boxShadow: '0 4px 15px rgba(0,0,0,0.1)'}}>
              <div style={{fontSize: '60px', marginBottom: '25px'}}>🛡️</div>
              <h3 style={{fontSize: '28px', fontWeight: 'bold', marginBottom: '20px', color: '#1f2937'}}>Protection</h3>
              <p style={{color: '#6b7280', fontSize: '16px', lineHeight: '1.6'}}>Safeguarding the vulnerable and ensuring their voices are heard in times of need and crisis.</p>
            </div>
            <div style={{background: '#faf5ff', padding: '50px 30px', borderRadius: '15px', textAlign: 'center', boxShadow: '0 4px 15px rgba(0,0,0,0.1)'}}>
              <div style={{fontSize: '60px', marginBottom: '25px'}}>⭐</div>
              <h3 style={{fontSize: '28px', fontWeight: 'bold', marginBottom: '20px', color: '#1f2937'}}>Remembrance</h3>
              <p style={{color: '#6b7280', fontSize: '16px', lineHeight: '1.6'}}>Honoring those we've lost and celebrating the sacred memories that bind our community together.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="programs" style={{padding: '100px 20px', background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)'}}>
        <div style={{maxWidth: '1200px', margin: '0 auto'}}>
          <div style={{textAlign: 'center', marginBottom: '80px'}}>
            <h2 style={{fontSize: '48px', fontWeight: 'bold', color: '#1f2937', marginBottom: '30px'}}>Our Programs</h2>
            <p style={{fontSize: '20px', color: '#6b7280', maxWidth: '600px', margin: '0 auto'}}>Comprehensive support services designed to heal communities and protect the vulnerable</p>
          </div>
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px'}}>
            <div style={{background: 'white', padding: '40px 30px', borderRadius: '15px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)', textAlign: 'center'}}>
              <div style={{fontSize: '48px', marginBottom: '20px'}}>🫂</div>
              <h3 style={{fontSize: '24px', fontWeight: 'bold', marginBottom: '15px', color: '#1f2937'}}>Community Healing Circles</h3>
              <p style={{color: '#6b7280', lineHeight: '1.6'}}>Safe spaces for individuals and families to process grief, trauma, and life transitions together.</p>
            </div>
            <div style={{background: 'white', padding: '40px 30px', borderRadius: '15px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)', textAlign: 'center'}}>
              <div style={{fontSize: '48px', marginBottom: '20px'}}>🌸</div>
              <h3 style={{fontSize: '24px', fontWeight: 'bold', marginBottom: '15px', color: '#1f2937'}}>Memorial Gardens Project</h3>
              <p style={{color: '#6b7280', lineHeight: '1.6'}}>Creating sacred spaces for remembrance and reflection in communities across the nation.</p>
            </div>
            <div style={{background: 'white', padding: '40px 30px', borderRadius: '15px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)', textAlign: 'center'}}>
              <div style={{fontSize: '48px', marginBottom: '20px'}}>🚨</div>
              <h3 style={{fontSize: '24px', fontWeight: 'bold', marginBottom: '15px', color: '#1f2937'}}>Crisis Support Services</h3>
              <p style={{color: '#6b7280', lineHeight: '1.6'}}>24/7 support for families facing loss, providing resources, counseling, and practical assistance.</p>
            </div>
            <div style={{background: 'white', padding: '40px 30px', borderRadius: '15px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)', textAlign: 'center'}}>
              <div style={{fontSize: '48px', marginBottom: '20px'}}>📚</div>
              <h3 style={{fontSize: '24px', fontWeight: 'bold', marginBottom: '15px', color: '#1f2937'}}>Educational Outreach</h3>
              <p style={{color: '#6b7280', lineHeight: '1.6'}}>Programs focused on mental health awareness, grief education, and community resilience building.</p>
            </div>
          </div>
        </div>
      </section>

      <section style={{padding: '100px 20px', background: 'white'}}>
        <div style={{maxWidth: '1200px', margin: '0 auto', textAlign: 'center'}}>
          <h2 style={{fontSize: '48px', fontWeight: 'bold', color: '#1f2937', marginBottom: '80px'}}>Our Impact</h2>
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '40px', marginBottom: '80px'}}>
            <div style={{textAlign: 'center'}}><div style={{fontSize: '48px', fontWeight: 'bold', color: '#2563eb', marginBottom: '10px'}}>2,500+</div><div style={{color: '#6b7280', fontSize: '18px'}}>Lives Touched</div></div>
            <div style={{textAlign: 'center'}}><div style={{fontSize: '48px', fontWeight: 'bold', color: '#2563eb', marginBottom: '10px'}}>50+</div><div style={{color: '#6b7280', fontSize: '18px'}}>Communities Served</div></div>
            <div style={{textAlign: 'center'}}><div style={{fontSize: '48px', fontWeight: 'bold', color: '#2563eb', marginBottom: '10px'}}>100+</div><div style={{color: '#6b7280', fontSize: '18px'}}>Healing Circles</div></div>
            <div style={{textAlign: 'center'}}><div style={{fontSize: '48px', fontWeight: 'bold', color: '#2563eb', marginBottom: '10px'}}>15</div><div style={{color: '#6b7280', fontSize: '18px'}}>Memorial Gardens</div></div>
          </div>
        </div>
      </section>

      <section style={{background: 'linear-gradient(135deg, #1e40af 0%, #059669 100%)', color: 'white', padding: '100px 20px', textAlign: 'center'}}>
        <div style={{maxWidth: '1000px', margin: '0 auto'}}>
          <h2 style={{fontSize: '48px', fontWeight: 'bold', marginBottom: '30px'}}>Join Our Mission of Healing</h2>
          <p style={{fontSize: '20px', marginBottom: '20px', opacity: 0.9}}>Your support helps us ensure no one is forgotten and everyone is protected</p>
          <div style={{background: '#fbbf24', color: '#92400e', padding: '15px 30px', borderRadius: '10px', display: 'inline-block', marginBottom: '50px', fontWeight: 'bold'}}>501(c)(3) Status Pending - Tax-deductible donations coming soon!</div>
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '30px'}}>
            <div style={{background: 'rgba(255,255,255,0.1)', padding: '40px 30px', borderRadius: '15px', textAlign: 'center'}}>
              <div style={{fontSize: '48px', marginBottom: '20px'}}>💝</div>
              <h3 style={{fontSize: '24px', fontWeight: 'bold', marginBottom: '15px'}}>Monthly Giving</h3>
              <p style={{marginBottom: '25px', opacity: 0.9}}>Provide ongoing support with a recurring monthly donation</p>
              <button onClick={() => alert('Monthly giving will be available once our 501(c)(3) status is approved!')} style={{background: 'white', color: '#1e40af', padding: '12px 25px', border: 'none', borderRadius: '25px', fontWeight: 'bold', cursor: 'pointer', width: '100%'}}>Start Monthly Gift</button>
            </div>
            <div style={{background: 'rgba(255,255,255,0.1)', padding: '40px 30px', borderRadius: '15px', textAlign: 'center'}}>
              <div style={{fontSize: '48px', marginBottom: '20px'}}>🎁</div>
              <h3 style={{fontSize: '24px', fontWeight: 'bold', marginBottom: '15px'}}>One-Time Donation</h3>
              <p style={{marginBottom: '25px', opacity: 0.9}}>Make a single donation to support our current programs</p>
              <button onClick={() => alert('One-time donations will be available once our 501(c)(3) status is approved!')} style={{background: 'white', color: '#1e40af', padding: '12px 25px', border: 'none', borderRadius: '25px', fontWeight: 'bold', cursor: 'pointer', width: '100%'}}>Donate Now</button>
            </div>
            <div style={{background: 'rgba(255,255,255,0.1)', padding: '40px 30px', borderRadius: '15px', textAlign: 'center'}}>
              <div style={{fontSize: '48px', marginBottom: '20px'}}>🤝</div>
              <h3 style={{fontSize: '24px', fontWeight: 'bold', marginBottom: '15px'}}>Volunteer</h3>
              <p style={{marginBottom: '25px', opacity: 0.9}}>Share your time and skills to directly impact our community</p>
              <button onClick={() => alert('Thank you for your interest in volunteering! Please contact us for opportunities.')} style={{background: 'white', color: '#1e40af', padding: '12px 25px', border: 'none', borderRadius: '25px', fontWeight: 'bold', cursor: 'pointer', width: '100%'}}>Join Our Team</button>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" style={{padding: '100px 20px', background: 'linear-gradient(135deg, #f0fdf4 0%, #eff6ff 100%)'}}>
        <div style={{maxWidth: '1200px', margin: '0 auto'}}>
          <div style={{textAlign: 'center', marginBottom: '80px'}}>
            <h2 style={{fontSize: '48px', fontWeight: 'bold', color: '#1f2937', marginBottom: '30px'}}>Get in Touch</h2>
            <p style={{fontSize: '20px', color: '#6b7280'}}>Reach out to us for support, questions, or to learn more about our mission</p>
          </div>
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '50px'}}>
            <div style={{display: 'flex', flexDirection: 'column', gap: '30px'}}>
              <div style={{background: 'white', padding: '30px', borderRadius: '15px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)'}}><div style={{display: 'flex', alignItems: 'center', marginBottom: '15px'}}><div style={{fontSize: '24px', marginRight: '15px'}}>📍</div><h3 style={{fontSize: '20px', fontWeight: 'bold', color: '#1f2937', margin: 0}}>Address</h3></div><p style={{color: '#6b7280', margin: 0}}>123 Healing Way<br />Compassion City, NY 12345</p></div>
              <div style={{background: 'white', padding: '30px', borderRadius: '15px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)'}}><div style={{display: 'flex', alignItems: 'center', marginBottom: '15px'}}><div style={{fontSize: '24px', marginRight: '15px'}}>📞</div><h3 style={{fontSize: '20px', fontWeight: 'bold', color: '#1f2937', margin: 0}}>Phone</h3></div><p style={{color: '#6b7280', margin: 0}}>(555) 123-HEAL</p></div>
              <div style={{background: 'white', padding: '30px', borderRadius: '15px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)'}}><div style={{display: 'flex', alignItems: 'center', marginBottom: '15px'}}><div style={{fontSize: '24px', marginRight: '15px'}}>✉️</div><h3 style={{fontSize: '20px', fontWeight: 'bold', color: '#1f2937', margin: 0}}>Email</h3></div><p style={{color: '#6b7280', margin: 0}}>info@lakwalahalfoundation.org</p></div>
            </div>
            <div style={{background: 'white', padding: '40px', borderRadius: '15px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)'}}>
              <h3 style={{fontSize: '28px', fontWeight: 'bold', color: '#1f2937', marginBottom: '30px'}}>Send Us a Message</h3>
              <form onSubmit={(e) => { e.preventDefault(); alert('Thank you for your message! We will get back to you within 24 hours.'); }}>
                <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '20px'}}>
                  <input type="text" placeholder="Your Name" required style={{padding: '15px', border: '2px solid #e5e7eb', borderRadius: '10px', fontSize: '16px'}} />
                  <input type="email" placeholder="Your Email" required style={{padding: '15px', border: '2px solid #e5e7eb', borderRadius: '10px', fontSize: '16px'}} />
                </div>
                <input type="text" placeholder="Subject" required style={{width: '100%', padding: '15px', border: '2px solid #e5e7eb', borderRadius: '10px', fontSize: '16px', marginBottom: '20px', boxSizing: 'border-box'}} />
                <textarea placeholder="Your Message" rows="5" required style={{width: '100%', padding: '15px', border: '2px solid #e5e7eb', borderRadius: '10px', fontSize: '16px', marginBottom: '25px', boxSizing: 'border-box', resize: 'vertical'}}></textarea>
                <button type="submit" style={{width: '100%', background: '#2563eb', color: 'white', padding: '15px', border: 'none', borderRadius: '10px', fontSize: '18px', fontWeight: 'bold', cursor: 'pointer'}}>Send Message</button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <footer style={{background: '#111827', color: 'white', padding: '80px 20px 40px 20px'}}>
        <div style={{maxWidth: '1200px', margin: '0 auto'}}>
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '40px', marginBottom: '50px'}}>
            <div>
              <div style={{display: 'flex', alignItems: 'center', marginBottom: '20px'}}>
                <div style={{fontSize: '32px', marginRight: '15px'}}>❤️</div>
                <div><h3 style={{fontSize: '24px', fontWeight: 'bold', margin: 0}}>Lakwalahal Foundation</h3><p style={{color: '#9ca3af', margin: '5px 0 0 0'}}>No one forgotten. Everyone protected.</p></div>
              </div>
              <p style={{color: '#9ca3af', lineHeight: '1.6', marginBottom: '20px'}}>A legacy of healing, protection, and sacred remembrance, creating a world where every person feels valued and supported.</p>
              <div style={{background: '#fbbf24', color: '#92400e', padding: '8px 15px', borderRadius: '5px', fontSize: '14px', fontWeight: 'bold'}}>501(c)(3) Status Pending</div>
            </div>
            <div>
              <h4 style={{fontSize: '20px', fontWeight: 'bold', marginBottom: '20px'}}>Quick Links</h4>
              <div style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
                <a href="#about" style={{color: '#9ca3af', textDecoration: 'none'}}>About Us</a>
                <a href="#programs" style={{color: '#9ca3af', textDecoration: 'none'}}>Programs</a>
                <a href="#contact" style={{color: '#9ca3af', textDecoration: 'none'}}>Contact</a>
              </div>
            </div>
            <div>
              <h4 style={{fontSize: '20px', fontWeight: 'bold', marginBottom: '20px'}}>Newsletter</h4>
              <p style={{color: '#9ca3af', marginBottom: '20px'}}>Join our sacred circle for updates and blessings</p>
              <form onSubmit={(e) => { e.preventDefault(); alert('Thank you for joining our sacred circle! You will receive updates soon.'); }}>
                <div style={{display: 'flex', gap: '10px'}}>
                  <input type="email" placeholder="Enter your email" required style={{flex: 1, padding: '12px', border: '2px solid #374151', borderRadius: '8px', background: '#374151', color: 'white', fontSize: '14px'}} />
                  <button type="submit" style={{background: '#2563eb', color: 'white', padding: '12px 20px', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer'}}>Subscribe</button>
                </div>
              </form>
            </div>
          </div>
          <div style={{borderTop: '1px solid #374151', paddingTop: '30px', textAlign: 'center', color: '#9ca3af'}}>
            <p style={{margin: 0}}>© 2024 The Lakwalahal Foundation. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  )
}
