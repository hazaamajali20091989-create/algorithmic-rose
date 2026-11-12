import { useEffect, useRef } from 'react'
import { start } from './scene/experience.js'

export default function App() {
  const ran = useRef(false)
  useEffect(() => { if (ran.current) return; ran.current = true; start() }, [])
  return (
    <div className="select-none">
<div id="hint" dir="rtl">اضغط على المخطوطة</div>
<div id="sc"><div className="rod"></div><div id="paper"><div id="poem"><div className="orn"></div>
<div className="v">أُمِّي، يَا أَغْلَى الوُجُودِ وَأَصْدَقَ النَّاسِ<br/>وَمَا لِي فِي الدُّنَا مَأْمَنٌ إِلَّا حِمَاكِ</div>
<div className="v">سَهِرْتِ عَلَيَّ وَالدُّنْيَا تَضِيقُ وَتَشْتَدُّ<br/>وَكَانَ دُعَاؤُكِ نُوراً هَدَانِي إِلَى سَنَاكِ</div>
<div className="v">عَلَّمْتِنِي أَنَّ الحَنَانَ صَمْتٌ وَعَطَاءٌ<br/>وَأَنَّ أَعْذَبَ مَا فِي العُمْرِ يَنْبُعُ مِنْ عَطَاكِ</div>
<div className="v">وَمَهْمَا ابْتَعَدْتُ وَطَالَ بِيَ الطَّرِيقُ<br/>فَقَلْبِي إِلَى حِضْنِ الأَمَانِ يَعُودُ لِمَأْوَاكِ</div>
<div className="v">فَدُمْتِ لِي يَا أُمُّ نُوراً فِي طَرِيقِي وَرَجَاءً<br/>وَأَبْقَاكِ الإِلَهُ لَنَا وَأَسْعَدَنِي بِلُقْيَاكِ</div>
<div className="orn" style={{margin:'14px auto 0'}}></div></div></div><div className="rod"></div></div>
<button id="next" dir="rtl">بقي سرٌّ واحد...</button>
<div id="fade"></div>
<div id="fin"><div id="bin"></div><div id="cp" dir="rtl">انسخ الرسالة واكتشف معناها <span id="ok"></span></div>
<div id="mean" dir="rtl"></div></div>
    </div>
  )
}
