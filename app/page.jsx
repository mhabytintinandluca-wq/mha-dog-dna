'use client'
import React, { useState, useRef } from 'react';

export default function MhaStoryApp() {
  // ===== STATES =====
  const [screen, setScreen] = useState('landing');
  const [currentTopic, setCurrentTopic] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showLeadGate, setShowLeadGate] = useState(false);
  const [leadInfo, setLeadInfo] = useState({ name: '', contact: '', dogName: '', breed: '', email: '' });
  const [revealStep, setRevealStep] = useState(0);
  const [completedTopics, setCompletedTopics] = useState({});
  const [leadStep, setLeadStep] = useState(0);
  const [selectedBreed, setSelectedBreed] = useState('');
  const [customBreed, setCustomBreed] = useState('');
  const [selectedBadge, setSelectedBadge] = useState(null);
  const [showBadgeModal, setShowBadgeModal] = useState(false);
  const [viewingResult, setViewingResult] = useState(null);
  const [sliderValue, setSliderValue] = useState(50);
  const [holdProgress, setHoldProgress] = useState(0);
  const [isHolding, setIsHolding] = useState(false);
  const holdTimer = useRef(null);

  // Refs for LINE browser compatibility
  const dogNameRef = useRef(null);
  const ownerNameRef = useRef(null);
  const emailRef = useRef(null);
  const phoneRef = useRef(null);
  const customBreedRef = useRef(null);

  // Dog breeds
  const dogBreeds = [
    'ปอมเมอเรเนียน', 'ชิวาวา', 'พุดเดิ้ล', 'โกลเด้น รีทรีฟเวอร์', 
    'ลาบราดอร์', 'ชิบะ อินุ', 'บีเกิ้ล', 'บูลด็อก', 
    'ไซบีเรียน ฮัสกี้', 'คอร์กี้', 'ชิสุ', 'มอลทีส',
    'แจ็ค รัสเซล', 'บางแก้ว', 'ไทยหลังอาน', 'พันทาง/มิกซ์',
    'อื่นๆ (กรอกเอง)'
  ];

  // ===== TOPIC DATA =====
  const allTopics = [
    { id: 1, name: 'The Stare Code', emoji: '👁️', dimension: 'BOND', dimensionEmoji: '💛', color: '#FF6B6B', shortDesc: 'ค้นพบความลึกของสายตาที่เชื่อมโยงหัวใจ', scienceFact: 'การสบตากับน้องหมาช่วยกระตุ้นการหลั่ง Oxytocin เหมือนความรักระหว่างแม่กับลูก', gene: 'OXTR — Oxytocin Receptor', reference: 'Nagasawa et al. (2015), Science' },
    { id: 2, name: 'Empathy DNA', emoji: '😢', dimension: 'BOND', dimensionEmoji: '💛', color: '#FF8E53', shortDesc: 'น้องหมารับรู้อารมณ์คุณได้แค่ไหน?', scienceFact: 'สุนัขสามารถแยกแยะสีหน้าที่แสดงอารมณ์ของมนุษย์และตอบสนองด้วยความเห็นอกเห็นใจ', gene: 'Mirror Neuron System', reference: 'Custance & Mayer (2012)' },
    { id: 3, name: '6th Sense', emoji: '🚪', dimension: 'MIND', dimensionEmoji: '🧠', color: '#4ECDC4', shortDesc: 'น้องหมารู้ล่วงหน้าก่อนคุณทำอะไร?', scienceFact: 'สุนัขสามารถจดจำ routine และคาดการณ์เหตุการณ์ล่วงหน้าได้อย่างแม่นยำ', gene: 'Sensory Processing', reference: 'Sheldrake & Smart (2000)' },
    { id: 4, name: 'Food Blueprint', emoji: '🍖', dimension: 'DRIVE', dimensionEmoji: '⚡', color: '#F39C12', shortDesc: 'อาหารมีอิทธิพลต่อน้องหมาแค่ไหน?', scienceFact: 'ยีน POMC มีผลต่อความอยากอาหารและน้ำหนัก โดยเฉพาะใน Labrador', gene: 'POMC — Appetite Control', reference: 'Raffan et al. (2016)' },
    { id: 5, name: 'Play Personality', emoji: '🎾', dimension: 'DRIVE', dimensionEmoji: '⚡', color: '#2ECC71', shortDesc: 'น้องหมาชอบเล่นแบบไหน?', scienceFact: 'รูปแบบการเล่นเชื่อมโยงกับ attachment style และความสัมพันธ์กับเจ้าของ', gene: 'DRD4 — Dopamine Receptor', reference: 'Rooney & Bradshaw (2003)' },
    { id: 6, name: 'IQ Signal', emoji: '🧠', dimension: 'MIND', dimensionEmoji: '🧠', color: '#3498DB', shortDesc: 'น้องหมาฉลาดแค่ไหน?', scienceFact: 'สุนัขมี social cognition skills ที่ใกล้เคียงกับเด็กมนุษย์อายุ 2-3 ปี', gene: 'WBSCR17 — Social Cognition', reference: 'Hare & Tomasello (2005)' },
    { id: 7, name: 'Mind Reader', emoji: '🔮', dimension: 'MIND', dimensionEmoji: '🧠', color: '#9B59B6', shortDesc: 'น้องหมาอ่านใจคุณได้ไหม?', scienceFact: 'สุนัขสามารถติดตามสายตาและเข้าใจการชี้ของมนุษย์ ต่างจากหมาป่า', gene: 'Visual Processing', reference: 'Miklosi et al. (2003)' },
    { id: 8, name: 'Secret Language', emoji: '🗣️', dimension: 'MIND', dimensionEmoji: '🧠', color: '#1ABC9C', shortDesc: 'น้องหมาสื่อสารกับคุณยังไง?', scienceFact: 'เสียงเห่าของสุนัขมีความหมายเฉพาะตัวและแตกต่างกันในแต่ละสถานการณ์', gene: 'FOXP2 — Language', reference: 'Yin & McCowan (2004)' },
    { id: 9, name: 'Nerve Map', emoji: '⚡', dimension: 'NERVE', dimensionEmoji: '🛡️', color: '#E74C3C', shortDesc: 'น้องหมากลัวอะไรบ้าง?', scienceFact: 'ความกลัวเสียงดังเป็นปัญหาพฤติกรรมที่พบบ่อยที่สุดในสุนัข (40%)', gene: 'SLC6A4 — Serotonin', reference: 'Shull et al. (2021)' },
    { id: 10, name: 'Alone Index', emoji: '🧳', dimension: 'NERVE', dimensionEmoji: '🛡️', color: '#E67E22', shortDesc: 'น้องหมาอยู่คนเดียวได้ไหม?', scienceFact: 'Separation anxiety พบได้ใน 20-40% ของสุนัขทั่วโลก', gene: 'Attachment Genes', reference: 'Flannigan & Dodman (2001)' },
    { id: 11, name: 'Pack Code', emoji: '🐺', dimension: 'WILD', dimensionEmoji: '🌍', color: '#8E44AD', shortDesc: 'น้องหมาเข้าฝูงยังไง?', scienceFact: 'สุนัขมี social hierarchy และพฤติกรรมฝูงที่สืบทอดมาจากหมาป่า', gene: 'Social Hierarchy', reference: 'Barrera et al. (2011)' },
    { id: 12, name: 'Wild Signal', emoji: '🌿', dimension: 'WILD', dimensionEmoji: '🌍', color: '#27AE60', shortDesc: 'สัญชาตญาณดั้งเดิมของน้องหมา', scienceFact: 'พฤติกรรมเช่น การวนก่อนนอน และการขุดดิน เป็นสัญชาตญาณดั้งเดิมจาก DNA', gene: 'Ancient Wolf DNA', reference: 'Coppinger & Coppinger (2001)' }
  ];

  // ===== 12 UNIQUE QUESTION FORMATS =====
  const topicQuestions = {
    // Topic 1: EYE CONTACT CHALLENGE - กดค้าง + Yes/No
    1: [
      { q: '👁️ ลองสบตาน้องหมา กดค้างจนน้องหันไป', type: 'hold', emoji: '👁️', instruction: 'กดค้างค้างไว้ ปล่อยเมื่อน้องหันไป' },
      { q: 'น้องมองตาคุณระหว่างที่คุณกินข้าวไหม?', type: 'yesno', emoji: '🍽️' },
      { q: 'น้องสบตาคุณเมื่อต้องการอะไรบางอย่างไหม?', type: 'yesno', emoji: '🙏' },
      { q: 'น้องหันมามองทันทีเมื่อคุณเรียกชื่อไหม?', type: 'yesno', emoji: '📢' },
      { q: 'น้องมองหน้าคุณก่อนจะตัดสินใจทำอะไรไหม?', type: 'yesno', emoji: '🤔' },
      { q: 'น้องรักษา eye contact ได้นานแค่ไหน?', type: 'slider', min: 0, max: 30, unit: 'วินาที', emoji: '⏱️' },
      { q: 'น้อง slow-blink (กระพริบตาช้าๆ) กับคุณไหม?', type: 'yesno', emoji: '😌' },
      { q: 'น้องมองตาเวลาคุณพูดกับมันไหม?', type: 'yesno', emoji: '💬' },
      { q: 'น้องสบตาตอนเล่นด้วยกันไหม?', type: 'yesno', emoji: '🎾' },
      { q: 'โดยรวมแล้ว การสบตาของน้องเป็นยังไง?', type: 'rating', emoji: '⭐' }
    ],
    // Topic 2: EMOTION SCENARIOS - เลือกสถานการณ์
    2: [
      { q: '😢 เมื่อคุณร้องไห้ น้องทำยังไง?', type: 'scenario', emoji: '😢', options: [
        { text: 'เข้ามาเลียหน้าทันที', score: 100, emoji: '🥺' },
        { text: 'นั่งข้างๆ เงียบๆ ให้กำลังใจ', score: 75, emoji: '🐕' },
        { text: 'ส่งเสียงร้องครวญคราง', score: 50, emoji: '🐶' },
        { text: 'ทำกิจกรรมของตัวเองต่อ', score: 25, emoji: '😴' }
      ]},
      { q: '😰 เมื่อคุณเครียดมากๆ น้องทำยังไง?', type: 'scenario', emoji: '😰', options: [
        { text: 'มาแนบตัวให้ความอบอุ่น', score: 100, emoji: '🤗' },
        { text: 'เอาของเล่นมาให้เพื่อเบี่ยงเบน', score: 75, emoji: '🧸' },
        { text: 'นอนใกล้ๆ คอยเฝ้าดู', score: 50, emoji: '💤' },
        { text: 'ทำตัวปกติเหมือนไม่มีอะไร', score: 25, emoji: '🐕' }
      ]},
      { q: '😠 เมื่อมีคนทะเลาะกันในบ้าน น้องทำยังไง?', type: 'scenario', emoji: '😠', options: [
        { text: 'เข้ามาคั่นกลางเพื่อหยุด', score: 100, emoji: '🐾' },
        { text: 'เห่าหรือส่งเสียงเตือน', score: 75, emoji: '🔊' },
        { text: 'หลบไปห้องอื่น', score: 50, emoji: '🚪' },
        { text: 'นอนต่อไม่สนใจ', score: 25, emoji: '😴' }
      ]},
      { q: '🤒 เมื่อคุณป่วยไม่สบาย น้องทำยังไง?', type: 'scenario', emoji: '🤒', options: [
        { text: 'นอนเฝ้าข้างเตียงตลอด', score: 100, emoji: '🛏️' },
        { text: 'เลียมือหรือหน้าปลอบใจ', score: 75, emoji: '👅' },
        { text: 'เฝ้าดูห่างๆ อย่างเป็นห่วง', score: 50, emoji: '👀' },
        { text: 'ใช้ชีวิตปกติเหมือนเดิม', score: 25, emoji: '🐕' }
      ]},
      { q: '😂 เมื่อคุณหัวเราะดังๆ น้องทำยังไง?', type: 'scenario', emoji: '😂', options: [
        { text: 'กระโดดตื่นเต้นดีใจด้วย', score: 100, emoji: '🎉' },
        { text: 'กระดิกหางตามจังหวะ', score: 75, emoji: '🐕' },
        { text: 'มองแปลกๆ งงๆ', score: 50, emoji: '🤨' },
        { text: 'นอนหลับต่อไม่สนใจ', score: 25, emoji: '😴' }
      ]},
      { q: 'น้องรู้ล่วงหน้าไหมว่าคุณกำลังจะกลับบ้าน?', type: 'yesno', emoji: '🏠' },
      { q: 'น้องเข้าใจความแตกต่างของน้ำเสียงคุณไหม?', type: 'yesno', emoji: '🎵' },
      { q: 'น้องพยายามปลอบใจคุณเวลามีเรื่องไหม?', type: 'yesno', emoji: '🤗' },
      { q: 'น้องหงอยตามเมื่อคุณเศร้าไหม?', type: 'yesno', emoji: '😔' },
      { q: 'โดยรวม น้องเข้าใจอารมณ์คุณได้ดีแค่ไหน?', type: 'rating', emoji: '💕' }
    ],
    // Topic 3: PREDICTION GAME - เกมทำนายสัมผัสที่หก
    3: [
      { q: '🚗 น้องรู้ก่อนไหมว่ามีคนจะมาถึงบ้าน?', type: 'prediction', emoji: '🚗', options: ['😕 ไม่เคยรู้', '🤔 บางครั้ง', '🔮 รู้ก่อนเสมอ!'] },
      { q: '⏰ น้องตื่นก่อนนาฬิกาปลุกคุณไหม?', type: 'prediction', emoji: '⏰', options: ['😴 ไม่เลย', '🤔 บางวัน', '⏰ ตรงเวลาทุกวัน!'] },
      { q: '🏥 น้องรู้ว่าจะไปหาหมอก่อนออกจากบ้านไหม?', type: 'prediction', emoji: '🏥', options: ['🐕 ไม่รู้เลย', '😰 รู้ตอนขึ้นรถ', '🏃 รู้ตั้งแต่เช้า!'] },
      { q: '🌧️ น้องทำนายฝนตกหรือพายุได้ไหม?', type: 'prediction', emoji: '🌧️', options: ['🌤️ ไม่เคย', '🤔 บางครั้ง', '🌧️ แม่นยำมาก!'] },
      { q: '🏠 น้องรู้เวลาที่คุณกำลังจะกลับบ้านไหม?', type: 'prediction', emoji: '🏠', options: ['🐕 ไม่รู้', '🤔 บางที', '🎯 รอหน้าประตูก่อนถึง!'] },
      { q: 'น้องรู้ว่าใครเป็นมิตรหรือศัตรูไหม?', type: 'yesno', emoji: '🤝' },
      { q: 'น้องเคยเตือนคุณเรื่องอันตรายไหม?', type: 'yesno', emoji: '⚠️' },
      { q: 'น้องรับรู้อารมณ์คนรอบข้างได้ไหม?', type: 'yesno', emoji: '👥' },
      { q: 'น้องมีปฏิกิริยากับพลังงานของคนแปลกหน้าไหม?', type: 'yesno', emoji: '✨' },
      { q: 'โดยรวม สัมผัสที่หกของน้องอยู่ระดับไหน?', type: 'rating', emoji: '🔮' }
    ],
    // Topic 4: FOOD RATING SLIDERS - ลาก slider ให้คะแนนอาหาร
    4: [
      { q: '🤩 น้องตื่นเต้นเวลาเห็นอาหารแค่ไหน?', type: 'food_slider', emoji: '🤩', labels: ['เฉยๆ', 'บ้าคลั่ง!'] },
      { q: '⚡ น้องกินอาหารเร็วแค่ไหน?', type: 'food_slider', emoji: '⚡', labels: ['ค่อยๆ กิน', 'หายวับ!'] },
      { q: '🙏 น้องขออาหารจากโต๊ะบ่อยแค่ไหน?', type: 'food_slider', emoji: '🙏', labels: ['ไม่เคย', 'ทุกมื้อ!'] },
      { q: '🧠 น้องจำที่ซ่อนขนมได้ดีแค่ไหน?', type: 'food_slider', emoji: '🧠', labels: ['ลืมหมด', 'จำได้ทุกที่!'] },
      { q: '👂 น้องรู้จักเสียงถุงขนมหรือกล่องอาหารไหม?', type: 'yesno', emoji: '👂' },
      { q: 'น้องยอมทำ trick เพื่อแลกขนมไหม?', type: 'yesno', emoji: '🎪' },
      { q: 'น้องเลือกกินเฉพาะบางอย่างไหม?', type: 'yesno', emoji: '🤔' },
      { q: 'น้องรู้เวลาอาหารแม่นยำไหม?', type: 'yesno', emoji: '⏰' },
      { q: 'น้องแย่งอาหารจากหมาตัวอื่นไหม?', type: 'yesno', emoji: '🐕' },
      { q: 'โดยรวม น้องเป็น Food Lover ระดับไหน?', type: 'rating', emoji: '🍖' }
    ],
    // Topic 5: VISUAL TOY PICKER - เลือกของเล่นที่ชอบ
    5: [
      { q: '🧸 น้องชอบเล่นกับอะไรมากที่สุด?', type: 'toy_picker', emoji: '🧸', options: [
        { emoji: '🎾', label: 'ลูกบอล' },
        { emoji: '🪢', label: 'เชือกดึง' },
        { emoji: '🧸', label: 'ตุ๊กตา' },
        { emoji: '🦴', label: 'กระดูก' }
      ]},
      { q: '🎮 น้องชอบเล่นแบบไหนมากที่สุด?', type: 'toy_picker', emoji: '🎮', options: [
        { emoji: '🏃', label: 'วิ่งไล่จับ' },
        { emoji: '🤼', label: 'มวยปล้ำ' },
        { emoji: '🔍', label: 'ซ่อนหา' },
        { emoji: '🧩', label: 'ปริศนา' }
      ]},
      { q: '👥 น้องชอบเล่นกับใครมากที่สุด?', type: 'toy_picker', emoji: '👥', options: [
        { emoji: '👤', label: 'คนเดียว' },
        { emoji: '👨‍👩‍👧', label: 'ครอบครัว' },
        { emoji: '🐕', label: 'หมาตัวอื่น' },
        { emoji: '🧸', label: 'ของเล่น' }
      ]},
      { q: 'น้องเล่นได้นานแค่ไหนก่อนเหนื่อย?', type: 'slider', min: 5, max: 60, unit: 'นาที', emoji: '⏱️' },
      { q: 'น้องชวนคุณเล่นบ่อยแค่ไหน?', type: 'yesno', emoji: '🙋' },
      { q: 'น้องเล่นของเล่นคนเดียวได้ไหม?', type: 'yesno', emoji: '🎯' },
      { q: 'น้องตื่นเต้นมากเมื่อเห็นสายจูงไหม?', type: 'yesno', emoji: '🦮' },
      { q: 'น้องรู้จักหยุดพักเวลาเหนื่อยไหม?', type: 'yesno', emoji: '😮‍💨' },
      { q: 'น้องมีของเล่นชิ้นโปรดที่ชัดเจนไหม?', type: 'yesno', emoji: '🌟' },
      { q: 'โดยรวม น้องเป็น Player ระดับไหน?', type: 'rating', emoji: '🎾' }
    ],
    // Topic 6: IQ PUZZLE CHALLENGE - ท้าทายปริศนา
    6: [
      { q: '🧩 ถ้าซ่อนขนมใต้แก้ว 1 ใน 3 ใบ แล้วสลับ น้องหาเจอไหม?', type: 'puzzle_cups', emoji: '🧩' },
      { q: '🚪 ถ้าปิดประตูไว้ น้องเปิดเองได้ไหม?', type: 'puzzle_door', emoji: '🚪' },
      { q: 'น้องเรียนรู้คำสั่งใหม่เร็วแค่ไหน?', type: 'slider', min: 1, max: 10, unit: 'ครั้ง', labels: ['หลายครั้ง', 'รู้ทันที!'], emoji: '📚' },
      { q: 'น้องจำชื่อของเล่นแต่ละชิ้นได้กี่ชิ้น?', type: 'slider', min: 0, max: 20, unit: 'ชิ้น', emoji: '🏷️' },
      { q: 'น้องรู้จักหลอกล่อคุณเพื่อได้สิ่งที่ต้องการไหม?', type: 'yesno', emoji: '🎭' },
      { q: 'น้องเข้าใจท่าทางมือของคุณไหม?', type: 'yesno', emoji: '👆' },
      { q: 'น้องจำเส้นทางเดินประจำได้ไหม?', type: 'yesno', emoji: '🗺️' },
      { q: 'น้องแยกแยะคนในครอบครัวได้ทุกคนไหม?', type: 'yesno', emoji: '👨‍👩‍👧' },
      { q: 'น้องเรียนรู้จากการดูหมาตัวอื่นทำไหม?', type: 'yesno', emoji: '👀' },
      { q: 'โดยรวม IQ ของน้องอยู่ระดับไหน?', type: 'rating', emoji: '🎓' }
    ],
    // Topic 7: CRYSTAL BALL - ลูกแก้ววิเศษอ่านใจ
    7: [
      { q: '🔮 จ้องลูกแก้ว... น้องรู้ก่อนไหมว่าคุณจะพาไปเดินเล่น?', type: 'crystal', emoji: '🔮' },
      { q: '💭 น้องเดาได้ไหมว่าคุณกำลังคิดอะไรอยู่?', type: 'crystal', emoji: '💭' },
      { q: '📅 น้องรู้ไหมว่าวันนี้เป็นวันหยุดหรือวันทำงาน?', type: 'crystal', emoji: '📅' },
      { q: 'น้องเตรียมตัวก่อนที่คุณจะบอกไหม?', type: 'yesno', emoji: '🎯' },
      { q: 'น้องรู้ว่าจะมีแขกมาก่อนกดกริ่งไหม?', type: 'yesno', emoji: '🔔' },
      { q: 'น้องรู้ว่าคุณกำลังจะให้ขนมไหม?', type: 'yesno', emoji: '🍪' },
      { q: 'น้องคาดเดาการเคลื่อนไหวของคุณได้ไหม?', type: 'yesno', emoji: '🔄' },
      { q: 'น้องปรับพฤติกรรมตามอารมณ์คุณไหม?', type: 'yesno', emoji: '🎭' },
      { q: 'น้องรู้ว่าคุณกำลังจะออกไปข้างนอกไหม?', type: 'yesno', emoji: '🚗' },
      { q: 'โดยรวม น้องอ่านใจได้ดีแค่ไหน?', type: 'rating', emoji: '🧿' }
    ],
    // Topic 8: SOUND WAVE MATCHING - จับคู่เสียงสื่อสาร
    8: [
      { q: '🔊 น้องมีเสียงเห่ากี่แบบที่แตกต่างกัน?', type: 'sound_counter', emoji: '🔊', min: 1, max: 10 },
      { q: '🎵 เลือกเสียงที่น้องใช้เมื่อต้องการอะไร', type: 'sound_picker', emoji: '🎵', options: [
        { emoji: '🗣️', label: 'เห่าสั้นๆ', score: 100 },
        { emoji: '📢', label: 'เห่ายาวดังๆ', score: 75 },
        { emoji: '😩', label: 'ครวญคราง', score: 50 },
        { emoji: '🐕', label: 'หอน', score: 25 }
      ]},
      { q: '🎉 น้องใช้เสียงอะไรเมื่อดีใจ?', type: 'sound_picker', emoji: '🎉', options: [
        { emoji: '😆', label: 'ร้องกิ๊กๆ', score: 100 },
        { emoji: '🗣️', label: 'เห่าตื่นเต้น', score: 75 },
        { emoji: '🐕', label: 'กระดิกหางเฉยๆ', score: 50 },
        { emoji: '🤫', label: 'เงียบ', score: 25 }
      ]},
      { q: 'น้องใช้ตาสื่อสารความต้องการไหม?', type: 'yesno', emoji: '👀' },
      { q: 'น้องใช้หางสื่ออารมณ์ต่างๆ ไหม?', type: 'yesno', emoji: '🐾' },
      { q: 'น้องใช้อุ้งเท้าแตะเรียกร้องความสนใจไหม?', type: 'yesno', emoji: '🐾' },
      { q: 'น้องแสดงสีหน้าชัดเจนไหม?', type: 'yesno', emoji: '😀' },
      { q: 'น้องเข้าใจเมื่อคุณพูดกับมันไหม?', type: 'yesno', emoji: '🧏' },
      { q: 'คุณรู้สึกว่าคุยกับน้องรู้เรื่องไหม?', type: 'yesno', emoji: '💬' },
      { q: 'โดยรวม น้องสื่อสารเก่งแค่ไหน?', type: 'rating', emoji: '📢' }
    ],
    // Topic 9: FEAR METER - วัดระดับความกลัว
    9: [
      { q: '🎆 ระดับความกลัวพลุ/ประทัด/ฟ้าร้อง', type: 'fear_meter', emoji: '🎆', thing: 'พลุ/ฟ้าร้อง' },
      { q: '🧹 ระดับความกลัวเครื่องดูดฝุ่น', type: 'fear_meter', emoji: '🧹', thing: 'เครื่องดูดฝุ่น' },
      { q: '👤 ระดับความกลัวคนแปลกหน้า', type: 'fear_meter', emoji: '👤', thing: 'คนแปลกหน้า' },
      { q: '🏥 ระดับความกลัวการไปหาหมอ', type: 'fear_meter', emoji: '🏥', thing: 'การไปหาหมอ' },
      { q: '🚗 ระดับความกลัวการนั่งรถยนต์', type: 'fear_meter', emoji: '🚗', thing: 'รถยนต์' },
      { q: 'น้องตกใจง่ายกับเสียงหรือเหตุการณ์ไหม?', type: 'yesno', emoji: '😱' },
      { q: 'น้องฟื้นตัวจากความกลัวได้เร็วไหม?', type: 'yesno', emoji: '💪' },
      { q: 'น้องมีที่ซ่อนประจำเวลากลัวไหม?', type: 'yesno', emoji: '🏠' },
      { q: 'น้องกล้าเข้าหาสิ่งใหม่ๆ ด้วยตัวเองไหม?', type: 'yesno', emoji: '🌟' },
      { q: 'โดยรวม น้องกล้าหาญแค่ไหน?', type: 'rating', emoji: '🦸' }
    ],
    // Topic 10: TIME ALONE SLIDER - วัดเวลาอยู่คนเดียว
    10: [
      { q: '⏰ น้องอยู่บ้านคนเดียวได้นานสุดกี่ชั่วโมง?', type: 'time_alone', emoji: '⏰', max: 12 },
      { q: '😭 น้องเริ่มร้องหลังคุณออกจากบ้านกี่นาที?', type: 'slider', min: 0, max: 60, unit: 'นาที', emoji: '😭' },
      { q: '🚶 น้องติดตามคุณไปทุกห้องในบ้านไหม?', type: 'follow_meter', emoji: '🚶' },
      { q: 'น้องทำลายของเมื่ออยู่คนเดียวไหม?', type: 'yesno', emoji: '💔' },
      { q: 'น้องเครียดเมื่อเห็นคุณเตรียมตัวออกไปไหม?', type: 'yesno', emoji: '😰' },
      { q: 'น้องกินอาหารได้ตามปกติเมื่อคุณไม่อยู่ไหม?', type: 'yesno', emoji: '🍽️' },
      { q: 'น้องนอนหลับได้เมื่อคุณไม่อยู่บ้านไหม?', type: 'yesno', emoji: '😴' },
      { q: 'น้องตื่นเต้นมากเกินไปเมื่อคุณกลับบ้านไหม?', type: 'yesno', emoji: '🎉' },
      { q: 'น้องต้องนอนห้องเดียวกับคุณเท่านั้นไหม?', type: 'yesno', emoji: '🛏️' },
      { q: 'โดยรวม น้องอยู่คนเดียวได้ดีแค่ไหน?', type: 'rating', emoji: '🦅' }
    ],
    // Topic 11: PACK POSITION PICKER - เลือกตำแหน่งในฝูง
    11: [
      { q: '🐺 น้องเป็นตำแหน่งไหนในฝูง?', type: 'pack_position', emoji: '🐺', options: [
        { emoji: '👑', label: 'ผู้นำ - ต้องเป็นที่หนึ่ง', score: 100 },
        { emoji: '🤝', label: 'เพื่อนร่วมทีม - ทำงานร่วมกัน', score: 75 },
        { emoji: '🐾', label: 'ผู้ตาม - ยอมตามหัวหน้า', score: 50 },
        { emoji: '🐺', label: 'หมาป่าเดียวดาย - ชอบอยู่คนเดียว', score: 25 }
      ]},
      { q: '👋 น้องเข้ากับหมาตัวใหม่ได้เร็วแค่ไหน?', type: 'slider', min: 0, max: 100, labels: ['ช้ามาก', 'ทันทีเลย!'], emoji: '👋' },
      { q: '🍖 น้องหวงอาหารจากหมาตัวอื่นไหม?', type: 'guard_meter', emoji: '🍖' },
      { q: 'น้องแบ่งของเล่นกับหมาตัวอื่นได้ไหม?', type: 'yesno', emoji: '🧸' },
      { q: 'น้องแสดงอำนาจเหนือหมาตัวอื่นไหม?', type: 'yesno', emoji: '💪' },
      { q: 'น้องหลีกเลี่ยงความขัดแย้งไหม?', type: 'yesno', emoji: '🕊️' },
      { q: 'น้องปกป้องครอบครัวจากหมาแปลกหน้าไหม?', type: 'yesno', emoji: '🛡️' },
      { q: 'น้องเล่นตามกฎกับหมาตัวอื่นไหม?', type: 'yesno', emoji: '📜' },
      { q: 'น้องมีเพื่อนสุนัขที่สนิทเป็นพิเศษไหม?', type: 'yesno', emoji: '❤️' },
      { q: 'โดยรวม น้องเข้าสังคมหมาได้ดีแค่ไหน?', type: 'rating', emoji: '🤝' }
    ],
    // Topic 12: WILD VS DOMESTIC - เลือกระหว่าง 2 ทาง
    12: [
      { q: '🏠 vs 🌳 น้องชอบแบบไหนมากกว่า?', type: 'versus', emoji: '🆚', optionA: { emoji: '🏠', label: 'อยู่ในบ้าน' }, optionB: { emoji: '🌳', label: 'ออกไปข้างนอก' } },
      { q: '🛋️ vs 🌿 น้องชอบนอนที่ไหนมากกว่า?', type: 'versus', emoji: '🆚', optionA: { emoji: '🛋️', label: 'โซฟาในบ้าน' }, optionB: { emoji: '🌿', label: 'สนามหญ้า' } },
      { q: '🧸 vs 🐿️ น้องสนใจอะไรมากกว่า?', type: 'versus', emoji: '🆚', optionA: { emoji: '🧸', label: 'ของเล่น' }, optionB: { emoji: '🐿️', label: 'สัตว์ตัวเล็ก' } },
      { q: 'น้องไล่จับสัตว์เล็กๆ เช่น นก กิ้งก่า ไหม?', type: 'yesno', emoji: '🐿️' },
      { q: 'น้องชอบขุดดินบ่อยไหม?', type: 'yesno', emoji: '🕳️' },
      { q: 'น้องหอนเหมือนหมาป่าไหม?', type: 'yesno', emoji: '🌙' },
      { q: 'น้องชอบดมกลิ่นทุกอย่างระหว่างเดินไหม?', type: 'yesno', emoji: '👃' },
      { q: 'น้องกลิ้งตัวบนหญ้าหรือพื้นดินไหม?', type: 'yesno', emoji: '🌀' },
      { q: 'น้องมีสัญชาตญาณล่าเหยื่อสูงไหม?', type: 'yesno', emoji: '🎯' },
      { q: 'โดยรวม น้องมีความเป็น Wild แค่ไหน?', type: 'rating', emoji: '🐺' }
    ]
  };

  // ===== PERSONALITY RESULTS (ละเอียด) =====
  const getPersonality = (score, topicId) => {
    const personalities = {
      1: {
        high: { type: 'Soul Gazer', emoji: '🌟', tagline: 'น้องหมาที่อ่านใจคุณได้ทุกครั้งที่สบตา', traits: ['อ่านใจเจ้าของเก่ง', 'ผูกพันลึกซึ้ง', 'ไวต่ออารมณ์', 'ต้องการความใกล้ชิด'], rarity: 'หายาก — 12%', advice: 'ใช้เวลาสบตาน้อง 5-10 นาทีต่อวันเพื่อเสริมสร้าง bond ที่แน่นแฟ้น', warning: 'น้องอาจมี Separation Anxiety และเครียดตามเมื่อเห็นคุณเครียด' },
        medium: { type: 'Heart Reader', emoji: '💕', tagline: 'น้องหมาที่รู้ใจคุณเสมอในเวลาที่ต้องการ', traits: ['เข้าใจอารมณ์', 'ห่วงใยเจ้าของ', 'ชอบอยู่ใกล้ๆ'], rarity: 'พบได้บ่อย — 35%', advice: 'ลองเล่น eye contact game กับน้องบ่อยๆ เพื่อพัฒนา bond', warning: 'ให้ความสนใจสม่ำเสมอเพื่อรักษาความผูกพัน' },
        low: { type: 'Casual Connector', emoji: '🤝', tagline: 'น้องหมาที่รักอิสระแต่ยังรักคุณในแบบของตัวเอง', traits: ['มั่นใจในตัวเอง', 'รักอิสระ', 'ผูกพันแบบสบายๆ'], rarity: 'พบได้ทั่วไป — 40%', advice: 'อย่าตีความว่าน้องไม่รัก น้องแค่แสดงออกในแบบของตัวเอง', warning: 'ไม่ต้องกังวล นี่คือบุคลิกภาพปกติ' },
        veryLow: { type: 'Independent Spirit', emoji: '🦊', tagline: 'น้องหมาผู้รักอิสระสุดๆ', traits: ['อิสระ', 'มั่นใจ', 'มีโลกส่วนตัว', 'ฉลาดและรอบคอบ'], rarity: 'ไม่ค่อยพบ — 13%', advice: 'ให้โอกาสน้องได้สำรวจโลกด้วยตัวเอง', warning: 'ระวังการหนีออกจากบ้าน ตรวจสอบรั้วและประตู' }
      },
      2: {
        high: { type: 'Emotion Sponge', emoji: '🫂', tagline: 'น้องหมาที่ซึมซับอารมณ์คุณได้ทั้งหมด', traits: ['รับรู้อารมณ์ได้ดีมาก', 'เห็นอกเห็นใจ', 'อยากปลอบใจ', 'Sensitive'], rarity: 'หายาก — 15%', advice: 'ระวังไม่ให้น้องรับความเครียดจากคุณมากเกินไป', warning: 'น้องอาจเครียดตามถ้าบรรยากาศในบ้านตึงเครียด' },
        medium: { type: 'Comfort Buddy', emoji: '🤗', tagline: 'น้องหมาที่คอยอยู่เคียงข้างเวลาเศร้า', traits: ['เข้าใจเมื่อคุณเศร้า', 'ให้กำลังใจ', 'ช่างสังเกต'], rarity: 'พบได้บ่อย — 40%', advice: 'ตอบแทนน้องด้วยการใช้เวลาคุณภาพด้วยกัน', warning: 'ไม่มีข้อควรระวังพิเศษ' },
        low: { type: 'Chill Observer', emoji: '😎', tagline: 'น้องหมาที่แคร์แต่ไม่แสดงออกมาก', traits: ['สงบ', 'ไม่ตื่นตระหนก', 'ให้พื้นที่'], rarity: 'พบได้ทั่วไป — 35%', advice: 'น้องอาจแสดงความรักในแบบเงียบๆ สังเกตให้ดี', warning: 'อย่าคาดหวังปฏิกิริยามากเกินไป' },
        veryLow: { type: 'Zen Master', emoji: '🧘', tagline: 'น้องหมาที่สงบไม่ว่าอะไรจะเกิดขึ้น', traits: ['สงบมาก', 'ไม่ค่อยรีแอค', 'อยู่กับตัวเอง'], rarity: 'ไม่ค่อยพบ — 10%', advice: 'น้องเป็นหมาที่ stable มากๆ เหมาะกับบ้านที่มีเด็กหรือผู้สูงอายุ', warning: 'ไม่มีข้อควรระวังพิเศษ' }
      },
      3: {
        high: { type: 'Psychic Pup', emoji: '🔮', tagline: 'น้องหมาที่มีสัมผัสที่หกเหนือธรรมชาติ', traits: ['สังเกตการณ์เก่งมาก', 'จดจำ pattern ได้', 'ไวต่อการเปลี่ยนแปลง', 'คาดการณ์ได้'], rarity: 'หายากมาก — 8%', advice: 'น้องอาจรู้สึกถึงความผิดปกติก่อนคุณ ให้ความสำคัญกับสัญญาณที่น้องส่ง', warning: 'น้องอาจวิตกกังวลถ้ารับรู้สิ่งผิดปกติมากเกินไป' },
        medium: { type: 'Keen Observer', emoji: '🦉', tagline: 'น้องหมาที่จับรายละเอียดได้ดี', traits: ['ช่างสังเกต', 'จำ routine ได้', 'รู้จังหวะ'], rarity: 'พบได้บ่อย — 35%', advice: 'ใช้ประโยชน์จากความไวของน้องในการฝึก', warning: 'ไม่มีข้อควรระวังพิเศษ' },
        low: { type: 'Easy Going', emoji: '😊', tagline: 'น้องหมาที่ไม่ซีเรียสกับการเปลี่ยนแปลง', traits: ['ยืดหยุ่น', 'ปรับตัวง่าย', 'ไม่กังวลมาก'], rarity: 'พบได้ทั่วไป — 42%', advice: 'น้องปรับตัวได้ดี พาไปที่ใหม่ๆ ได้สบาย', warning: 'ไม่มีข้อควรระวังพิเศษ' },
        veryLow: { type: 'Chill Dude', emoji: '😴', tagline: 'น้องหมาที่อยู่กับปัจจุบันเสมอ', traits: ['อยู่กับปัจจุบัน', 'ไม่คาดเดา', 'สบายๆ'], rarity: 'ไม่ค่อยพบ — 15%', advice: 'น้องเป็นหมาที่ easy going มากๆ', warning: 'ไม่มีข้อควรระวังพิเศษ' }
      },
      4: {
        high: { type: 'Food Fanatic', emoji: '🤤', tagline: 'น้องหมาที่อาหารคือทุกสิ่งทุกอย่าง!', traits: ['รักอาหารสุดๆ', 'Train ง่ายด้วยขนม', 'ต้องระวังน้ำหนัก', 'Food motivated'], rarity: 'พบได้บ่อย — 45%', advice: 'ใช้อาหารเป็น reward ในการฝึก แต่ระวังไม่ให้อ้วน', warning: 'ระวังโรคอ้วนและปัญหาสุขภาพจากการกินมากเกินไป' },
        medium: { type: 'Balanced Eater', emoji: '🍽️', tagline: 'น้องหมาที่กินตามความหิวอย่างสมดุล', traits: ['กินพอดี', 'ไม่หิวตลอดเวลา', 'สุขภาพดี'], rarity: 'พบได้บ่อย — 35%', advice: 'น้องมีการควบคุมความอยากอาหารที่ดี รักษาไว้', warning: 'ไม่มีข้อควรระวังพิเศษ' },
        low: { type: 'Picky Eater', emoji: '🤔', tagline: 'น้องหมาที่เลือกกินเฉพาะสิ่งที่ชอบ', traits: ['เลือกอาหาร', 'ไม่หิวง่าย', 'ต้องหาของที่ชอบ'], rarity: 'พบได้ทั่วไป — 15%', advice: 'ลองหาอาหารที่น้องชอบจริงๆ อาจต้องลองหลายยี่ห้อ', warning: 'ตรวจสอบสุขภาพถ้าน้องกินน้อยผิดปกติ' },
        veryLow: { type: 'Food Skeptic', emoji: '🙄', tagline: 'น้องหมาที่อาหารไม่ใช่เรื่องสำคัญ', traits: ['ไม่สนใจอาหารมาก', 'กินน้อย', 'ต้องกระตุ้น'], rarity: 'ไม่ค่อยพบ — 5%', advice: 'ลองเปลี่ยนอาหารหรือเพิ่มกิจกรรมก่อนกิน', warning: 'ปรึกษาสัตวแพทย์ถ้าน้องกินน้อยมากผิดปกติ' }
      },
      5: {
        high: { type: 'Play Monster', emoji: '🎉', tagline: 'น้องหมาที่พลังงานไม่มีวันหมด!', traits: ['พลังงานสูงมาก', 'เล่นได้ทั้งวัน', 'ต้องการออกกำลังกายเยอะ', 'Never stops'], rarity: 'พบได้บ่อย — 30%', advice: 'ต้องให้น้องได้ปล่อยพลังงานทุกวัน อย่างน้อย 1-2 ชั่วโมง', warning: 'ถ้าไม่ได้ออกกำลังกายพอ อาจทำลายของในบ้าน' },
        medium: { type: 'Active Player', emoji: '🐕', tagline: 'น้องหมาที่ชอบเล่นอย่างสมดุล', traits: ['ชอบเล่น', 'รู้จักพัก', 'สมดุลดี'], rarity: 'พบได้บ่อยมาก — 45%', advice: 'น้องมีพลังงานที่ดี จัดเวลาเล่นให้สม่ำเสมอ', warning: 'ไม่มีข้อควรระวังพิเศษ' },
        low: { type: 'Couch Potato', emoji: '🛋️', tagline: 'น้องหมาที่ชอบพักผ่อนมากกว่าเล่น', traits: ['ชอบนอน', 'เล่นไม่นาน', 'สบายๆ'], rarity: 'พบได้ทั่วไป — 20%', advice: 'กระตุ้นให้น้องขยับบ้างเพื่อสุขภาพ', warning: 'ระวังโรคอ้วนจากการไม่ออกกำลังกาย' },
        veryLow: { type: 'Zen Sleeper', emoji: '😴', tagline: 'น้องหมาที่นอนคือชีวิต', traits: ['นอนเยอะมาก', 'ไม่ค่อยเล่น', 'ชอบพักผ่อน'], rarity: 'ไม่ค่อยพบ — 5%', advice: 'ตรวจสอบสุขภาพน้องหากนอนมากผิดปกติ', warning: 'ปรึกษาสัตวแพทย์หากพฤติกรรมเปลี่ยนแปลงกะทันหัน' }
      },
      6: {
        high: { type: 'Genius Pup', emoji: '🎓', tagline: 'น้องหมาอัจฉริยะที่ฉลาดหลักแหลม!', traits: ['เรียนรู้เร็วมาก', 'แก้ปัญหาเก่ง', 'ต้องการความท้าทาย', 'อาจแกล้งคุณ'], rarity: 'หายาก — 10%', advice: 'ให้ของเล่น puzzle และฝึกคำสั่งใหม่ๆ เพื่อกระตุ้นสมอง', warning: 'น้องอาจเบื่อง่ายถ้าไม่ได้รับการกระตุ้น' },
        medium: { type: 'Smart Cookie', emoji: '🍪', tagline: 'น้องหมาที่เรียนรู้ได้ดีและเข้าใจง่าย', traits: ['ฉลาด', 'ฝึกได้', 'เข้าใจคำสั่ง'], rarity: 'พบได้บ่อย — 45%', advice: 'ฝึกคำสั่งใหม่เพื่อพัฒนาสมองน้อง', warning: 'ไม่มีข้อควรระวังพิเศษ' },
        low: { type: 'Sweet Simpleton', emoji: '🥰', tagline: 'น้องหมาที่รักด้วยใจไม่ใช่สมอง', traits: ['เรียนช้าหน่อย', 'แต่รักเจ้าของมาก', 'ใจดี'], rarity: 'พบได้ทั่วไป — 35%', advice: 'ใช้เวลาฝึกมากขึ้น ทำซ้ำบ่อยๆ ให้รางวัลเยอะๆ', warning: 'อย่าคาดหวังมากเกินไป รักน้องในแบบที่น้องเป็น' },
        veryLow: { type: 'Lovable Goofball', emoji: '🤪', tagline: 'น้องหมาที่ทำอะไรก็ดูน่ารักไปหมด', traits: ['ซุ่มซ่าม', 'น่ารัก', 'ไม่ค่อยเข้าใจ'], rarity: 'ไม่ค่อยพบ — 10%', advice: 'รักน้องในแบบที่น้องเป็น ความน่ารักคือสิ่งที่สำคัญที่สุด', warning: 'ไม่มีข้อควรระวังพิเศษ' }
      },
      7: {
        high: { type: 'Telepathic', emoji: '🧿', tagline: 'น้องหมาเทเลพาธีที่อ่านใจคุณได้!', traits: ['อ่านใจได้', 'รู้ก่อนทำ', 'เชื่อมโยงกับเจ้าของ', 'Intuitive'], rarity: 'หายากมาก — 8%', advice: 'น้องเข้าใจคุณดีมาก ใช้สายตาและภาษากายสื่อสาร', warning: 'น้องอาจรู้สึกถึงความเครียดของคุณได้' },
        medium: { type: 'Intuitive', emoji: '💫', tagline: 'น้องหมาสัญชาตญาณดีที่รู้ใจเจ้าของ', traits: ['สัญชาตญาณดี', 'รู้จังหวะ', 'เข้าใจ'], rarity: 'พบได้บ่อย — 40%', advice: 'น้องรู้ใจคุณดี แต่บางครั้งก็ต้องบอกตรงๆ', warning: 'ไม่มีข้อควรระวังพิเศษ' },
        low: { type: 'Present Moment', emoji: '🌸', tagline: 'น้องหมาที่โฟกัสกับสิ่งที่อยู่ตรงหน้า', traits: ['อยู่กับปัจจุบัน', 'ไม่คาดเดา', 'ต้องบอกชัด'], rarity: 'พบได้ทั่วไป — 40%', advice: 'บอกน้องชัดเจนว่าต้องการอะไร ใช้คำสั่งที่ชัด', warning: 'ไม่มีข้อควรระวังพิเศษ' },
        veryLow: { type: 'Surprise Lover', emoji: '🎁', tagline: 'น้องหมาที่ทุกอย่างเป็นเซอร์ไพรส์!', traits: ['ไม่คาดเดา', 'ตื่นเต้นทุกครั้ง', 'สดใหม่เสมอ'], rarity: 'ไม่ค่อยพบ — 12%', advice: 'ทุกอย่างเป็นเซอร์ไพรส์สำหรับน้อง สนุกกับมัน!', warning: 'ไม่มีข้อควรระวังพิเศษ' }
      },
      8: {
        high: { type: 'Master Communicator', emoji: '📢', tagline: 'น้องหมาปรมาจารย์การสื่อสาร!', traits: ['สื่อสารชัดเจน', 'หลายวิธี', 'เข้าใจง่าย', 'บอกความต้องการได้'], rarity: 'หายาก — 12%', advice: 'ตอบสนองการสื่อสารของน้องเพื่อเสริม bond', warning: 'น้องอาจส่งเสียงเยอะหรือเรียกร้องความสนใจมาก' },
        medium: { type: 'Expressive', emoji: '🎭', tagline: 'น้องหมาที่บอกความต้องการได้ชัดเจน', traits: ['แสดงออก', 'บอกได้', 'ชัดเจน'], rarity: 'พบได้บ่อย — 45%', advice: 'เรียนรู้ภาษากายของน้องให้มากขึ้น', warning: 'ไม่มีข้อควรระวังพิเศษ' },
        low: { type: 'Silent Type', emoji: '🤫', tagline: 'น้องหมาที่ไม่ค่อยส่งเสียง', traits: ['เงียบ', 'ไม่ค่อยเห่า', 'สงบ'], rarity: 'พบได้ทั่วไป — 35%', advice: 'สังเกตภาษากายแทนเสียง น้องอาจสื่อสารด้วยตาหรือหาง', warning: 'ไม่มีข้อควรระวังพิเศษ' },
        veryLow: { type: 'Mystery Dog', emoji: '🎭', tagline: 'น้องหมาลึกลับที่อ่านยาก', traits: ['ไม่แสดงออก', 'เงียบมาก', 'ปริศนา'], rarity: 'ไม่ค่อยพบ — 8%', advice: 'ต้องสังเกตละเอียดมากๆ น้องอาจสื่อสารในแบบที่แตกต่าง', warning: 'อย่าละเลย อาจมีปัญหาที่ไม่แสดงออก' }
      },
      9: {
        high: { type: 'Fearless Hero', emoji: '🦸', tagline: 'น้องหมาฮีโร่ไร้กลัว!', traits: ['กล้าหาญมาก', 'ไม่กลัวอะไร', 'มั่นใจ', 'Brave'], rarity: 'หายาก — 15%', advice: 'น้องกล้าหาญมาก แต่ระวังไม่ให้บุ่มบ่ามจนอันตราย', warning: 'น้องอาจเผชิญหน้ากับอันตรายโดยไม่กลัว ต้องระวัง' },
        medium: { type: 'Balanced Brave', emoji: '⚖️', tagline: 'น้องหมาที่มีความกลัวในระดับปกติ', traits: ['กลัวบ้างตามสมควร', 'ปกติ', 'ปรับตัวได้'], rarity: 'พบได้บ่อยมาก — 50%', advice: 'น้องมีระดับความกลัวที่ปกติและสุขภาพดี', warning: 'ไม่มีข้อควรระวังพิเศษ' },
        low: { type: 'Sensitive Soul', emoji: '🌸', tagline: 'น้องหมาที่รู้สึกไวกว่าปกติ', traits: ['ไวต่อสิ่งเร้า', 'กลัวง่าย', 'ต้องการความมั่นใจ'], rarity: 'พบได้ทั่วไป — 25%', advice: 'ค่อยๆ ให้น้องเผชิญสิ่งที่กลัว อย่าบังคับ ใช้ positive reinforcement', warning: 'หลีกเลี่ยงการตะโกนหรือลงโทษ' },
        veryLow: { type: 'Anxious Angel', emoji: '😰', tagline: 'น้องหมาที่ต้องการการดูแลพิเศษ', traits: ['กลัวมาก', 'วิตกกังวล', 'ต้องการความปลอดภัย'], rarity: 'ไม่ค่อยพบ — 10%', advice: 'ปรึกษาสัตวแพทย์หรือนักพฤติกรรมสัตว์', warning: 'อาจต้องการการรักษาด้วยยาหรือ behavioral therapy' }
      },
      10: {
        high: { type: 'Independent', emoji: '🦅', tagline: 'น้องหมาอินดี้อิสระที่อยู่คนเดียวได้สบาย', traits: ['อยู่คนเดียวได้', 'ไม่ติดเจ้าของ', 'มั่นใจ', 'Self-sufficient'], rarity: 'หายาก — 15%', advice: 'น้องอยู่คนเดียวได้ดี ไม่ต้องกังวลเรื่อง separation anxiety', warning: 'ไม่มีข้อควรระวังพิเศษ' },
        medium: { type: 'Adaptable', emoji: '🔄', tagline: 'น้องหมาที่ปรับตัวได้ทั้งสองแบบ', traits: ['ปรับตัวได้', 'อยู่ได้ทั้งสองแบบ', 'ยืดหยุ่น'], rarity: 'พบได้บ่อย — 40%', advice: 'ฝึกให้น้องอยู่คนเดียวทีละนิดเพื่อเพิ่มความมั่นใจ', warning: 'ไม่มีข้อควรระวังพิเศษ' },
        low: { type: 'Velcro Dog', emoji: '🤗', tagline: 'น้องหมาที่ติดเจ้าของเหมือนตีนตุ๊กแก', traits: ['ติดเจ้าของมาก', 'ต้องอยู่ด้วยตลอด', 'กลัวอยู่คนเดียว'], rarity: 'พบได้ทั่วไป — 35%', advice: 'ฝึกให้น้องอยู่คนเดียวทีละนิด เริ่มจากไม่กี่นาทีแล้วค่อยๆ เพิ่ม', warning: 'อาจมี Separation Anxiety เบาๆ' },
        veryLow: { type: 'Shadow', emoji: '🥺', tagline: 'น้องหมาที่ต้องอยู่กับคุณตลอดเวลา', traits: ['ติดมากที่สุด', 'วิตกกังวลสูง', 'ต้องอยู่ด้วยเสมอ'], rarity: 'ไม่ค่อยพบ — 10%', advice: 'ปรึกษานักพฤติกรรมสัตว์ อาจต้องการ desensitization training', warning: 'Separation Anxiety รุนแรง ต้องได้รับการดูแล' }
      },
      11: {
        high: { type: 'Alpha Leader', emoji: '👑', tagline: 'น้องหมาผู้นำฝูงที่เกิดมาเพื่อปกครอง', traits: ['เป็นผู้นำโดยธรรมชาติ', 'มั่นใจ', 'ปกป้อง', 'Dominant'], rarity: 'หายาก — 12%', advice: 'ฝึกให้น้องเคารพคุณในฐานะผู้นำตัวจริง ใช้ positive leadership', warning: 'ต้องฝึกอย่างสม่ำเสมอเพื่อไม่ให้ก้าวร้าวกับหมาตัวอื่น' },
        medium: { type: 'Team Player', emoji: '🤝', tagline: 'น้องหมาผู้เล่นทีมที่เข้ากับทุกคนได้', traits: ['เข้าฝูงได้ดี', 'ร่วมมือ', 'ไม่แย่งชิง'], rarity: 'พบได้บ่อยมาก — 50%', advice: 'น้องเข้ากับหมาตัวอื่นได้ดี เหมาะกับบ้านที่มีหลายตัว', warning: 'ไม่มีข้อควรระวังพิเศษ' },
        low: { type: 'Happy Follower', emoji: '🐾', tagline: 'น้องหมาผู้ตามที่มีความสุข', traits: ['ยอมตาม', 'ไม่แย่ง', 'สบายๆ', 'Submissive'], rarity: 'พบได้ทั่วไป — 30%', advice: 'น้องเป็นหมาที่ easy going ในกลุ่ม', warning: 'ระวังไม่ให้ถูกรังแกจากหมาตัวอื่น' },
        veryLow: { type: 'Lone Wolf', emoji: '🐺', tagline: 'น้องหมาป่าเดียวดายที่ชอบอยู่คนเดียว', traits: ['ชอบอยู่คนเดียว', 'ไม่เข้าฝูง', 'อิสระ'], rarity: 'ไม่ค่อยพบ — 8%', advice: 'น้องอาจไม่เหมาะกับบ้านที่มีหมาหลายตัว', warning: 'อาจก้าวร้าวกับหมาตัวอื่น ต้องระวัง' }
      },
      12: {
        high: { type: 'Wild Heart', emoji: '🐺', tagline: 'น้องหมาหัวใจป่าที่มี DNA หมาป่า', traits: ['สัญชาตญาณสูงมาก', 'ชอบธรรมชาติ', 'มีความเป็นหมาป่า', 'Primal'], rarity: 'หายาก — 12%', advice: 'ให้น้องได้สัมผัสธรรมชาติบ่อยๆ ไปเดินป่า ดมกลิ่นดิน', warning: 'น้องอาจไล่สัตว์เล็ก ต้องระวังเวลาปล่อย' },
        medium: { type: 'Nature Lover', emoji: '🌳', tagline: 'น้องหมาที่ชอบอยู่กับธรรมชาติ', traits: ['ชอบข้างนอก', 'ดมกลิ่น', 'สำรวจ'], rarity: 'พบได้บ่อย — 40%', advice: 'พาน้องไปเดินเล่นในที่ธรรมชาติบ้าง', warning: 'ไม่มีข้อควรระวังพิเศษ' },
        low: { type: 'City Dog', emoji: '🏙️', tagline: 'น้องหมาเมืองที่ปรับตัวกับชีวิตในเมืองได้ดี', traits: ['ชินกับเมือง', 'ไม่ต้องการธรรมชาติมาก', 'สบายในบ้าน'], rarity: 'พบได้ทั่วไป — 38%', advice: 'น้องเป็นหมาบ้านที่แฮปปี้ ไม่ต้องออกไปป่า', warning: 'ไม่มีข้อควรระวังพิเศษ' },
        veryLow: { type: 'Couch Companion', emoji: '🛋️', tagline: 'น้องหมาที่บ้านคือสวรรค์', traits: ['ชอบอยู่บ้าน', 'ไม่ค่อยออก', 'สบายๆ'], rarity: 'ไม่ค่อยพบ — 10%', advice: 'น้องเป็นหมาบ้าน 100% ไม่ต้องฝืนพาไปไหนไกล', warning: 'กระตุ้นให้ออกกำลังกายบ้างเพื่อสุขภาพ' }
      }
    };

    const topic = personalities[topicId] || personalities[1];
    if (score >= 75) return topic.high;
    if (score >= 50) return topic.medium;
    if (score >= 25) return topic.low;
    return topic.veryLow;
  };

  // ===== HELPER FUNCTIONS =====
  const isTopicCompleted = (topicId) => !!completedTopics[topicId];
  const isTopicUnlocked = () => true; // Test mode
  
  const getScore = () => {
    if (viewingResult) return completedTopics[viewingResult.id]?.score || 0;
    if (answers.length === 0) return 0;
    const sum = answers.reduce((a, b) => a + b, 0);
    return Math.round(sum / answers.length);
  };

  const handleAnswer = (value) => {
    const newAnswers = [...answers, value];
    setAnswers(newAnswers);
    setSliderValue(50);
    setHoldProgress(0);
    
    const questions = topicQuestions[currentTopic.id];
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setLeadStep(0);
      setShowLeadGate(true);
    }
  };

  const submitLead = () => {
    setShowLeadGate(false);
    const score = getScore();
    const finalBreed = selectedBreed === 'อื่นๆ (กรอกเอง)' ? customBreed : selectedBreed;
    setLeadInfo({...leadInfo, breed: finalBreed});
    setCompletedTopics({
      ...completedTopics,
      [currentTopic.id]: { score, answers: [...answers], completedAt: new Date() }
    });
    setScreen('result');
    setRevealStep(0);
    [1, 2, 3, 4, 5, 6].forEach((step, i) => {
      setTimeout(() => setRevealStep(step), (i + 1) * 400);
    });
  };

  // ===== STYLES =====
  const styles = {
    container: { minHeight: '100vh', background: 'linear-gradient(180deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)', fontFamily: "'Prompt', sans-serif", position: 'relative', overflow: 'hidden' },
    content: { position: 'relative', zIndex: 1, maxWidth: 420, margin: '0 auto', padding: '20px 16px', minHeight: '100vh' },
    card: { background: 'rgba(255,255,255,0.95)', borderRadius: 24, padding: 24, boxShadow: '0 20px 60px rgba(0,0,0,0.3)' },
    darkCard: { background: 'rgba(255,255,255,0.08)', borderRadius: 20, padding: 20, border: '1px solid rgba(255,255,255,0.1)' },
    btn: { width: '100%', padding: '18px 24px', borderRadius: 16, border: 'none', fontSize: 17, fontWeight: 700, cursor: 'pointer', transition: 'all 0.3s ease', fontFamily: 'inherit' },
    btnPrimary: { background: 'linear-gradient(135deg, #FF6B6B 0%, #FF8E53 50%, #FFC107 100%)', color: 'white', boxShadow: '0 8px 30px rgba(255,107,107,0.5)' },
    btnGhost: { background: 'transparent', color: 'white', border: '2px solid rgba(255,255,255,0.3)' },
    input: { width: '100%', padding: '16px 20px', borderRadius: 14, border: '2px solid #E8E8E8', fontSize: 16, outline: 'none', background: '#F8F9FA', color: '#333', fontFamily: 'inherit', boxSizing: 'border-box' },
    modal: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20, zIndex: 100 },
    glowOrb: { position: 'absolute', borderRadius: '50%', filter: 'blur(60px)', opacity: 0.4, pointerEvents: 'none' }
  };

  // ===== DNA HELIX COMPONENT =====
  const DNAHelix = () => {
    const completedCount = Object.keys(completedTopics).length;
    
    return (
      <div style={{ padding: '10px 0' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 20 }}>
          <div style={{ fontSize: 40, marginBottom: 8 }}>🧬</div>
          <h2 style={{ fontSize: 20, fontWeight: 800, color: 'white', marginBottom: 4 }}>
            {leadInfo.dogName || 'น้องหมา'}'s DNA Helix
          </h2>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)' }}>
            ปลดล็อก {completedCount}/12 DNA Segments
          </p>
          {/* Progress Bar */}
          <div style={{ height: 8, background: 'rgba(255,255,255,0.1)', borderRadius: 4, marginTop: 12, overflow: 'hidden' }}>
            <div style={{ width: `${(completedCount / 12) * 100}%`, height: '100%', background: 'linear-gradient(90deg, #FF6B6B, #FFD93D, #4ECDC4)', borderRadius: 4, transition: 'width 0.5s ease' }} />
          </div>
        </div>

        {/* DNA Helix Visualization */}
        <div style={{ position: 'relative', padding: '0 20px' }}>
          {/* Center DNA Strand */}
          <div style={{
            position: 'absolute',
            left: '50%',
            top: 0,
            bottom: 0,
            width: 6,
            background: 'linear-gradient(180deg, #FF6B6B 0%, #FF8E53 16%, #F39C12 33%, #2ECC71 50%, #3498DB 66%, #9B59B6 83%, #27AE60 100%)',
            borderRadius: 3,
            transform: 'translateX(-50%)',
            boxShadow: '0 0 20px rgba(255,107,107,0.3)'
          }} />

          {/* DNA Segments */}
          {allTopics.map((topic, index) => {
            const isCompleted = isTopicCompleted(topic.id);
            const isLeft = index % 2 === 0;
            const result = completedTopics[topic.id];
            
            return (
              <div
                key={topic.id}
                onClick={() => {
                  setSelectedBadge(topic);
                  setShowBadgeModal(true);
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: isLeft ? 'flex-start' : 'flex-end',
                  marginBottom: 12,
                  cursor: 'pointer',
                  position: 'relative'
                }}
              >
                {/* Connection Line */}
                <div style={{
                  position: 'absolute',
                  left: isLeft ? '50%' : 'auto',
                  right: isLeft ? 'auto' : '50%',
                  width: 50,
                  height: 4,
                  background: isCompleted 
                    ? `linear-gradient(${isLeft ? '90deg' : '270deg'}, ${topic.color}, ${topic.color}00)`
                    : 'rgba(255,255,255,0.15)',
                  borderRadius: 2
                }} />

                {/* Segment Card */}
                <div style={{
                  width: '42%',
                  padding: '14px 12px',
                  borderRadius: 16,
                  background: isCompleted 
                    ? `linear-gradient(135deg, ${topic.color}DD, ${topic.color}99)` 
                    : 'rgba(255,255,255,0.06)',
                  border: `2px solid ${isCompleted ? topic.color : 'rgba(255,255,255,0.15)'}`,
                  boxShadow: isCompleted ? `0 4px 20px ${topic.color}44` : 'none',
                  marginLeft: isLeft ? 0 : 'auto',
                  marginRight: isLeft ? 'auto' : 0,
                  textAlign: 'center',
                  transition: 'all 0.3s ease'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 6 }}>
                    <span style={{ fontSize: 22 }}>{isCompleted ? '✅' : topic.emoji}</span>
                    <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)' }}>{topic.dimensionEmoji}</span>
                  </div>
                  <div style={{ 
                    fontSize: 11, 
                    fontWeight: 700, 
                    color: 'white',
                    marginBottom: 4
                  }}>
                    {topic.name}
                  </div>
                  {isCompleted && result ? (
                    <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.9)', fontWeight: 600 }}>
                      {result.score}% • {getPersonality(result.score, topic.id).type}
                    </div>
                  ) : (
                    <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)' }}>
                      แตะเพื่อทดสอบ →
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Summary Stats */}
        {completedCount > 0 && (
          <div style={{ ...styles.darkCard, marginTop: 20, textAlign: 'center' }}>
            <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', marginBottom: 8 }}>🏆 DNA ที่ค้นพบแล้ว</div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 8, flexWrap: 'wrap' }}>
              {Object.keys(completedTopics).map(id => {
                const topic = allTopics.find(t => t.id === parseInt(id));
                return (
                  <span key={id} style={{ 
                    padding: '4px 10px', 
                    background: topic.color, 
                    borderRadius: 12, 
                    fontSize: 11, 
                    color: 'white',
                    fontWeight: 600
                  }}>
                    {topic.emoji} {topic.name}
                  </span>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  };

  // ===== QUESTION RENDERER =====
  const renderQuestion = () => {
    const questions = topicQuestions[currentTopic.id];
    const q = questions[currentQuestion];
    
    // ========== YES/NO ==========
    if (q.type === 'yesno') {
      return (
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 56, marginBottom: 16 }}>{q.emoji}</div>
          <h3 style={{ fontSize: 17, color: 'white', marginBottom: 28, lineHeight: 1.6 }}>{q.q}</h3>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center' }}>
            <button onClick={() => handleAnswer(0)} style={{
              width: 90, height: 90, borderRadius: '50%', border: 'none',
              background: 'linear-gradient(135deg, #FFE5E5, #FFCCCC)',
              fontSize: 36, cursor: 'pointer', boxShadow: '0 8px 25px rgba(255,100,100,0.3)',
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>😅</button>
            <button onClick={() => handleAnswer(100)} style={{
              width: 90, height: 90, borderRadius: '50%', border: 'none',
              background: 'linear-gradient(135deg, #E5FFE5, #CCFFCC)',
              fontSize: 36, cursor: 'pointer', boxShadow: '0 8px 25px rgba(100,200,100,0.3)',
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>😍</button>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 12, padding: '0 30px', color: 'rgba(255,255,255,0.5)', fontSize: 12 }}>
            <span>ไม่เลย</span>
            <span>ใช่เลย!</span>
          </div>
        </div>
      );
    }

    // ========== RATING (5 Stars) ==========
    if (q.type === 'rating') {
      return (
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 56, marginBottom: 16 }}>{q.emoji}</div>
          <h3 style={{ fontSize: 17, color: 'white', marginBottom: 24 }}>{q.q}</h3>
          <div style={{ display: 'flex', gap: 10, justifyContent: 'center', marginBottom: 16 }}>
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => handleAnswer(star * 20)}
                style={{
                  width: 54, height: 54, borderRadius: 14, border: 'none',
                  background: 'rgba(255,255,255,0.1)',
                  fontSize: 28, cursor: 'pointer', transition: 'all 0.2s',
                  display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}
                onMouseEnter={(e) => e.target.style.transform = 'scale(1.2)'}
                onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
              >⭐</button>
            ))}
          </div>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12 }}>แตะดาวเพื่อให้คะแนน 1-5</p>
        </div>
      );
    }

    // ========== SLIDER ==========
    if (q.type === 'slider' || q.type === 'food_slider') {
      const min = q.min || 0;
      const max = q.max || 100;
      const unit = q.unit || '';
      const labels = q.labels || [min.toString(), max.toString()];
      const actualValue = Math.round((sliderValue / 100) * (max - min) + min);
      
      return (
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 56, marginBottom: 16 }}>{q.emoji}</div>
          <h3 style={{ fontSize: 17, color: 'white', marginBottom: 20 }}>{q.q}</h3>
          
          <div style={{ 
            fontSize: 48, fontWeight: 800, 
            background: `linear-gradient(135deg, ${currentTopic.color}, #FFD93D)`,
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            marginBottom: 16
          }}>
            {actualValue}{unit && ` ${unit}`}
          </div>

          <input
            type="range"
            min="0"
            max="100"
            value={sliderValue}
            onChange={(e) => setSliderValue(Number(e.target.value))}
            style={{
              width: '100%',
              height: 12,
              borderRadius: 6,
              background: `linear-gradient(90deg, ${currentTopic.color} ${sliderValue}%, rgba(255,255,255,0.15) ${sliderValue}%)`,
              appearance: 'none',
              cursor: 'pointer',
              marginBottom: 8
            }}
          />

          <div style={{ display: 'flex', justifyContent: 'space-between', color: 'rgba(255,255,255,0.5)', fontSize: 11, marginBottom: 20 }}>
            <span>{labels[0]}</span>
            <span>{labels[1]}</span>
          </div>

          <button onClick={() => handleAnswer(sliderValue)} style={{ ...styles.btn, ...styles.btnPrimary, maxWidth: 200, margin: '0 auto' }}>
            ยืนยัน ✓
          </button>
        </div>
      );
    }

    // ========== SCENARIO CARDS ==========
    if (q.type === 'scenario') {
      return (
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 56, marginBottom: 12 }}>{q.emoji}</div>
          <h3 style={{ fontSize: 17, color: 'white', marginBottom: 20, lineHeight: 1.5 }}>{q.q}</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {q.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleAnswer(option.score)}
                style={{
                  padding: '14px 16px',
                  borderRadius: 14,
                  border: '2px solid rgba(255,255,255,0.15)',
                  background: 'rgba(255,255,255,0.06)',
                  color: 'white',
                  fontSize: 14,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10
                }}
              >
                <span style={{ fontSize: 24 }}>{option.emoji}</span>
                <span>{option.text}</span>
              </button>
            ))}
          </div>
        </div>
      );
    }

    // ========== PREDICTION GAME ==========
    if (q.type === 'prediction') {
      return (
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 64, marginBottom: 16, animation: 'pulse 2s infinite' }}>{q.emoji}</div>
          <h3 style={{ fontSize: 17, color: 'white', marginBottom: 24, lineHeight: 1.5 }}>{q.q}</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {q.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleAnswer(idx === 0 ? 0 : idx === 1 ? 50 : 100)}
                style={{
                  padding: '16px',
                  borderRadius: 14,
                  border: '2px solid rgba(255,255,255,0.15)',
                  background: idx === 2 ? `${currentTopic.color}33` : 'rgba(255,255,255,0.06)',
                  color: 'white',
                  fontSize: 15,
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      );
    }

    // ========== TOY PICKER / VISUAL ==========
    if (q.type === 'toy_picker') {
      return (
        <div style={{ textAlign: 'center' }}>
          <h3 style={{ fontSize: 17, color: 'white', marginBottom: 20, lineHeight: 1.5 }}>{q.q}</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {q.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleAnswer(75)}
                style={{
                  padding: 20,
                  borderRadius: 18,
                  border: '2px solid rgba(255,255,255,0.15)',
                  background: 'rgba(255,255,255,0.06)',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                <div style={{ fontSize: 40, marginBottom: 8 }}>{option.emoji}</div>
                <div style={{ color: 'white', fontSize: 13, fontWeight: 500 }}>{option.label}</div>
              </button>
            ))}
          </div>
        </div>
      );
    }

    // ========== PUZZLE CUPS ==========
    if (q.type === 'puzzle_cups') {
      return (
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 56, marginBottom: 16 }}>{q.emoji}</div>
          <h3 style={{ fontSize: 16, color: 'white', marginBottom: 20, lineHeight: 1.5 }}>{q.q}</h3>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginBottom: 24 }}>
            {['🥤', '🥤', '🥤'].map((cup, idx) => (
              <div key={idx} style={{
                width: 60, height: 75, fontSize: 44,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: 'rgba(255,255,255,0.1)', borderRadius: 14,
                animation: `shake ${0.5 + idx * 0.2}s ease-in-out infinite`
              }}>{cup}</div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
            <button onClick={() => handleAnswer(0)} style={{ ...styles.btn, ...styles.btnGhost, flex: 1, maxWidth: 140 }}>😅 ไม่เจอ</button>
            <button onClick={() => handleAnswer(50)} style={{ ...styles.btn, background: 'rgba(255,255,255,0.15)', color: 'white', flex: 1, maxWidth: 140 }}>🤔 บางที</button>
            <button onClick={() => handleAnswer(100)} style={{ ...styles.btn, ...styles.btnPrimary, flex: 1, maxWidth: 140 }}>🎉 เจอทุกที!</button>
          </div>
        </div>
      );
    }

    // ========== PUZZLE DOOR ==========
    if (q.type === 'puzzle_door') {
      return (
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 56, marginBottom: 16 }}>{q.emoji}</div>
          <h3 style={{ fontSize: 16, color: 'white', marginBottom: 24, lineHeight: 1.5 }}>{q.q}</h3>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
            <button onClick={() => handleAnswer(0)} style={{ ...styles.btn, ...styles.btnGhost, flex: 1, maxWidth: 150 }}>🚪 เปิดไม่ได้</button>
            <button onClick={() => handleAnswer(100)} style={{ ...styles.btn, ...styles.btnPrimary, flex: 1, maxWidth: 150 }}>🔓 เปิดเองได้!</button>
          </div>
        </div>
      );
    }

    // ========== CRYSTAL BALL ==========
    if (q.type === 'crystal') {
      return (
        <div style={{ textAlign: 'center' }}>
          <div style={{ 
            fontSize: 72, marginBottom: 16,
            filter: 'drop-shadow(0 0 30px rgba(155,89,182,0.6))',
            animation: 'pulse 2s ease-in-out infinite'
          }}>🔮</div>
          <h3 style={{ fontSize: 16, color: 'white', marginBottom: 28, fontStyle: 'italic', lineHeight: 1.5 }}>{q.q}</h3>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center' }}>
            <button onClick={() => handleAnswer(0)} style={{
              padding: '16px 28px', borderRadius: 18, border: 'none',
              background: 'rgba(255,255,255,0.1)', color: 'white', fontSize: 15, cursor: 'pointer'
            }}>❌ ไม่รู้เลย</button>
            <button onClick={() => handleAnswer(50)} style={{
              padding: '16px 28px', borderRadius: 18, border: 'none',
              background: 'rgba(155,89,182,0.3)', color: 'white', fontSize: 15, cursor: 'pointer'
            }}>🤔 บางครั้ง</button>
            <button onClick={() => handleAnswer(100)} style={{
              padding: '16px 28px', borderRadius: 18, border: 'none',
              background: 'linear-gradient(135deg, #9B59B6, #8E44AD)', color: 'white', fontSize: 15, cursor: 'pointer'
            }}>✨ รู้ก่อน!</button>
          </div>
        </div>
      );
    }

    // ========== SOUND COUNTER ==========
    if (q.type === 'sound_counter') {
      const count = Math.round((sliderValue / 100) * (q.max - q.min) + q.min);
      return (
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 56, marginBottom: 16 }}>{q.emoji}</div>
          <h3 style={{ fontSize: 17, color: 'white', marginBottom: 20 }}>{q.q}</h3>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 20, marginBottom: 20 }}>
            <button onClick={() => setSliderValue(Math.max(0, sliderValue - 10))} style={{
              width: 50, height: 50, borderRadius: '50%', border: 'none',
              background: 'rgba(255,255,255,0.15)', color: 'white', fontSize: 24, cursor: 'pointer'
            }}>-</button>
            <div style={{ fontSize: 56, fontWeight: 800, color: currentTopic.color, minWidth: 80 }}>{count}</div>
            <button onClick={() => setSliderValue(Math.min(100, sliderValue + 10))} style={{
              width: 50, height: 50, borderRadius: '50%', border: 'none',
              background: 'rgba(255,255,255,0.15)', color: 'white', fontSize: 24, cursor: 'pointer'
            }}>+</button>
          </div>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12, marginBottom: 20 }}>แบบ</p>
          <button onClick={() => handleAnswer(sliderValue)} style={{ ...styles.btn, ...styles.btnPrimary, maxWidth: 180, margin: '0 auto' }}>
            ยืนยัน ✓
          </button>
        </div>
      );
    }

    // ========== SOUND PICKER ==========
    if (q.type === 'sound_picker') {
      return (
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 56, marginBottom: 12 }}>{q.emoji}</div>
          <h3 style={{ fontSize: 16, color: 'white', marginBottom: 20, lineHeight: 1.5 }}>{q.q}</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {q.options.map((option, idx) => (
              <button key={idx} onClick={() => handleAnswer(option.score)} style={{
                padding: '14px 12px', borderRadius: 14,
                border: '2px solid rgba(255,255,255,0.15)',
                background: 'rgba(255,255,255,0.06)', color: 'white', fontSize: 13, cursor: 'pointer'
              }}>
                <span style={{ fontSize: 24, display: 'block', marginBottom: 6 }}>{option.emoji}</span>
                {option.label}
              </button>
            ))}
          </div>
        </div>
      );
    }

    // ========== FEAR METER ==========
    if (q.type === 'fear_meter') {
      const fearLevels = [
        { emoji: '😴', label: 'ไม่กลัวเลย', score: 100 },
        { emoji: '😊', label: 'กลัวนิดหน่อย', score: 75 },
        { emoji: '😰', label: 'กลัวปานกลาง', score: 50 },
        { emoji: '😱', label: 'กลัวมาก', score: 25 },
        { emoji: '🙀', label: 'กลัวสุดๆ!', score: 0 }
      ];
      return (
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 56, marginBottom: 12 }}>{q.emoji}</div>
          <h3 style={{ fontSize: 16, color: 'white', marginBottom: 8 }}>{q.q}</h3>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', marginBottom: 20 }}>น้องกลัว{q.thing}แค่ไหน?</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {fearLevels.map((level, idx) => (
              <button key={idx} onClick={() => handleAnswer(level.score)} style={{
                padding: '14px 16px', borderRadius: 12,
                border: '2px solid rgba(255,255,255,0.15)',
                background: idx === 0 ? 'rgba(46,204,113,0.2)' : idx === 4 ? 'rgba(231,76,60,0.2)' : 'rgba(255,255,255,0.06)',
                color: 'white', fontSize: 14, cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: 12
              }}>
                <span style={{ fontSize: 24 }}>{level.emoji}</span>
                <span>{level.label}</span>
              </button>
            ))}
          </div>
        </div>
      );
    }

    // ========== TIME ALONE ==========
    if (q.type === 'time_alone') {
      const hours = Math.round((sliderValue / 100) * q.max);
      return (
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 56, marginBottom: 16 }}>{q.emoji}</div>
          <h3 style={{ fontSize: 16, color: 'white', marginBottom: 20, lineHeight: 1.5 }}>{q.q}</h3>
          <div style={{ 
            fontSize: 56, fontWeight: 800, 
            background: `linear-gradient(135deg, ${currentTopic.color}, #FFD93D)`,
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            marginBottom: 12
          }}>
            {hours} ชม.
          </div>
          <input type="range" min="0" max="100" value={sliderValue}
            onChange={(e) => setSliderValue(Number(e.target.value))}
            style={{
              width: '100%', height: 12, borderRadius: 6,
              background: `linear-gradient(90deg, ${currentTopic.color} ${sliderValue}%, rgba(255,255,255,0.15) ${sliderValue}%)`,
              appearance: 'none', cursor: 'pointer', marginBottom: 8
            }}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', color: 'rgba(255,255,255,0.5)', fontSize: 11, marginBottom: 20 }}>
            <span>0 ชม.</span>
            <span>12+ ชม.</span>
          </div>
          <button onClick={() => handleAnswer(sliderValue)} style={{ ...styles.btn, ...styles.btnPrimary, maxWidth: 200, margin: '0 auto' }}>
            ยืนยัน ✓
          </button>
        </div>
      );
    }

    // ========== FOLLOW METER ==========
    if (q.type === 'follow_meter') {
      const levels = [
        { emoji: '🦅', label: 'ไม่ตามเลย อยู่ที่เดิม', score: 100 },
        { emoji: '🐕', label: 'ตามบางครั้ง', score: 75 },
        { emoji: '🐾', label: 'ตามบ่อย', score: 50 },
        { emoji: '👣', label: 'ตามตลอดเวลา', score: 25 },
        { emoji: '🥺', label: 'ติดแบบเงาตามตัว!', score: 0 }
      ];
      return (
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 56, marginBottom: 12 }}>{q.emoji}</div>
          <h3 style={{ fontSize: 16, color: 'white', marginBottom: 20, lineHeight: 1.5 }}>{q.q}</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {levels.map((level, idx) => (
              <button key={idx} onClick={() => handleAnswer(level.score)} style={{
                padding: '14px 16px', borderRadius: 12,
                border: '2px solid rgba(255,255,255,0.15)',
                background: 'rgba(255,255,255,0.06)', color: 'white', fontSize: 14, cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: 12
              }}>
                <span style={{ fontSize: 24 }}>{level.emoji}</span>
                <span>{level.label}</span>
              </button>
            ))}
          </div>
        </div>
      );
    }

    // ========== PACK POSITION ==========
    if (q.type === 'pack_position') {
      return (
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 56, marginBottom: 12 }}>{q.emoji}</div>
          <h3 style={{ fontSize: 17, color: 'white', marginBottom: 20, lineHeight: 1.5 }}>{q.q}</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {q.options.map((option, idx) => (
              <button key={idx} onClick={() => handleAnswer(option.score)} style={{
                padding: '16px', borderRadius: 14,
                border: '2px solid rgba(255,255,255,0.15)',
                background: idx === 0 ? 'rgba(255,215,0,0.15)' : 'rgba(255,255,255,0.06)',
                color: 'white', fontSize: 15, cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: 12
              }}>
                <span style={{ fontSize: 28 }}>{option.emoji}</span>
                <span>{option.label}</span>
              </button>
            ))}
          </div>
        </div>
      );
    }

    // ========== GUARD METER ==========
    if (q.type === 'guard_meter') {
      const levels = [
        { emoji: '😇', label: 'ไม่หวงเลย แบ่งปันได้', score: 100 },
        { emoji: '🐕', label: 'หวงนิดหน่อย', score: 75 },
        { emoji: '😠', label: 'หวงปานกลาง', score: 50 },
        { emoji: '🦴', label: 'หวงมาก', score: 25 },
        { emoji: '😤', label: 'หวงมากที่สุด!', score: 0 }
      ];
      return (
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 56, marginBottom: 12 }}>{q.emoji}</div>
          <h3 style={{ fontSize: 16, color: 'white', marginBottom: 20, lineHeight: 1.5 }}>{q.q}</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {levels.map((level, idx) => (
              <button key={idx} onClick={() => handleAnswer(level.score)} style={{
                padding: '14px 16px', borderRadius: 12,
                border: '2px solid rgba(255,255,255,0.15)',
                background: 'rgba(255,255,255,0.06)', color: 'white', fontSize: 14, cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: 12
              }}>
                <span style={{ fontSize: 24 }}>{level.emoji}</span>
                <span>{level.label}</span>
              </button>
            ))}
          </div>
        </div>
      );
    }

    // ========== VERSUS ==========
    if (q.type === 'versus') {
      return (
        <div style={{ textAlign: 'center' }}>
          <h3 style={{ fontSize: 17, color: 'white', marginBottom: 24, lineHeight: 1.5 }}>{q.q}</h3>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', alignItems: 'center' }}>
            <button onClick={() => handleAnswer(25)} style={{
              flex: 1, padding: 24, borderRadius: 20,
              border: '2px solid rgba(255,255,255,0.2)',
              background: 'rgba(255,255,255,0.08)', cursor: 'pointer'
            }}>
              <div style={{ fontSize: 44, marginBottom: 8 }}>{q.optionA.emoji}</div>
              <div style={{ color: 'white', fontSize: 13 }}>{q.optionA.label}</div>
            </button>
            <div style={{ fontSize: 20, color: 'rgba(255,255,255,0.4)', fontWeight: 800 }}>VS</div>
            <button onClick={() => handleAnswer(75)} style={{
              flex: 1, padding: 24, borderRadius: 20,
              border: '2px solid rgba(255,255,255,0.2)',
              background: 'rgba(255,255,255,0.08)', cursor: 'pointer'
            }}>
              <div style={{ fontSize: 44, marginBottom: 8 }}>{q.optionB.emoji}</div>
              <div style={{ color: 'white', fontSize: 13 }}>{q.optionB.label}</div>
            </button>
          </div>
        </div>
      );
    }

    // ========== HOLD TIMER ==========
    if (q.type === 'hold') {
      return (
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 56, marginBottom: 12 }}>{q.emoji}</div>
          <h3 style={{ fontSize: 16, color: 'white', marginBottom: 8, lineHeight: 1.5 }}>{q.q}</h3>
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', marginBottom: 20 }}>{q.instruction}</p>
          
          <div style={{
            width: 140, height: 140, borderRadius: '50%', margin: '0 auto 20px',
            background: `conic-gradient(${currentTopic.color} ${holdProgress * 3.6}deg, rgba(255,255,255,0.1) 0deg)`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: isHolding ? `0 0 40px ${currentTopic.color}66` : 'none',
            transition: 'box-shadow 0.3s ease'
          }}>
            <div style={{
              width: 110, height: 110, borderRadius: '50%',
              background: '#1a1a2e',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 32, fontWeight: 800, color: 'white'
            }}>
              {holdProgress}%
            </div>
          </div>
          
          <button
            onMouseDown={() => {
              setIsHolding(true);
              holdTimer.current = setInterval(() => {
                setHoldProgress(prev => prev >= 100 ? 100 : prev + 2);
              }, 50);
            }}
            onMouseUp={() => {
              setIsHolding(false);
              clearInterval(holdTimer.current);
              handleAnswer(holdProgress);
              setHoldProgress(0);
            }}
            onMouseLeave={() => {
              if (isHolding) {
                setIsHolding(false);
                clearInterval(holdTimer.current);
                handleAnswer(holdProgress);
                setHoldProgress(0);
              }
            }}
            onTouchStart={() => {
              setIsHolding(true);
              holdTimer.current = setInterval(() => {
                setHoldProgress(prev => prev >= 100 ? 100 : prev + 2);
              }, 50);
            }}
            onTouchEnd={() => {
              setIsHolding(false);
              clearInterval(holdTimer.current);
              handleAnswer(holdProgress);
              setHoldProgress(0);
            }}
            style={{
              ...styles.btn,
              background: isHolding ? `linear-gradient(135deg, ${currentTopic.color}, ${currentTopic.color}CC)` : 'rgba(255,255,255,0.1)',
              color: 'white',
              maxWidth: 250,
              margin: '0 auto'
            }}
          >
            {isHolding ? '🔥 กดค้างไว้...' : '👆 กดค้างเพื่อเริ่ม'}
          </button>
        </div>
      );
    }

    // ========== DEFAULT FALLBACK ==========
    return (
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: 56, marginBottom: 16 }}>{q.emoji}</div>
        <h3 style={{ fontSize: 17, color: 'white', marginBottom: 28, lineHeight: 1.5 }}>{q.q}</h3>
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center' }}>
          <button onClick={() => handleAnswer(0)} style={{ ...styles.btn, ...styles.btnGhost, flex: 1, maxWidth: 140 }}>😅 ไม่</button>
          <button onClick={() => handleAnswer(100)} style={{ ...styles.btn, ...styles.btnPrimary, flex: 1, maxWidth: 140 }}>😍 ใช่</button>
        </div>
      </div>
    );
  };

  // ===== LEAD GATE MODAL =====
  const LeadGateModal = () => {
    const goNextStep = () => {
      if (leadStep < 3) setLeadStep(leadStep + 1);
      else submitLead();
    };

    return (
      <div style={styles.modal}>
        <div style={{ ...styles.card, maxWidth: 380, width: '100%' }}>
          {/* Progress Dots */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginBottom: 24 }}>
            {[0, 1, 2, 3].map((step) => (
              <div key={step} style={{
                width: step === leadStep ? 24 : 8, height: 8, borderRadius: 4,
                background: step <= leadStep ? `linear-gradient(135deg, ${currentTopic.color}, #FFD93D)` : '#E0E0E0',
                transition: 'all 0.3s ease'
              }} />
            ))}
          </div>

          {/* Step 0: Dog Name */}
          {leadStep === 0 && (
            <div>
              <div style={{ textAlign: 'center', marginBottom: 24 }}>
                <div style={{ fontSize: 56, marginBottom: 12 }}>🐕</div>
                <h2 style={{ fontSize: 22, fontWeight: 800, color: '#333', marginBottom: 8 }}>น้องหมาชื่ออะไร?</h2>
                <p style={{ fontSize: 13, color: '#888' }}>บอกชื่อน้องเพื่อดูผล DNA Profile ส่วนตัว</p>
              </div>
              <input type="text" placeholder="พิมพ์ชื่อน้องหมา..." ref={dogNameRef} defaultValue={leadInfo.dogName}
                onBlur={(e) => setLeadInfo({...leadInfo, dogName: e.target.value})}
                onKeyPress={(e) => { if (e.key === 'Enter') { setLeadInfo({...leadInfo, dogName: e.target.value}); if (e.target.value.trim()) goNextStep(); }}}
                style={{ ...styles.input, fontSize: 18, textAlign: 'center', marginBottom: 20 }}
              />
              <button onClick={() => { const val = dogNameRef.current?.value || ''; setLeadInfo({...leadInfo, dogName: val}); if (val.trim()) goNextStep(); }}
                style={{ ...styles.btn, ...styles.btnPrimary }}>ถัดไป →</button>
            </div>
          )}

          {/* Step 1: Breed */}
          {leadStep === 1 && (
            <div>
              <div style={{ textAlign: 'center', marginBottom: 16 }}>
                <div style={{ fontSize: 56, marginBottom: 12 }}>🐾</div>
                <h2 style={{ fontSize: 22, fontWeight: 800, color: '#333', marginBottom: 8 }}>{leadInfo.dogName} เป็นพันธุ์อะไร?</h2>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8, maxHeight: selectedBreed === 'อื่นๆ (กรอกเอง)' ? 180 : 240, overflowY: 'auto', marginBottom: 12, padding: 4 }}>
                {dogBreeds.map((breed) => (
                  <button key={breed} onClick={() => { setSelectedBreed(breed); if (breed !== 'อื่นๆ (กรอกเอง)') setCustomBreed(''); }}
                    style={{
                      padding: '12px 10px', borderRadius: 12,
                      border: selectedBreed === breed ? `2px solid ${currentTopic.color}` : '2px solid #E8E8E8',
                      background: selectedBreed === breed ? `${currentTopic.color}15` : 'white',
                      fontSize: 12, fontWeight: selectedBreed === breed ? 600 : 400,
                      color: selectedBreed === breed ? currentTopic.color : '#555', cursor: 'pointer'
                    }}>{breed}</button>
                ))}
              </div>
              {selectedBreed === 'อื่นๆ (กรอกเอง)' && (
                <input type="text" placeholder="พิมพ์สายพันธุ์..." ref={customBreedRef} defaultValue={customBreed}
                  onBlur={(e) => setCustomBreed(e.target.value)}
                  style={{ ...styles.input, fontSize: 14, textAlign: 'center', marginBottom: 12 }}
                />
              )}
              <button onClick={() => {
                if (selectedBreed === 'อื่นๆ (กรอกเอง)') { const val = customBreedRef.current?.value || ''; setCustomBreed(val); if (val.trim()) goNextStep(); }
                else if (selectedBreed) goNextStep();
              }} style={{ ...styles.btn, ...styles.btnPrimary }}>ถัดไป →</button>
            </div>
          )}

          {/* Step 2: Owner Name */}
          {leadStep === 2 && (
            <div>
              <div style={{ textAlign: 'center', marginBottom: 24 }}>
                <div style={{ fontSize: 56, marginBottom: 12 }}>👤</div>
                <h2 style={{ fontSize: 22, fontWeight: 800, color: '#333', marginBottom: 8 }}>คุณชื่ออะไร?</h2>
                <p style={{ fontSize: 13, color: '#888' }}>พ่อ/แม่ของ {leadInfo.dogName}</p>
              </div>
              <input type="text" placeholder="พิมพ์ชื่อคุณ..." ref={ownerNameRef} defaultValue={leadInfo.name}
                onBlur={(e) => setLeadInfo({...leadInfo, name: e.target.value})}
                onKeyPress={(e) => { if (e.key === 'Enter') { setLeadInfo({...leadInfo, name: e.target.value}); if (e.target.value.trim()) goNextStep(); }}}
                style={{ ...styles.input, fontSize: 18, textAlign: 'center', marginBottom: 20 }}
              />
              <button onClick={() => { const val = ownerNameRef.current?.value || ''; setLeadInfo({...leadInfo, name: val}); if (val.trim()) goNextStep(); }}
                style={{ ...styles.btn, ...styles.btnPrimary }}>ถัดไป →</button>
            </div>
          )}

          {/* Step 3: Email + Phone */}
          {leadStep === 3 && (
            <div>
              <div style={{ textAlign: 'center', marginBottom: 24 }}>
                <div style={{ fontSize: 56, marginBottom: 12 }}>📧</div>
                <h2 style={{ fontSize: 22, fontWeight: 800, color: '#333', marginBottom: 8 }}>ส่งผล DNA ไปที่ไหนดี?</h2>
              </div>
              <div style={{ marginBottom: 16 }}>
                <label style={{ fontSize: 12, fontWeight: 600, color: '#555', marginBottom: 6, display: 'block' }}>
                  Email <span style={{ color: currentTopic.color }}>*</span>
                </label>
                <input type="email" placeholder="example@email.com" ref={emailRef} defaultValue={leadInfo.email || ''}
                  onBlur={(e) => setLeadInfo({...leadInfo, email: e.target.value})}
                  style={{ ...styles.input, fontSize: 16, textAlign: 'center' }}
                />
              </div>
              <div style={{ marginBottom: 16 }}>
                <label style={{ fontSize: 12, fontWeight: 600, color: '#555', marginBottom: 6, display: 'block' }}>
                  เบอร์โทร <span style={{ color: '#999', fontWeight: 400 }}>(ไม่บังคับ)</span>
                </label>
                <input type="tel" placeholder="08X-XXX-XXXX" ref={phoneRef} defaultValue={leadInfo.contact}
                  onBlur={(e) => setLeadInfo({...leadInfo, contact: e.target.value})}
                  style={{ ...styles.input, fontSize: 16, textAlign: 'center' }}
                />
              </div>
              <div style={{ background: `linear-gradient(135deg, ${currentTopic.color}15, ${currentTopic.color}08)`, borderRadius: 16, padding: 16, marginBottom: 20, textAlign: 'center' }}>
                <div style={{ fontSize: 12, color: '#888', marginBottom: 4 }}>พร้อมดูผลของ</div>
                <div style={{ fontSize: 18, fontWeight: 700, color: '#333' }}>🐕 {leadInfo.dogName}</div>
                <div style={{ fontSize: 12, color: '#888' }}>{selectedBreed === 'อื่นๆ (กรอกเอง)' ? customBreed : selectedBreed}</div>
              </div>
              <button onClick={() => {
                const emailVal = emailRef.current?.value || '';
                const phoneVal = phoneRef.current?.value || '';
                setLeadInfo({...leadInfo, email: emailVal, contact: phoneVal});
                if (emailVal.includes('@')) submitLead();
              }} style={{ ...styles.btn, ...styles.btnPrimary, fontSize: 18 }}>
                🧬 ดูผล DNA บุคลิกภาพ!
              </button>
              <div style={{ textAlign: 'center', marginTop: 16, fontSize: 11, color: '#999' }}>🔒 ข้อมูลปลอดภัย ไม่แชร์กับบุคคลที่ 3</div>
            </div>
          )}
        </div>
      </div>
    );
  };

  // ===== RESULT SCREEN =====
  const ResultScreen = () => {
    const topic = viewingResult || currentTopic;
    const score = viewingResult ? completedTopics[viewingResult.id]?.score : getScore();
    const personality = getPersonality(score, topic.id);

    return (
      <div style={styles.container}>
        <div style={{...styles.glowOrb, width: 300, height: 300, background: topic.color, top: -100, right: -100}} />
        
        <div style={styles.content}>
          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: 20 }}>
            <button onClick={() => { setViewingResult(null); setScreen('helix'); }} style={{ background: 'none', border: 'none', fontSize: 24, cursor: 'pointer', color: 'white' }}>←</button>
            <div style={{ flex: 1, textAlign: 'center' }}>
              <span style={{ padding: '6px 14px', background: `${topic.color}33`, borderRadius: 20, fontSize: 12, color: topic.color, fontWeight: 600 }}>
                {topic.emoji} {topic.name}
              </span>
            </div>
            <div style={{ width: 24 }} />
          </div>

          {/* Result Card */}
          <div style={{ ...styles.card, marginBottom: 20 }}>
            {/* Personality Reveal */}
            <div style={{ textAlign: 'center', marginBottom: 20, opacity: revealStep >= 1 ? 1 : 0, transition: 'opacity 0.5s ease' }}>
              <div style={{ fontSize: 64, marginBottom: 8 }}>{personality.emoji}</div>
              <div style={{ fontSize: 24, fontWeight: 800, color: topic.color, marginBottom: 4 }}>{personality.type}</div>
              <div style={{ fontSize: 14, color: '#666', fontStyle: 'italic' }}>{personality.tagline}</div>
            </div>

            {/* Score Ring */}
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20, opacity: revealStep >= 2 ? 1 : 0, transition: 'opacity 0.5s ease' }}>
              <div style={{
                width: 120, height: 120, borderRadius: '50%',
                background: `conic-gradient(${topic.color} ${score * 3.6}deg, #E0E0E0 0deg)`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: `0 8px 30px ${topic.color}33`
              }}>
                <div style={{
                  width: 100, height: 100, borderRadius: '50%', background: 'white',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
                }}>
                  <div style={{ fontSize: 28, fontWeight: 800, color: topic.color }}>{score}%</div>
                  <div style={{ fontSize: 10, color: '#888' }}>{topic.dimension}</div>
                </div>
              </div>
            </div>

            {/* Rarity */}
            <div style={{ textAlign: 'center', marginBottom: 20, opacity: revealStep >= 2 ? 1 : 0, transition: 'opacity 0.5s ease' }}>
              <span style={{ padding: '6px 14px', background: '#F0F0F0', borderRadius: 20, fontSize: 12, color: '#666' }}>
                🎲 {personality.rarity}
              </span>
            </div>

            {/* Traits */}
            <div style={{ marginBottom: 20, opacity: revealStep >= 3 ? 1 : 0, transition: 'opacity 0.5s ease' }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: '#333', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 8 }}>
                <span>✨</span> บุคลิกภาพเด่น
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {personality.traits.map((trait, i) => (
                  <span key={i} style={{ padding: '6px 12px', background: `${topic.color}15`, borderRadius: 20, fontSize: 12, color: topic.color }}>
                    {trait}
                  </span>
                ))}
              </div>
            </div>

            {/* Science Card */}
            <div style={{ background: '#EEF6FF', borderRadius: 16, padding: 16, marginBottom: 16, opacity: revealStep >= 4 ? 1 : 0, transition: 'opacity 0.5s ease' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                <span>🔬</span>
                <span style={{ fontSize: 13, fontWeight: 600, color: '#3498DB' }}>Science Secret</span>
              </div>
              <p style={{ fontSize: 13, color: '#555', lineHeight: 1.6, margin: 0, marginBottom: 8 }}>{topic.scienceFact}</p>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                <span style={{ padding: '4px 10px', background: '#3498DB22', borderRadius: 10, fontSize: 11, color: '#3498DB' }}>🧬 {topic.gene}</span>
                <span style={{ padding: '4px 10px', background: '#3498DB22', borderRadius: 10, fontSize: 11, color: '#3498DB' }}>📚 {topic.reference}</span>
              </div>
            </div>

            {/* Advice Card */}
            <div style={{ background: '#E8F8F0', borderRadius: 16, padding: 16, marginBottom: 16, opacity: revealStep >= 5 ? 1 : 0, transition: 'opacity 0.5s ease' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                <span>💡</span>
                <span style={{ fontSize: 13, fontWeight: 600, color: '#27AE60' }}>คำแนะนำ</span>
              </div>
              <p style={{ fontSize: 13, color: '#555', lineHeight: 1.6, margin: 0 }}>{personality.advice}</p>
            </div>

            {/* Warning Card */}
            {personality.warning && personality.warning !== 'ไม่มีข้อควรระวังพิเศษ' && (
              <div style={{ background: '#FFF5F5', borderRadius: 16, padding: 16, marginBottom: 16, opacity: revealStep >= 6 ? 1 : 0, transition: 'opacity 0.5s ease' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                  <span>⚠️</span>
                  <span style={{ fontSize: 13, fontWeight: 600, color: '#E74C3C' }}>ข้อควรระวัง</span>
                </div>
                <p style={{ fontSize: 13, color: '#555', lineHeight: 1.6, margin: 0 }}>{personality.warning}</p>
              </div>
            )}
          </div>

          {/* DNA Progress */}
          <div style={{ ...styles.darkCard, marginBottom: 20, opacity: revealStep >= 6 ? 1 : 0, transition: 'opacity 0.5s ease' }}>
            <div style={{ textAlign: 'center', marginBottom: 12 }}>
              <div style={{ fontSize: 14, color: 'white', fontWeight: 600 }}>🧬 DNA Helix Progress</div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>{Object.keys(completedTopics).length}/12 Segments</div>
            </div>
            <div style={{ height: 8, background: 'rgba(255,255,255,0.1)', borderRadius: 4, overflow: 'hidden' }}>
              <div style={{ width: `${(Object.keys(completedTopics).length / 12) * 100}%`, height: '100%', background: 'linear-gradient(90deg, #FF6B6B, #FFD93D, #4ECDC4)', borderRadius: 4 }} />
            </div>
          </div>

          {/* CTA */}
          <div style={{ textAlign: 'center', opacity: revealStep >= 6 ? 1 : 0, transition: 'opacity 0.5s ease' }}>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 14, marginBottom: 16 }}>
              🎯 นี่แค่ 1 ใน 12 DNA Segments!<br/>ทดสอบต่อเพื่อปลดล็อก DNA ทั้งหมด
            </p>
            <button onClick={() => { setViewingResult(null); setScreen('helix'); }} style={{ ...styles.btn, ...styles.btnPrimary }}>
              🧬 กลับไปดู DNA Helix
            </button>
          </div>
        </div>
      </div>
    );
  };

  // ===== MAIN RENDER =====
  
  // Landing Screen
  if (screen === 'landing') {
    return (
      <div style={styles.container}>
        <div style={{...styles.glowOrb, width: 300, height: 300, background: '#FF6B6B', top: -100, right: -100}} />
        <div style={{...styles.glowOrb, width: 400, height: 400, background: '#4ECDC4', bottom: -150, left: -150}} />
        
        <div style={styles.content}>
          <div style={{ textAlign: 'center', paddingTop: 40 }}>
            <div style={{ fontSize: 14, letterSpacing: 4, color: 'rgba(255,255,255,0.6)', marginBottom: 16 }}>🐾 MHA' STORY</div>
            <div style={{ fontSize: 56, marginBottom: 12, filter: 'drop-shadow(0 0 30px rgba(255,107,107,0.5))' }}>🧬</div>
            <div style={{ fontSize: 28, fontWeight: 800, color: 'white', marginBottom: 4, letterSpacing: 1 }}>Dog DNA Profile</div>
            <div style={{ fontSize: 16, color: 'rgba(255,255,255,0.6)', fontStyle: 'italic', letterSpacing: 2, marginBottom: 24 }}>Science & Secret</div>

            <h1 style={{ fontSize: 22, fontWeight: 800, color: 'white', marginBottom: 12, lineHeight: 1.4 }}>
              ค้นพบ DNA บุคลิกภาพ<br/>
              <span style={{ background: 'linear-gradient(135deg, #FF6B6B, #FFD93D)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                ที่ซ่อนอยู่ในตัวน้องหมา
              </span>
            </h1>

            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.7)', lineHeight: 1.8, marginBottom: 24 }}>
              12 Tests • 5 Dimensions • DNA Helix<br/>
              <span style={{ color: '#FFD93D' }}>Based on Real Science Research</span>
            </p>

            <div style={{ ...styles.darkCard, padding: 16, marginBottom: 24, textAlign: 'left' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 50, height: 50, borderRadius: 14, background: 'linear-gradient(135deg, #FF6B6B22, #FFD93D22)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>🔬</div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: 'white', marginBottom: 2 }}>Behavioral Science + Genetics</div>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)' }}>งานวิจัยจาก Harvard, Tokyo University</div>
                </div>
              </div>
            </div>

            {/* 5 Dimensions Preview */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginBottom: 24, flexWrap: 'wrap' }}>
              {['💛 BOND', '⚡ DRIVE', '🧠 MIND', '🛡️ NERVE', '🌍 WILD'].map((dim, i) => (
                <span key={i} style={{ padding: '6px 12px', background: 'rgba(255,255,255,0.1)', borderRadius: 20, fontSize: 11, color: 'rgba(255,255,255,0.8)' }}>{dim}</span>
              ))}
            </div>

            <button style={{ ...styles.btn, ...styles.btnPrimary, marginBottom: 16 }} onClick={() => setScreen('helix')}>
              🚀 เริ่มทดสอบเลย — ฟรี!
            </button>

            <div style={{ marginTop: 20, fontSize: 12, color: 'rgba(255,255,255,0.4)', display: 'flex', justifyContent: 'center', gap: 16, flexWrap: 'wrap' }}>
              <span>✓ ไม่ต้องสมัคร</span>
              <span>✓ ฟรี 100%</span>
              <span>✓ ดูผลทันที</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // DNA Helix Screen
  if (screen === 'helix') {
    return (
      <div style={styles.container}>
        <div style={{...styles.glowOrb, width: 300, height: 300, background: '#FF6B6B', top: -100, right: -100}} />
        <div style={{...styles.glowOrb, width: 300, height: 300, background: '#4ECDC4', bottom: 100, left: -100}} />
        
        <div style={styles.content}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
            <button onClick={() => setScreen('landing')} style={{ background: 'none', border: 'none', fontSize: 24, cursor: 'pointer', color: 'white' }}>←</button>
            <div style={{ flex: 1, textAlign: 'center' }}>
              <span style={{ fontSize: 14, letterSpacing: 3, color: 'rgba(255,255,255,0.5)' }}>🐾 MHA' STORY</span>
            </div>
            <div style={{ width: 24 }} />
          </div>

          <DNAHelix />
        </div>

        {/* Badge Modal */}
        {showBadgeModal && selectedBadge && (
          <div style={styles.modal} onClick={() => setShowBadgeModal(false)}>
            <div style={{ ...styles.card, maxWidth: 380, width: '100%' }} onClick={(e) => e.stopPropagation()}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                <div style={{
                  width: 65, height: 65, borderRadius: 18,
                  background: `linear-gradient(135deg, ${selectedBadge.color}, ${selectedBadge.color}CC)`,
                  border: `3px solid ${selectedBadge.color}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28,
                  boxShadow: `0 8px 25px ${selectedBadge.color}44`
                }}>{selectedBadge.emoji}</div>
                <button onClick={() => setShowBadgeModal(false)} style={{ background: 'none', border: 'none', fontSize: 24, cursor: 'pointer', color: '#999' }}>×</button>
              </div>

              <h2 style={{ fontSize: 20, fontWeight: 700, color: '#333', marginBottom: 6 }}>{selectedBadge.name}</h2>
              <div style={{ display: 'inline-block', padding: '4px 12px', background: `${selectedBadge.color}22`, borderRadius: 12, fontSize: 12, color: selectedBadge.color, fontWeight: 600, marginBottom: 12 }}>
                {selectedBadge.dimensionEmoji} {selectedBadge.dimension}
              </div>
              <p style={{ fontSize: 14, color: '#666', lineHeight: 1.6, marginBottom: 16 }}>{selectedBadge.shortDesc}</p>
              
              <div style={{ background: '#F8F9FA', borderRadius: 14, padding: 14, marginBottom: 16 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                  <span>🔬</span>
                  <span style={{ fontSize: 12, fontWeight: 600, color: selectedBadge.color }}>Science Fact</span>
                </div>
                <p style={{ fontSize: 12, color: '#666', lineHeight: 1.5, margin: 0 }}>{selectedBadge.scienceFact}</p>
              </div>

              {isTopicCompleted(selectedBadge.id) ? (
                <button onClick={() => {
                  setViewingResult(selectedBadge);
                  setShowBadgeModal(false);
                  setScreen('result');
                  setRevealStep(6);
                }} style={{ ...styles.btn, background: selectedBadge.color, color: 'white' }}>
                  📊 ดูผลลัพธ์
                </button>
              ) : (
                <button onClick={() => {
                  setCurrentTopic(selectedBadge);
                  setAnswers([]);
                  setCurrentQuestion(0);
                  setShowBadgeModal(false);
                  setScreen('quiz');
                }} style={{ ...styles.btn, ...styles.btnPrimary }}>
                  🚀 เริ่มทำ Quiz
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }

  // Quiz Screen
  if (screen === 'quiz' && currentTopic) {
    const questions = topicQuestions[currentTopic.id];
    const progress = ((currentQuestion + 1) / questions.length) * 100;

    return (
      <div style={styles.container}>
        <div style={{...styles.glowOrb, width: 300, height: 300, background: currentTopic.color, top: -100, right: -100}} />
        
        <div style={styles.content}>
          <div style={{ marginBottom: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <button onClick={() => setScreen('helix')} style={{ background: 'none', border: 'none', fontSize: 20, cursor: 'pointer', color: 'white' }}>←</button>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 18 }}>{currentTopic.emoji}</span>
                <span style={{ color: 'white', fontSize: 13, fontWeight: 600 }}>{currentTopic.name}</span>
              </div>
              <span style={{ color: 'white', fontSize: 13, fontWeight: 600 }}>{currentQuestion + 1}/{questions.length}</span>
            </div>
            <div style={{ height: 6, background: 'rgba(255,255,255,0.1)', borderRadius: 3, overflow: 'hidden' }}>
              <div style={{ width: `${progress}%`, height: '100%', background: `linear-gradient(90deg, ${currentTopic.color}, ${currentTopic.color}CC)`, borderRadius: 3, transition: 'width 0.3s ease' }} />
            </div>
          </div>

          <div style={{ ...styles.darkCard }}>
            {renderQuestion()}
          </div>
        </div>

        {showLeadGate && <LeadGateModal />}
      </div>
    );
  }

  // Result Screen
  if (screen === 'result') {
    return <ResultScreen />;
  }

  return null;
}
