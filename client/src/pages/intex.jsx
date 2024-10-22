import React from 'react';
import './index.css';
import { Link } from 'react-router-dom';
import { Grid } from '@mui/material';

const LandingPage = () => {
  return (
    <>
      <main id="main">
        <section id="cta" className="cta" style={{ textAlign: 'center' }}>
          <div className="container" data-aos="zoom-in">
            <div className="text-center">
              <h3>Join Kandahar University</h3>
              <p>Discover endless opportunities for growth and excellence at Kandahar University.</p>
              <Link to="student/books" className="cta-btn" style={{ textDecoration: 'none' }}>
                Explore Library
              </Link>
            </div>
          </div>
        </section>

        <section id="contact" className="contact section-bg">
          <div className="container" data-aos="fade-up">
            <div className="section-title">
              <h2>About This Application</h2>
            </div>
            <Grid container spacing={4} style={{ paddingRight: '50px', paddingLeft: '50px' }}>
              <Grid item xs={12} sm={6} md={4}>
                <div className="info-box mb-4">
                  <p style={{ textAlign: 'left', padding: '20px' }}>
                    Welcome to the Allama Habibi Library System! This platform has been developed using the MERN stack
                    (MongoDB, Express, React, Node.js) and is hosted on the main server of Kandahar University. It is
                    designed to enhance access to the vast collection of resources in the library. As an open-source
                    project, it is open to contributions from anyone who wishes to improve its features, functionality,
                    or design. Whether you are a developer, researcher, or enthusiast, your input and participation are
                    highly valued. Feel free to contribute and help us grow this valuable resource. For more information
                    or assistance, please visit the IT Directorate or contact us via email at archive@kdru.edu.af.
                  </p>
                </div>
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <div className="info-box mb-4">
                  <p
                    style={{
                      textAlign: 'right',
                      padding: '20px',
                      fontSize: '18px',
                    }}
                    dir="rtl"
                  >
                    د علامه حبیبي کتابتون سیستم ته ښه راغلاست!. داسیسټم په MERN ټیکنالوژی (MongoDB, Express, React,
                    Node.js) کې جوړ سوی دی. او د کندهار پوهنتون په اصلي سرور کې هاسټ سوی دی. دا پروژه د دې لپاره ډیزاین
                    سوې چې د کتابتون د پراخو سرچینو لاسرسی لا اسانه کړي. ځکه چې دا یو Open Source پروژه ده، نو هر څوک
                    کولی سي چي په دې پروژه کې د فعالیتونو،ځانګړتیاوو یا ډیزاین د ښه والي په برخه کې کار وکړي. که تاسو یو
                    Developer، Researcher یا علاقه لرونکی یاست، نوستاسو ونډه او همکاری ارزښتمنه ده. هرکلی کوو چې په دې
                    پروژه کې ونډه واخلئ او دا ارزښتناکه سرچینه نوره هم پیاوړې کړئ. د نورو معلوماتو یا مرستې لپاره،
                    مهرباني وکړئ د IT آمریت ته مراجعه وکړئ یا زموږ سره د archive@kdru.edu.af په برېښنالیک اړیکه ونیسئ.
                  </p>
                </div>
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <div className="info-box mb-4">
                  <p
                    style={{
                      textAlign: 'right',
                      padding: '20px',
                      fontSize: '18px',
                    }}
                    dir="rtl"
                  >
                    به سیستم کتابخانه علامه حبیبی خوش آمدید! این سیستم با استفاده از تکنولوژی MERN (MongoDB, Express,
                    React, Node.js) ساخته شده و در سرور اصلی پوهنتون کندهار میزبانی می‌شود. هدف از این پروژه، بهبود
                    دسترسی به منابع گسترده کتابخانه است. به‌عنوان یک پروژه منبع باز، از هر کسی که علاقه‌مند به بهبود
                    ویژگی‌ها، عملکرد یا طراحی آن باشد، استقبال می‌شود. چه شما توسعه‌دهنده، پژوهشگر، یا علاقه‌مند باشید،
                    نظرات و همکاری‌های شما بسیار ارزشمند است. برای مشارکت در توسعه این منبع ارزشمند، از شما دعوت به عمل
                    می‌آید. برای معلومات بیشتر یا دریافت کمک، لطفاً به ریاست IT مراجعه کنید یا با ما از طریق ایمیل
                    archive@kdru.edu.af تماس بگیرید.
                  </p>
                </div>
              </Grid>
            </Grid>
          </div>
        </section>
      </main>

      <footer id="footer">
        <div className="container">
          <div className="copyright">
            &copy; Copyright{' '}
            <strong>
              <span>Kandahar University 1990, IT Directorate</span>
            </strong>
            . All Rights Reserved
          </div>
        </div>
      </footer>
    </>
  );
};

export default LandingPage;
