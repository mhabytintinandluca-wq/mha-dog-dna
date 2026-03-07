import './globals.css'

export const metadata = {
  title: "MHA' Story - Dog DNA Quiz",
  description: 'ค้นพบบุคลิกภาพที่ซ่อนอยู่ใน DNA ของน้องหมา',
  icons: {
    icon: '🧬',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="th">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Prompt:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={{ fontFamily: 'Prompt, sans-serif' }}>
        {children}
      </body>
    </html>
  )
}
