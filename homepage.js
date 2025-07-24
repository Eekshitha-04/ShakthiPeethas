const tabs = document.querySelectorAll('.tab_btn');
const all_content = document.querySelectorAll('.content');
const line = document.querySelector('.line'); // Ensure `.line` exists

function updateLinePosition(tab) {
    line.style.width = tab.offsetWidth + "px";
    line.style.left = tab.offsetLeft + "px";
}

// Initialize line position on page load
document.addEventListener("DOMContentLoaded", function () {
    if (tabs.length > 0) {
        tabs[0].classList.add('active'); // Set first tab as active
        all_content[0].classList.add('active'); // Show first tab content
        updateLinePosition(tabs[0]); // Move line to first tab
    }
});

tabs.forEach((tab, index) => {
    tab.addEventListener('click', (e) => {
        // Remove 'active' class from all tabs
        tabs.forEach(tab => tab.classList.remove('active'));
        tab.classList.add('active');

        // Update the line position
        updateLinePosition(e.target);

        // Hide all content and show only the active one
        all_content.forEach(content => content.classList.remove('active'));
        all_content[index].classList.add('active');

        // Smooth scroll to the top of the tab container
        document.querySelector('.container').scrollIntoView({
            behavior: 'smooth'
        });
    });
});
function readmore() {
    var dots = document.getElementById("dots");
    var moreText = document.getElementById("more");
    var btn = document.getElementById("btn");

    if (moreText.classList.contains("show")) {
        moreText.classList.remove("show");
        moreText.style.display= "none";
        dots.style.display = "inline";
        btn.innerText = "Read more";
    } else {
        moreText.classList.add("show");
        moreText.style.display= "inline";
        dots.style.display = "none";
        btn.innerText = "Read less";
    }
}
 function openPopup(videoURL) {
    document.getElementById("videoFrame").src = videoURL + "?autoplay=1";
    document.getElementById("popup").style.display = "block";
    document.getElementById("overlay").style.display = "block";
  }

  function closePopup() {
    document.getElementById("videoFrame").src = "";
    document.getElementById("popup").style.display = "none";
    document.getElementById("overlay").style.display = "none";
  }
function filterPeethas() {
  const input = document.getElementById("searchInput").value.toLowerCase();
  const cards = document.querySelectorAll(".peetha-card");
  const noResults = document.getElementById("noResults");

  let visibleCount = 0;

  cards.forEach(card => {
    const nameElem = card.querySelector("h3");
    const locationElem = card.querySelector("p");

    const name = nameElem.innerText.toLowerCase();
    const location = locationElem.innerText.toLowerCase();

    const match = name.includes(input) || location.includes(input);

    if (match) {
      card.style.display = "block";
      visibleCount++;

      // Highlight match in name and location
      const regex = new RegExp(`(${input})`, 'gi');
      nameElem.innerHTML = nameElem.innerText.replace(regex, `<mark>$1</mark>`);
      locationElem.innerHTML = locationElem.innerText.replace(regex, `<mark>$1</mark>`);
    } else {
      card.style.display = "none";
      nameElem.innerHTML = nameElem.innerText; // reset
      locationElem.innerHTML = locationElem.innerText; // reset
    }
  });

  noResults.style.display = visibleCount === 0 ? "block" : "none";
}
function handleSearchInput() {
  const input = document.getElementById("searchInput");
  const clearBtn = document.getElementById("clearSearch");

  clearBtn.style.display = input.value.trim() ? "block" : "none";

  filterPeethas(); // call your existing filter logic
}
function clearSearch() {
  const input = document.getElementById("searchInput");
  const clearBtn = document.getElementById("clearSearch");

  input.value = '';
  clearBtn.style.display = 'none';

  filterPeethas(); // reset cards
}
let synth = window.speechSynthesis;
let utterance;
let isSpeaking = false;
let isPaused = false;

const listenBtn = document.getElementById("listenBtn");
const resetBtn = document.getElementById("resetBtn");
const textToRead = document.getElementById("mainTitle").innerText;

listenBtn.addEventListener("click", () => {
    if (!isSpeaking) {
        // Start speaking
        utterance = new SpeechSynthesisUtterance(textToRead);
        synth.speak(utterance);
        isSpeaking = true;
        isPaused = false;
        listenBtn.textContent = "⏸️ Pause";

        utterance.onend = () => {
            isSpeaking = false;
            isPaused = false;
            listenBtn.textContent = "🔊 Listen";
        };
    } else if (!isPaused) {
        // Pause speaking
        synth.pause();
        isPaused = true;
        listenBtn.textContent = "▶️ Resume";
    } else {
        // Resume speaking
        synth.resume();
        isPaused = false;
        listenBtn.textContent = "⏸️ Pause";
    }
});

// Reset button logic
resetBtn.addEventListener("click", () => {
    synth.cancel();  // Stops and clears speech
    isSpeaking = false;
    isPaused = false;
    listenBtn.textContent = "🔊 Listen";
});

let currentRating = 0;

  function setRating(rating) {
    currentRating = rating;
    document.getElementById("ratingValue").value = rating;
    const stars = document.getElementById("starRating").children;
    for (let i = 0; i < stars.length; i++) {
      stars[i].style.color = (i < rating) ? "#FFD700" : "#ccc";
    }
  }
  
const quizData = [
 
  {
    topic: "Locations",
    question: "1. Where is the Kamakhya Shakti Peetha located?",
    options: ["Odisha", "Assam", "West Bengal", "Bihar"],
    answer: "Assam"
  },
  {
    topic: "Locations",
    question: "2. Which Shakti Peetha is located in West Bengal?",
    options: ["Jwalaji", "Tarapith", "Chamundeshwari", "Mangalagauri"],
    answer: "Tarapith"
  },
  {
    topic: "Locations",
    question: "3. Where is the Jwalaji Shakti Peetha located?",
    options: ["Punjab", "Himachal Pradesh", "Rajasthan", "Haryana"],
    answer: "Himachal Pradesh"
  },
  {
    topic: "Locations",
    question: "4. Where is the Kanchi Kamakshi Shakti Peetha located?",
    options: ["Karnataka", "Tamil Nadu", "Kerala", "Andhra Pradesh"],
    answer: "Tamil Nadu"
  },
  {
    topic: "Locations",
    question: "5. Where is the Mahalakshmi Shakti Peetha located?",
    options: ["Odisha", "Maharashtra", "Gujarat", "Goa"],
    answer: "Maharashtra"
  },
  {
    topic: "Locations",
    question: "6. Where is the Vaishno Devi Shakti Peetha located?",
    options: ["Punjab", "Uttarakhand", "Jammu & Kashmir", "Himachal Pradesh"],
    answer: "Jammu & Kashmir"
  },
  {
    topic: "Locations",
    question: "7. Where is the Vishalakshi Shakti Peetha located?",
    options: ["Uttar Pradesh", "Bihar", "Odisha", "West Bengal"],
    answer: "Uttar Pradesh"
  },
  {
    topic: "Locations",
    question: "8. Where is the Bramarambika Shakti Peetha located?",
    options: ["Andhra Pradesh", "Tamil Nadu", "Karnataka", "Telangana"],
    answer: "Andhra Pradesh"
  },
  {
    topic: "Locations",
    question: "9. Where is the Chamundeshwari Shakti Peetha located?",
    options: ["Karnataka", "Kerala", "Tamil Nadu", "Maharashtra"],
    answer: "Karnataka"
  },
  {
    topic: "Locations",
    question: "10. Where is the Mangalagauri Shakti Peetha located?",
    options: ["Jharkhand", "West Bengal", "Bihar", "Chhattisgarh"],
    answer: "Bihar"
  },
  {
    topic: "Locations",
    question: "11. Where is the Tara Tarini Shakti Peetha located?",
    options: ["Assam", "Odisha", "Chhattisgarh", "Jharkhand"],
    answer: "Odisha"
  },
  {
    topic: "Locations",
    question: "12. Where is the Tara Tarini Shakti Peetha situated?",
    options: ["Odisha", "Assam", "Bihar", "Uttar Pradesh"],
    answer: "Odisha"
  },
  {
    topic: "Locations",
    question: "13. In which state is the Manikyamba Shakti Peetha located?",
    options: ["Andhra Pradesh", "Kerala", "Maharashtra", "Tamil Nadu"],
    answer: "Andhra Pradesh"
  },
  {
    topic: "Locations",
    question: "14. Which Peetha is located at Gaya in Bihar?",
    options: ["Mangalagauri", "Meenakshi", "Mahakali", "Katyayani"],
    answer: "Mangalagauri"
  },
  {
    topic: "Locations",
    question: "15. Which Shakti Peetha is located in Draksharamam?",
    options: ["Manikyamba", "Vishalakshi", "Katyayani", "Jogulamba"],
    answer: "Manikyamba"
  },
  {
    topic: "Locations",
    question: "16. The goddess at Mysore's Shakti Peetha is known as?",
    options: ["Chamundeshwari", "Durga", "Kali", "Tripura Sundari"],
    answer: "Chamundeshwari"
  },
  {
    topic: "Locations",
    question: "17. Where is the Shankari Devi Temple located?",
    options: ["Odisha", "Karnataka", "Sri Lanka", "Tamil Nadu"],
    answer: "Sri Lanka"
  },
  {
    topic: "Locations",
    question: "18. Where is the Kamakshi Amman Temple located?",
    options: ["Kolkata", "Kanchipuram", "Kochi", "Kanyakumari"],
    answer: "Kanchipuram"
  },
  {
    topic: "Locations",
    question: "19. Where is the Shrinkala Temple located?",
    options: ["Pandua, West Bengal", "Pune", "Patna", "Panaji"],
    answer: "Pandua, West Bengal"
  },
  {
    topic: "Locations",
    question: "20. Where is the Chamundeshwari Temple located?",
    options: ["Mysuru", "Madurai", "Mumbai", "Mangalore"],
    answer: "Mysuru"
  },
  {
    topic: "Locations",
    question: "21. Where is the Jogulamba Devi Temple located?",
    options: ["Alampuram", "Amravati", "Ajmer", "Anantapur"],
    answer: "Alampuram"
  },
  {
    topic: "Locations",
    question: "22. Where is the Bhramaramba Mallikarjuna Temple located?",
    options: ["Srisailam", "Srikalahasti", "Surat", "Salem"],
    answer: "Srisailam"
  },
  {
    topic: "Locations",
    question: "23. Where is the Mahalakshmi Temple located?",
    options: ["Nashik", "Nagpur", "Kolhapur", "Kochi"],
    answer: "Kolhapur"
  },
  {
    topic: "Locations",
    question: "24. Where is the Renuka Temple located?",
    options: ["Mahur", "Mantralayam", "Mumbai", "Murudeshwar"],
    answer: "Mahur"
  },
  {
    topic: "Locations",
    question: "25. Where is the Mahakaleshwar Temple located?",
    options: ["Indore", "Ujjain", "Bhopal", "Gwalior"],
    answer: "Ujjain"
  },
  {
    topic: "Locations",
    question: "26. Where is the Kukkuteswara Swamy Temple located?",
    options: ["Pithapuram", "Puri", "Panipat", "Pune"],
    answer: "Pithapuram"
  },
  {
    topic: "Locations",
    question: "27. Where is the Biraja Temple located?",
    options: ["Jharsuguda", "Jajpur", "Jodhpur", "Jammu"],
    answer: "Jajpur"
  },
  {
    topic: "Locations",
    question: "28. Where is the Bhimeswara Temple located?",
    options: ["Draksharamam", "Dharmasthala", "Dindigul", "Dwaraka"],
    answer: "Draksharamam"
  },
  {
    topic: "Locations",
    question: "29. Where is the Kamakhya Temple located?",
    options: ["Guwahati", "Gangtok", "Gaya", "Garhwa"],
    answer: "Guwahati"
  },
  {
    topic: "Locations",
    question: "30. Where is the Alopi Devi Mandir located?",
    options: ["Allahabad (Prayagraj)", "Ahmedabad", "Ajmer", "Aligarh"],
    answer: "Allahabad (Prayagraj)"
  },
  {
    topic: "Locations",
    question: "31. Where is the Jwalamukhi Temple located?",
    options: ["Haridwar", "Jwalamukhi", "Hamirpur", "Hassan"],
    answer: "Jwalamukhi"
  },
  {
    topic: "Locations",
    question: "32. Where is the Mangla Gauri Temple located?",
    options: ["Guwahati", "Gaya", "Ghaziabad", "Gandhinagar"],
    answer: "Gaya"
  },
  {
    topic: "Locations",
    question: "33. Where is the Vishalakshi Temple located?",
    options: ["Vadodara", "Vellore", "Varanasi", "Vrindavan"],
    answer: "Varanasi"
  },
  {
    topic: "Locations",
    question: "34. Which Shakti Peetha is located in Telangana?",
    options: ["Jogulamba", "Chamundeshwari", "Mahalakshmi", "Bhramaramba"],
    answer: "Jogulamba"
  },
  {
    topic: "Locations",
    question: "35. Where is the Pratyangira Devi Temple situated?",
    options: ["Sholingar", "Shimoga", "Shirdi", "Satara"],
    answer: "Sholingar"
  },
  {
    topic: "Locations",
    question: "36. Where is the Chamundeshwari Temple built?",
    options: ["Chamundi Hills", "Sabarimala", "Chitrakoot", "Chidambaram"],
    answer: "Chamundi Hills"
  },
  {
    topic: "Locations",
    question: "37. Which temple lies on the banks of river Godavari?",
    options: ["Pithapuram", "Draksharamam", "Kanchipuram", "Alampuram"],
    answer: "Pithapuram"
  },
  {
    topic: "Locations",
    question: "38. Where is the Mangalagauri Temple located?",
    options: ["Gaya", "Goa", "Guwahati", "Guwaliar"],
    answer: "Gaya"
  },
  {
    topic: "Locations",
    question: "39. Which Shakti Peetha lies in the temple town of Alampuram?",
    options: ["Jogulamba", "Lalita", "Tara", "Chamunda"],
    answer: "Jogulamba"
  },
  


  // 🔩 Body Parts of Sati
  
  {
    topic: "Body Parts of Sati",
    question: "1. Which body part of Sati is believed to have fallen at Kanchi Kamakshi?",
    options: ["Navel", "Eyes", "Pelvis", "Back"],
    answer: "Pelvis"
  },
  {
    topic: "Body Parts of Sati",
    question: "2. What body part of Sati is believed to have fallen at Kamakhya?",
    options: ["Womb", "Eye", "Tongue", "Breast"],
    answer: "Womb"
  },
  {
    topic: "Body Parts of Sati",
    question: "3. What body part of Sati is believed to have fallen at Srisailam?",
    options: ["Neck", "Breast", "Forehead", "Chin"],
    answer: "Neck"
  },
  {
    topic: "Body Parts of Sati",
    question: "4. Which body part is believed to have fallen at Varanasi (Vishalakshi Peetha)?",
    options: ["Earrings", "Face", "Wrists", "Eye"],
    answer: "Earrings"
  },
  {
    topic: "Body Parts of Sati",
    question: "5. Where did Goddess Sati's hair fall?",
    options: ["Shrinkala Peetha", "Jwalamukhi", "Kamakhya", "Kanchipuram"],
    answer: "Shrinkala Peetha"
  },
  {
    topic: "Body Parts of Sati",
    question: "6. What part of Sati is associated with Kolhapur Shakti Peetha?",
    options: ["Eyes", "Neck", "Face", "Nose"],
    answer: "Eyes"
  },
  {
    topic: "Body Parts of Sati",
    question: "7. Which Peetha is associated with the face of Sati?",
    options: ["Varanasi", "Shringeri", "Meenakshi", "Kanchipuram"],
    answer: "Varanasi"
  },
  {
    topic: "Body Parts of Sati",
    question: "8. Which temple is associated with the navel of Sati?",
    options: ["Jajpur", "Guwahati", "Prayagraj", "Varanasi"],
    answer: "Jajpur"
  },
  {
    topic: "Body Parts of Sati",
    question: "9. Which body part fell at the Kanchipuram Shakti Peetha?",
    options: ["Back", "Navel", "Skeleton", "Spine"],
    answer: "Back"
  },
  {
    topic: "Body Parts of Sati",
    question: "10. In which Peetha is the tongue of Sati believed to have fallen?",
    options: ["Jwalaji", "Varanasi", "Kamakhya", "Shrinkala"],
    answer: "Jwalaji"
  },
  
  
  // 🙏 Deities and Bhairavas
  {
    topic: "Deities and Bhairavas",
    question: "1. What is the Shakti name at Vaishno Devi temple?",
    options: ["Vishalakshi", "Mahalakshmi", "Mahakali", "Vaishnavi"],
    answer: "Vaishnavi"
  },
  {
    topic: "Deities and Bhairavas",
    question: "2. Which goddess is worshipped at the Srisailam Shakti Peetha?",
    options: ["Bhramarambika", "Chamundeshwari", "Kamakhya", "Meenakshi"],
    answer: "Bhramarambika"
  },
  {
    topic: "Deities and Bhairavas",
    question: "3. Which Shakti Peetha is associated with Goddess Meenakshi?",
    options: ["Madurai", "Mysuru", "Madikeri", "Mayapur"],
    answer: "Madurai"
  },
  {
    topic: "Deities and Bhairavas",
    question: "4. What is the name of the goddess worshipped in Kolhapur?",
    options: ["Mahalakshmi", "Durga", "Parvati", "Sundari"],
    answer: "Mahalakshmi"
  },
  {
    topic: "Deities and Bhairavas",
    question: "5. Which Shakti Peetha is associated with Lalita Devi?",
    options: ["Prayagraj", "Puri", "Patna", "Panipat"],
    answer: "Prayagraj"
  },
  {
    topic: "Deities and Bhairavas",
    question: "6. Which goddess is worshipped at Alampur Peetha?",
    options: ["Jogulamba", "Katyayani", "Kalika", "Kameshwari"],
    answer: "Jogulamba"
  },
  {
    topic: "Deities and Bhairavas",
    question: "7. Which goddess is worshipped in the Madurai Shakti Peetha?",
    options: ["Meenakshi", "Kamakshi", "Chamundeshwari", "Vishalakshi"],
    answer: "Meenakshi"
  },
  {
    topic: "Deities and Bhairavas",
    question: "8. Who is the consort (Bhairava) of Goddess Vishalakshi?",
    options: ["Kala Bhairava", "Maheshwara", "Mallikarjuna", "Sundareswara"],
    answer: "Kala Bhairava"
  },
  {
    topic: "Deities and Bhairavas",
    question: "9. Which goddess is associated with the Ujjain Shakti Peetha?",
    options: ["Mahakali", "Chamundi", "Mahalakshmi", "Vishalakshi"],
    answer: "Mahakali"
  },
  {
    topic: "Deities and Bhairavas",
    question: "10. Where is Lalita Devi worshipped?",
    options: ["Prayagraj", "Puri", "Patna", "Porbandar"],
    answer: "Prayagraj"
  },
  {
    topic: "Deities and Bhairavas",
    question: "11. Sharada Peetha is dedicated to which form of Shakti?",
    options: ["Saraswati", "Parvati", "Kali", "Durga"],
    answer: "Saraswati"
  },
  {
    topic: "Deities and Bhairavas",
    question: "12. Who is the goddess of the Pandua Shakti Peetha?",
    options: ["Shrinkala Devi", "Shridevi", "Sharada", "Sundari"],
    answer: "Shrinkala Devi"
  },
  {
    topic: "Deities and Bhairavas",
    question: "13. Which goddess is worshipped in Kolhapur as part of the 18 Peethas?",
    options: ["Mahalakshmi", "Durga", "Parvati", "Chamunda"],
    answer: "Mahalakshmi"
  },
  {
    topic: "Deities and Bhairavas",
    question: "14. What is the name of the goddess worshipped at Pithapuram?",
    options: ["Kukkuteswari", "Jogulamba", "Taratarini", "Mahakali"],
    answer: "Kukkuteswari"
  },
  {
    topic: "Deities and Bhairavas",
    question: "15. Which goddess is worshipped as a fierce bee form?",
    options: ["Bhramarambika", "Jogulamba", "Tara", "Chamundi"],
    answer: "Bhramarambika"
  },
  {
    topic: "Deities and Bhairavas",
    question: "16. Which form of Shakti is worshipped in Puri (non-Ashta Dasha Peetha)?",
    options: ["Bimala Devi", "Kali", "Kamakshi", "Durga"],
    answer: "Bimala Devi"
  },
  {
    topic: "Deities and Bhairavas",
    question: "17. What is the Bhairava name at Kolhapur Shakti Peetha?",
    options: ["Ksheerabhinandan", "Sundareswara", "Kalabhairava", "Umananda"],
    answer: "Ksheerabhinandan"
  },
  {
    topic: "Deities and Bhairavas",
    question: "18. Who is the Bhairava of Kamakhya Peetha?",
    options: ["Umananda", "Kalabhairava", "Maheshwara", "Sundareswara"],
    answer: "Umananda"
  },
  {
    topic: "Deities and Bhairavas",
    question: "19. What is the Bhairava name at Srisailam Peetha?",
    options: ["Mallikarjuna", "Maheshwara", "Sundareswara", "Kala Bhairava"],
    answer: "Mallikarjuna"
  },
  {
    topic: "Deities and Bhairavas",
    question: "20. Who is the Bhairava of Lalita Devi Peetha?",
    options: ["Bhairava", "Maheshwara", "Ksheerabhinandan", "Kala Bhairava"],
    answer: "Bhairava"
  },
  {
    topic: "Deities and Bhairavas",
    question: "21. What is the Bhairava name at the Kanchipuram Peetha?",
    options: ["Kamba Maheshwara", "Umananda", "Maheshwara", "Kala Bhairava"],
    answer: "Kamba Maheshwara"
  },
  

  // 📍 State-wise Shakti Peethas
  {
    topic: "State-wise Shakti Peethas",
    question: "1. Which Shakti Peetha is located in Tamil Nadu and worships Kamakshi Devi?",
    options: ["Madurai", "Kanchipuram", "Coimbatore", "Salem"],
    answer: "Kanchipuram"
  },
  {
    topic: "State-wise Shakti Peethas",
    question: "2. Which Shakti Peetha is associated with Meenakshi and Lord Sundareswarar?",
    options: ["Madurai", "Kanchipuram", "Kolhapur", "Mysuru"],
    answer: "Madurai"
  },
  {
    topic: "State-wise Shakti Peethas",
    question: "3. Which Shakti Peetha is found near the temple city of Draksharamam?",
    options: ["Manikyamba", "Katyayani", "Mangalagauri", "Chamundeshwari"],
    answer: "Manikyamba"
  },
  {
    topic: "State-wise Shakti Peethas",
    question: "4. Which Shakti Peetha lies in Assam?",
    options: ["Kamakhya", "Taratarini", "Jwalamukhi", "Jogulamba"],
    answer: "Kamakhya"
  },
  {
    topic: "State-wise Shakti Peethas",
    question: "5. Which Shakti Peetha is visited during Navratri in Odisha?",
    options: ["Tara Tarini", "Jwalamukhi", "Jogulamba", "Kolhapur"],
    answer: "Tara Tarini"
  },
  {
    topic: "State-wise Shakti Peethas",
    question: "6. Which Shakti Peetha is located in Maharashtra's Satara district?",
    options: ["Kolhapur", "Tuljapur", "Mahur", "Mysuru"],
    answer: "Kolhapur"
  },
  
  // 📜 Historical / Disputed[
  {
    topic: "Historical and Scriptural References",
    question: "1. Sharada Peeth is located in which disputed region?",
    options: ["PoK", "Punjab", "Pakistan", "Puri"],
    answer: "PoK"
  },
  {
    topic: "Historical and Scriptural References",
    question: "2. Where is the Sharada Peeth located?",
    options: ["Shimla", "Sharda, PoK", "Shringeri", "Srinagar"],
    answer: "Sharda, PoK"
  },
  {
    topic: "Historical and Scriptural References",
    question: "3. In which state is the Sharada Peeth originally located?",
    options: ["Pakistan", "PoK", "Himachal Pradesh", "Kashmir"],
    answer: "PoK"
  },
  {
    topic: "Historical and Scriptural References",
    question: "4. Which of these is NOT an Ashta Dasha Shakti Peetha?",
    options: ["Kolkata Kali", "Kamakhya", "Sharada", "Srisailam"],
    answer: "Kolkata Kali"
  },

  // 🔥 Special Feature
  {
    topic: "Special Features & Rivers",
    question: "1. Which Peetha is known for the eternal flame (Jwala)?",
    options: ["Jwalamukhi", "Kamakhya", "Meenakshi", "Kanchipuram"],
    answer: "Jwalamukhi"
  },
  {
    topic: "Special Features & Rivers",
    question: "2. The Tara Tarini temple is situated on the banks of which river?",
    options: ["Mahanadi", "Ganga", "Rushikulya", "Godavari"],
    answer: "Rushikulya"
  },
  {
    topic: "Special Features & Rivers",
    question: "3. Which Shakti Peetha is known for Goddess Kamakhya and tantric worship?",
    options: ["Varanasi", "Kamakhya", "Puri", "Srisailam"],
    answer: "Kamakhya"
  },
  {
    topic: "Special Features & Rivers",
    question: "4. Which Peetha is called the 'Eye of Shakti'?",
    options: ["Kolhapur", "Jwalaji", "Kolkata", "Vishalakshi"],
    answer: "Jwalaji"
  },
  {
    topic: "Special Features & Rivers",
    question: "5. Which Shakti Peetha is located near the Sangam in Prayagraj?",
    options: ["Lalita Devi", "Kamakhya", "Katyayani", "Manikyamba"],
    answer: "Lalita Devi"
  },
  {
    topic: "Special Features & Rivers",
    question: "6. Which Shakti Peetha is considered the most powerful in Odisha?",
    options: ["Biraja", "Tara Tarini", "Puri Jagannath", "Mangala Gauri"],
    answer: "Tara Tarini"
  },
  {
    topic: "Special Features & Rivers",
    question: "7. What is the main deity worshipped in Jajpur's Shakti Peetha?",
    options: ["Biraja", "Bhadrakali", "Taratarini", "Jogulamba"],
    answer: "Biraja"
  },
  {
    topic: "Special Features & Rivers",
    question: "8. What river flows near the Bhramarambika Peetha?",
    options: ["Krishna", "Tungabhadra", "Godavari", "Yamuna"],
    answer: "Krishna"
  },
  {
    topic: "Special Features & Rivers",
    question: "9. Which Shakti Peetha is also a Jyotirlinga?",
    options: ["Srisailam", "Tara Tarini", "Chamundeshwari", "Kamakshi"],
    answer: "Srisailam"
  }
];


const allQuizData = [...quizData];
let currentQuizData = [...quizData];

let currentIndex = 0;
let score = 0;
let userAnswers = Array(currentQuizData.length).fill(null);
let submitted = Array(currentQuizData.length).fill(false);
let isFullQuiz = false;
const completedTopics = new Set(JSON.parse(localStorage.getItem("completedTopics") || "[]"));
let currentTopic = "";
let globalScoreMap = {}; // topic => correct count

document.getElementById("quiz-float-btn").addEventListener("click", () => {
  const popup = document.getElementById("full-quiz-popup");
  const popupBox = document.getElementById("quiz-popup-box");

  popup.style.display = "block";

  // 🔄 Restart the glowing border animation every time it's shown
  popupBox.classList.remove("animated-border"); // remove if already applied
  void popupBox.offsetWidth; // force reflow (resets animation)
  popupBox.classList.add("animated-border"); // re-add to restart
  });
    
function updateProgress() {
  document.getElementById("progress-tracker").textContent = `Question ${currentIndex + 1} of ${currentQuizData.length}`;
}

function jumpToTopic(topicName) {
  if (completedTopics.has(topicName)) {
    if (!confirm("You have already completed this topic. Do you want to restart it?")) return;
  }
  isFullQuiz = false;
  currentTopic = topicName;
  const filtered = allQuizData.filter(q => q.topic === topicName);
  if (!filtered.length) return alert("No questions found for this topic.");

  currentQuizData = [...filtered];
  currentIndex = 0;
  score = 0;
  userAnswers = Array(currentQuizData.length).fill(null);
  submitted = Array(currentQuizData.length).fill(false);
  document.getElementById("quiz-modal").style.display = "block";
  document.getElementById("score-display").style.display = "none";
  const cert = document.getElementById("certificate");
  if (cert) cert.style.display = "none";
  document.getElementById("question-box").style.display = "block";
  loadQuestion();
}

function loadQuestion() {
  if (!currentQuizData[currentIndex]) return;
  const current = currentQuizData[currentIndex];
  document.getElementById("question").textContent = current.question;
  updateProgress();
  const answersDiv = document.getElementById("answers");
  answersDiv.innerHTML = "";
  current.options.forEach(option => {
    const label = document.createElement("label");
    label.style.display = "block";
    const input = document.createElement("input");
    input.type = "radio";
    input.name = "answer";
    input.value = option;
    input.disabled = submitted[currentIndex];
    if (userAnswers[currentIndex] === option) input.checked = true;
    label.appendChild(input);
    label.appendChild(document.createTextNode(" " + option));
    answersDiv.appendChild(label);
  });
  document.getElementById("submit-btn").style.display = submitted[currentIndex] ? "none" : "inline-block";
  document.getElementById("prev-btn").style.display = currentIndex > 0 ? "inline-block" : "none";
  document.getElementById("next-btn").style.display = currentIndex < currentQuizData.length - 1 ? "inline-block" : "none";
  document.getElementById("score-btn").style.display = submitted.every(Boolean) ? "inline-block" : "none";
}

function submitAnswer() {
  const selected = document.querySelector('input[name="answer"]:checked');
  if (!selected) return alert("Please select an answer!");
  const current = currentQuizData[currentIndex];
  document.querySelectorAll('input[name="answer"]').forEach(input => {
    input.disabled = true;
    input.parentElement.style.color = input.value === current.answer ? "green" : (input.checked ? "red" : "");
  });
  userAnswers[currentIndex] = selected.value;
  submitted[currentIndex] = true;
  if (selected.value === current.answer) {
    score++;
    globalScoreMap[currentTopic] = (globalScoreMap[currentTopic] || 0) + 1;
  }
  document.getElementById("submit-btn").style.display = "none";
  if (submitted.every(Boolean)) {
    if (!isFullQuiz) {
      completedTopics.add(currentTopic);
      localStorage.setItem("completedTopics", JSON.stringify([...completedTopics]));
    }
    document.getElementById("score-btn").style.display = "inline-block";
  } else if (currentIndex < currentQuizData.length - 1) {
    document.getElementById("next-btn").style.display = "inline-block";
  }
}

function loadNextQuestion() {
  if (currentIndex < currentQuizData.length - 1) {
    currentIndex++;
    loadQuestion();
  }
}

function goBack() {
  if (currentIndex > 0) {
    currentIndex--;
    loadQuestion();
  }
}

function showScore() {
  let totalCorrect = Object.values(globalScoreMap).reduce((a, b) => a + b, 0);
  let totalQuestions = allQuizData.length;
  let percentage = (totalCorrect / totalQuestions) * 100;

  const name = localStorage.getItem("quizUserName") || "Participant";

  document.getElementById("question-box").style.display = "none";
  document.getElementById("score-display").style.display = "block";

  const allTopics = Array.from(new Set(allQuizData.map(q => q.topic)));
  const completedAll = allTopics.every(t => completedTopics.has(t));

  if (completedAll) {
    document.getElementById("score-display").innerHTML = `🎉 ${name}, You completed all topics!<br>Your Final Score: ${totalCorrect}/${totalQuestions} (${percentage.toFixed(2)}%)`;

    if (percentage >= 95) {
      const certBtn = document.createElement("button");
      certBtn.textContent = "🎓 Preview Certificate";
      certBtn.style.marginTop = "20px";
      certBtn.onclick = () => {
  console.log("Button clicked"); 
  openCertificate(name, totalCorrect, totalQuestions, percentage);
      };
      document.getElementById("score-display").appendChild(certBtn);
    }
  } else {
    document.getElementById("score-display").innerHTML = `✅ ${name}, You completed this topic!<br>Topic Score: ${score}/${currentQuizData.length} (${percentage.toFixed(2)}%)<br><br>📌 Keep going! Complete all topics to unlock the final score and certificate.`;
  }
}

function restartFullQuiz() {
  if (!confirm("Are you sure you want to restart the full quiz? All progress will be cleared.")) return;
  localStorage.removeItem("completedTopics");
  completedTopics.clear();
  location.reload();
}

function openCertificate(name, score, total, percentage) {
  const doc = new jsPDF("landscape");

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  doc.setDrawColor(100, 100, 100);
  doc.setLineWidth(1.5);
  doc.rect(10, 10, pageWidth - 20, pageHeight - 20);

  doc.setFillColor(255, 255, 255);   // White
  doc.setGState(new doc.GState({ opacity: 0.70 }));  // Adjust opacity (0.0 to 1.0)
  doc.rect(0, 0, pageWidth, pageHeight, 'F');  // Fill full page

  // Optional logo (only if the image exists)
  try {
    doc.addImage("images/logo.png", "PNG", pageWidth / 2 - 20, 10, 40, 40);
  } catch (e) {
    console.warn("Image not found or failed to load:", e);
  }
  // Title
  doc.setFont("Georgia", "bold");
  doc.setFontSize(40);
  doc.setTextColor(255, 0, 0); // A deep navy-like shade (customizable)
  doc.text("Certificate of Achievement", pageWidth / 2, 60, { align: "center" });
   // Subtitle
  doc.setFont("Georgia", "normal");
  doc.setFontSize(24);
  doc.setTextColor(0, 0, 0);
  doc.text("This certificate is proudly presented to", pageWidth / 2, 80, { align: "center" });
  //username
  doc.setFont("Georgia", "bold");
  doc.setFontSize(30);
  doc.setTextColor(0, 102, 204);
  doc.text(`${name}`, pageWidth / 2, 100, { align: "center" });
  
  doc.setFont("Georgia", "normal");
  doc.setFontSize(24);
  doc.setTextColor(0, 0, 0);
  doc.text(`for scoring ${score}/${total} (${percentage.toFixed(2)}%)`, pageWidth / 2, 115, { align: "center" });
  doc.text("in the Shakti Peetha Quiz", pageWidth / 2, 130, { align: "center" });

  doc.setDrawColor(180, 180, 180);
  doc.setLineWidth(0.5);
  doc.line(50, 140, pageWidth - 50, 140);

  doc.setFont("Georgia", "normal");
  doc.setFontSize(20);
  doc.setTextColor(0, 0, 0);
  doc.text(`Issued on: ${new Date().toLocaleDateString()}`, pageWidth - 40, pageHeight - 20, { align: "center" });
  doc.text("© ShaktiPeethas.com", 30, pageHeight - 20, { align: "left" });
  // ✅ Generate blob URL
  const blobUrl = doc.output("bloburl");

  // ✅ Find the preview container and inject the iframe
  const previewContainer = document.getElementById("certificatePreview");

  if (previewContainer) {
    previewContainer.innerHTML = `
      <h3>📄 Preview Your Certificate</h3>
      <iframe src="${blobUrl}" width="100%" height="700px" style="border: 1px solid #ccc; border-radius: 4px; display: block;"></iframe>
      <br><br>
      <button onclick="downloadCertAgain('${blobUrl}')">⬇️ Download PDF</button>
    `;
    previewContainer.style.display = "block";
    previewContainer.scrollIntoView({ behavior: "smooth" });
  } else {
    alert("Certificate preview container not found in HTML!");
  }
}


function downloadCertAgain(blobUrl) {
  const a = document.createElement("a");
  a.href = blobUrl;
  a.download = "certificate.pdf";
  a.click();
}




function downloadCertificateAgain() {
  const blobUrl = localStorage.getItem("certBlobUrl");
  if (blobUrl) {
    window.open(blobUrl, "_blank");
  } else {
    alert("No certificate available to download yet. Please complete the quiz first.");
  }
}


function closeQuiz() {
  document.getElementById("quiz-modal").style.display = "none";
  document.getElementById("score-display").style.display = "none";
  document.getElementById("question-box").style.display = "block";
}
document.addEventListener("DOMContentLoaded", () => {
document.getElementById("quiz-launcher").addEventListener("click", () => {
  const name = document.getElementById("quizusername").value.trim();
  if (!name) return alert("Please enter your name before starting the quiz.");
  localStorage.setItem("quizUserName", name);
  isFullQuiz = true;
  currentQuizData = [...allQuizData];
  currentIndex = 0;
  score = 0;
  userAnswers = Array(currentQuizData.length).fill(null);
  submitted = Array(currentQuizData.length).fill(false);
  document.getElementById("quiz-modal").style.display = "block";
  document.getElementById("score-display").style.display = "none";
  const cert = document.getElementById("certificate");
  if (cert) cert.style.display = "none";
  document.getElementById("question-box").style.display = "block";
  loadQuestion();
});
});

function openAartiPopup() {
  document.getElementById("aartiPopup").style.display = "flex";
  const audio = document.getElementById("aartiAudio");
  audio.currentTime = 0;
  audio.play();
}

function closeAartiPopup() {
  document.getElementById("aartiPopup").style.display = "none";
  document.getElementById("aartiAudio").pause();
}
function ringBell() {
  const bell = document.getElementById("bellAudio");
  bell.currentTime = 0;
  bell.play();
}


const stotramLines = [
  { time: 1, textId: "line-0" },
  { time: 8, textId: "line-1" },
  { time: 18, textId: "line-0" },
  { time: 25, textId: "line-1" },
  { time: 35, textId: "line-2" },
  { time: 42, textId: "line-3" },
  { time: 52, textId: "line-2" },
  { time: 59, textId: "line-3" },
  { time: 69, textId: "line-4" },
  { time: 76, textId: "line-5" },
  { time: 87, textId: "line-4" },
  { time: 94, textId: "line-5" },
  { time: 104, textId: "line-6" },
  { time: 110, textId: "line-7" },
  { time: 121, textId: "line-6" },
  { time: 128, textId: "line-7" },
  { time: 138, textId: "line-8" },
  { time: 145, textId: "line-9" },
  { time: 155, textId: "line-8" },
  { time: 162, textId: "line-9" },
  { time: 172, textId: "line-10" },
  { time: 179, textId: "line-11" },
  { time: 186, textId: "line-12" }
];

const shlokaAudio = document.getElementById("shlokaAudio");
shlokaAudio.addEventListener("timeupdate", () => {
  const currentTime = shlokaAudio.currentTime;
  const allLines = document.querySelectorAll("#lyricsContainer p");
  allLines.forEach(p => p.classList.remove("highlight"));
  for (let i = 0; i < stotramLines.length; i++) {
    const current = stotramLines[i];
    const next = stotramLines[i + 1] || { time: Infinity };
    if (currentTime >= current.time && currentTime < next.time) {
      const el = document.getElementById(current.textId);
      if (el) el.classList.add("highlight"); 
      break;
    }
  }
});
