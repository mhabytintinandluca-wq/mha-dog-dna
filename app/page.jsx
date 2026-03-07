'use client'
import { useState } from 'react'

// ===== DATA: 12 TOPICS =====
const topics = [
  { id: 1, name: 'The Stare Code', emoji: '👁️', dimension: 'BOND', color: 'from-yellow-400 to-amber-500', sequence: 1, description: 'ถอดรหัสการจ้องมอง', scienceFact: 'การจ้องตาระหว่างสุนัขและเจ้าของเพิ่ม Oxytocin ทั้งสองฝ่าย' },
  { id: 2, name: 'Empathy DNA', emoji: '😢', dimension: 'BOND', color: 'from-pink-400 to-rose-500', sequence: 1, description: 'ยีนแห่งความเห็นอกเห็นใจ', scienceFact: 'สุนัขมี Mirror Neurons ที่ทำให้รับรู้อารมณ์มนุษย์ได้' },
  { id: 3, name: '6th Sense', emoji: '🚪', dimension: 'BOND', color: 'from-purple-400 to-violet-500', sequence: 1, description: 'สัมผัสที่หก', scienceFact: 'สุนัขได้ยินเสียงความถี่สูงกว่ามนุษย์ 4 เท่า' },
  { id: 4, name: 'Food Blueprint', emoji: '🍖', dimension: 'DRIVE', color: 'from-orange-400 to-red-500', sequence: 2, description: 'พิมพ์เขียวความหิว', scienceFact: 'ยีน POMC ควบคุมความอยากอาหารและพลังงาน' },
  { id: 5, name: 'Play Personality', emoji: '🎾', dimension: 'DRIVE', color: 'from-green-400 to-emerald-500', sequence: 2, description: 'บุคลิกการเล่น', scienceFact: 'การเล่นช่วยพัฒนา Prefrontal Cortex ของสุนัข' },
  { id: 6, name: 'IQ Signal', emoji: '🧠', dimension: 'DRIVE', color: 'from-blue-400 to-cyan-500', sequence: 2, description: 'สัญญาณ IQ', scienceFact: 'สุนัขเฉลี่ยเข้าใจคำศัพท์ได้ 165 คำ' },
  { id: 7, name: 'Mind Reader', emoji: '🔮', dimension: 'MIND', color: 'from-indigo-400 to-purple-500', sequence: 3, description: 'อ่านใจเจ้าของ', scienceFact: 'สุนัขอ่าน Micro-expressions ของมนุษย์ได้' },
  { id: 8, name: 'Secret Language', emoji: '🗣️', dimension: 'MIND', color: 'from-teal-400 to-cyan-500', sequence: 3, description: 'ภาษาลับ', scienceFact: 'สุนัขมีเสียงเห่ามากกว่า 10 แบบที่มีความหมายต่างกัน' },
  { id: 9, name: 'Nerve Map', emoji: '⚡', dimension: 'NERVE', color: 'from-yellow-400 to-orange-500', sequence: 3, description: 'แผนที่ระบบประสาท', scienceFact: 'ยีน SLC6A4 ควบคุมระดับ Serotonin และความวิตกกังวล' },
  { id: 10, name: 'Alone Index', emoji: '🧳', dimension: 'NERVE', color: 'from-slate-400 to-gray-500', sequence: 4, description: 'ดัชนีอยู่คนเดียว', scienceFact: 'Separation Anxiety พบในสุนัข 20-40% ทั่วโลก' },
  { id: 11, name: 'Pack Code', emoji: '🐺', dimension: 'WILD', color: 'from-amber-400 to-yellow-500', sequence: 4, description: 'รหัสฝูง', scienceFact: 'สุนัขมี Social Hierarchy Gene จากบรรพบุรุษหมาป่า' },
  { id: 12, name: 'Wild Signal', emoji: '🌿', dimension: 'WILD', color: 'from-lime-400 to-green-500', sequence: 4, description: 'สัญญาณป่า', scienceFact: 'ยีน DRD4 ยาวทำให้สุนัขชอบผจญภัยและสำรวจ' }
]

// ===== DATA: QUESTIONS PER TOPIC (120 Questions) =====
const allQuestions = {
  1: [
    { id: 1, text: "น้องจ้องตาคุณระหว่างที่คุณกินข้าวไหม?", emoji: "👀" },
    { id: 2, text: "เวลาคุณพูดกับน้อง น้องเงยหน้ามองตาคุณไหม?", emoji: "🗣️" },
    { id: 3, text: "น้องจ้องมองคุณเมื่อต้องการความช่วยเหลือไหม?", emoji: "🆘" },
    { id: 4, text: "น้องสบตาคุณเมื่อได้ยินชื่อตัวเองไหม?", emoji: "📢" },
    { id: 5, text: "น้องมองตาคุณนานๆ โดยไม่หันไปไหนไหม?", emoji: "⏱️" },
    { id: 6, text: "น้องจ้องหน้าคุณเมื่อคุณร้องไห้หรือเศร้าไหม?", emoji: "😢" },
    { id: 7, text: "น้องมองตาคุณก่อนทำอะไรบางอย่าง (เช่น กระโดดขึ้นโซฟา)?", emoji: "🛋️" },
    { id: 8, text: "น้องสบตาคุณเมื่อมีคนแปลกหน้าเข้ามาไหม?", emoji: "👤" },
    { id: 9, text: "น้องจ้องมองคุณระหว่างเล่นด้วยกันไหม?", emoji: "🎾" },
    { id: 10, text: "น้องมองตาคุณเมื่อคุณกลับถึงบ้านไหม?", emoji: "🏠" }
  ],
  2: [
    { id: 1, text: "น้องเข้ามาหาเมื่อคุณร้องไห้ไหม?", emoji: "😢" },
    { id: 2, text: "น้องดูกังวลเมื่อคุณไม่สบายไหม?", emoji: "🤒" },
    { id: 3, text: "น้องนอนใกล้ๆ เมื่อคุณเศร้าไหม?", emoji: "😔" },
    { id: 4, text: "น้องเลียหน้าคุณเมื่อคุณร้องไห้ไหม?", emoji: "👅" },
    { id: 5, text: "น้องเปลี่ยนพฤติกรรมเมื่อคุณโกรธไหม?", emoji: "😠" },
    { id: 6, text: "น้องดูมีความสุขเมื่อคุณหัวเราะไหม?", emoji: "😄" },
    { id: 7, text: "น้องหลีกเลี่ยงเมื่อมีคนทะเลาะกันไหม?", emoji: "🗣️" },
    { id: 8, text: "น้องปลอบใจสมาชิกคนอื่นในบ้านไหม?", emoji: "👨‍👩‍👧" },
    { id: 9, text: "น้องรับรู้เมื่อคุณเครียดไหม?", emoji: "😰" },
    { id: 10, text: "น้องนิ่งเงียบเมื่อบรรยากาศตึงเครียดไหม?", emoji: "🤫" }
  ],
  3: [
    { id: 1, text: "น้องรู้ก่อนว่ามีคนจะมาถึงบ้านไหม?", emoji: "🚪" },
    { id: 2, text: "น้องตื่นเต้นก่อนที่คุณจะหยิบสายจูงไหม?", emoji: "🦮" },
    { id: 3, text: "น้องรู้ว่าคุณกำลังจะออกจากบ้านไหม?", emoji: "👋" },
    { id: 4, text: "น้องไปรอที่ประตูก่อนเวลาที่คุณกลับบ้านไหม?", emoji: "⏰" },
    { id: 5, text: "น้องรู้ว่าวันไหนเป็นวันหยุดไหม?", emoji: "📅" },
    { id: 6, text: "น้องตื่นเต้นก่อนเวลาอาหารไหม?", emoji: "🍽️" },
    { id: 7, text: "น้องรับรู้เมื่อจะมีพายุหรือฝนตกไหม?", emoji: "⛈️" },
    { id: 8, text: "น้องรู้ว่าคุณกำลังจะพาไปหาหมอไหม?", emoji: "🏥" },
    { id: 9, text: "น้องรู้ว่าใครกำลังจะโทรมาไหม?", emoji: "📱" },
    { id: 10, text: "น้องคาดเดาตารางประจำวันได้ไหม?", emoji: "📋" }
  ],
  4: [
    { id: 1, text: "น้องตื่นเต้นมากเวลาเห็นอาหารไหม?", emoji: "🤩" },
    { id: 2, text: "น้องกินอาหารหมดเร็วมากไหม?", emoji: "⚡" },
    { id: 3, text: "น้องขออาหารระหว่างที่คุณกินไหม?", emoji: "🥺" },
    { id: 4, text: "น้องเลือกกินเฉพาะอาหารที่ชอบไหม?", emoji: "🤔" },
    { id: 5, text: "น้องหาอาหารซ่อนไว้กินทีหลังไหม?", emoji: "🔍" },
    { id: 6, text: "น้องสนใจอาหารมากกว่าของเล่นไหม?", emoji: "🆚" },
    { id: 7, text: "น้องรู้เสียงถุงขนมไหม?", emoji: "👂" },
    { id: 8, text: "น้องกินจนอ้วนถ้าปล่อยให้กินเองไหม?", emoji: "🐷" },
    { id: 9, text: "น้องทำตามคำสั่งเพื่อแลกขนมไหม?", emoji: "🎁" },
    { id: 10, text: "น้องจำที่ซ่อนขนมได้ไหม?", emoji: "🧠" }
  ],
  5: [
    { id: 1, text: "น้องเล่นได้นานโดยไม่เหนื่อยไหม?", emoji: "🔋" },
    { id: 2, text: "น้องชอบเล่นไล่จับไหม?", emoji: "🏃" },
    { id: 3, text: "น้องชอบเล่นดึงเชือกไหม?", emoji: "🪢" },
    { id: 4, text: "น้องชอบเล่นซ่อนหาไหม?", emoji: "🙈" },
    { id: 5, text: "น้องเล่นกับของเล่นคนเดียวได้ไหม?", emoji: "🧸" },
    { id: 6, text: "น้องชอบเล่นน้ำไหม?", emoji: "💦" },
    { id: 7, text: "น้องรู้วิธีเล่นของเล่นใหม่เร็วไหม?", emoji: "🆕" },
    { id: 8, text: "น้องชวนคุณเล่นบ่อยไหม?", emoji: "🙋" },
    { id: 9, text: "น้องเล่นกับสุนัขตัวอื่นดีไหม?", emoji: "🐕‍🦺" },
    { id: 10, text: "น้องตื่นเต้นเมื่อเห็นของเล่นชิ้นโปรดไหม?", emoji: "⭐" }
  ],
  6: [
    { id: 1, text: "น้องเรียนรู้คำสั่งใหม่เร็วไหม?", emoji: "📚" },
    { id: 2, text: "น้องจำชื่อของเล่นแต่ละชิ้นได้ไหม?", emoji: "🏷️" },
    { id: 3, text: "น้องแก้ปัญหาหาขนมจาก puzzle ได้ไหม?", emoji: "🧩" },
    { id: 4, text: "น้องเข้าใจท่าทางมือของคุณไหม?", emoji: "👋" },
    { id: 5, text: "น้องจำเส้นทางเดินประจำได้ไหม?", emoji: "🗺️" },
    { id: 6, text: "น้องรู้จักสมาชิกในครอบครัวแต่ละคนไหม?", emoji: "👨‍👩‍👧‍👦" },
    { id: 7, text: "น้องเรียนรู้จากการดูสุนัขตัวอื่นไหม?", emoji: "👀" },
    { id: 8, text: "น้องหาของที่ซ่อนเก่งไหม?", emoji: "🔎" },
    { id: 9, text: "น้องเข้าใจคำว่า 'ไม่' ไหม?", emoji: "🚫" },
    { id: 10, text: "น้องรู้ชื่อคนในบ้านแต่ละคนไหม?", emoji: "📛" }
  ],
  7: [
    { id: 1, text: "น้องรู้ก่อนว่าคุณจะพาไปเดินเล่นไหม?", emoji: "🚶" },
    { id: 2, text: "น้องรู้เมื่อคุณกำลังจะให้ขนมไหม?", emoji: "🍪" },
    { id: 3, text: "น้องเข้าใจอารมณ์คุณจากน้ำเสียงไหม?", emoji: "🎵" },
    { id: 4, text: "น้องรู้ว่าคุณกำลังคิดอะไรอยู่ไหม?", emoji: "💭" },
    { id: 5, text: "น้องคาดเดาการกระทำถัดไปของคุณได้ไหม?", emoji: "🔮" },
    { id: 6, text: "น้องรู้ว่าคุณกำลังจะออกไปข้างนอกไหม?", emoji: "🚗" },
    { id: 7, text: "น้องรู้ว่าคุณโกรธโดยไม่ต้องพูดไหม?", emoji: "😤" },
    { id: 8, text: "น้องปรับพฤติกรรมตามอารมณ์คุณไหม?", emoji: "🔄" },
    { id: 9, text: "น้องรู้ว่าวันนี้วันพิเศษไหม?", emoji: "🎉" },
    { id: 10, text: "น้องเข้าใจความต้องการของคุณโดยไม่ต้องบอกไหม?", emoji: "🤝" }
  ],
  8: [
    { id: 1, text: "น้องมีเสียงเห่าหลายแบบไหม?", emoji: "🔊" },
    { id: 2, text: "น้องส่งเสียงครางเมื่อต้องการอะไรไหม?", emoji: "😩" },
    { id: 3, text: "น้องใช้ท่าทางสื่อสารกับคุณไหม?", emoji: "🐕" },
    { id: 4, text: "น้องเห่าเพื่อบอกอะไรบางอย่างไหม?", emoji: "💬" },
    { id: 5, text: "คุณเข้าใจสิ่งที่น้องต้องการจากเสียงไหม?", emoji: "👂" },
    { id: 6, text: "น้องมีเสียงพิเศษสำหรับคุณไหม?", emoji: "❤️" },
    { id: 7, text: "น้องส่งเสียงตอบเมื่อคุณพูดไหม?", emoji: "🗣️" },
    { id: 8, text: "น้องใช้หางสื่ออารมณ์ไหม?", emoji: "🐾" },
    { id: 9, text: "น้องใช้ตาสื่อสารกับคุณไหม?", emoji: "👁️" },
    { id: 10, text: "น้องเข้าใจเมื่อคุณพูดกับเขาไหม?", emoji: "🧏" }
  ],
  9: [
    { id: 1, text: "น้องตกใจเสียงดังไหม?", emoji: "💥" },
    { id: 2, text: "น้องกลัวพลุไหม?", emoji: "🎆" },
    { id: 3, text: "น้องสงบในสถานการณ์ใหม่ไหม?", emoji: "😌" },
    { id: 4, text: "น้องฟื้นตัวเร็วหลังตกใจไหม?", emoji: "⚡" },
    { id: 5, text: "น้องมั่นใจในที่แปลกใหม่ไหม?", emoji: "💪" },
    { id: 6, text: "น้องตอบสนองดีต่อคนแปลกหน้าไหม?", emoji: "👋" },
    { id: 7, text: "น้องผ่อนคลายในรถไหม?", emoji: "🚙" },
    { id: 8, text: "น้องใจเย็นเมื่อไปหาหมอไหม?", emoji: "🏥" },
    { id: 9, text: "น้องปรับตัวกับเสียงในบ้านได้ไหม?", emoji: "🏠" },
    { id: 10, text: "น้องนอนหลับสบายตอนกลางคืนไหม?", emoji: "😴" }
  ],
  10: [
    { id: 1, text: "น้องอยู่บ้านคนเดียวได้สบายไหม?", emoji: "🏠" },
    { id: 2, text: "น้องร้องเมื่อคุณออกไปไหม?", emoji: "😭" },
    { id: 3, text: "น้องทำลายของเมื่ออยู่คนเดียวไหม?", emoji: "💔" },
    { id: 4, text: "น้องตามคุณทุกห้องไหม?", emoji: "🚶‍♂️" },
    { id: 5, text: "น้องตื่นเต้นมากเมื่อคุณกลับบ้านไหม?", emoji: "🎉" },
    { id: 6, text: "น้องกังวลเมื่อคุณเตรียมออกไปไหม?", emoji: "😰" },
    { id: 7, text: "น้องนอนหลับเมื่ออยู่คนเดียวได้ไหม?", emoji: "😴" },
    { id: 8, text: "น้องกินอาหารเมื่อคุณไม่อยู่ไหม?", emoji: "🍽️" },
    { id: 9, text: "น้องเล่นของเล่นเมื่ออยู่คนเดียวไหม?", emoji: "🧸" },
    { id: 10, text: "น้องต้องการให้คุณอยู่ด้วยตลอดไหม?", emoji: "🤗" }
  ],
  11: [
    { id: 1, text: "น้องเป็นผู้นำในกลุ่มน้องหมาไหม?", emoji: "👑" },
    { id: 2, text: "น้องยอมให้สุนัขตัวอื่นนำไหม?", emoji: "🐕" },
    { id: 3, text: "น้องเล่นกับสุนัขทุกขนาดได้ไหม?", emoji: "🐕‍🦺" },
    { id: 4, text: "น้องแบ่งของเล่นกับสุนัขอื่นไหม?", emoji: "🤝" },
    { id: 5, text: "น้องปกป้องอาหารจากสุนัขอื่นไหม?", emoji: "🍖" },
    { id: 6, text: "น้องชอบอยู่กับสุนัขตัวอื่นไหม?", emoji: "❤️" },
    { id: 7, text: "น้องเข้ากับสุนัขใหม่ได้เร็วไหม?", emoji: "👋" },
    { id: 8, text: "น้องมีเพื่อนสุนัขที่สนิทไหม?", emoji: "👯" },
    { id: 9, text: "น้องเครียดเมื่ออยู่กับสุนัขหลายตัวไหม?", emoji: "😓" },
    { id: 10, text: "น้องสื่อสารกับสุนัขอื่นได้ดีไหม?", emoji: "💬" }
  ],
  12: [
    { id: 1, text: "น้องไล่จับสัตว์เล็กๆ ไหม?", emoji: "🐿️" },
    { id: 2, text: "น้องชอบขุดดินไหม?", emoji: "🕳️" },
    { id: 3, text: "น้องชอบดมกลิ่นทุกอย่างไหม?", emoji: "👃" },
    { id: 4, text: "น้องตื่นเต้นเมื่อเห็นนกไหม?", emoji: "🐦" },
    { id: 5, text: "น้องชอบสำรวจที่ใหม่ๆ ไหม?", emoji: "🗺️" },
    { id: 6, text: "น้องกลิ้งตัวบนหญ้าไหม?", emoji: "🌿" },
    { id: 7, text: "น้องหอนเมื่อได้ยินเสียงบางอย่างไหม?", emoji: "🐺" },
    { id: 8, text: "น้องชอบเดินป่าไหม?", emoji: "🌲" },
    { id: 9, text: "น้องตามกลิ่นไปไกลไหม?", emoji: "🔍" },
    { id: 10, text: "น้องชอบอยู่ข้างนอกมากกว่าในบ้านไหม?", emoji: "☀️" }
  ]
}

// ===== DATA: PERSONALITY TYPES PER TOPIC =====
const personalityTypes = {
  1: {
    high: { name: "Soul Gazer", emoji: "🌟", title: "นักจ้องมองวิญญาณ", description: "น้องหมาที่สื่อสารผ่านดวงตาได้อย่างลึกซึ้ง", gene: "OXTR", science: "มีการแสดงออกของยีน Oxytocin Receptor สูง ทำให้เกิดความผูกพันผ่านการสบตาได้ดีเยี่ยม" },
    medium: { name: "Heart Reader", emoji: "💕", title: "นักอ่านใจ", description: "น้องหมาที่เข้าใจคุณผ่านการมองตา", gene: "Mirror Neuron", science: "มี Mirror Neurons ที่ทำงานดี สามารถรับรู้อารมณ์ผ่านการสบตาได้" },
    low: { name: "Casual Connector", emoji: "🤝", title: "เพื่อนสบายๆ", description: "น้องหมาที่ผูกพันแบบไม่ยึดติด", gene: "Secure Attachment", science: "มี Attachment Style แบบ Secure สามารถผูกพันได้โดยไม่ต้องสบตาตลอดเวลา" },
    veryLow: { name: "Independent Spirit", emoji: "🦊", title: "วิญญาณอิสระ", description: "น้องหมาที่มีโลกส่วนตัว", gene: "DRD4 Long", science: "มียีน DRD4 แบบยาว ทำให้ชอบสำรวจมากกว่าสบตา" }
  },
  2: {
    high: { name: "Emotion Sponge", emoji: "🫂", title: "ฟองน้ำอารมณ์", description: "น้องหมาที่ซึมซับอารมณ์คุณได้ทั้งหมด", gene: "OXTR+", science: "มียีน Oxytocin Receptor ที่ไวมาก ทำให้รับรู้และตอบสนองอารมณ์ได้ดีเยี่ยม" },
    medium: { name: "Comfort Buddy", emoji: "🤗", title: "บัดดี้ปลอบใจ", description: "น้องหมาที่คอยอยู่เคียงข้างเวลาเศร้า", gene: "Mirror Neuron", science: "มี Mirror Neurons ที่ทำงานดี สามารถเข้าใจเมื่อคุณต้องการกำลังใจ" },
    low: { name: "Chill Observer", emoji: "😎", title: "นักสังเกตสบายๆ", description: "น้องหมาที่แคร์แต่ไม่แสดงออกมาก", gene: "Balanced", science: "มีการทำงานของระบบ Empathy ที่สมดุล" },
    veryLow: { name: "Zen Master", emoji: "🧘", title: "ปรมาจารย์เซน", description: "น้องหมาที่สงบไม่ว่าอะไรจะเกิด", gene: "Low Reactivity", science: "มีระบบตอบสนองต่อสิ่งเร้าต่ำ ทำให้สงบนิ่งเสมอ" }
  },
  3: {
    high: { name: "Psychic Pup", emoji: "🔮", title: "ลูกหมาจิตสัมผัส", description: "น้องหมาที่รู้ล่วงหน้าได้อย่างน่าทึ่ง", gene: "Enhanced Sensory", science: "มีประสาทสัมผัสที่ไวกว่าปกติ สามารถรับรู้การเปลี่ยนแปลงเล็กน้อยได้" },
    medium: { name: "Keen Observer", emoji: "🦉", title: "นักสังเกตการณ์", description: "น้องหมาที่จับรายละเอียดได้ดี", gene: "Pattern Recognition", science: "มีความสามารถในการจดจำ Pattern ดี" },
    low: { name: "Easy Going", emoji: "😊", title: "สบายๆ ชิลล์ๆ", description: "น้องหมาที่ไม่ซีเรียสกับการเปลี่ยนแปลง", gene: "Flexible", science: "มีความยืดหยุ่นสูง ปรับตัวได้ดี" },
    veryLow: { name: "Chill Dude", emoji: "😴", title: "นายชิลล์", description: "น้องหมาที่อยู่กับปัจจุบันเสมอ", gene: "Present Focus", science: "โฟกัสกับสิ่งที่เกิดขึ้นตรงหน้ามากกว่าคาดเดา" }
  },
  4: {
    high: { name: "Food Fanatic", emoji: "🤤", title: "คลั่งไคล้อาหาร", description: "น้องหมาที่อาหารคือทุกสิ่ง", gene: "POMC High", science: "มียีน POMC ที่ทำงานมาก ทำให้มีความอยากอาหารสูง" },
    medium: { name: "Balanced Eater", emoji: "🍽️", title: "นักกินสมดุล", description: "น้องหมาที่กินตามความหิว", gene: "POMC Normal", science: "มีการควบคุมความอยากอาหารปกติ" },
    low: { name: "Picky Eater", emoji: "🤔", title: "นักกินจู้จี้", description: "น้องหมาที่เลือกกิน", gene: "Selective", science: "มีความเลือกในการกินสูง" },
    veryLow: { name: "Food Skeptic", emoji: "🙄", title: "ไม่แน่ใจเรื่องอาหาร", description: "น้องหมาที่อาหารไม่ใช่เรื่องสำคัญ", gene: "Low POMC", science: "มียีน POMC ที่ทำงานน้อย ทำให้ไม่ค่อยหิว" }
  },
  5: {
    high: { name: "Play Monster", emoji: "🎉", title: "ปีศาจแห่งการเล่น", description: "น้องหมาที่พลังงานไม่มีหมด", gene: "High Energy", science: "มีระดับ Dopamine สูง ทำให้ชอบเล่นตลอดเวลา" },
    medium: { name: "Active Player", emoji: "🐕", title: "นักเล่นตัวยง", description: "น้องหมาที่ชอบเล่นอย่างสมดุล", gene: "Balanced Energy", science: "มีพลังงานสมดุล เล่นและพักผ่อนได้ดี" },
    low: { name: "Couch Potato", emoji: "🛋️", title: "นักนอนโซฟา", description: "น้องหมาที่ชอบพักผ่อนมากกว่า", gene: "Low Energy", science: "มีพลังงานต่ำ ชอบนอนเล่นมากกว่าวิ่งเล่น" },
    veryLow: { name: "Zen Sleeper", emoji: "😴", title: "ยอดนักหลับ", description: "น้องหมาที่นอนคือชีวิต", gene: "Very Low Energy", science: "มีระดับการเผาผลาญต่ำ ชอบนอนมากเป็นพิเศษ" }
  },
  6: {
    high: { name: "Genius Pup", emoji: "🎓", title: "ลูกหมาอัจฉริยะ", description: "น้องหมาที่ฉลาดหลักแหลม", gene: "WBSCR17 High", science: "มียีน WBSCR17 ที่ทำงานมาก ทำให้มีความสามารถในการเรียนรู้สูง" },
    medium: { name: "Smart Cookie", emoji: "🍪", title: "ฉลาดน่ารัก", description: "น้องหมาที่เรียนรู้ได้ดี", gene: "WBSCR17 Normal", science: "มีความสามารถในการเรียนรู้ปกติ" },
    low: { name: "Sweet Simpleton", emoji: "🥰", title: "น่ารักซื่อๆ", description: "น้องหมาที่รักด้วยใจไม่ใช่สมอง", gene: "Simple", science: "เรียนรู้ช้าแต่รักเจ้าของมาก" },
    veryLow: { name: "Lovable Goofball", emoji: "🤪", title: "ตลกน่ารัก", description: "น้องหมาที่ทำอะไรก็ดูน่ารักไปหมด", gene: "Goofy Gene", science: "มีเสน่ห์แบบน่ารักซุ่มซ่าม" }
  },
  7: {
    high: { name: "Telepathic Pup", emoji: "🧿", title: "หมาเทเลพาธี", description: "น้องหมาที่อ่านใจคุณได้", gene: "High Intuition", science: "มีความสามารถในการอ่านภาษากายและ Micro-expressions สูงมาก" },
    medium: { name: "Intuitive", emoji: "💫", title: "สัญชาตญาณดี", description: "น้องหมาที่เข้าใจคุณดี", gene: "Intuitive", science: "มีสัญชาตญาณในการเข้าใจเจ้าของดี" },
    low: { name: "Present Moment", emoji: "🌸", title: "อยู่กับปัจจุบัน", description: "น้องหมาที่โฟกัสกับตรงหน้า", gene: "Present", science: "ใช้ชีวิตอยู่กับปัจจุบันมากกว่าคาดเดา" },
    veryLow: { name: "Surprise Lover", emoji: "🎁", title: "รักความเซอร์ไพรส์", description: "น้องหมาที่ไม่คาดเดาอะไร", gene: "Surprise", science: "ตอบรับทุกอย่างที่เกิดขึ้นอย่างตื่นเต้น" }
  },
  8: {
    high: { name: "Master Communicator", emoji: "📢", title: "ปรมาจารย์สื่อสาร", description: "น้องหมาที่สื่อสารได้ชัดเจน", gene: "FOXP2 High", science: "มียีน FOXP2 ที่ทำงานดี ทำให้สื่อสารได้หลากหลายวิธี" },
    medium: { name: "Expressive", emoji: "🎭", title: "แสดงออกได้ดี", description: "น้องหมาที่บอกความต้องการได้", gene: "FOXP2 Normal", science: "มีความสามารถในการสื่อสารปกติ" },
    low: { name: "Silent Type", emoji: "🤫", title: "เงียบๆ ลึกๆ", description: "น้องหมาที่ไม่ค่อยส่งเสียง", gene: "Quiet", science: "มีแนวโน้มเงียบสงบ ไม่ค่อยเห่า" },
    veryLow: { name: "Mystery Dog", emoji: "🎭", title: "หมาปริศนา", description: "น้องหมาที่อ่านยาก", gene: "Mysterious", science: "มีการแสดงออกน้อย ต้องสังเกตดีๆ" }
  },
  9: {
    high: { name: "Fearless Hero", emoji: "🦸", title: "ฮีโร่ไร้กลัว", description: "น้องหมาที่กล้าหาญมาก", gene: "Low SLC6A4", science: "มีระดับ Serotonin ที่สมดุล ทำให้ไม่วิตกกังวล" },
    medium: { name: "Balanced Brave", emoji: "⚖️", title: "กล้าหาญสมดุล", description: "น้องหมาที่มีความกลัวตามปกติ", gene: "Normal SLC6A4", science: "มีระดับ Serotonin ปกติ" },
    low: { name: "Sensitive Soul", emoji: "🌸", title: "วิญญาณอ่อนไหว", description: "น้องหมาที่รู้สึกไวกว่าปกติ", gene: "High SLC6A4", science: "มีระดับ Serotonin ที่ผันผวน ทำให้ไวต่อสิ่งเร้า" },
    veryLow: { name: "Anxious Angel", emoji: "😰", title: "นางฟ้าขี้กังวล", description: "น้องหมาที่ต้องการการดูแลพิเศษ", gene: "Very High SLC6A4", science: "มีแนวโน้มวิตกกังวลสูง ต้องการสภาพแวดล้อมที่สงบ" }
  },
  10: {
    high: { name: "Independent", emoji: "🦅", title: "อินดี้อิสระ", description: "น้องหมาที่อยู่คนเดียวได้สบาย", gene: "Secure Attachment", science: "มี Attachment Style แบบ Secure สามารถอยู่คนเดียวได้ดี" },
    medium: { name: "Adaptable", emoji: "🔄", title: "ปรับตัวได้", description: "น้องหมาที่อยู่ได้ทั้งสองแบบ", gene: "Flexible Attachment", science: "มีความยืดหยุ่นในการอยู่คนเดียวหรือกับคน" },
    low: { name: "Velcro Dog", emoji: "🤗", title: "หมาเวลโคร", description: "น้องหมาที่ติดเจ้าของมาก", gene: "Anxious Attachment", science: "มี Attachment Style แบบ Anxious ต้องการอยู่ใกล้เจ้าของ" },
    veryLow: { name: "Shadow", emoji: "🥺", title: "เงาตามตัว", description: "น้องหมาที่ต้องอยู่กับคุณตลอด", gene: "High Anxiety", science: "มีความวิตกกังวลเมื่อต้องอยู่คนเดียว" }
  },
  11: {
    high: { name: "Alpha Leader", emoji: "👑", title: "ผู้นำฝูง", description: "น้องหมาที่เป็นหัวหน้าโดยธรรมชาติ", gene: "Alpha Gene", science: "มียีนความเป็นผู้นำจากบรรพบุรุษหมาป่า" },
    medium: { name: "Team Player", emoji: "🤝", title: "ผู้เล่นทีม", description: "น้องหมาที่ทำงานร่วมกับคนอื่นได้ดี", gene: "Social Gene", science: "มีความสามารถในการทำงานเป็นทีมดี" },
    low: { name: "Happy Follower", emoji: "🐾", title: "ผู้ตามที่มีความสุข", description: "น้องหมาที่ยินดีให้คนอื่นนำ", gene: "Submissive", science: "มีแนวโน้มยอมตามผู้อื่น ไม่แย่งชิง" },
    veryLow: { name: "Lone Wolf", emoji: "🐺", title: "หมาป่าโดดเดี่ยว", description: "น้องหมาที่ชอบอยู่คนเดียว", gene: "Solitary", science: "ชอบอยู่คนเดียวมากกว่าอยู่เป็นฝูง" }
  },
  12: {
    high: { name: "Wild Heart", emoji: "🐺", title: "หัวใจป่า", description: "น้องหมาที่มีสัญชาตญาณป่าสูง", gene: "DRD4 Long", science: "มียีน DRD4 แบบยาว ทำให้ชอบสำรวจและผจญภัย" },
    medium: { name: "Nature Lover", emoji: "🌳", title: "คนรักธรรมชาติ", description: "น้องหมาที่ชอบอยู่กับธรรมชาติ", gene: "DRD4 Medium", science: "มีความสนใจธรรมชาติในระดับปานกลาง" },
    low: { name: "City Dog", emoji: "🏙️", title: "หมาเมือง", description: "น้องหมาที่ปรับตัวกับเมืองได้ดี", gene: "DRD4 Short", science: "มียีน DRD4 แบบสั้น ทำให้ชอบความสะดวกสบาย" },
    veryLow: { name: "Couch Companion", emoji: "🛋️", title: "เพื่อนบนโซฟา", description: "น้องหมาที่บ้านคือสวรรค์", gene: "Domestic", science: "มีสัญชาตญาณบ้านสูง ไม่ค่อยสนใจข้างนอก" }
  }
}

// ===== DATA: BREEDS =====
const breeds = [
  "ไทยหลังอาน", "ไทยบางแก้ว", "ชิวาวา", "ปอมเมอเรเนียน",
  "ชิสุ", "พุดเดิ้ล", "โกลเด้น", "ลาบราดอร์",
  "บีเกิ้ล", "คอร์กี้", "ไซบีเรียน", "ชเนาเซอร์",
  "บูลด็อก", "ปั๊ก", "มิกซ์/ไม่ทราบ", "อื่นๆ"
]

// ===== MAIN COMPONENT =====
export default function DogDNAQuiz() {
  // App State
  const [screen, setScreen] = useState('landing')
  const [currentTopic, setCurrentTopic] = useState(null)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState({})
  const [completedTopics, setCompletedTopics] = useState([])
  const [topicScores, setTopicScores] = useState({})
  
  // Lead State
  const [leadStep, setLeadStep] = useState(0)
  const [leadInfo, setLeadInfo] = useState({
    dogName: '',
    breed: '',
    ownerName: '',
    email: '',
    phone: ''
  })

  // Get current topic data
  const topic = currentTopic ? topics.find(t => t.id === currentTopic) : null
  const questions = currentTopic ? allQuestions[currentTopic] : []

  // Handle answer
  const handleAnswer = (isYes) => {
    const newAnswers = { ...answers }
    if (!newAnswers[currentTopic]) newAnswers[currentTopic] = []
    newAnswers[currentTopic][currentQuestion] = isYes ? 1 : 0
    setAnswers(newAnswers)

    if (currentQuestion < 9) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      // Calculate score
      const score = newAnswers[currentTopic].reduce((a, b) => a + b, 0) * 10
      setTopicScores({ ...topicScores, [currentTopic]: score })
      setLeadStep(0)
      setScreen('leadgate')
    }
  }

  // Get personality based on score
  const getPersonality = (topicId, score) => {
    const types = personalityTypes[topicId]
    if (score >= 80) return types.high
    if (score >= 60) return types.medium
    if (score >= 40) return types.low
    return types.veryLow
  }

  // Lead gate validation
  const canProceedLead = () => {
    switch (leadStep) {
      case 0: return leadInfo.dogName.trim().length > 0
      case 1: return leadInfo.breed.length > 0
      case 2: return leadInfo.ownerName.trim().length > 0
      case 3: return leadInfo.email.includes('@')
      default: return false
    }
  }

  // Complete lead gate
  const completeLead = () => {
    if (!completedTopics.includes(currentTopic)) {
      setCompletedTopics([...completedTopics, currentTopic])
    }
    setScreen('result')
  }

  // Start topic
  const startTopic = (topicId) => {
    setCurrentTopic(topicId)
    setCurrentQuestion(0)
    setScreen('intro')
  }

  // ===== SCREENS =====
  
  // Landing Screen
  const LandingScreen = () => (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
      <div className="text-8xl mb-6 animate-bounce">🧬</div>
      <h1 className="text-3xl font-bold text-white mb-2">Dog Profile</h1>
      <p className="text-amber-400 text-lg mb-8">Science & Secret</p>
      
      <div className="text-gray-300 space-y-3 mb-10 max-w-sm">
        <p>น้องหมาทุกตัวมี 'บุคลิกภาพ' ที่ซ่อนอยู่ใน DNA</p>
        <p className="text-amber-400">MHA' Story จะช่วยให้คุณค้นพบความลับนั้น</p>
        <p>เพื่อความเข้าใจที่ลึกซึ้ง และความรักที่เติบโต</p>
      </div>

      <button
        onClick={() => setScreen('overview')}
        className="bg-gradient-to-r from-amber-400 to-yellow-500 text-black font-bold py-4 px-12 rounded-full text-lg shadow-lg hover:scale-105 transition-transform"
      >
        🐾 เริ่มค้นหา
      </button>

      <p className="text-gray-500 text-sm mt-8">MHA' BY TIN TIN & LUCA</p>
    </div>
  )

  // Overview Screen
  const OverviewScreen = () => {
    const sequences = [1, 2, 3, 4]
    const sequenceNames = ['Heart Bond 💛', 'Energy Drive ⚡', 'Mind Power 🧠', 'Wild Instinct 🐺']
    
    return (
      <div className="min-h-screen p-4 pb-20">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-white">🧬 Dog DNA Quiz</h1>
          <p className="text-gray-400">เลือก Topic ที่ต้องการทดสอบ</p>
        </div>

        {sequences.map((seq, idx) => (
          <div key={seq} className="mb-6">
            <h2 className="text-lg font-bold text-amber-400 mb-3">
              Paw Sequence {seq}: {sequenceNames[idx]}
            </h2>
            <div className="grid grid-cols-3 gap-3">
              {topics.filter(t => t.sequence === seq).map(t => {
                const isCompleted = completedTopics.includes(t.id)
                const isLocked = seq > 1 && !completedTopics.some(c => topics.find(x => x.id === c)?.sequence === seq - 1)
                
                return (
                  <button
                    key={t.id}
                    onClick={() => !isLocked && startTopic(t.id)}
                    disabled={isLocked}
                    className={`relative p-4 rounded-xl text-center transition-all ${
                      isCompleted 
                        ? 'bg-gradient-to-br from-green-400/30 to-emerald-500/30 border-2 border-green-400' 
                        : isLocked
                          ? 'bg-gray-800/50 opacity-50'
                          : 'bg-white/10 hover:bg-white/20 border border-white/20'
                    }`}
                  >
                    {isCompleted && (
                      <span className="absolute top-1 right-1 text-green-400 text-sm">✓</span>
                    )}
                    {isLocked && (
                      <span className="absolute bottom-1 right-1 text-gray-500 text-xs">🔒</span>
                    )}
                    <div className={`text-3xl mb-2 ${isLocked ? 'grayscale' : ''}`}>{t.emoji}</div>
                    <div className="text-xs text-white font-medium truncate">{t.name}</div>
                  </button>
                )
              })}
            </div>
          </div>
        ))}

        {completedTopics.length > 0 && (
          <button
            onClick={() => setScreen('dashboard')}
            className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-amber-500 text-black font-bold py-3 px-8 rounded-full shadow-lg"
          >
            📊 ดู Dashboard ({completedTopics.length}/12)
          </button>
        )}
      </div>
    )
  }

  // Topic Intro Screen
  const IntroScreen = () => (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
      <div className={`text-7xl mb-6 p-6 rounded-full bg-gradient-to-br ${topic.color}`}>
        {topic.emoji}
      </div>
      <h1 className="text-2xl font-bold text-white mb-2">{topic.name}</h1>
      <p className="text-amber-400 mb-4">{topic.description}</p>
      
      <div className="bg-white/10 rounded-xl p-4 mb-8 max-w-sm">
        <p className="text-sm text-gray-300">
          🔬 <span className="text-amber-400">Science:</span> {topic.scienceFact}
        </p>
      </div>

      <button
        onClick={() => setScreen('quiz')}
        className="bg-gradient-to-r from-amber-400 to-yellow-500 text-black font-bold py-4 px-12 rounded-full text-lg"
      >
        เริ่มทดสอบ →
      </button>

      <button
        onClick={() => setScreen('overview')}
        className="text-gray-400 mt-4"
      >
        ← กลับ
      </button>
    </div>
  )

  // Quiz Screen
  const QuizScreen = () => (
    <div className="min-h-screen flex flex-col p-4">
      {/* Progress */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-gray-400 mb-2">
          <span>{topic.emoji} {topic.name}</span>
          <span>{currentQuestion + 1}/10</span>
        </div>
        <div className="h-2 bg-white/20 rounded-full overflow-hidden">
          <div 
            className={`h-full bg-gradient-to-r ${topic.color} transition-all duration-300`}
            style={{ width: `${(currentQuestion + 1) * 10}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="text-6xl mb-6">{questions[currentQuestion]?.emoji}</div>
        <h2 className="text-xl text-white text-center mb-12 px-4">
          {questions[currentQuestion]?.text}
        </h2>

        {/* Answer Buttons */}
        <div className="flex gap-8">
          <button
            onClick={() => handleAnswer(false)}
            className="w-24 h-24 rounded-full bg-gradient-to-br from-gray-600 to-gray-700 text-4xl flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
          >
            😅
          </button>
          <button
            onClick={() => handleAnswer(true)}
            className="w-24 h-24 rounded-full bg-gradient-to-br from-pink-500 to-rose-500 text-4xl flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
          >
            😍
          </button>
        </div>
        <div className="flex gap-16 mt-3 text-sm text-gray-400">
          <span>ไม่ใช่เลย</span>
          <span>ใช่เลย!</span>
        </div>
      </div>
    </div>
  )

  // Lead Gate Screen
  const LeadGateScreen = () => {
    const steps = [
      { title: "น้องหมาชื่ออะไร?", emoji: "🐕", field: "dogName", type: "text" },
      { title: "น้องเป็นสายพันธุ์อะไร?", emoji: "🐾", field: "breed", type: "breed" },
      { title: "คุณชื่ออะไร?", emoji: "👤", field: "ownerName", type: "text" },
      { title: "ช่องทางติดต่อ", emoji: "📧", field: "contact", type: "contact" }
    ]

    const currentStepData = steps[leadStep]

    return (
      <div className="min-h-screen flex flex-col p-6">
        {/* Progress Dots */}
        <div className="flex justify-center gap-2 mb-8">
          {steps.map((_, idx) => (
            <div
              key={idx}
              className={`w-3 h-3 rounded-full transition-all ${
                idx === leadStep ? 'bg-amber-400 w-8' : idx < leadStep ? 'bg-green-400' : 'bg-white/30'
              }`}
            />
          ))}
        </div>

        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="text-6xl mb-4">{currentStepData.emoji}</div>
          <h2 className="text-xl text-white mb-6">{currentStepData.title}</h2>

          {/* Text Input */}
          {currentStepData.type === 'text' && (
            <input
              type="text"
              value={leadInfo[currentStepData.field]}
              onChange={(e) => setLeadInfo({ ...leadInfo, [currentStepData.field]: e.target.value })}
              className="w-full max-w-sm bg-white/10 border border-white/30 rounded-xl px-4 py-3 text-white text-center text-lg focus:outline-none focus:border-amber-400"
              placeholder="พิมพ์ที่นี่..."
              autoFocus
            />
          )}

          {/* Breed Grid */}
          {currentStepData.type === 'breed' && (
            <div className="grid grid-cols-4 gap-2 w-full max-w-md">
              {breeds.map(breed => (
                <button
                  key={breed}
                  onClick={() => setLeadInfo({ ...leadInfo, breed })}
                  className={`p-2 rounded-lg text-xs transition-all ${
                    leadInfo.breed === breed
                      ? 'bg-amber-400 text-black font-bold'
                      : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  {breed}
                </button>
              ))}
            </div>
          )}

          {/* Contact Input */}
          {currentStepData.type === 'contact' && (
            <div className="w-full max-w-sm space-y-4">
              <div>
                <label className="text-amber-400 text-sm">📧 Email *</label>
                <input
                  type="email"
                  value={leadInfo.email}
                  onChange={(e) => setLeadInfo({ ...leadInfo, email: e.target.value })}
                  className="w-full bg-white/10 border border-white/30 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-400 mt-1"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="text-gray-400 text-sm">📱 เบอร์โทร (optional)</label>
                <input
                  type="tel"
                  value={leadInfo.phone}
                  onChange={(e) => setLeadInfo({ ...leadInfo, phone: e.target.value })}
                  className="w-full bg-white/10 border border-white/30 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-400 mt-1"
                  placeholder="0812345678"
                />
                <p className="text-gray-500 text-xs mt-1">💬 เพื่อรับ tips ดูแลน้องหมาผ่าน LINE</p>
              </div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex gap-4 mt-8">
          {leadStep > 0 && (
            <button
              onClick={() => setLeadStep(leadStep - 1)}
              className="flex-1 py-3 rounded-full border border-white/30 text-white"
            >
              ← ย้อนกลับ
            </button>
          )}
          <button
            onClick={() => {
              if (leadStep < 3) setLeadStep(leadStep + 1)
              else completeLead()
            }}
            disabled={!canProceedLead()}
            className={`flex-1 py-3 rounded-full font-bold transition-all ${
              canProceedLead()
                ? 'bg-gradient-to-r from-amber-400 to-yellow-500 text-black'
                : 'bg-gray-600 text-gray-400'
            }`}
          >
            {leadStep < 3 ? 'ถัดไป →' : '🎉 ดูผลลัพธ์'}
          </button>
        </div>
      </div>
    )
  }

  // Result Screen
  const ResultScreen = () => {
    const score = topicScores[currentTopic] || 0
    const personality = getPersonality(currentTopic, score)

    return (
      <div className="min-h-screen p-4 pb-20">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="text-6xl mb-4">{personality.emoji}</div>
          <h1 className="text-2xl font-bold text-white">{personality.name}</h1>
          <p className="text-amber-400">{personality.title}</p>
        </div>

        {/* Score */}
        <div className="bg-white/10 rounded-xl p-4 mb-6 text-center">
          <div className="text-4xl font-bold text-amber-400">{score}%</div>
          <p className="text-gray-400">{topic.name} Score</p>
        </div>

        {/* Sections */}
        <div className="space-y-4">
          {/* Description */}
          <div className="bg-white/10 rounded-xl p-4">
            <h3 className="text-amber-400 font-bold mb-2">🧬 DNA Analysis</h3>
            <p className="text-gray-300">{personality.description}</p>
          </div>

          {/* Science */}
          <div className="bg-white/10 rounded-xl p-4">
            <h3 className="text-amber-400 font-bold mb-2">🔬 Science Secret</h3>
            <p className="text-gray-300">
              <span className="text-white font-medium">{personality.gene}:</span> {personality.science}
            </p>
          </div>

          {/* Dog Name */}
          <div className="bg-gradient-to-r from-amber-400/20 to-yellow-500/20 rounded-xl p-4 border border-amber-400/50">
            <h3 className="text-amber-400 font-bold mb-2">🐕 {leadInfo.dogName}</h3>
            <p className="text-gray-300">
              {leadInfo.dogName} ({leadInfo.breed}) มีบุคลิกภาพแบบ {personality.title}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-[#1a1a2e] to-transparent">
          <div className="flex gap-3">
            <button
              onClick={() => setScreen('overview')}
              className="flex-1 py-3 rounded-full border border-white/30 text-white"
            >
              ทำ Topic อื่น
            </button>
            <button
              onClick={() => setScreen('dashboard')}
              className="flex-1 py-3 rounded-full bg-amber-500 text-black font-bold"
            >
              📊 Dashboard
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Dashboard Screen
  const DashboardScreen = () => (
    <div className="min-h-screen p-4 pb-20">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-white">📊 Dashboard</h1>
        <p className="text-gray-400">{leadInfo.dogName} • {completedTopics.length}/12 Tests</p>
      </div>

      {/* Progress */}
      <div className="bg-white/10 rounded-xl p-4 mb-6">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-gray-400">Progress</span>
          <span className="text-amber-400">{Math.round(completedTopics.length / 12 * 100)}%</span>
        </div>
        <div className="h-3 bg-white/20 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-amber-400 to-yellow-500"
            style={{ width: `${completedTopics.length / 12 * 100}%` }}
          />
        </div>
      </div>

      {/* Completed Topics */}
      <h2 className="text-lg font-bold text-white mb-3">✅ ผลลัพธ์</h2>
      <div className="space-y-3 mb-8">
        {completedTopics.map(topicId => {
          const t = topics.find(x => x.id === topicId)
          const score = topicScores[topicId] || 0
          const personality = getPersonality(topicId, score)
          
          return (
            <div key={topicId} className="bg-white/10 rounded-xl p-4 flex items-center gap-4">
              <div className={`text-3xl p-2 rounded-lg bg-gradient-to-br ${t.color}`}>
                {t.emoji}
              </div>
              <div className="flex-1">
                <h3 className="text-white font-medium">{t.name}</h3>
                <p className="text-amber-400 text-sm">{personality.name} {personality.emoji}</p>
              </div>
              <div className="text-right">
                <div className="text-xl font-bold text-white">{score}%</div>
              </div>
            </div>
          )
        })}
      </div>

      {completedTopics.length < 12 && (
        <button
          onClick={() => setScreen('overview')}
          className="w-full py-3 rounded-full bg-amber-500 text-black font-bold"
        >
          ทำ Topic ถัดไป →
        </button>
      )}
    </div>
  )

  // ===== RENDER =====
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460]">
      {screen === 'landing' && <LandingScreen />}
      {screen === 'overview' && <OverviewScreen />}
      {screen === 'intro' && <IntroScreen />}
      {screen === 'quiz' && <QuizScreen />}
      {screen === 'leadgate' && <LeadGateScreen />}
      {screen === 'result' && <ResultScreen />}
      {screen === 'dashboard' && <DashboardScreen />}
    </div>
  )
}
