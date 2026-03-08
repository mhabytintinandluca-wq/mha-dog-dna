'use client'
import React, { useState, useEffect } from 'react';

export default function MhaStoryApp() {
  const [screen, setScreen] = useState('landing');
  const [currentTopic, setCurrentTopic] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showLeadGate, setShowLeadGate] = useState(false);
  const [leadInfo, setLeadInfo] = useState({ name: '', contact: '', dogName: '', breed: '', email: '' });
  const [swipeDir, setSwipeDir] = useState(null);
  const [revealStep, setRevealStep] = useState(0);
  const [completedTopics, setCompletedTopics] = useState({});
  const [leadStep, setLeadStep] = useState(0);
  const [selectedBreed, setSelectedBreed] = useState('');
  const [selectedBadge, setSelectedBadge] = useState(null);
  const [showBadgeModal, setShowBadgeModal] = useState(false);
  const [showDimensionPopup, setShowDimensionPopup] = useState(false);
  const [viewingResult, setViewingResult] = useState(null);

  // Popular dog breeds
  const dogBreeds = [
    'ปอมเมอเรเนียน', 'ชิวาวา', 'พุดเดิ้ล', 'โกลเด้น รีทรีฟเวอร์', 
    'ลาบราดอร์', 'ชิบะ อินุ', 'บีเกิ้ล', 'บูลด็อก', 
    'ไซบีเรียน ฮัสกี้', 'คอร์กี้', 'ชิสุ', 'มอลทีส',
    'แจ็ค รัสเซล', 'บางแก้ว', 'ไทยหลังอาน', 'พันทาง/มิกซ์'
  ];

  // All Topics Data
  const allTopics = [
    { id: 1, name: 'The Stare Code', emoji: '👁️', dimension: 'BOND', dimensionEmoji: '💛', color: '#FF6B6B', island: 1, shortDesc: 'ค้นพบความลึกของสายตาที่เชื่อมโยงหัวใจ', scienceFact: 'การสบตากับน้องหมาช่วยกระตุ้นการหลั่ง Oxytocin เหมือนกับความรักระหว่างแม่กับลูก' },
    { id: 2, name: 'Empathy DNA', emoji: '😢', dimension: 'BOND', dimensionEmoji: '💛', color: '#FF8E53', island: 1, shortDesc: 'น้องหมารับรู้อารมณ์คุณได้แค่ไหน?', scienceFact: 'สุนัขสามารถแยกแยะสีหน้าที่แสดงอารมณ์ของมนุษย์ได้' },
    { id: 3, name: '6th Sense Test', emoji: '🚪', dimension: 'MIND', dimensionEmoji: '🧠', color: '#4ECDC4', island: 1, shortDesc: 'น้องหมารู้ล่วงหน้าก่อนคุณทำอะไร?', scienceFact: 'สุนัขสามารถจดจำ routine และคาดการณ์เหตุการณ์ล่วงหน้าได้' },
    { id: 4, name: 'Food Blueprint', emoji: '🍖', dimension: 'DRIVE', dimensionEmoji: '⚡', color: '#FF6B6B', island: 2, shortDesc: 'อาหารมีอิทธิพลต่อน้องหมาแค่ไหน?', scienceFact: 'ยีน POMC มีผลต่อความอยากอาหารและน้ำหนักในสุนัข' },
    { id: 5, name: 'Play Personality', emoji: '🎾', dimension: 'DRIVE', dimensionEmoji: '⚡', color: '#FFD93D', island: 2, shortDesc: 'น้องหมาชอบเล่นแบบไหน?', scienceFact: 'รูปแบบการเล่นเชื่อมโยงกับ attachment style' },
    { id: 6, name: 'IQ Signal', emoji: '🧠', dimension: 'MIND', dimensionEmoji: '🧠', color: '#4ECDC4', island: 2, shortDesc: 'น้องหมาฉลาดแค่ไหน?', scienceFact: 'สุนัขมี social cognition skills ใกล้เคียงเด็กมนุษย์' },
    { id: 7, name: 'Mind Reader', emoji: '🔮', dimension: 'MIND', dimensionEmoji: '🧠', color: '#9B59B6', island: 3, shortDesc: 'น้องหมาอ่านใจคุณได้ไหม?', scienceFact: 'สุนัขสามารถติดตามสายตาและเข้าใจการชี้ของมนุษย์' },
    { id: 8, name: 'Secret Language', emoji: '🗣️', dimension: 'MIND', dimensionEmoji: '🧠', color: '#3498DB', island: 3, shortDesc: 'น้องหมาสื่อสารกับคุณยังไง?', scienceFact: 'เสียงเห่าของสุนัขมีความหมายเฉพาะตัว' },
    { id: 9, name: 'Nerve Map', emoji: '⚡', dimension: 'NERVE', dimensionEmoji: '🛡️', color: '#E74C3C', island: 3, shortDesc: 'น้องหมากลัวอะไรบ้าง?', scienceFact: 'ความกลัวเสียงดังเป็นปัญหาพฤติกรรมที่พบบ่อย' },
    { id: 10, name: 'Alone Index', emoji: '🧳', dimension: 'NERVE', dimensionEmoji: '🛡️', color: '#E67E22', island: 4, shortDesc: 'น้องหมาอยู่คนเดียวได้ไหม?', scienceFact: 'Separation anxiety พบได้ใน 20-40% ของสุนัข' },
    { id: 11, name: 'Pack Code', emoji: '🐺', dimension: 'WILD', dimensionEmoji: '🌍', color: '#2ECC71', island: 4, shortDesc: 'น้องหมาเข้าฝูงยังไง?', scienceFact: 'สุนัขมี social hierarchy สืบทอดจากหมาป่า' },
    { id: 12, name: 'Wild Signal', emoji: '🌿', dimension: 'WILD', dimensionEmoji: '🌍', color: '#1ABC9C', island: 4, shortDesc: 'สัญชาตญาณดั้งเดิมของน้องหมา', scienceFact: 'พฤติกรรมวนก่อนนอนและขุดดินเป็นสัญชาตญาณดั้งเดิม' }
  ];

  const islands = [
    { id: 1, name: 'Heart Bond', emoji: '💛', color: '#FFD93D', topics: [1, 2, 3] },
    { id: 2, name: 'Energy Drive', emoji: '⚡', color: '#FF6B6B', topics: [4, 5, 6] },
    { id: 3, name: 'Mind Power', emoji: '🧠', color: '#4ECDC4', topics: [7, 8, 9] },
    { id: 4, name: 'Wild Instinct', emoji: '🌍', color: '#9B59B6', topics: [10, 11, 12] }
  ];

  const dimensionInfo = [
    { name: 'BOND', emoji: '💛', color: '#FFD93D', gene: 'OXTR — Oxytocin Receptor', desc: 'วัดระดับความผูกพันและความรักที่น้องหมามีต่อเจ้าของ' },
    { name: 'DRIVE', emoji: '⚡', color: '#FF6B6B', gene: 'POMC — Energy & Appetite', desc: 'วัดระดับพลังงาน แรงจูงใจ และความกระตือรือร้น' },
    { name: 'MIND', emoji: '🧠', color: '#4ECDC4', gene: 'WBSCR17 — Social Cognition', desc: 'วัดความฉลาดทางสังคมและความสามารถในการอ่านใจคน' },
    { name: 'NERVE', emoji: '🛡️', color: '#9B59B6', gene: 'SLC6A4 — Serotonin Transporter', desc: 'วัดความมั่นคงทางอารมณ์และการรับมือกับความเครียด' },
    { name: 'WILD', emoji: '🌍', color: '#2ECC71', gene: 'DRD4 — Dopamine Receptor', desc: 'วัดระดับสัญชาตญาณดั้งเดิมและความรักในการผจญภัย' }
  ];

  // Quiz Questions for all 12 Topics
  const topicQuestions = {
    1: [
      { q: 'น้องจ้องคุณระหว่างที่คุณกินข้าวไหม?', emoji: '🍽️' },
      { q: 'น้องตามคุณเข้าทุกห้องในบ้านไหม?', emoji: '🚪' },
      { q: 'น้อง slow-blink เวลาสบตาคุณไหม?', emoji: '😌' },
      { q: 'น้องมองหน้าคุณก่อนจะทำอะไรไหม?', emoji: '🤔' },
      { q: 'น้องสบตาคุณนานกว่า 5 วินาทีได้ไหม?', emoji: '⏱️' },
      { q: 'น้องมองตาเวลาคุณพูดกับมันไหม?', emoji: '💬' },
      { q: 'น้องหันมามองเมื่อคุณเรียกชื่อไหม?', emoji: '📢' },
      { q: 'น้องจ้องตาคุณเวลาต้องการอะไรไหม?', emoji: '🙏' },
      { q: 'น้องรักษา eye contact ได้โดยไม่กลัวไหม?', emoji: '💪' },
      { q: 'น้องมองตาคุณตอนเล่นด้วยกันไหม?', emoji: '🎾' }
    ],
    2: [
      { q: 'น้องเข้ามาหาเวลาคุณร้องไห้ไหม?', emoji: '😢' },
      { q: 'น้องรู้สึกเมื่อคุณเครียดไหม?', emoji: '😰' },
      { q: 'น้องเลียหน้าคุณเวลาคุณเศร้าไหม?', emoji: '👅' },
      { q: 'น้องนั่งข้างๆ เวลาคุณไม่สบายไหม?', emoji: '🤒' },
      { q: 'น้องหงอยตามเวลาคุณไม่มีความสุขไหม?', emoji: '😔' },
      { q: 'น้องตื่นเต้นเวลาคุณกลับบ้านไหม?', emoji: '🏠' },
      { q: 'น้องสังเกตเห็นเมื่อคุณโกรธไหม?', emoji: '😠' },
      { q: 'น้องพยายามปลอบคุณเวลามีเรื่องไหม?', emoji: '🤗' },
      { q: 'น้องรู้ก่อนว่าคุณกำลังจะออกจากบ้านไหม?', emoji: '🚶' },
      { q: 'น้องดูเหมือนเข้าใจน้ำเสียงของคุณไหม?', emoji: '🎵' }
    ],
    3: [
      { q: 'น้องรู้ก่อนว่ามีคนจะมาถึงบ้านไหม?', emoji: '🚗' },
      { q: 'น้องตื่นก่อนนาฬิกาปลุกคุณไหม?', emoji: '⏰' },
      { q: 'น้องรู้ว่าจะไปหาหมอก่อนถึงคลินิกไหม?', emoji: '🏥' },
      { q: 'น้องรู้สึกถึงแผ่นดินไหวก่อนคุณไหม?', emoji: '🌍' },
      { q: 'น้องรู้ว่าใครเป็นมิตรหรือศัตรูไหม?', emoji: '🤝' },
      { q: 'น้องทำนายพายุหรือฝนได้ไหม?', emoji: '🌧️' },
      { q: 'น้องรู้เวลาที่คุณกำลังจะกลับบ้านไหม?', emoji: '🏠' },
      { q: 'น้องมีปฏิกิริยากับพลังงานของคนไหม?', emoji: '✨' },
      { q: 'น้องเคยเตือนคุณเรื่องอันตรายไหม?', emoji: '⚠️' },
      { q: 'น้องรู้สึกได้ถึงอารมณ์คนรอบข้างไหม?', emoji: '👥' }
    ],
    4: [
      { q: 'น้องตื่นเต้นมากเวลาเห็นอาหารไหม?', emoji: '🤩' },
      { q: 'น้องกินอาหารหมดจานเสมอไหม?', emoji: '🍽️' },
      { q: 'น้องขออาหารจากโต๊ะคุณไหม?', emoji: '🙏' },
      { q: 'น้องจำได้ว่าขนมอยู่ที่ไหนไหม?', emoji: '🧠' },
      { q: 'น้องกินเร็วมากไหม?', emoji: '⚡' },
      { q: 'น้องยอมทำ trick เพื่อขนมไหม?', emoji: '🎪' },
      { q: 'น้องเลือกกินเฉพาะบางอย่างไหม?', emoji: '🤔' },
      { q: 'น้องรู้เวลาอาหารแม่นยำไหม?', emoji: '⏰' },
      { q: 'น้องแย่งอาหารจากน้องหมาตัวอื่นไหม?', emoji: '🐕' },
      { q: 'น้องมีอาหารโปรดที่ชัดเจนไหม?', emoji: '❤️' }
    ],
    5: [
      { q: 'น้องเล่นได้นานโดยไม่เหนื่อยไหม?', emoji: '💪' },
      { q: 'น้องชอบเล่นดึงเชือกไหม?', emoji: '🪢' },
      { q: 'น้องเอาของเล่นมาให้คุณเล่นด้วยไหม?', emoji: '🧸' },
      { q: 'น้องชอบไล่จับมากกว่าถูกไล่ไหม?', emoji: '🏃' },
      { q: 'น้องเล่นหยาบ (rough play) ไหม?', emoji: '🤼' },
      { q: 'น้องรู้จักหยุดเวลาเหนื่อยไหม?', emoji: '😮‍💨' },
      { q: 'น้องชอบเล่นกับน้องหมาตัวอื่นไหม?', emoji: '🐕‍🦺' },
      { q: 'น้องเล่นของเล่นคนเดียวได้ไหม?', emoji: '🎯' },
      { q: 'น้องตื่นเต้นเมื่อเห็นสายจูงไหม?', emoji: '🦮' },
      { q: 'น้องมีของเล่นชิ้นโปรดไหม?', emoji: '🌟' }
    ],
    6: [
      { q: 'น้องเรียนรู้คำสั่งใหม่เร็วไหม?', emoji: '📚' },
      { q: 'น้องแก้ปัญหาเพื่อเอาขนมได้ไหม?', emoji: '🧩' },
      { q: 'น้องเปิดประตูหรือลิ้นชักเป็นไหม?', emoji: '🚪' },
      { q: 'น้องจำชื่อของเล่นแต่ละชิ้นได้ไหม?', emoji: '🏷️' },
      { q: 'น้องรู้จักหลอกล่อคุณไหม?', emoji: '🎭' },
      { q: 'น้องเข้าใจท่าทางมือของคุณไหม?', emoji: '👆' },
      { q: 'น้องรู้จักใช้จังหวะในการขออะไรไหม?', emoji: '⏱️' },
      { q: 'น้องจำเส้นทางเดินได้ไหม?', emoji: '🗺️' },
      { q: 'น้องแยกแยะคนในครอบครัวได้ไหม?', emoji: '👨‍👩‍👧' },
      { q: 'น้องเรียนรู้จากการดูน้องหมาตัวอื่นไหม?', emoji: '👀' }
    ],
    7: [
      { q: 'น้องรู้ก่อนว่าคุณจะพาไปเดินเล่นไหม?', emoji: '🚶' },
      { q: 'น้องเดาได้ว่าคุณคิดอะไรอยู่ไหม?', emoji: '💭' },
      { q: 'น้องรู้ว่าคุณจะหยิบอะไรให้ไหม?', emoji: '🎁' },
      { q: 'น้องตอบสนองกับความคิดคุณไหม?', emoji: '🧠' },
      { q: 'น้องรู้ว่าวันนี้เป็นวันหยุดไหม?', emoji: '📅' },
      { q: 'น้องรู้สึกได้ถึงแผนการของคุณไหม?', emoji: '📋' },
      { q: 'น้องเตรียมตัวก่อนที่คุณจะบอกไหม?', emoji: '🎯' },
      { q: 'น้องรู้ว่าคุณกำลังจะโทรหาใครไหม?', emoji: '📱' },
      { q: 'น้องคาดเดาการเคลื่อนไหวของคุณได้ไหม?', emoji: '🔄' },
      { q: 'น้องรู้ก่อนว่าจะมีแขกมาไหม?', emoji: '🔔' }
    ],
    8: [
      { q: 'น้องมีเสียงเห่าหลายแบบไหม?', emoji: '🔊' },
      { q: 'น้องใช้ตาสื่อสารกับคุณไหม?', emoji: '👀' },
      { q: 'น้องมีท่าทางเฉพาะเวลาต้องการอะไรไหม?', emoji: '🙋' },
      { q: 'น้องกระดิกหางต่างกันตามอารมณ์ไหม?', emoji: '🐕' },
      { q: 'น้องส่งเสียงครางเวลาอยากได้อะไรไหม?', emoji: '😩' },
      { q: 'น้องมีคำศัพท์ที่เข้าใจหลายคำไหม?', emoji: '📖' },
      { q: 'น้องใช้อุ้งเท้าแตะคุณเพื่อสื่อสารไหม?', emoji: '🐾' },
      { q: 'น้องแสดงสีหน้าชัดเจนไหม?', emoji: '😀' },
      { q: 'น้องเข้าใจน้ำเสียงต่างๆ ของคุณไหม?', emoji: '🎵' },
      { q: 'คุณรู้สึกว่าคุยกับน้องได้ไหม?', emoji: '💬' }
    ],
    9: [
      { q: 'น้องกลัวเสียงพลุไหม?', emoji: '🎆' },
      { q: 'น้องกลัวฟ้าร้องไหม?', emoji: '⛈️' },
      { q: 'น้องกลัวเสียงเครื่องดูดฝุ่นไหม?', emoji: '🧹' },
      { q: 'น้องตกใจง่ายไหม?', emoji: '😱' },
      { q: 'น้องกลัวคนแปลกหน้าไหม?', emoji: '👤' },
      { q: 'น้องกลัวการไปหาหมอไหม?', emoji: '💉' },
      { q: 'น้องกลัวการอาบน้ำไหม?', emoji: '🚿' },
      { q: 'น้องกลัวรถยนต์ไหม?', emoji: '🚗' },
      { q: 'น้องฟื้นตัวเร็วหลังตกใจไหม?', emoji: '💪' },
      { q: 'น้องมีที่ซ่อนประจำเวลากลัวไหม?', emoji: '🏠' }
    ],
    10: [
      { q: 'น้องร้องเวลาคุณออกจากบ้านไหม?', emoji: '😭' },
      { q: 'น้องทำลายของเวลาอยู่คนเดียวไหม?', emoji: '💔' },
      { q: 'น้องเดินวนไปมาเวลาคุณเตรียมออกไหม?', emoji: '🔄' },
      { q: 'น้องหอบหรือหายใจแรงเวลาอยู่คนเดียวไหม?', emoji: '😰' },
      { q: 'น้องนอนหลับได้เวลาคุณไม่อยู่ไหม?', emoji: '😴' },
      { q: 'น้องกินอาหารได้เวลาคุณไม่อยู่ไหม?', emoji: '🍽️' },
      { q: 'น้องมีความสุขเมื่ออยู่กับคนอื่นไหม?', emoji: '👥' },
      { q: 'น้องตื่นเต้นมากเวลาคุณกลับบ้านไหม?', emoji: '🎉' },
      { q: 'น้องติดคุณมากเวลาคุณอยู่บ้านไหม?', emoji: '🤗' },
      { q: 'น้องอยู่บ้านคนเดียวได้หลายชั่วโมงไหม?', emoji: '⏰' }
    ],
    11: [
      { q: 'น้องเล่นกับสุนัขตัวอื่นได้ดีไหม?', emoji: '🐕‍🦺' },
      { q: 'น้องเป็นตัวเริ่มเล่นก่อนไหม?', emoji: '🎯' },
      { q: 'น้องยอมให้สุนัขตัวอื่นนำไหม?', emoji: '👑' },
      { q: 'น้องแบ่งของเล่นกับสุนัขอื่นไหม?', emoji: '🧸' },
      { q: 'น้องหลีกเลี่ยงความขัดแย้งไหม?', emoji: '🕊️' },
      { q: 'น้องเข้าหาสุนัขตัวอื่นก่อนไหม?', emoji: '👋' },
      { q: 'น้องปกป้องคุณจากสุนัขตัวอื่นไหม?', emoji: '🛡️' },
      { q: 'น้องอ่านภาษากายสุนัขตัวอื่นได้ไหม?', emoji: '👀' },
      { q: 'น้องสงบเวลาอยู่ในฝูงไหม?', emoji: '😌' },
      { q: 'น้องมีเพื่อนสุนัขที่สนิทไหม?', emoji: '❤️' }
    ],
    12: [
      { q: 'น้องชอบขุดดินไหม?', emoji: '🕳️' },
      { q: 'น้องไล่จับสัตว์เล็กๆ ไหม?', emoji: '🐿️' },
      { q: 'น้องหอนตามเสียงไซเรนไหม?', emoji: '🚨' },
      { q: 'น้องวนก่อนนอนไหม?', emoji: '🔄' },
      { q: 'น้องซุกอาหารไว้กินทีหลังไหม?', emoji: '🦴' },
      { q: 'น้องดมกลิ่นนานเวลาเดินเล่นไหม?', emoji: '👃' },
      { q: 'น้องกลิ้งตัวบนหญ้าไหม?', emoji: '🌿' },
      { q: 'น้องตื่นตัวเวลาเห็นสัตว์อื่นไหม?', emoji: '🦅' },
      { q: 'น้องชอบสำรวจที่ใหม่ๆ ไหม?', emoji: '🗺️' },
      { q: 'น้องมีสัญชาตญาณล่าเหยื่อไหม?', emoji: '🐺' }
    ]
  };

  const quizQuestions = currentTopic ? topicQuestions[currentTopic.id] || topicQuestions[1] : [];

  const isTopicCompleted = (topicId) => !!completedTopics[topicId];
  const isTopicUnlocked = (topicId) => {
    if (topicId === 1) return true;
    return isTopicCompleted(topicId - 1);
  };

  const getScore = () => {
    if (viewingResult) {
      return completedTopics[viewingResult.id]?.score || 0;
    }
    return Math.round((answers.reduce((a, b) => a + b, 0) / answers.length) * 100);
  };

  const handleSwipe = (direction) => {
    setSwipeDir(direction);
    setTimeout(() => {
      const newAnswers = [...answers, direction === 'right' ? 1 : 0];
      setAnswers(newAnswers);
      if (currentQuestion < quizQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        setLeadStep(0);
        setSelectedBreed('');
        setShowLeadGate(true);
      }
      setSwipeDir(null);
    }, 300);
  };

  const submitLead = () => {
    setShowLeadGate(false);
    const score = Math.round((answers.reduce((a, b) => a + b, 0) / answers.length) * 100);
    setLeadInfo({...leadInfo, breed: selectedBreed});
    setCompletedTopics({
      ...completedTopics,
      [currentTopic.id]: { score, answers: [...answers], completedAt: new Date() }
    });
    setScreen('result');
    setRevealStep(0);
    [1, 2, 3, 4, 5].forEach((step, i) => {
      setTimeout(() => setRevealStep(step), (i + 1) * 600);
    });
  };

  const getPersonality = (topicId, score) => {
    const level = score >= 80 ? 'high' : score >= 60 ? 'medium' : score >= 40 ? 'low' : 'veryLow';
    const config = {
      1: { name: 'Soul Gazer', types: { high: 'Soul Gazer 🌟', medium: 'Heart Reader 💕', low: 'Casual Connector 🤝', veryLow: 'Independent Spirit 🦊' }},
      2: { name: 'Emotion Sponge', types: { high: 'Emotion Sponge 🫂', medium: 'Comfort Buddy 🤗', low: 'Chill Observer 😎', veryLow: 'Zen Master 🧘' }},
      3: { name: 'Psychic Pup', types: { high: 'Psychic Pup 🔮', medium: 'Keen Observer 🦉', low: 'Easy Going 😊', veryLow: 'Chill Dude 😴' }},
      4: { name: 'Food Fanatic', types: { high: 'Food Fanatic 🤤', medium: 'Balanced Eater 🍽️', low: 'Picky Eater 🤔', veryLow: 'Food Skeptic 🙄' }},
      5: { name: 'Play Monster', types: { high: 'Play Monster 🎉', medium: 'Active Player 🐕', low: 'Couch Potato 🛋️', veryLow: 'Zen Sleeper 😴' }},
      6: { name: 'Genius Pup', types: { high: 'Genius Pup 🎓', medium: 'Smart Cookie 🍪', low: 'Sweet Simpleton 🥰', veryLow: 'Lovable Goofball 🤪' }},
      7: { name: 'Telepathic', types: { high: 'Telepathic 🧿', medium: 'Intuitive 💫', low: 'Present Moment 🌸', veryLow: 'Surprise Lover 🎁' }},
      8: { name: 'Communicator', types: { high: 'Master Communicator 📢', medium: 'Expressive 🎭', low: 'Silent Type 🤫', veryLow: 'Mystery Dog 🎭' }},
      9: { name: 'Fearless', types: { high: 'Fearless Hero 🦸', medium: 'Balanced Brave ⚖️', low: 'Sensitive Soul 🌸', veryLow: 'Anxious Angel 😰' }},
      10: { name: 'Independent', types: { high: 'Independent 🦅', medium: 'Adaptable 🔄', low: 'Velcro Dog 🤗', veryLow: 'Shadow 🥺' }},
      11: { name: 'Alpha', types: { high: 'Alpha Leader 👑', medium: 'Team Player 🤝', low: 'Happy Follower 🐾', veryLow: 'Lone Wolf 🐺' }},
      12: { name: 'Wild Heart', types: { high: 'Wild Heart 🐺', medium: 'Nature Lover 🌳', low: 'City Dog 🏙️', veryLow: 'Couch Companion 🛋️' }}
    };
    return config[topicId]?.types[level] || 'Unknown';
  };

  // STYLES
  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
      fontFamily: "'Prompt', 'Segoe UI', sans-serif",
      position: 'relative',
      overflow: 'hidden'
    },
    content: {
      position: 'relative',
      zIndex: 1,
      maxWidth: 420,
      margin: '0 auto',
      padding: '20px 16px',
      minHeight: '100vh'
    },
    btn: {
      width: '100%',
      padding: '16px 24px',
      borderRadius: 16,
      border: 'none',
      fontSize: 16,
      fontWeight: 700,
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      fontFamily: 'inherit'
    },
    btnPrimary: {
      background: 'linear-gradient(135deg, #FF6B6B 0%, #FFD93D 100%)',
      color: '#1a1a2e',
      boxShadow: '0 8px 25px rgba(255, 107, 107, 0.35)'
    },
    btnSecondary: {
      background: 'rgba(255,255,255,0.1)',
      color: 'white',
      border: '2px solid rgba(255,255,255,0.3)'
    },
    card: {
      background: 'rgba(255,255,255,0.08)',
      borderRadius: 20,
      padding: 20,
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255,255,255,0.1)'
    },
    badge: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 16,
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      position: 'relative'
    },
    input: {
      width: '100%',
      padding: '14px 16px',
      borderRadius: 12,
      border: '2px solid #E8E8E8',
      fontSize: 16,
      fontFamily: 'inherit',
      outline: 'none',
      transition: 'border-color 0.3s',
      boxSizing: 'border-box'
    },
    modal: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0,0,0,0.8)',
      backdropFilter: 'blur(10px)',
      zIndex: 100,
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'center'
    },
    modalContent: {
      background: 'white',
      borderRadius: '24px 24px 0 0',
      width: '100%',
      maxWidth: 420,
      maxHeight: '90vh',
      overflowY: 'auto',
      padding: 24
    }
  };

  // ==================== RENDER SCREENS ====================

  // LANDING SCREEN
  if (screen === 'landing') {
    return (
      <div style={styles.container}>
        <div style={styles.content}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', textAlign: 'center' }}>
            {/* Floating orbs */}
            <div style={{ position: 'absolute', width: 200, height: 200, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,107,107,0.3), transparent)', top: '10%', left: '-10%', filter: 'blur(40px)' }} />
            <div style={{ position: 'absolute', width: 150, height: 150, borderRadius: '50%', background: 'radial-gradient(circle, rgba(78,205,196,0.3), transparent)', bottom: '20%', right: '-5%', filter: 'blur(40px)' }} />

            {/* Logo */}
            <div style={{ fontSize: 80, marginBottom: 20, filter: 'drop-shadow(0 0 30px rgba(255,215,0,0.5))' }}>🧬</div>
            
            {/* Title */}
            <h1 style={{ fontSize: 36, fontWeight: 800, color: 'white', marginBottom: 8, textShadow: '0 2px 20px rgba(255,255,255,0.2)' }}>
              Dog Profile
            </h1>
            <p style={{ fontSize: 18, color: '#FFD93D', marginBottom: 24, fontWeight: 600 }}>
              Science & Secret
            </p>

            {/* Description */}
            <div style={{ maxWidth: 300, marginBottom: 40 }}>
              <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 15, lineHeight: 1.8, marginBottom: 16 }}>
                น้องหมาทุกตัวมี <span style={{ color: '#FFD93D', fontWeight: 600 }}>'บุคลิกภาพ'</span> ที่ซ่อนอยู่ใน DNA
              </p>
              <p style={{ color: '#FF6B6B', fontSize: 15, fontWeight: 500 }}>
                MHA' Story จะช่วยให้คุณค้นพบความลับนั้น
              </p>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 14, marginTop: 16 }}>
                เพื่อความเข้าใจที่ลึกซึ้ง และความรักที่เติบโต
              </p>
            </div>

            {/* CTA Button */}
            <button
              onClick={() => setScreen('overview')}
              style={{ ...styles.btn, ...styles.btnPrimary, maxWidth: 280 }}
            >
              🐾 เริ่มค้นหา
            </button>

            {/* Brand */}
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 12, marginTop: 40 }}>
              MHA' BY TIN TIN & LUCA
            </p>
          </div>
        </div>
      </div>
    );
  }

  // OVERVIEW SCREEN
  if (screen === 'overview') {
    const completedCount = Object.keys(completedTopics).length;
    
    return (
      <div style={styles.container}>
        <div style={styles.content}>
          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
            <div>
              <h1 style={{ fontSize: 22, fontWeight: 700, color: 'white', marginBottom: 4 }}>🧬 DNA Quiz</h1>
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)' }}>{completedCount}/12 Tests Completed</p>
            </div>
            <button
              onClick={() => setShowDimensionPopup(true)}
              style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 12, padding: '8px 12px', color: 'white', fontSize: 13, cursor: 'pointer' }}
            >
              ❓ 5 Dimensions
            </button>
          </div>

          {/* Progress Bar */}
          <div style={{ marginBottom: 24 }}>
            <div style={{ height: 8, background: 'rgba(255,255,255,0.1)', borderRadius: 4, overflow: 'hidden' }}>
              <div style={{ width: `${(completedCount / 12) * 100}%`, height: '100%', background: 'linear-gradient(90deg, #FF6B6B, #FFD93D, #4ECDC4)', borderRadius: 4, transition: 'width 0.5s ease' }} />
            </div>
          </div>

          {/* Paw Sequences */}
          {islands.map((island) => {
            const islandTopics = allTopics.filter(t => island.topics.includes(t.id));
            const completedInIsland = islandTopics.filter(t => isTopicCompleted(t.id)).length;

            return (
              <div key={island.id} style={{ marginBottom: 24 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                  <span style={{ fontSize: 20 }}>{island.emoji}</span>
                  <span style={{ color: island.color, fontWeight: 600, fontSize: 14 }}>Paw Sequence {island.id}: {island.name}</span>
                  <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12 }}>({completedInIsland}/3)</span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
                  {islandTopics.map((topic) => {
                    const completed = isTopicCompleted(topic.id);
                    const unlocked = isTopicUnlocked(topic.id);
                    
                    return (
                      <div
                        key={topic.id}
                        onClick={() => {
                          if (unlocked) {
                            setSelectedBadge(topic);
                            setShowBadgeModal(true);
                          }
                        }}
                        style={{
                          ...styles.badge,
                          width: '100%',
                          height: 80,
                          flexDirection: 'column',
                          gap: 4,
                          background: completed 
                            ? `linear-gradient(135deg, ${topic.color}, ${topic.color}CC)` 
                            : unlocked 
                              ? `${topic.color}22` 
                              : 'rgba(255,255,255,0.05)',
                          border: `2px solid ${completed ? topic.color : unlocked ? `${topic.color}66` : 'rgba(255,255,255,0.1)'}`,
                          boxShadow: completed ? `0 4px 15px ${topic.color}44` : 'none',
                          opacity: unlocked ? 1 : 0.5
                        }}
                      >
                        <span style={{ fontSize: 28, filter: unlocked ? 'none' : 'grayscale(100%)' }}>{topic.emoji}</span>
                        <span style={{ fontSize: 9, color: completed ? 'white' : 'rgba(255,255,255,0.6)', fontWeight: 600, textAlign: 'center', padding: '0 4px' }}>
                          {topic.name}
                        </span>
                        {completed && (
                          <div style={{ position: 'absolute', top: -5, right: -5, width: 20, height: 20, borderRadius: '50%', background: 'linear-gradient(135deg, #2ECC71, #27AE60)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(46,204,113,0.5)', border: '2px solid #1a1a2e' }}>
                            <span style={{ color: 'white', fontSize: 11, fontWeight: 700 }}>✓</span>
                          </div>
                        )}
                        {!unlocked && (
                          <div style={{ position: 'absolute', bottom: -3, right: -3, width: 18, height: 18, borderRadius: '50%', background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(255,255,255,0.2)' }}>
                            <span style={{ fontSize: 9 }}>🔒</span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}

          {/* Dashboard Button */}
          {completedCount > 0 && (
            <button
              onClick={() => setScreen('dashboard')}
              style={{ ...styles.btn, ...styles.btnSecondary, marginTop: 16 }}
            >
              📊 Dashboard ({completedCount}/12)
            </button>
          )}
        </div>

        {/* Badge Modal */}
        {showBadgeModal && selectedBadge && (
          <div style={styles.modal} onClick={() => setShowBadgeModal(false)}>
            <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 64, marginBottom: 16 }}>{selectedBadge.emoji}</div>
                <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 8, color: '#333' }}>{selectedBadge.name}</h2>
                <p style={{ fontSize: 14, color: selectedBadge.color, marginBottom: 16 }}>{selectedBadge.dimensionEmoji} {selectedBadge.dimension}</p>
                <p style={{ fontSize: 14, color: '#666', marginBottom: 20, lineHeight: 1.6 }}>{selectedBadge.shortDesc}</p>
                
                <div style={{ background: '#f5f5f5', borderRadius: 12, padding: 16, marginBottom: 20 }}>
                  <p style={{ fontSize: 12, color: '#888', marginBottom: 4 }}>🔬 Science Fact</p>
                  <p style={{ fontSize: 13, color: '#333' }}>{selectedBadge.scienceFact}</p>
                </div>

                {isTopicCompleted(selectedBadge.id) ? (
                  <button
                    onClick={() => {
                      setViewingResult(selectedBadge);
                      setShowBadgeModal(false);
                      setScreen('result');
                    }}
                    style={{ ...styles.btn, background: '#4ECDC4', color: 'white' }}
                  >
                    ดูผลลัพธ์ 📊
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setCurrentTopic(selectedBadge);
                      setShowBadgeModal(false);
                      setScreen('topic-intro');
                    }}
                    style={{ ...styles.btn, ...styles.btnPrimary }}
                  >
                    เริ่มทดสอบ 🚀
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Dimension Popup */}
        {showDimensionPopup && (
          <div style={styles.modal} onClick={() => setShowDimensionPopup(false)}>
            <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
              <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 20, textAlign: 'center', color: '#333' }}>🧬 5 DNA Dimensions</h2>
              {dimensionInfo.map((dim) => (
                <div key={dim.name} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 16, padding: 12, background: `${dim.color}15`, borderRadius: 12, border: `1px solid ${dim.color}33` }}>
                  <div style={{ fontSize: 28 }}>{dim.emoji}</div>
                  <div>
                    <div style={{ fontWeight: 700, color: dim.color, marginBottom: 4 }}>{dim.name}</div>
                    <div style={{ fontSize: 11, color: '#666', marginBottom: 4 }}>{dim.gene}</div>
                    <div style={{ fontSize: 12, color: '#555' }}>{dim.desc}</div>
                  </div>
                </div>
              ))}
              <button onClick={() => setShowDimensionPopup(false)} style={{ ...styles.btn, background: '#333', color: 'white', marginTop: 8 }}>
                ปิด
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  // TOPIC INTRO SCREEN
  if (screen === 'topic-intro' && currentTopic) {
    return (
      <div style={styles.container}>
        <div style={styles.content}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', textAlign: 'center' }}>
            <div style={{ fontSize: 80, marginBottom: 24, filter: `drop-shadow(0 0 30px ${currentTopic.color}66)` }}>{currentTopic.emoji}</div>
            <h1 style={{ fontSize: 28, fontWeight: 800, color: 'white', marginBottom: 8 }}>{currentTopic.name}</h1>
            <p style={{ fontSize: 16, color: currentTopic.color, marginBottom: 24 }}>{currentTopic.shortDesc}</p>
            
            <div style={{ ...styles.card, marginBottom: 32, maxWidth: 320 }}>
              <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', marginBottom: 8 }}>🔬 Science Fact</p>
              <p style={{ fontSize: 14, color: 'white', lineHeight: 1.6 }}>{currentTopic.scienceFact}</p>
            </div>

            <button
              onClick={() => {
                setAnswers([]);
                setCurrentQuestion(0);
                setScreen('quiz');
              }}
              style={{ ...styles.btn, ...styles.btnPrimary, maxWidth: 280 }}
            >
              เริ่มทดสอบ →
            </button>

            <button
              onClick={() => setScreen('overview')}
              style={{ background: 'transparent', border: 'none', color: 'rgba(255,255,255,0.5)', marginTop: 16, cursor: 'pointer', fontSize: 14 }}
            >
              ← กลับ
            </button>
          </div>
        </div>
      </div>
    );
  }

  // QUIZ SCREEN
  if (screen === 'quiz' && currentTopic) {
    const question = quizQuestions[currentQuestion];
    
    return (
      <div style={styles.container}>
        <div style={styles.content}>
          {/* Progress */}
          <div style={{ marginBottom: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: 13 }}>{currentTopic.emoji} {currentTopic.name}</span>
              <span style={{ color: 'white', fontSize: 13, fontWeight: 600 }}>{currentQuestion + 1}/{quizQuestions.length}</span>
            </div>
            <div style={{ height: 6, background: 'rgba(255,255,255,0.1)', borderRadius: 3, overflow: 'hidden' }}>
              <div style={{ width: `${((currentQuestion + 1) / quizQuestions.length) * 100}%`, height: '100%', background: `linear-gradient(90deg, ${currentTopic.color}, ${currentTopic.color}CC)`, borderRadius: 3, transition: 'width 0.3s ease' }} />
            </div>
          </div>

          {/* Question Card */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
            <div style={{ 
              ...styles.card, 
              width: '100%', 
              textAlign: 'center',
              transform: swipeDir === 'left' ? 'translateX(-100px) rotate(-10deg)' : swipeDir === 'right' ? 'translateX(100px) rotate(10deg)' : 'none',
              opacity: swipeDir ? 0.5 : 1,
              transition: 'all 0.3s ease'
            }}>
              <div style={{ fontSize: 64, marginBottom: 20 }}>{question?.emoji}</div>
              <p style={{ fontSize: 18, color: 'white', lineHeight: 1.6, minHeight: 60 }}>{question?.q}</p>
            </div>

            {/* Swipe Buttons */}
            <div style={{ display: 'flex', gap: 40, marginTop: 40 }}>
              <button
                onClick={() => handleSwipe('left')}
                style={{ width: 80, height: 80, borderRadius: '50%', background: 'linear-gradient(135deg, #636e72, #2d3436)', border: 'none', fontSize: 36, cursor: 'pointer', boxShadow: '0 8px 25px rgba(0,0,0,0.3)', transition: 'transform 0.2s' }}
              >
                😅
              </button>
              <button
                onClick={() => handleSwipe('right')}
                style={{ width: 80, height: 80, borderRadius: '50%', background: 'linear-gradient(135deg, #FF6B6B, #ee5a5a)', border: 'none', fontSize: 36, cursor: 'pointer', boxShadow: '0 8px 25px rgba(255,107,107,0.4)', transition: 'transform 0.2s' }}
              >
                😍
              </button>
            </div>
            <div style={{ display: 'flex', gap: 60, marginTop: 12 }}>
              <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12 }}>ไม่ใช่เลย</span>
              <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12 }}>ใช่เลย!</span>
            </div>
          </div>
        </div>

        {/* Lead Gate Modal */}
        {showLeadGate && (
          <div style={styles.modal}>
            <div style={styles.modalContent}>
              {/* Progress Dots */}
              <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginBottom: 24 }}>
                {[0, 1, 2, 3].map((step) => (
                  <div key={step} style={{ width: leadStep === step ? 24 : 8, height: 8, borderRadius: 4, background: leadStep >= step ? '#FF6B6B' : '#E8E8E8', transition: 'all 0.3s' }} />
                ))}
              </div>

              {/* Step 0: Dog Name */}
              {leadStep === 0 && (
                <div>
                  <div style={{ textAlign: 'center', marginBottom: 20 }}>
                    <div style={{ fontSize: 56, marginBottom: 12 }}>🐕</div>
                    <h2 style={{ fontSize: 22, fontWeight: 800, color: '#333', marginBottom: 8 }}>น้องหมาชื่ออะไร?</h2>
                    <p style={{ fontSize: 13, color: '#888' }}>บอกชื่อน้องเพื่อดูผล DNA ส่วนตัว</p>
                  </div>
                  <input
                    type="text"
                    placeholder="พิมพ์ชื่อน้องหมา..."
                    value={leadInfo.dogName}
                    onChange={(e) => setLeadInfo({...leadInfo, dogName: e.target.value})}
                    style={{ ...styles.input, fontSize: 18, textAlign: 'center', marginBottom: 20 }}
                  />
                  <button 
                    onClick={() => leadInfo.dogName.trim() && setLeadStep(1)}
                    disabled={!leadInfo.dogName.trim()}
                    style={{ ...styles.btn, ...styles.btnPrimary, opacity: leadInfo.dogName.trim() ? 1 : 0.5 }}
                  >
                    ถัดไป →
                  </button>
                </div>
              )}

              {/* Step 1: Breed */}
              {leadStep === 1 && (
                <div>
                  <div style={{ textAlign: 'center', marginBottom: 20 }}>
                    <div style={{ fontSize: 56, marginBottom: 12 }}>🐾</div>
                    <h2 style={{ fontSize: 22, fontWeight: 800, color: '#333', marginBottom: 8 }}>{leadInfo.dogName} เป็นพันธุ์อะไร?</h2>
                    <p style={{ fontSize: 13, color: '#888' }}>เลือกสายพันธุ์ที่ใกล้เคียงที่สุด</p>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8, maxHeight: 280, overflowY: 'auto', marginBottom: 20, padding: 4 }}>
                    {dogBreeds.map((breed) => (
                      <button
                        key={breed}
                        onClick={() => setSelectedBreed(breed)}
                        style={{ padding: '12px 10px', borderRadius: 12, border: selectedBreed === breed ? '2px solid #FF6B6B' : '2px solid #E8E8E8', background: selectedBreed === breed ? '#FFF0F0' : 'white', fontSize: 13, fontWeight: selectedBreed === breed ? 600 : 400, color: selectedBreed === breed ? '#FF6B6B' : '#555', cursor: 'pointer', transition: 'all 0.2s' }}
                      >
                        {breed}
                      </button>
                    ))}
                  </div>
                  <button 
                    onClick={() => selectedBreed && setLeadStep(2)}
                    disabled={!selectedBreed}
                    style={{ ...styles.btn, ...styles.btnPrimary, opacity: selectedBreed ? 1 : 0.5 }}
                  >
                    ถัดไป →
                  </button>
                </div>
              )}

              {/* Step 2: Owner Name */}
              {leadStep === 2 && (
                <div>
                  <div style={{ textAlign: 'center', marginBottom: 24 }}>
                    <div style={{ fontSize: 56, marginBottom: 12 }}>👤</div>
                    <h2 style={{ fontSize: 22, fontWeight: 800, color: '#333', marginBottom: 8 }}>คุณชื่ออะไร?</h2>
                    <p style={{ fontSize: 13, color: '#888' }}>พ่อ/แม่ของ {leadInfo.dogName} ({selectedBreed})</p>
                  </div>
                  <input
                    type="text"
                    placeholder="พิมพ์ชื่อคุณ..."
                    value={leadInfo.name}
                    onChange={(e) => setLeadInfo({...leadInfo, name: e.target.value})}
                    style={{ ...styles.input, fontSize: 18, textAlign: 'center', marginBottom: 20 }}
                  />
                  <button 
                    onClick={() => leadInfo.name.trim() && setLeadStep(3)}
                    disabled={!leadInfo.name.trim()}
                    style={{ ...styles.btn, ...styles.btnPrimary, opacity: leadInfo.name.trim() ? 1 : 0.5 }}
                  >
                    ถัดไป →
                  </button>
                </div>
              )}

              {/* Step 3: Contact */}
              {leadStep === 3 && (
                <div>
                  <div style={{ textAlign: 'center', marginBottom: 24 }}>
                    <div style={{ fontSize: 56, marginBottom: 12 }}>📧</div>
                    <h2 style={{ fontSize: 22, fontWeight: 800, color: '#333', marginBottom: 8 }}>ส่งผล DNA ไปที่ไหนดี?</h2>
                    <p style={{ fontSize: 13, color: '#888' }}>เพื่อรับผลวิเคราะห์ของ {leadInfo.dogName}</p>
                  </div>
                  <div style={{ marginBottom: 16 }}>
                    <label style={{ fontSize: 12, fontWeight: 600, color: '#555', marginBottom: 6, display: 'block' }}>
                      Email <span style={{ color: '#FF6B6B' }}>*</span>
                    </label>
                    <input
                      type="email"
                      placeholder="example@email.com"
                      value={leadInfo.email}
                      onChange={(e) => setLeadInfo({...leadInfo, email: e.target.value})}
                      style={{ ...styles.input, fontSize: 16, textAlign: 'center' }}
                    />
                  </div>
                  <div style={{ marginBottom: 20 }}>
                    <label style={{ fontSize: 12, fontWeight: 600, color: '#555', marginBottom: 6, display: 'block' }}>
                      เบอร์โทรศัพท์ <span style={{ color: '#999', fontWeight: 400 }}>(ไม่บังคับ)</span>
                    </label>
                    <input
                      type="tel"
                      placeholder="08X-XXX-XXXX"
                      value={leadInfo.contact}
                      onChange={(e) => setLeadInfo({...leadInfo, contact: e.target.value})}
                      style={{ ...styles.input, fontSize: 16, textAlign: 'center' }}
                    />
                    <div style={{ fontSize: 11, color: '#999', marginTop: 6, textAlign: 'center' }}>
                      💬 เพื่อรับ tips ดูแลน้องหมาผ่าน LINE
                    </div>
                  </div>
                  <button 
                    onClick={submitLead}
                    disabled={!leadInfo.email.includes('@')}
                    style={{ ...styles.btn, ...styles.btnPrimary, opacity: leadInfo.email.includes('@') ? 1 : 0.5 }}
                  >
                    🎉 ดูผลลัพธ์
                  </button>
                </div>
              )}

              {/* Back Button */}
              {leadStep > 0 && (
                <button
                  onClick={() => setLeadStep(leadStep - 1)}
                  style={{ background: 'transparent', border: 'none', color: '#888', marginTop: 16, cursor: 'pointer', fontSize: 14, width: '100%' }}
                >
                  ← ย้อนกลับ
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }

  // RESULT SCREEN
  if (screen === 'result') {
    const topicToShow = viewingResult || currentTopic;
    const score = viewingResult ? completedTopics[viewingResult.id]?.score : getScore();
    const personality = getPersonality(topicToShow.id, score);

    return (
      <div style={styles.container}>
        <div style={styles.content}>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: 24 }}>
            <div style={{ fontSize: 64, marginBottom: 16, filter: `drop-shadow(0 0 30px ${topicToShow.color}66)` }}>{topicToShow.emoji}</div>
            <h1 style={{ fontSize: 26, fontWeight: 800, color: 'white', marginBottom: 8 }}>{leadInfo.dogName || 'น้องหมา'}</h1>
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)' }}>{topicToShow.name} Result</p>
          </div>

          {/* Score Circle */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 24 }}>
            <div style={{ width: 140, height: 140, borderRadius: '50%', background: `conic-gradient(${topicToShow.color} ${score * 3.6}deg, rgba(255,255,255,0.1) 0deg)`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ width: 110, height: 110, borderRadius: '50%', background: '#1a1a2e', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: 36, fontWeight: 800, color: 'white' }}>{score}%</span>
                <span style={{ fontSize: 12, color: topicToShow.color }}>{topicToShow.dimension}</span>
              </div>
            </div>
          </div>

          {/* Personality */}
          <div style={{ ...styles.card, textAlign: 'center', marginBottom: 24, border: `2px solid ${topicToShow.color}66` }}>
            <h2 style={{ fontSize: 22, fontWeight: 700, color: topicToShow.color, marginBottom: 8 }}>{personality}</h2>
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.7)', lineHeight: 1.6 }}>
              {score >= 80 && `${leadInfo.dogName || 'น้องหมา'} มีคะแนน ${topicToShow.name} สูงมาก! นี่คือลักษณะพิเศษที่หายาก`}
              {score >= 60 && score < 80 && `${leadInfo.dogName || 'น้องหมา'} มีความสมดุลที่ดีในด้าน ${topicToShow.name}`}
              {score >= 40 && score < 60 && `${leadInfo.dogName || 'น้องหมา'} มีคุณลักษณะที่น่าสนใจใน ${topicToShow.name}`}
              {score < 40 && `${leadInfo.dogName || 'น้องหมา'} มีบุคลิกภาพที่เป็นเอกลักษณ์ใน ${topicToShow.name}`}
            </p>
          </div>

          {/* Science Insight */}
          <div style={{ ...styles.card, marginBottom: 24 }}>
            <h3 style={{ color: topicToShow.color, fontWeight: 600, marginBottom: 8 }}>🔬 Science Insight</h3>
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.7)', lineHeight: 1.6 }}>{topicToShow.scienceFact}</p>
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', gap: 12 }}>
            <button
              onClick={() => {
                setViewingResult(null);
                setScreen('overview');
              }}
              style={{ ...styles.btn, ...styles.btnSecondary, flex: 1 }}
            >
              ทำ Test อื่น
            </button>
            <button
              onClick={() => {
                setViewingResult(null);
                setScreen('dashboard');
              }}
              style={{ ...styles.btn, ...styles.btnPrimary, flex: 1 }}
            >
              📊 Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  // DASHBOARD SCREEN
  if (screen === 'dashboard') {
    const completedCount = Object.keys(completedTopics).length;

    return (
      <div style={styles.container}>
        <div style={styles.content}>
          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
            <button onClick={() => setScreen('overview')} style={{ background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: 10, padding: 10, cursor: 'pointer' }}>
              <span style={{ color: 'white', fontSize: 18 }}>←</span>
            </button>
            <div>
              <h1 style={{ fontSize: 22, fontWeight: 700, color: 'white' }}>📊 Dashboard</h1>
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)' }}>{leadInfo.dogName || 'น้องหมา'} • {completedCount}/12 Tests</p>
            </div>
          </div>

          {/* Progress */}
          <div style={{ marginBottom: 24 }}>
            <div style={{ height: 10, background: 'rgba(255,255,255,0.1)', borderRadius: 5, overflow: 'hidden' }}>
              <div style={{ width: `${(completedCount / 12) * 100}%`, height: '100%', background: 'linear-gradient(90deg, #FF6B6B, #FFD93D, #4ECDC4)', borderRadius: 5, transition: 'width 0.5s ease' }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8, fontSize: 11, color: 'rgba(255,255,255,0.5)' }}>
              <span>0%</span>
              <span>{Math.round((completedCount / 12) * 100)}% Complete</span>
              <span>100%</span>
            </div>
          </div>

          {/* Completed Tests */}
          <h2 style={{ fontSize: 16, fontWeight: 600, color: 'white', marginBottom: 16 }}>✅ ผลลัพธ์ของคุณ</h2>
          
          {completedCount === 0 ? (
            <div style={{ ...styles.card, textAlign: 'center' }}>
              <p style={{ color: 'rgba(255,255,255,0.6)' }}>ยังไม่มีผลลัพธ์ ไปทำ Test กันเถอะ!</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
              {Object.entries(completedTopics).map(([topicId, data]) => {
                const topic = allTopics.find(t => t.id === parseInt(topicId));
                const personality = getPersonality(parseInt(topicId), data.score);
                return (
                  <div
                    key={topicId}
                    onClick={() => {
                      setViewingResult(topic);
                      setScreen('result');
                    }}
                    style={{ ...styles.card, display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer', border: `1px solid ${topic.color}44` }}
                  >
                    <div style={{ fontSize: 32, width: 50, height: 50, borderRadius: 12, background: `${topic.color}33`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {topic.emoji}
                    </div>
                    <div style={{ flex: 1 }}>
                      <h3 style={{ fontSize: 14, fontWeight: 600, color: 'white', marginBottom: 4 }}>{topic.name}</h3>
                      <p style={{ fontSize: 12, color: topic.color }}>{personality}</p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: 20, fontWeight: 700, color: 'white' }}>{data.score}%</div>
                      <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)' }}>{topic.dimension}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Continue Button */}
          {completedCount < 12 && (
            <button
              onClick={() => setScreen('overview')}
              style={{ ...styles.btn, ...styles.btnPrimary }}
            >
              🐾 ทำ Test ถัดไป
            </button>
          )}
        </div>
      </div>
    );
  }

  // Default fallback
  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <p style={{ color: 'white' }}>Loading...</p>
      </div>
    </div>
  );
}
