// script.js
const THEME_KEY = "unwired.theme";
const body = document.body;

// elements (may not exist in some rare cases; guard)
const tdnnDesktop = document.getElementById("tdnnDesktop");
const moonDesktop = document.getElementById("moonDesktop");
const mobileToggleBtn = document.getElementById("mobileToggle");
const mobileToggleIcon = document.getElementById("mobileToggleIcon");

function applyTheme(isDark){
  if(isDark){
    body.classList.remove("light");
    if(moonDesktop) moonDesktop.classList.remove("sun");
    if(tdnnDesktop) tdnnDesktop.classList.remove("day");
    if(mobileToggleIcon){
      mobileToggleIcon.classList.remove("fa-sun");
      mobileToggleIcon.classList.add("fa-moon");
    }
  } else {
    body.classList.add("light");
    if(moonDesktop) moonDesktop.classList.add("sun");
    if(tdnnDesktop) tdnnDesktop.classList.add("day");
    if(mobileToggleIcon){
      mobileToggleIcon.classList.remove("fa-moon");
      mobileToggleIcon.classList.add("fa-sun");
    }
  }
}

// init theme
(function(){
  const saved = localStorage.getItem(THEME_KEY);
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const dark = saved ? (saved === "dark") : prefersDark;
  applyTheme(dark);
})();

// attach desktop toggle (if present)
if(tdnnDesktop){
  tdnnDesktop.addEventListener("click", () => {
    const willBeLight = !body.classList.contains("light");
    applyTheme(!willBeLight ? true : false);
    localStorage.setItem(THEME_KEY, body.classList.contains("light") ? "light" : "dark");
  });
}

// attach mobile toggle (if present)
if(mobileToggleBtn){
  mobileToggleBtn.addEventListener("click", () => {
    const willBeLight = !body.classList.contains("light");
    applyTheme(!willBeLight ? true : false);
    localStorage.setItem(THEME_KEY, body.classList.contains("light") ? "light" : "dark");
  });
}

// Sidebar + hamburger
const hamburgerBtn = document.getElementById("hamburgerBtn");
const hamburgerBars = document.getElementById("hamburgerBars");
const sidebar = document.getElementById("sidebar");
const backdrop = document.getElementById("backdrop");

function openSidebar(){
  if(sidebar) sidebar.classList.add("show");
  if(backdrop) backdrop.classList.add("show");
  if(hamburgerBars) hamburgerBars.classList.add("active");
}
function closeSidebar(){
  if(sidebar) sidebar.classList.remove("show");
  if(backdrop) backdrop.classList.remove("show");
  if(hamburgerBars) hamburgerBars.classList.remove("active");
}

if(hamburgerBtn){
  hamburgerBtn.addEventListener("click", () => {
    if(sidebar && sidebar.classList.contains("show")) closeSidebar(); else openSidebar();
  });
}
if(backdrop){
  backdrop.addEventListener("click", closeSidebar);
}
document.addEventListener("keydown", (e) => {
  if(e.key === "Escape" && sidebar && sidebar.classList.contains("show")) closeSidebar();
});
if(sidebar){
  sidebar.addEventListener("click", (e) => {
    if(e.target && e.target.tagName === "A") closeSidebar();
  });
}

// contact icon mobile demo
const contactIconMobile = document.getElementById("contactIconMobile");
if(contactIconMobile){
  contactIconMobile.addEventListener("click", () => {
    // demo action — scroll or Open contact form
    alert("Contact icon clicked (mobile)");
  });
}
// faq js
  document.querySelectorAll('.faq-question').forEach(button => {
      button.addEventListener('click', () => {
        const expanded = button.getAttribute('aria-expanded') === 'true';
        
        // Close all open answers
        document.querySelectorAll('.faq-question').forEach(btn => {
          btn.setAttribute('aria-expanded', 'false');
          btn.classList.remove('active');
          const answer = document.getElementById(btn.getAttribute('aria-controls'));
          answer.classList.remove('open');
          answer.setAttribute('aria-hidden', 'true');
        });

        // Toggle current
        if (!expanded) {
          button.setAttribute('aria-expanded', 'true');
          button.classList.add('active');
          const answer = document.getElementById(button.getAttribute('aria-controls'));
          answer.classList.add('open');
          answer.setAttribute('aria-hidden', 'false');
        }
      });
    });
// slidesshow js
 (function () {
    const images = document.querySelectorAll(".slideshow img");
    const slideshow = document.getElementById("slideshow");
    const controls = document.getElementById("controls");
    const dynHeading = document.getElementById("dyn-heading");
    const dynPara = document.getElementById("dyn-para");

    const texts = [
      { title: "Project 1", desc: "Lorem ipsum dolor sit amet consectetur." },
      { title: "Project 2", desc: "Consectetur adipiscing elit donec." },
      { title: "Project 3", desc: "Sed do eiusmod tempor incididunt." },
      { title: "Project 4", desc: "Ut enim ad minim veniam quis." },
      { title: "Project 5", desc: "Duis aute irure dolor reprehenderit." },
      { title: "Project 6", desc: "Excepteur sint occaecat cupidatat." }
    ];

    let current = 0,
      total = images.length,
      interval;

    controls.innerHTML = "";
    for (let i = 0; i < total; i++) {
      const btn = document.createElement("button");

      btn.textContent = i + 1;
      btn.title = texts[i].title;
      btn.type = "button";
      if (i === 0) btn.classList.add("active");

      btn.addEventListener("click", () => {
        showSlide(i);
        resetInterval();
      });

      controls.appendChild(btn);
    }

    const controlBtns = controls.querySelectorAll("button");

    function showSlide(index) {
      images[current].classList.remove("active");
      controlBtns[current].classList.remove("active");

      current = index;

      images[current].classList.add("active");
      controlBtns[current].classList.add("active");

      dynHeading.textContent = texts[current].title;
      dynPara.textContent = texts[current].desc;

      const imgW = images[current].offsetWidth,
        gap = 22;

      const offset = -(current * (imgW + gap));

      slideshow.style.transform = `skew(10deg) translateX(${offset}px)`;
    }

    function resetInterval() {
      clearInterval(interval);
      interval = setInterval(() => {
        showSlide((current + 1) % total);
      }, 4000);
    }

    controls.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        showSlide((current + 1) % total);
        resetInterval();
      }
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        showSlide((current - 1 + total) % total);
        resetInterval();
      }
    });

    window.addEventListener("resize", () => showSlide(current));

    showSlide(0);
    resetInterval();
  })();

  // ======= Review Slider =======
    const reviews = [
      { avatar: "./resources/avatar3.png", name: "Ankit jangir", role: "UI/UX Designer and Developer ", text: "A smooth experience from start to finish. Truly impressive professionalism and communication." },
      { avatar: "./resources/avatar1.png", name: "Priya Shah", role: "Product Manager", text: "The team exceeded our expectations — fast, smart, and creative. Highly recommended!" },
      { avatar: "./resources/avatar2.png", name: "John Williams", role: "Entrepreneur", text: "Excellent service! My project was live ahead of schedule and the support was amazing." },
      { avatar: "./resources/avatar2.png", name: "Samuel Li", role: "Developer", text: "Great collaboration and modern solutions. I appreciated the attention to detail." },
      { avatar: "./resources/avatar3.png", name: "Matteo Rossi", role: "Marketing Lead", text: "You made it easy for us to improve conversion. Your advice delivered real business value." }
    ];
    const slider = document.getElementById("reviewSlider");
    const controls = document.getElementById("sliderControls");
    let current = 0;

    // Render review cards
    slider.innerHTML = reviews.map((t,i)=>`
      <div class="review-card${i===0?" active":""}" role="group" aria-roledescription="slide" aria-label="Feedback ${i+1} of ${reviews.length}" tabindex="${i===0?0:-1}">
        <img class="review-avatar" src="${t.avatar}" alt="${t.name}"/>
        <div class="review-name">${t.name}</div>
        <div class="review-role">${t.role}</div>
        <div class="review-text">"${t.text}"</div>
      </div>`).join('');

    // Dots
    let dotsContainer = document.createElement('span');
    dotsContainer.style.display = 'flex';
    dotsContainer.style.alignItems = 'center';
    for(let i=0; i<reviews.length; ++i){
      let dot = document.createElement('button');
      dot.className = 'slider-dot'+(i===0?' active':'');
      dot.type = "button";
      dot.setAttribute("aria-label",`View feedback ${i+1}`);
      dot.addEventListener('click',()=>goTo(i));
      dotsContainer.appendChild(dot);
    }
    controls.insertBefore(dotsContainer, controls.children[1]);
    const dots = Array.from(dotsContainer.children);

    function goTo(idx){
      const cards = slider.children;
      if (idx<0) idx=reviews.length-1;
      if (idx>=reviews.length) idx=0;
      [...cards].forEach((card,i)=>{
        card.classList.toggle('active',i===idx);
        card.tabIndex=(i===idx)?0:-1;
      });
      dots.forEach((d,i)=>d.classList.toggle('active',i===idx));
      current=idx;
    }
    document.getElementById('prevBtn').onclick=_=>goTo(current-1);
    document.getElementById('nextBtn').onclick=_=>goTo(current+1);

    // Keyboard
    slider.addEventListener('keydown',e=>{
      if(e.key==="ArrowRight") { goTo(current+1); }
      if(e.key==="ArrowLeft") { goTo(current-1); }
    });

    // Auto-play pause on hover  
    let autoscroll; 
    function auto(){ autoscroll = setInterval(()=>goTo(current+1),6900);}
    slider.addEventListener('mouseenter',()=>clearInterval(autoscroll));
    slider.addEventListener('mouseleave',()=>auto());
    goTo(0); auto();

    // ======= Contact Form Validation =======
    const form = document.getElementById("contactForm");
    const formMsg = document.getElementById("formMsg");

    form.addEventListener("submit", function(e){
      e.preventDefault();
      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const phone = form.phone.value.trim();
      const msg = form.message.value.trim();
      const terms = form.terms.checked;
      function validEmail(mail){ return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail);}
      function validPhone(ph){ return !ph || /^[+]?[\d\s\-]{7,16}$/.test(ph);}
      if(!name) return showForm('Please enter your name!',false);
      if(!validEmail(email)) return showForm('Enter a valid email!',false);
      if(!validPhone(phone)) return showForm('Phone number must contain only digits and - or spaces.',false);
      if(!msg) return showForm('Please type your message.',false);
      if(!terms) return showForm('Please agree to the terms.',false);

      // Simulate async submit
      showForm('Sending...','wait');
      setTimeout(function(){
        showForm('Thank you for contacting us. We will reply soon!',true);
        form.reset();
      },1200);
    });
    function showForm(text,valid){
      formMsg.textContent = text;
      formMsg.className = "form-msg " + (valid===true?"valid":valid===false?"invalid":"");
      if(valid===true){ setTimeout(()=>formMsg.textContent="",2600);}
    }