# חבילת drop-in: טאב "משימות" ל-Base44 (shelly-urban)

קבצים מוכנים להדבקה לתוך אפליקציית **shelly-urban** ב-Base44. כל הקוד תואם
לקונבנציות של Base44 (ישויות, SDK, אינטגרציות). ראו גם `../BASE44_INTEGRATION.md`.

## תוכן החבילה
| קובץ | מה זה | לאן בריפו shelly-urban |
|------|-------|-------------------------|
| `entities/Task.json` | סכמת הישות החדשה `Task` | להגדיר כישות חדשה ב-Base44 (Entities) |
| `lib/taskUtils.js` | לוגיקה: תוויות, תזכורות, דוח, התקדמות | `src/components/tasks/taskUtils.js` |
| `pages/Tasks.jsx` | עמוד הטאב המלא (React) | `src/pages/Tasks.jsx` |

## שלבי הדבקה
1. **ישות `Task`** — צרו ישות חדשה בשם `Task` עם השדות שב-`entities/Task.json`
   (`title`, `description`, `project_id`, `stage`, `contact_id`, `frequency`,
   `due_date`, `status`). `project_id` ו-`contact_id` מצביעים על הישויות
   הקיימות `Project` ו-`Contact`.
2. **taskUtils.js** — העתיקו ל-`src/components/tasks/taskUtils.js`
   (או כל נתיב — רק עדכנו את הייבוא בראש `Tasks.jsx`).
3. **Tasks.jsx** — העתיקו ל-`src/pages/Tasks.jsx`.
4. **ניווט** — הוסיפו את `Tasks` לתפריט/לטאבים בלייאאוט הראשי
   (`src/pages/Layout.js` או היכן שמוגדרת הניווט אצלכם), עם קישור לעמוד.

## נקודות התאמה לבדיקה מול הריפו האמיתי
- **שמות שדות בישויות קיימות:** הקוד מנסה `name || full_name` לאיש קשר
  ו-`name || title` לפרויקט, ו-`phone || phone_number` לטלפון. אם השמות אצלכם
  שונים — עדכנו ב-`taskUtils.js` (פונקציות `contactName` / `projectName` /
  `buildReminders`) ובסלקטים שב-`Tasks.jsx`.
- **ייבוא ישויות:** `import { Task, Project, Contact } from "@/api/entities";` —
  ודאו שזה הנתיב באפליקציה שלכם (כך זה בדיפולט של Base44).
- **מייל:** `import { SendEmail } from "@/api/integrations";` — אינטגרציית הליבה.
- **הודעה/וואטסאפ:** כרגע נפתח קישור `wa.me`. אם יש לכם אינטגרציית SMS/WhatsApp
  ב-Base44, אפשר להחליף את `sendWhatsApp` בקריאה אליה.
- **רכיבי UI:** העמוד משתמש ב-Tailwind + `lucide-react` בלבד (ללא תלות ב-shadcn),
  כדי שיתאים לכל אפליקציה. אפשר להחליף ל-`@/components/ui/*` אם תרצו אחידות עיצובית.

## מה הטאב כולל
- דשבורד התקדמות כללית (% הושלמו).
- יצירת משימה (פרויקט, שלב, איש קשר, תדירות, יעד).
- תצוגה מקובצת: **פרויקט → שלב** (רישוי / בנייה / טופס 4 / אכלוס).
- עדכון inline של סטטוס ושיוך איש קשר.
- פילטרים: פרויקט / שלב / תדירות.
- תזכורות מרוכזות (להיום / לשבוע / באיחור) — הודעה אחת לכל איש קשר,
  עם שליחה במייל (SendEmail) ובוואטסאפ (wa.me).
