import { useState, useEffect, useRef, useMemo } from "react";

// ══════════════════════════════════════════════════════════════
// ICONS
// ══════════════════════════════════════════════════════════════
const I = ({ n, s = 20, c = "currentColor" }) => {
  const P = {
    home:     "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z M9 22V12h6v10",
    users:    "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2 M23 21v-2a4 4 0 00-3-3.87 M16 3.13a4 4 0 010 7.75 M9 7a4 4 0 100 8 4 4 0 000-8z",
    checkbig: "M9 11l3 3L22 4 M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11",
    check:    "M20 6L9 17l-5-5",
    rupee:    "M6 3h12 M6 8h12 M6 13l8.5 8 M6 8a5 5 0 000 5h3",
    dots:     "M12 5h.01 M12 12h.01 M12 19h.01",
    plus:     "M12 5v14 M5 12h14",
    edit:     "M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7 M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z",
    trash:    "M3 6h18 M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6 M10 11v6 M14 11v6 M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2",
    search:   "M21 21l-4.35-4.35 M17 11A6 6 0 105 11a6 6 0 0012 0z",
    back:     "M19 12H5 M12 19l-7-7 7-7",
    x:        "M18 6L6 18 M6 6l12 12",
    clock:    "M12 2a10 10 0 100 20A10 10 0 0012 2z M12 6v6l4 2",
    chart:    "M18 20V10 M12 20V4 M6 20v-6 M2 20h20",
    gear:     "M12 15a3 3 0 100-6 3 3 0 000 6z M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z",
    cal:      "M3 4h18a2 2 0 012 2v14a2 2 0 01-2 2H3a2 2 0 01-2-2V6a2 2 0 012-2z M16 2v4 M8 2v4 M3 10h18",
    layers:   "M12 2L2 7l10 5 10-5-10-5z M2 17l10 5 10-5 M2 12l10 5 10-5",
    alert:    "M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z M12 9v4 M12 17h.01",
    shuffle:  "M16 3h5v5 M4 20L21 3 M21 16v5h-5 M15 15l6 6 M4 4l5 5",
    warn:     "M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z M12 9v4 M12 17h.01",
    move:     "M5 9l-3 3 3 3 M9 5l3-3 3 3 M15 19l-3 3-3-3 M19 9l3 3-3 3 M2 12h20 M12 2v20",
    assign:   "M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2 M12 11a4 4 0 100-8 4 4 0 000 8z M19 8l2 2 4-4",
    grid:     "M3 3h7v7H3z M14 3h7v7h-7z M3 14h7v7H3z M14 14h7v7h-7z",
    tag:      "M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z M7 7h.01",
    mail:     "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z M22 6l-10 7L2 6",
    sheet:    "M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z M14 2v6h6 M16 13H8 M16 17H8 M10 9H8",
    bell:     "M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9 M13.73 21a2 2 0 01-3.46 0",
    party:    "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
    copy:     "M20 9h-9a2 2 0 00-2 2v9a2 2 0 002 2h9a2 2 0 002-2v-9a2 2 0 00-2-2z M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1",
    eye:      "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z M12 9a3 3 0 100 6 3 3 0 000-6z",
    note:     "M9 11l3 3L22 4 M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11 M12 8h4 M12 12h4 M8 8h.01 M8 12h.01",
    phone:    "M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z",
    download: "M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4 M7 10l5 5 5-5 M12 15V3",
    cake:     "M20 21v-8a2 2 0 00-2-2H6a2 2 0 00-2 2v8 M4 16s.5-1 2-1 2.5 2 4 2 2.5-2 4-2 2.5 2 4 2 2-1 2-1 M10 9V6 M12 3v.01 M12 3a1.5 1.5 0 100-3 1.5 1.5 0 000 3z",
    award:    "M12 15a7 7 0 100-14 7 7 0 000 14z M8.21 13.89L7 23l5-3 5 3-1.21-9.12",
    wallet:   "M21 12V7H5a2 2 0 010-4h14v4 M3 5v14a2 2 0 002 2h16v-5 M18 12a2 2 0 000 4h4v-4z",
    trending: "M23 6l-9.5 9.5-5-5L1 18 M17 6h6v6",
    search2:  "M11 19a8 8 0 100-16 8 8 0 000 16z M21 21l-4.35-4.35",
    printer:  "M6 9V2h12v7 M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2 M6 14h12v8H6z",
    receipt:  "M4 2h16v20l-4-2-4 2-4-2-4 2z M8 8h8 M8 12h8 M8 16h4",
    stamp:    "M12 2a4 4 0 00-4 4c0 1.5.8 2.8 2 3.5V12H6a2 2 0 00-2 2v2h16v-2a2 2 0 00-2-2h-4V9.5c1.2-.7 2-2 2-3.5a4 4 0 00-4-4z M4 20h16 M4 20v2h16v-2",
    lock:     "M19 11H5a2 2 0 00-2 2v7a2 2 0 002 2h14a2 2 0 002-2v-7a2 2 0 00-2-2z M7 11V7a5 5 0 0110 0v4",
    unlock:   "M19 11H5a2 2 0 00-2 2v7a2 2 0 002 2h14a2 2 0 002-2v-7a2 2 0 00-2-2z M7 11V7a5 5 0 019.9-1",
    book:     "M4 19.5A2.5 2.5 0 016.5 17H20 M4 19.5A2.5 2.5 0 006.5 22H20V2H6.5A2.5 2.5 0 004 4.5v15z",
    grad:     "M22 10L12 5 2 10l10 5 10-5z M6 12v5c0 1.5 3 3 6 3s6-1.5 6-3v-5 M22 10v6",
    holiday:  "M8 2v4 M16 2v4 M3 10h18 M3 4h18v18H3z M9 16l2 2 4-4",
    delete2:  "M18 6L6 18 M6 6l12 12",
    fingerprint: "M2 12C2 6.5 6.5 2 12 2a10 10 0 0110 10c0 5.5-4.5 10-10 10 M6 12a6 6 0 0112 0v3a4 4 0 01-4 4",
    backspace:"M21 4H8l-7 8 7 8h13a2 2 0 002-2V6a2 2 0 00-2-2z M18 9l-6 6 M12 9l6 6",
    discount: "M20.59 13.41L11 3.83a2 2 0 00-1.41-.58H4a1 1 0 00-1 1v5.59a2 2 0 00.58 1.41l9.58 9.58a2 2 0 002.83 0l6.6-6.6a2 2 0 000-2.83z M7 7h.01",
    upload:   "M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4 M17 8l-5-5-5 5 M12 3v12",
    filecsv:  "M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z M14 2v6h6 M8 13h1 M8 17h1 M12 13h1 M12 17h1 M16 13h.01 M16 17h.01",
    userplus: "M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2 M8.5 11a4 4 0 100-8 4 4 0 000 8z M20 8v6 M23 11h-6",
    layers2:  "M12 2L2 7l10 5 10-5-10-5z M2 17l10 5 10-5 M2 12l10 5 10-5",
    shield:   "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
    key:      "M21 2l-2 2m-7.61 7.61a5.5 5.5 0 11-7.778 7.778 5.5 5.5 0 017.778-7.778zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4",
    switch:   "M17 1l4 4-4 4 M3 11V9a4 4 0 014-4h14 M7 23l-4-4 4-4 M21 13v2a4 4 0 01-4 4H3",
    zap:      "M13 2L3 14h9l-1 8 10-12h-9l1-8z",
    grid2:    "M3 3h7v7H3z M14 3h7v7h-7z M14 14h7v7h-7z M3 14h7v7H3z",
  };
  const d = P[n] || "";
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {d.split(" M").map((seg,i)=><path key={i} d={(i===0?"":"M")+seg}/>)}
    </svg>
  );
};

// ══════════════════════════════════════════════════════════════
// UTILS
// ══════════════════════════════════════════════════════════════
const todayStr   = () => new Date().toISOString().split("T")[0];
const addDaysStr = (n) => {const d=new Date();d.setDate(d.getDate()+n);return d.toISOString().split("T")[0];};
const fmtDateNice = (dateStr) => {if(!dateStr)return"";const d=new Date(dateStr+"T00:00:00");return d.toLocaleDateString("en-IN",{day:"2-digit",month:"short",year:"numeric"});};
const mkKey      = (y,m) => `${y}-${String(m).padStart(2,"0")}`;
const curMK      = () => { const d=new Date(); return mkKey(d.getFullYear(),d.getMonth()+1); };
const uid        = () => Math.random().toString(36).slice(2,10);
const genPin4    = () => String(Math.floor(1000+Math.random()*9000));
const slugifyId  = (str) => String(str||"").toLowerCase().trim().replace(/[^a-z0-9]+/g,"").slice(0,20);
// Builds a login ID from a phone number (preferred) or the person's name,
// falling back to a numeric suffix if that ID is already taken.
const genLoginId = (name, phone, existingIds) => {
  const used=new Set((existingIds||[]).filter(Boolean).map(x=>String(x).toLowerCase()));
  let base=String(phone||"").replace(/\D/g,"");
  if(!base) base=slugifyId(name)||"user";
  if(!used.has(base.toLowerCase())) return base;
  let i=2;
  while(used.has((base+i).toLowerCase())) i++;
  return base+i;
};
const genStudentCode = (students) => { let c; do{c=String(Math.floor(1000+Math.random()*9000));}while(students.some(s=>s.studentCode===c)); return c; }; // kept for legacy import fallback
// Multi-batch helpers — a student can belong to several batches (shiftIds array); shiftId kept for backward compatibility
const getShiftIds = s => (s.shiftIds&&s.shiftIds.length)?s.shiftIds:(s.shiftId?[s.shiftId]:[]);
// Returns {start,end} for a shift on a given day-abbr ("Mon","Sun",...), respecting
// per-day custom timing if the shift has customTiming enabled; falls back to the
// shift's default start/end otherwise.
const getShiftTime = (shift,dayAbbr) => {
  if(shift?.customTiming&&shift.perDayTimes&&shift.perDayTimes[dayAbbr]){
    const t=shift.perDayTimes[dayAbbr];
    return {start:t.start||shift.start,end:t.end||shift.end};
  }
  return {start:shift?.start,end:shift?.end};
};
const hasShift = (s,id) => getShiftIds(s).includes(id);
const primaryShiftId = s => getShiftIds(s)[0]||"";
const teachersForShift = (shiftId,teachers) => teachers.filter(t=>!t.archived&&t.role==="teacher"&&(!t.allowedShiftIds?.length||t.allowedShiftIds.includes(shiftId)));
const timeRangesOverlap = (s1,e1,s2,e2) => s1<e2&&s2<e1;
const timeToMinutes = t => { if(!t) return null; const[h,m]=t.split(":").map(Number); return h*60+m; };
const minutesToTime = m => { m=((m%1440)+1440)%1440; const h=Math.floor(m/60),mm=m%60; return `${String(h).padStart(2,"0")}:${String(mm).padStart(2,"0")}`; };
// Two class times on the same day are "too close" for one student to attend both if they
// overlap, or if there's less than a 1-hour gap between one ending and the other starting.
const tooCloseForStudent = (aStart,aEnd,bStart,bEnd) => {
  const as=timeToMinutes(aStart),ae=timeToMinutes(aEnd),bs=timeToMinutes(bStart),be=timeToMinutes(bEnd);
  if(as==null||ae==null||bs==null||be==null) return false;
  if(as<be&&bs<ae) return true; // overlap
  const gap=as>=be?as-be:bs-ae;
  return gap<60;
};
// Finds all same-day scheduling clashes across a set of shifts a single student is enrolled in.
const findStudentShiftConflicts = (shiftIds,allShifts) => {
  const sel=shiftIds.map(id=>allShifts.find(s=>s.id===id)).filter(Boolean);
  const out=[];
  for(let i=0;i<sel.length;i++)for(let j=i+1;j<sel.length;j++){
    const a=sel[i],b=sel[j];
    const sharedDays=(a.days||[]).filter(d=>b.days?.includes(d));
    sharedDays.forEach(d=>{
      const ta=getShiftTime(a,d),tb=getShiftTime(b,d);
      if(tooCloseForStudent(ta.start,ta.end,tb.start,tb.end)) out.push({day:d,a,b,ta,tb});
    });
  }
  return out;
};
// Per-day teacher assignment on a shift — lets one batch be split between two teachers by day.
const getDayTeacherId = (shift,day) => shift?.dayTeachers?.[day] || null;
const dayTeacherName = (shift,day,teachers) => {
  const id=getDayTeacherId(shift,day);
  if(id){ const t=teachers.find(x=>x.id===id); if(t) return t.name; }
  const list=teachersForShift(shift?.id,teachers||[]);
  return list.length?list.map(t=>t.name).join(", "):"Not assigned yet";
};
// A day on a shift is visible to a given teacher if no specific teacher is assigned that day
// (shared/default) OR that teacher is the one assigned.
const teacherVisibleForDay = (shift,day,teacherId) => {
  const dt=getDayTeacherId(shift,day);
  return !dt||dt===teacherId;
};
// Generates a receipt number like TP-2026-0001 based on how many payments exist so far
const genReceiptNo = (payments) => {
  const year=new Date().getFullYear();
  const countThisYear=payments.filter(p=>p.date?.startsWith(String(year))).length;
  return `TP-${year}-${String(countThisYear+1).padStart(4,"0")}`;
};
// Reads an image file, downsizes it, and resolves a compressed JPEG data-URL (keeps localStorage usage sane)
const fileToCompressedDataURL = (file, maxW=1000, quality=0.72) => new Promise((resolve,reject)=>{
  const reader=new FileReader();
  reader.onload=()=>{
    const img=new Image();
    img.onload=()=>{
      let w=img.width,h=img.height;
      if(w>maxW){h=Math.round(h*maxW/w);w=maxW;}
      const canvas=document.createElement("canvas");
      canvas.width=w;canvas.height=h;
      canvas.getContext("2d").drawImage(img,0,0,w,h);
      resolve(canvas.toDataURL("image/jpeg",quality));
    };
    img.onerror=()=>reject(new Error("Could not read image"));
    img.src=reader.result;
  };
  reader.onerror=()=>reject(new Error("Could not read file"));
  reader.readAsDataURL(file);
});
const isHoliday = (dateStr,holidays) => holidays.some(h=>h.date===dateStr);
const getHoliday = (dateStr,holidays) => holidays.find(h=>h.date===dateStr);
const MONTHS     = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const FULL_MON   = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const monthLabel = mk => { const [y,m]=mk.split("-"); return `${MONTHS[+m-1]} ${y}`; };
const monthFull  = mk => { const [y,m]=mk.split("-"); return `${FULL_MON[+m-1]} ${y}`; };
const fmtDate    = s => { if(!s) return "—"; return new Date(s).toLocaleDateString("en-IN",{day:"2-digit",month:"short",year:"numeric"}); };
const fmtTime    = t => { if(!t) return ""; const [h,m]=t.split(":"); return `${+h%12||12}:${m} ${+h>=12?"PM":"AM"}`; };
const shiftTimingLabel = sh => sh?.customTiming ? "Timing varies by day" : `${fmtTime(sh?.start)} – ${fmtTime(sh?.end)}`;
const DAYS_ALL   = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
const DAY_FULL   = {Mon:"Monday",Tue:"Tuesday",Wed:"Wednesday",Thu:"Thursday",Fri:"Friday",Sat:"Saturday",Sun:"Sunday"};
const daysSince  = joining => { if(!joining) return 0; return Math.floor((Date.now()-new Date(joining).getTime())/86400000); };
// Returns days until next birthday (0 = today), or null if no dob
const daysToBirthday = dob => {
  if(!dob) return null;
  const d=new Date(dob);
  const now=new Date();
  let next=new Date(now.getFullYear(),d.getMonth(),d.getDate());
  if(next<new Date(now.getFullYear(),now.getMonth(),now.getDate())) next=new Date(now.getFullYear()+1,d.getMonth(),d.getDate());
  return Math.round((next-new Date(now.getFullYear(),now.getMonth(),now.getDate()))/86400000);
};

const classesInMonth = (shift,year,month) => {
  if(!shift?.days?.length) return 0;
  let count=0;
  const last=new Date(year,month,0).getDate();
  for(let day=1;day<=last;day++){
    const abbr=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"][new Date(year,month-1,day).getDay()];
    if(shift.days.includes(abbr)) count++;
  }
  return count;
};

// Returns array of day-numbers in a given month where this shift has a scheduled class
const classDaysInMonth = (shift,year,month) => {
  if(!shift?.days?.length) return [];
  const days=[];
  const last=new Date(year,month,0).getDate();
  for(let day=1;day<=last;day++){
    const abbr=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"][new Date(year,month-1,day).getDay()];
    if(shift.days.includes(abbr)) days.push(day);
  }
  return days;
};

// True once today's date is on/after the last scheduled class day of this shift
// for the given month — i.e. that batch's classes for the month are effectively done.
const shiftMonthClassesDone = (shift,year,month) => {
  const days=classDaysInMonth(shift,year,month);
  if(!days.length) return false;
  const lastDay=days[days.length-1];
  const lastDate=new Date(year,month-1,lastDay);
  const today=new Date(); today.setHours(0,0,0,0);
  return lastDate<=today;
};

// Full monthly attendance detail for one student: scheduled vs present vs absent vs leave vs not-marked
// Attendance key: when a specific shift/batch is known, keep that class's record separate
// from any other class the same student has the same day (e.g. two subjects same day).
// Falls back to the plain per-day key when no shift context is available (back-compat).
const attKey = (studentId,date,shiftId) => (shiftId&&shiftId!=="all") ? `${studentId}-${date}-${shiftId}` : `${studentId}-${date}`;
const getAttStatus = (attend,studentId,date,shiftId) => {
  if(shiftId&&shiftId!=="all"){
    const specific=attend[attKey(studentId,date,shiftId)];
    if(specific) return specific;
  }
  return attend[`${studentId}-${date}`]||"";
};

const studentMonthAttendance = (student,shiftOrShifts,year,month,attend) => {
  const today=todayStr();
  const shiftsArr=Array.isArray(shiftOrShifts)?shiftOrShifts.filter(Boolean):(shiftOrShifts?[shiftOrShifts]:[]);
  const joinDate=student.joining?new Date(student.joining):null;
  let rows=[];
  shiftsArr.forEach(sh=>{
    classDaysInMonth(sh,year,month).forEach(day=>{
      const dateStr=`${year}-${String(month).padStart(2,"0")}-${String(day).padStart(2,"0")}`;
      const beforeJoining=joinDate&&new Date(dateStr)<new Date(joinDate.getFullYear(),joinDate.getMonth(),joinDate.getDate());
      const isFuture=dateStr>today;
      const status=getAttStatus(attend,student.id,dateStr,sh.id);
      rows.push({day,date:dateStr,shiftId:sh.id,shiftName:sh.name,status,beforeJoining,isFuture});
    });
  });
  rows.sort((a,b)=>a.date===b.date?(a.shiftName||"").localeCompare(b.shiftName||""):a.date.localeCompare(b.date));
  const applicable=rows.filter(r=>!r.beforeJoining&&!r.isFuture);
  const present=applicable.filter(r=>r.status==="present").length;
  const absent=applicable.filter(r=>r.status==="absent").length;
  const leave=applicable.filter(r=>r.status==="leave").length;
  const notMarked=applicable.filter(r=>!r.status).length;
  const pctBase=applicable.length-leave; // approved leave days don't count against attendance %
  const pct=pctBase>0?Math.round((present/pctBase)*1000)/10:0;
  return{rows,totalScheduled:rows.length,applicable:applicable.length,present,absent,leave,notMarked,pct};
};

// Computes the effective monthly fee after applying a student's discount (if any)
const effectiveFee = (student) => {
  if(!student.discount||!student.discount.value) return student.monthlyFee;
  const {type,value}=student.discount;
  if(type==="percent") return Math.max(0,Math.round(student.monthlyFee*(1-value/100)));
  return Math.max(0,student.monthlyFee-value); // flat amount
};

const calcOutstanding = (studentId,currentMK,students,payments) => {
  const student=students.find(s=>s.id===studentId);
  if(!student) return {currentDue:0,carryForward:0,total:0,curPaid:0,breakdown:[]};
  const [cy,cm]=currentMK.split("-").map(Number);
  const allPays=payments.filter(p=>p.studentId===studentId);
  const join=new Date(student.joining||todayStr());
  let y=join.getFullYear(), m=join.getMonth()+1;
  let carryForward=0; const breakdown=[];
  const fee=effectiveFee(student);
  while(y<cy||(y===cy&&m<cm)){
    const mk=mkKey(y,m);
    const paid=allPays.filter(p=>p.monthKey===mk).reduce((a,p)=>a+p.amount,0);
    const unpaid=Math.max(0,fee-paid);
    if(unpaid>0) breakdown.push({mk,fee,paid,unpaid});
    carryForward+=unpaid;
    if(++m>12){m=1;y++;}
  }
  const curPaid=allPays.filter(p=>p.monthKey===currentMK).reduce((a,p)=>a+p.amount,0);
  const currentDue=Math.max(0,fee-curPaid);
  return {currentDue,carryForward,total:currentDue+carryForward,curPaid,breakdown,fee};
};

// ══════════════════════════════════════════════════════════════
// STORAGE
// ══════════════════════════════════════════════════════════════
// ══════════════════════════════════════════════════════════════
// STORAGE & API CONNECTION (Backend Server)
// ══════════════════════════════════════════════════════════════
// ══════════════════════════════════════════════════════════════
// STORAGE & MEGA API CONNECTION (100% MongoDB)
// ══════════════════════════════════════════════════════════════
const API_BASE = "https://tuition-planner-app.onrender.com";

const apiSync = (path, data) => {
  if (Array.isArray(data)) {
    data.forEach(item => {
      fetch(`${API_BASE}/${path}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item)
      }).catch(e => console.log("Sync Error:", e));
    });
  } else {
    // Attendance jaise Object data ke liye
    fetch(`${API_BASE}/${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).catch(e => console.log("Sync Error:", e));
  }
};

const LS={
  get:k=>{try{const v=localStorage.getItem(k);return v?JSON.parse(v):null;}catch{return null;}},
  set:(k,v)=>{try{localStorage.setItem(k,JSON.stringify(v));}catch{}},
};

const useStore=()=>{
  const [students, _sS]=useState(()=>LS.get("tp4_students")||[]);
  const [shifts,   _sH]=useState(()=>LS.get("tp4_shifts")||[]);
  const [attend,   _sA]=useState(()=>LS.get("tp4_attend")||{});
  const [payments, _sP]=useState(()=>LS.get("tp4_payments")||[]);
  const [notes,    _sN]=useState(()=>LS.get("tp4_notes")||[]);
  const [expenses, _sE]=useState(()=>LS.get("tp4_expenses")||[]);
  const [marks,    _sM]=useState(()=>LS.get("tp4_marks")||[]);
  const [holidays, _sHo]=useState(()=>LS.get("tp4_holidays")||[]);
  const [oneTimeFees,_sO]=useState(()=>LS.get("tp4_onetimefees")||[]);
  const [announcements,_sAn]=useState(()=>LS.get("tp4_announcements")||[]);
  const [teachers, _sTe]=useState(()=>LS.get("tp4_teachers")||[]);
  const [leaveRequests,_sLR]=useState(()=>LS.get("tp4_leaverequests")||[]);
  const [homework, _sHw]=useState(()=>LS.get("tp4_homework")||[]);
  const [feedbackRequests, _sFb]=useState(()=>LS.get("tp4_feedback")||[]);
  const [messages, _sMg]=useState(()=>LS.get("tp4_messages")||[]);
  const [feeReminders,_sFRe]=useState(()=>LS.get("tp4_feereminders")||[]);
  const [notifSeen,_sNS]=useState(()=>LS.get("tp4_notifseen")||{});
  const [teacherMessages,_sTM]=useState(()=>LS.get("tp4_teachermessages")||[]);
  const [timetableRequests,_sTR]=useState(()=>LS.get("tp4_timetablereq")||[]);
  const [attendLog,_sAL]=useState(()=>LS.get("tp4_attendlog")||[]);
  const [tests,_sTT]=useState(()=>LS.get("tp4_tests")||[]);
  const [studyMaterials,_sSM]=useState(()=>LS.get("tp4_studymaterials")||[]);
  const [admissionApplications,_sAA]=useState(()=>LS.get("tp4_admissions")||[]);
  const [testAttempts,_sTTA]=useState(()=>LS.get("tp4_testattempts")||[]);
  const [session,  _sSe]=useState(()=>LS.get("tp4_session")||null);
  const [studentSession,_sSt]=useState(()=>LS.get("tp4_student_session")||null);
  const [settings, _sT]=useState(()=>LS.get("tp4_settings")||{institute:"My Tuition",teacher:"Teacher",currency:"₹",theme:"light",pin:"",pinEnabled:false});
  const [parents,_sPa]=useState(()=>LS.get("tp4_parents")||[]);
  const [paymentClaims,_sPC]=useState(()=>LS.get("tp4_paymentclaims")||[]);
  const [parentSession,_sPS]=useState(()=>LS.get("tp4_parent_session")||null);

  // App khulte hi Server se 100% Data Load karna
  useEffect(() => {
    const load = (path, setter, lsKey) => {
      fetch(`${API_BASE}/${path}`).then(r=>r.json()).then(d=>{
        if(Array.isArray(d) ? d.length : Object.keys(d).length) { setter(d); LS.set(lsKey, d); }
      }).catch(e=>console.log(e));
    };
    load('students', _sS, 'tp4_students');
    load('shifts', _sH, 'tp4_shifts');
    load('payments', _sP, 'tp4_payments');
    load('notes', _sN, 'tp4_notes');
    load('expenses', _sE, 'tp4_expenses');
    load('marks', _sM, 'tp4_marks');
    load('holidays', _sHo, 'tp4_holidays');
    load('onetimefees', _sO, 'tp4_onetimefees');
    load('announcements', _sAn, 'tp4_announcements');
    load('teachers', _sTe, 'tp4_teachers');
    load('leaverequests', _sLR, 'tp4_leaverequests');
    load('homework', _sHw, 'tp4_homework');
    load('feedback', _sFb, 'tp4_feedback');
    load('messages', _sMg, 'tp4_messages');
    load('feereminders', _sFRe, 'tp4_feereminders');
    load('teachermessages', _sTM, 'tp4_teachermessages');
    load('timetablereq', _sTR, 'tp4_timetablereq');
    load('attendlog', _sAL, 'tp4_attendlog');
    load('tests', _sTT, 'tp4_tests');
    load('studymaterials', _sSM, 'tp4_studymaterials');
    load('admissions', _sAA, 'tp4_admissions');
    load('testattempts', _sTTA, 'tp4_testattempts');
    load('parents', _sPa, 'tp4_parents');
    load('paymentclaims', _sPC, 'tp4_paymentclaims');
    load('attendance', _sA, 'tp4_attend');
  }, []);

  // Ye smart function LocalStorage aur MongoDB dono me ek sath data save karta hai
  const makeSetter = (setter, lsKey, apiPath) => (v) => {
    let val;
    setter(prev => { val = typeof v === "function" ? v(prev) : v; return val; });
    setTimeout(() => { LS.set(lsKey, val); apiSync(apiPath, val); }, 50);
  };

  const setStudents = makeSetter(_sS, 'tp4_students', 'students');
  const setShifts = makeSetter(_sH, 'tp4_shifts', 'shifts');
  const setAttend = makeSetter(_sA, 'tp4_attend', 'attendance');
  const setPayments = makeSetter(_sP, 'tp4_payments', 'payments');
  const setNotes = makeSetter(_sN, 'tp4_notes', 'notes');
  const setExpenses = makeSetter(_sE, 'tp4_expenses', 'expenses');
  const setMarks = makeSetter(_sM, 'tp4_marks', 'marks');
  const setHolidays = makeSetter(_sHo, 'tp4_holidays', 'holidays');
  const setOneTimeFees = makeSetter(_sO, 'tp4_onetimefees', 'onetimefees');
  const setAnnouncements = makeSetter(_sAn, 'tp4_announcements', 'announcements');
  const setTeachers = makeSetter(_sTe, 'tp4_teachers', 'teachers');
  const setLeaveRequests = makeSetter(_sLR, 'tp4_leaverequests', 'leaverequests');
  const setHomework = makeSetter(_sHw, 'tp4_homework', 'homework');
  const setFeedbackRequests = makeSetter(_sFb, 'tp4_feedback', 'feedback');
  const setMessages = makeSetter(_sMg, 'tp4_messages', 'messages');
  const setFeeReminders = makeSetter(_sFRe, 'tp4_feereminders', 'feereminders');
  const setTeacherMessages = makeSetter(_sTM, 'tp4_teachermessages', 'teachermessages');
  const setTimetableRequests = makeSetter(_sTR, 'tp4_timetablereq', 'timetablereq');
  const setAttendLog = makeSetter(_sAL, 'tp4_attendlog', 'attendlog');
  const setTests = makeSetter(_sTT, 'tp4_tests', 'tests');
  const setStudyMaterials = makeSetter(_sSM, 'tp4_studymaterials', 'studymaterials');
  const setAdmissionApplications = makeSetter(_sAA, 'tp4_admissions', 'admissions');
  const setTestAttempts = makeSetter(_sTTA, 'tp4_testattempts', 'testattempts');
  const setParents = makeSetter(_sPa, 'tp4_parents', 'parents');
  const setPaymentClaims = makeSetter(_sPC, 'tp4_paymentclaims', 'paymentclaims');

  // Login IDs aur basic settings sirf browser me rehti hain
  const setSession = v => { const d=typeof v==="function"?v(session):v; _sSe(d); LS.set("tp4_session",d); };
  const setStudentSession = v => { const d=typeof v==="function"?v(studentSession):v; _sSt(d); LS.set("tp4_student_session",d); };
  const setParentSession = v => { const d=typeof v==="function"?v(parentSession):v; _sPS(d); LS.set("tp4_parent_session",d); };
  const setSettings = v => { const d=typeof v==="function"?v(settings):v; _sT(d); LS.set("tp4_settings",d); };
  const setNotifSeen = v => { const d=typeof v==="function"?v(notifSeen):v; _sNS(d); LS.set("tp4_notifseen",d); };

  return{parents,setParents,paymentClaims,setPaymentClaims,parentSession,setParentSession,students,setStudents,shifts,setShifts,attend,setAttend,payments,setPayments,notes,setNotes,expenses,setExpenses,marks,setMarks,holidays,setHolidays,oneTimeFees,setOneTimeFees,announcements,setAnnouncements,teachers,setTeachers,leaveRequests,setLeaveRequests,homework,setHomework,feedbackRequests,setFeedbackRequests,messages,setMessages,feeReminders,setFeeReminders,notifSeen,setNotifSeen,teacherMessages,setTeacherMessages,timetableRequests,setTimetableRequests,attendLog,setAttendLog,tests,setTests,testAttempts,setTestAttempts,studyMaterials,setStudyMaterials,admissionApplications,setAdmissionApplications,session,setSession,studentSession,setStudentSession,settings,setSettings};
};
// ══════════════════════════════════════════════════════════════
// THEME SYSTEM
// ══════════════════════════════════════════════════════════════
// THEME SYSTEM

// ══════════════════════════════════════════════════════════════
// THEME SYSTEM
// ══════════════════════════════════════════════════════════════
const THEMES={
  light:{bg:"#f8faff",card:"#fff",cardBorder:"#eef2ff",text:"#0f0a2e",textMuted:"#64748b",textFaint:"#94a3b8",inputBg:"#fafbff",navBg:"#fff",navBorder:"#eef2ff",shadow:"rgba(30,58,138,.06)"},
  dark:{bg:"#0b0b1a",card:"#151527",cardBorder:"#232340",text:"#f1f0fb",textMuted:"#a5a3c4",textFaint:"#75739a",inputBg:"#1c1c34",navBg:"#12121f",navBorder:"#232340",shadow:"rgba(0,0,0,.4)"},
};
const useTheme=settings=>THEMES[settings.theme==="dark"?"dark":"light"];

// ══════════════════════════════════════════════════════════════
// PROFESSIONAL TOAST SYSTEM
// ══════════════════════════════════════════════════════════════
const TOAST_ICONS = {
  success: (
    <div style={{width:32,height:32,borderRadius:"50%",background:"rgba(255,255,255,.2)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
      <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 6L9 17l-5-5"/>
      </svg>
    </div>
  ),
  error: (
    <div style={{width:32,height:32,borderRadius:"50%",background:"rgba(255,255,255,.2)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
      <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 6L6 18 M6 6l12 12"/>
      </svg>
    </div>
  ),
  info: (
    <div style={{width:32,height:32,borderRadius:"50%",background:"rgba(255,255,255,.2)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
      <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 8h.01 M12 12v4"/>
      </svg>
    </div>
  ),
};

const TOAST_CONFIG = {
  success: { bg:"linear-gradient(135deg,#059669,#10b981)", bar:"#34d399" },
  error:   { bg:"linear-gradient(135deg,#dc2626,#ef4444)", bar:"#f87171" },
  info:    { bg:"linear-gradient(135deg,#4f46e5,#1e3a8a)", bar:"#a5b4fc" },
};

// ══════════════════════════════════════════════════════════════
// GLOBAL RESPONSIVE LAYER — works on any phone size (small/large, notch, keyboard)
// ══════════════════════════════════════════════════════════════
const AppGlobalStyles=()=>(
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600&display=swap');
    html{-webkit-text-size-adjust:100%;text-size-adjust:100%}
    body{margin:0;overflow-x:hidden;overscroll-behavior-y:none;-webkit-font-smoothing:antialiased;overflow-wrap:break-word}
    button,a,input,select,textarea,label,summary{touch-action:manipulation;-webkit-tap-highlight-color:transparent}
    button{-webkit-user-select:none;user-select:none}
    img{max-width:100%}
    input,select,textarea{max-width:100%;min-width:0}
    input[type=date],input[type=time],input[type=month]{min-height:1.6em}
    /* iPhone Safari zooms into any field under 16px — keep them at 16px there */
    @supports (-webkit-touch-callout:none){
      input:not([type=checkbox]):not([type=radio]):not([type=range]),select,textarea{font-size:16px !important}
    }
    /* full-screen panels: scroll + centre safely on short screens (no clipped top) */
    .bf-sc{overflow-y:auto !important;justify-content:flex-start !important;-webkit-overflow-scrolling:touch}
    .bf-sc::before,.bf-sc::after{content:"";margin:auto;flex-shrink:0}
    ::-webkit-scrollbar{width:0;height:0}
    @media (max-width:340px){ html{font-size:15px} }
  `}</style>
);

const Toast = ({ toasts, dismiss }) => (
  <div style={{position:"fixed",top:"calc(16px + env(safe-area-inset-top))",left:"50%",transform:"translateX(-50%)",zIndex:9999,display:"flex",flexDirection:"column",gap:8,width:"92vw",maxWidth:420,pointerEvents:"none"}}>
    {toasts.map(t=>{
      const cfg = TOAST_CONFIG[t.type]||TOAST_CONFIG.info;
      return (
        <div key={t.id} style={{background:cfg.bg,borderRadius:16,padding:"12px 14px",display:"flex",alignItems:"center",gap:12,boxShadow:"0 8px 32px rgba(0,0,0,.22)",pointerEvents:"all",position:"relative",overflow:"hidden",animation:"slideDown .25s ease"}}>
          {/* progress bar */}
          <div style={{position:"absolute",bottom:0,left:0,height:3,background:cfg.bar,borderRadius:"0 0 0 16px",animation:"shrink 2.8s linear forwards"}}/>
          {TOAST_ICONS[t.type]||TOAST_ICONS.info}
          <div style={{flex:1,minWidth:0}}>
            {t.title&&<div style={{fontSize:13,fontWeight:800,color:"#fff",letterSpacing:.2}}>{t.title}</div>}
            <div style={{fontSize:12,color:"rgba(255,255,255,.9)",marginTop:t.title?2:0,lineHeight:1.4}}>{t.msg}</div>
          </div>
          <button onClick={()=>dismiss(t.id)} style={{background:"rgba(255,255,255,.15)",border:"none",borderRadius:8,padding:"4px 6px",cursor:"pointer",flexShrink:0}}>
            <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round"><path d="M18 6L6 18 M6 6l12 12"/></svg>
          </button>
        </div>
      );
    })}
    <style>{`
      @keyframes slideDown{from{opacity:0;transform:translateY(-18px)}to{opacity:1;transform:translateY(0)}}
      @keyframes shrink{from{width:100%}to{width:0%}}
    `}</style>
  </div>
);

const useToast = () => {
  const [toasts,setToasts]=useState([]);
  const dismiss = id => setToasts(ts=>ts.filter(t=>t.id!==id));
  const show = (msg,type="success",title="") => {
    const id=uid();
    setToasts(ts=>[...ts,{id,msg,type,title}]);
    setTimeout(()=>dismiss(id),2900);
  };
  const toast = (msg,type,title) => show(msg,type,title);
  toast.success = (msg,title) => show(msg,"success",title);
  toast.error   = (msg,title) => show(msg,"error",title);
  toast.info    = (msg,title) => show(msg,"info",title);
  return {toasts,dismiss,toast};
};

// ══════════════════════════════════════════════════════════════
// UI ATOMS
// ══════════════════════════════════════════════════════════════
const Sheet = ({title,onClose,children})=>(
  <div style={{position:"fixed",inset:0,background:"rgba(15,15,35,.6)",zIndex:500,display:"flex",alignItems:"flex-end"}} onClick={onClose}>
    <div style={{background:"var(--card)",borderRadius:"22px 22px 0 0",width:"100%",maxHeight:"calc(var(--app-h,100vh)*.93)",overflowY:"auto",overscrollBehavior:"contain",paddingBottom:"calc(32px + env(safe-area-inset-bottom))"}} onClick={e=>e.stopPropagation()}>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"18px 20px 14px",borderBottom:"1px solid var(--cardBorder)",position:"sticky",top:0,background:"var(--card)",zIndex:1,borderRadius:"22px 22px 0 0"}}>
        <span style={{fontWeight:800,fontSize:16,color:"var(--text)"}}>{title}</span>
        <button onClick={onClose} style={{background:"var(--inputBg)",border:"none",borderRadius:9,padding:"5px 9px",cursor:"pointer"}}><I n="x" s={17} c="var(--textMuted)"/></button>
      </div>
      <div style={{padding:"16px 20px"}}>{children}</div>
    </div>
  </div>
);

const Confirm=({msg,onYes,onNo,yesLabel="Confirm",yesColor="#ef4444"})=>(
  <div style={{position:"fixed",inset:0,background:"rgba(15,15,35,.6)",zIndex:600,display:"flex",alignItems:"center",justifyContent:"center",padding:24}}>
    <div style={{background:"var(--card)",borderRadius:20,padding:"24px 22px",maxWidth:320,width:"100%"}}>
      <div style={{fontSize:15,fontWeight:700,color:"var(--text)",marginBottom:8}}>Confirm</div>
      <div style={{fontSize:13,color:"var(--textMuted)",marginBottom:22,lineHeight:1.6}}>{msg}</div>
      <div style={{display:"flex",gap:10}}>
        <Btn onClick={onNo} outline c="#64748b" full>Cancel</Btn>
        <Btn onClick={onYes} c={yesColor} full>{yesLabel}</Btn>
      </div>
    </div>
  </div>
);

const Inp=({label,value,onChange,type="text",placeholder="",req=false,hint=""})=>(
  <div style={{marginBottom:14}}>
    <label style={{display:"block",fontSize:11,fontWeight:700,color:"var(--textMuted)",marginBottom:5,textTransform:"uppercase",letterSpacing:.6}}>{label}{req&&<span style={{color:"#ef4444"}}> *</span>}</label>
    <input type={type} value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder}
      style={{width:"100%",padding:"11px 13px",border:"1.5px solid var(--cardBorder)",borderRadius:11,fontSize:14,color:"var(--text)",background:"var(--inputBg)",outline:"none",boxSizing:"border-box",fontFamily:"inherit"}}/>
    {hint&&<div style={{fontSize:11,color:"var(--textFaint)",marginTop:4}}>{hint}</div>}
  </div>
);

const Sel=({label,value,onChange,options,req=false})=>(
  <div style={{marginBottom:14}}>
    <label style={{display:"block",fontSize:11,fontWeight:700,color:"var(--textMuted)",marginBottom:5,textTransform:"uppercase",letterSpacing:.6}}>{label}{req&&<span style={{color:"#ef4444"}}> *</span>}</label>
    <select value={value} onChange={e=>onChange(e.target.value)}
      style={{width:"100%",padding:"11px 13px",border:"1.5px solid var(--cardBorder)",borderRadius:11,fontSize:14,color:"var(--text)",background:"var(--inputBg)",outline:"none",boxSizing:"border-box",fontFamily:"inherit"}}>
      {options.map(o=><option key={o.v} value={o.v}>{o.l}</option>)}
    </select>
  </div>
);

const Btn=({children,onClick,c="#1e3a8a",tc="#fff",full=false,sm=false,outline=false,disabled=false})=>(
  <button onClick={onClick} disabled={disabled}
    style={{background:outline?"transparent":disabled?"#e2e8f0":c,color:outline?c:disabled?"#94a3b8":tc,border:`2px solid ${disabled?"#e2e8f0":c}`,borderRadius:11,padding:sm?"7px 14px":"11px 20px",fontSize:sm?12:14,fontWeight:700,cursor:disabled?"not-allowed":"pointer",width:full?"100%":"auto",display:"inline-flex",alignItems:"center",gap:6,justifyContent:"center",fontFamily:"inherit"}}>
    {children}
  </button>
);

const Chip=({label,active,onClick,c="#1e3a8a"})=>(
  <button onClick={onClick} style={{borderRadius:20,padding:"5px 14px",fontSize:12,fontWeight:700,border:`2px solid ${active?c:"var(--cardBorder)"}`,background:active?c:"var(--card)",color:active?"#fff":"var(--textMuted)",cursor:"pointer",whiteSpace:"nowrap",fontFamily:"inherit"}}>{label}</button>
);

const Badge=({s})=>{
  const map={paid:["#dcfce7","#15803d"],pending:["#fee2e2","#dc2626"],"partially paid":["#fef9c3","#b45309"],present:["#dcfce7","#15803d"],absent:["#fee2e2","#dc2626"]};
  const [bg,cl]=map[s?.toLowerCase()]||["#f1f5f9","#64748b"];
  return <span style={{background:bg,color:cl,borderRadius:20,padding:"2px 10px",fontSize:11,fontWeight:700,textTransform:"uppercase",letterSpacing:.4}}>{s}</span>;
};

const Avatar=({name,size=40,g="135deg,#1e3a8a,#2563eb",photo})=>(
  photo?
  <div style={{width:size,height:size,borderRadius:size*.3,overflow:"hidden",flexShrink:0}}>
    <img src={photo} alt="" style={{width:"100%",height:"100%",objectFit:"cover"}}/>
  </div>
  :
  <div style={{width:size,height:size,borderRadius:size*.3,background:`linear-gradient(${g})`,display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontSize:size*.38,fontWeight:800,flexShrink:0}}>
    {(name||"?")[0].toUpperCase()}
  </div>
);

const getSeenTs=(store,key)=>(store.notifSeen&&store.notifSeen[key])||0;
const markSeenNow=(store,key)=>store.setNotifSeen(prev=>({...(prev||{}),[key]:Date.now()}));

const NotificationBell=({items,onOpen,light})=>{
  const[open,setOpen]=useState(false);
  const unreadCount=items.filter(i=>i.unread).length;
  const toggle=()=>{
    const next=!open;
    setOpen(next);
    if(next&&onOpen) onOpen();
  };
  return(
    <div style={{position:"relative"}}>
      <button onClick={toggle} style={light?{background:"rgba(255,255,255,.18)",border:"none",borderRadius:12,padding:"8px 10px",cursor:"pointer",position:"relative",display:"flex"}:{background:"var(--card)",border:"1.5px solid var(--cardBorder)",borderRadius:12,padding:"8px 10px",cursor:"pointer",position:"relative",display:"flex"}}>
        <I n="bell" s={18} c={light?"#fff":"#1e3a8a"}/>
        {unreadCount>0&&<span style={{position:"absolute",top:4,right:4,minWidth:15,height:15,borderRadius:20,background:"#ef4444",border:`2px solid ${light?"#6d28d9":"var(--card)"}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:8,fontWeight:900,color:"#fff",padding:"0 2px"}}>{unreadCount>9?"9+":unreadCount}</span>}
      </button>
      {open&&(
        <>
          <div onClick={()=>setOpen(false)} style={{position:"fixed",inset:0,zIndex:998}}/>
          <div style={{position:"absolute",top:"calc(100% + 8px)",right:0,width:296,maxHeight:420,overflowY:"auto",background:"var(--card)",border:"1.5px solid var(--cardBorder)",borderRadius:16,boxShadow:"0 16px 40px rgba(0,0,0,.2)",zIndex:999,padding:8}}>
            <div style={{fontSize:11,fontWeight:800,color:"var(--textMuted)",padding:"8px 10px 6px",textTransform:"uppercase",letterSpacing:.6}}>Notifications</div>
            {items.length===0&&<div style={{textAlign:"center",padding:"28px 10px",color:"var(--textFaint)",fontSize:12}}>You're all caught up 🎉</div>}
            {items.map((it,i)=>(
              <button key={i} onClick={()=>{setOpen(false);it.onClick&&it.onClick();}} style={{width:"100%",display:"flex",gap:10,alignItems:"flex-start",padding:"10px",borderRadius:12,background:it.unread?"var(--inputBg)":"transparent",border:"none",cursor:"pointer",textAlign:"left",marginBottom:2,fontFamily:"inherit"}}>
                <div style={{background:it.color+"18",borderRadius:10,padding:7,flexShrink:0,marginTop:1}}><I n={it.icon} s={15} c={it.color}/></div>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{fontSize:12,fontWeight:800,color:"var(--text)"}}>{it.title}</div>
                  <div style={{fontSize:11,color:"var(--textFaint)",marginTop:1,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{it.desc}</div>
                </div>
                {it.unread&&<div style={{width:7,height:7,borderRadius:"50%",background:"#ef4444",flexShrink:0,marginTop:5}}/>}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

const PageHeader=({title,onBack,right})=>(
  <div style={{display:"flex",alignItems:"center",gap:12,padding:"20px 16px 14px",position:"sticky",top:"env(safe-area-inset-top)",background:"var(--bg)",zIndex:10}}>
    {onBack&&<button onClick={onBack} style={{background:"var(--card)",border:"1.5px solid var(--cardBorder)",borderRadius:11,padding:"7px 9px",cursor:"pointer",display:"flex"}}><I n="back" s={18} c="#1e3a8a"/></button>}
    <span style={{fontWeight:800,fontSize:18,color:"var(--text)",flex:1}}>{title}</span>
    {right}
  </div>
);

const CarryBreakdown=({breakdown,currency})=>{
  const [open,setOpen]=useState(false);
  if(!breakdown?.length) return null;
  return (
    <div style={{marginBottom:8}}>
      <div style={{background:"#fff7ed",border:"1.5px solid #fed7aa",borderRadius:12,padding:"10px 13px"}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <div style={{display:"flex",alignItems:"center",gap:7}}>
            <I n="warn" s={15} c="#ea580c"/>
            <span style={{fontSize:13,fontWeight:800,color:"#c2410c"}}>Unpaid Previous Months</span>
          </div>
          <button onClick={()=>setOpen(o=>!o)} style={{background:"#fed7aa",border:"none",borderRadius:7,padding:"3px 9px",fontSize:11,fontWeight:700,color:"#c2410c",cursor:"pointer"}}>{open?"Hide":"Details"}</button>
        </div>
        {open&&(
          <div style={{marginTop:10,borderTop:"1px solid #fed7aa",paddingTop:8}}>
            {breakdown.map(b=>(
              <div key={b.mk} style={{display:"flex",justifyContent:"space-between",fontSize:12,padding:"4px 0",color:"#92400e"}}>
                <span>{monthFull(b.mk)}</span>
                <span style={{fontWeight:700}}>Paid {currency}{b.paid} / {currency}{b.fee} → <span style={{color:"#dc2626"}}>Due {currency}{b.unpaid}</span></span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// ══════════════════════════════════════════════════════════════
// SHIFT COLOR MAP
// ══════════════════════════════════════════════════════════════
const SHIFT_COLORS = [
  {bg:"#ede9fe",text:"#5b21b6",dot:"#7c3aed",grad:"135deg,#1e3a8a,#2563eb"},
  {bg:"#fce7f3",text:"#9d174d",dot:"#db2777",grad:"135deg,#ec4899,#f472b6"},
  {bg:"#dcfce7",text:"#166534",dot:"#16a34a",grad:"135deg,#10b981,#34d399"},
  {bg:"#fef3c7",text:"#92400e",dot:"#d97706",grad:"135deg,#f59e0b,#fbbf24"},
  {bg:"#dbeafe",text:"#1e40af",dot:"#2563eb",grad:"135deg,#3b82f6,#60a5fa"},
  {bg:"#fee2e2",text:"#991b1b",dot:"#dc2626",grad:"135deg,#ef4444,#f87171"},
];
const getShiftColor = (idx) => SHIFT_COLORS[idx % SHIFT_COLORS.length];

// ══════════════════════════════════════════════════════════════
// FULL ATTENDANCE SHEET — view / email / whatsapp per student
// ══════════════════════════════════════════════════════════════
const AttendanceReportSheet=({store,onClose})=>{
  const {students,shifts,attend,payments,settings}=store;
  const mk=curMK();
  const active=students.filter(s=>!s.archived);
  const [copyDone,setCopyDone]=useState(false);

  const getStudentData=(s)=>{
    const sh=shifts.find(x=>x.id===s.shiftId);
    const keys=Object.entries(attend).filter(([k])=>k.startsWith(s.id+"-"));
    const present=keys.filter(([,v])=>v==="present").length;
    const absent=keys.filter(([,v])=>v==="absent").length;
    const pct=keys.length>0?Math.round((present/keys.length)*1000)/10:0;
    const {total,curPaid,currentDue,carryForward}=calcOutstanding(s.id,mk,students,payments);
    return{sh,present,absent,total:keys.length,pct,outstanding:total,curPaid,currentDue,carryForward};
  };

  const generateStudentReport=(s)=>{
    const d=getStudentData(s);
    return `ATTENDANCE & FEE REPORT
------------------------
${settings.institute}
Student: ${s.name}
Shift: ${d.sh?.name||"N/A"}
Month: ${monthFull(mk)}
------------------------
ATTENDANCE
  Present  : ${d.present} days
  Absent   : ${d.absent} days
  Total    : ${d.total} days
  Rate     : ${d.pct}%
------------------------
FEES (${monthFull(mk)})
  Monthly Fee   : ${settings.currency}${s.monthlyFee}
  Paid          : ${settings.currency}${d.curPaid}
  This Month Due: ${settings.currency}${d.currentDue}${d.carryForward>0?`
  Previous Dues : ${settings.currency}${d.carryForward}
  Total Due     : ${settings.currency}${d.outstanding}`:""}
------------------------
Joining Date: ${fmtDate(s.joining)}
${d.outstanding===0?"All fees cleared!":"Please clear dues at earliest."}`;
  };

  const generateFullReport=()=>{
    const lines=[`FULL ATTENDANCE SHEET - ${monthFull(mk)}`,`${settings.institute}`,`Generated: ${fmtDate(todayStr())}`,`${"-".repeat(48)}`];
    lines.push(`${"STUDENT".padEnd(18)}${"SHIFT".padEnd(16)}${"P".padEnd(5)}${"A".padEnd(5)}${"ATT%".padEnd(8)}${"DUE"}`);
    lines.push("-".repeat(48));
    active.forEach(s=>{
      const d=getStudentData(s);
      lines.push(`${s.name.slice(0,16).padEnd(18)}${(d.sh?.name||"-").slice(0,14).padEnd(16)}${String(d.present).padEnd(5)}${String(d.absent).padEnd(5)}${String(d.pct+"%").padEnd(8)}${settings.currency}${d.outstanding}`);
    });
    lines.push("-".repeat(48));
    const totDue=active.reduce((a,s)=>a+getStudentData(s).outstanding,0);
    lines.push(`Total Students: ${active.length}  |  Total Outstanding: ${settings.currency}${totDue}`);
    return lines.join("\n");
  };

  const copyFull=()=>{
    navigator.clipboard?.writeText(generateFullReport()).then(()=>{setCopyDone(true);setTimeout(()=>setCopyDone(false),2000);});
  };

  const openMail=(s)=>{
    const body=generateStudentReport(s);
    const subject=`Attendance & Fee Report - ${s.name} - ${monthFull(mk)}`;
    window.open(`mailto:${s.email||""}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`,"_blank");
  };

  const openWhatsApp=(s)=>{
    const body=generateStudentReport(s);
    const phone=s.phone?.replace(/\D/g,"");
    window.open(`https://wa.me/${phone?`91${phone}`:""}?text=${encodeURIComponent(body)}`,"_blank");
  };

  return(
    <Sheet title="Full Attendance Sheet" onClose={onClose}>
      <div style={{display:"flex",gap:8,marginBottom:16}}>
        <button onClick={copyFull} style={{flex:1,background:copyDone?"#10b981":"#f1f5f9",border:"none",borderRadius:11,padding:"10px",fontSize:12,fontWeight:700,color:copyDone?"#fff":"#475569",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:6}}>
          <I n={copyDone?"check":"copy"} s={14} c={copyDone?"#fff":"#475569"}/>{copyDone?"Copied!":"Copy Full Sheet"}
        </button>
        <button onClick={()=>{const w=window.open("","_blank");w.document.write(`<pre style="font-family:monospace;font-size:13px;padding:20px">${generateFullReport()}</pre>`);w.print();}} style={{flex:1,background:"#ede9fe",border:"none",borderRadius:11,padding:"10px",fontSize:12,fontWeight:700,color:"#5b21b6",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:6}}>
          <I n="eye" s={14} c="#5b21b6"/> Preview & Print
        </button>
      </div>
      <div style={{fontWeight:800,fontSize:11,color:"#94a3b8",textTransform:"uppercase",letterSpacing:.6,marginBottom:10}}>Send Individual Reports</div>
      {active.map(s=>{
        const d=getStudentData(s);
        const shIdx=shifts.findIndex(x=>x.id===s.shiftId);
        const col=shIdx>=0?getShiftColor(shIdx):{dot:"#94a3b8",grad:"135deg,#94a3b8,#64748b"};
        return(
          <div key={s.id} style={{background:"#fff",borderRadius:14,padding:"12px 14px",marginBottom:10,border:"1.5px solid #eef2ff"}}>
            <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:10}}>
              <Avatar name={s.name} size={36} g={col.grad}/>
              <div style={{flex:1}}>
                <div style={{fontWeight:800,fontSize:13,color:"#0f0a2e"}}>{s.name}</div>
                <div style={{fontSize:11,color:"#94a3b8"}}>{d.sh?.name||"No shift"} · {s.phone||"No phone"}</div>
              </div>
              <div style={{textAlign:"right"}}>
                <div style={{fontSize:12,fontWeight:800,color:d.pct>=75?"#10b981":"#ef4444"}}>{d.pct}%</div>
                {d.outstanding>0?<div style={{fontSize:11,color:"#dc2626",fontWeight:700}}>₹{d.outstanding} due</div>:<div style={{fontSize:11,color:"#10b981",fontWeight:700}}>✓ Paid</div>}
              </div>
            </div>
            <div style={{display:"flex",gap:6,marginBottom:10,fontSize:11,fontWeight:700}}>
              <span style={{background:"#dcfce7",color:"#166534",borderRadius:7,padding:"3px 9px"}}>P: {d.present}</span>
              <span style={{background:"#fee2e2",color:"#991b1b",borderRadius:7,padding:"3px 9px"}}>A: {d.absent}</span>
              <span style={{background:"#eef2ff",color:"#3730a3",borderRadius:7,padding:"3px 9px"}}>Total: {d.total}</span>
            </div>
            <div style={{display:"flex",gap:8}}>
              <button onClick={()=>openMail(s)} style={{flex:1,background:"#ede9fe",border:"none",borderRadius:9,padding:"8px",fontSize:11,fontWeight:700,color:"#5b21b6",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:5}}>
                <I n="mail" s={13} c="#5b21b6"/> Email
              </button>
              <button onClick={()=>openWhatsApp(s)} style={{flex:1,background:"#dcfce7",border:"none",borderRadius:9,padding:"8px",fontSize:11,fontWeight:700,color:"#166534",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:5}}>
                <svg width={13} height={13} viewBox="0 0 24 24" fill="#16a34a"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                WhatsApp
              </button>
              <button onClick={()=>{navigator.clipboard?.writeText(generateStudentReport(s));}} style={{background:"#f1f5f9",border:"none",borderRadius:9,padding:"8px 10px",cursor:"pointer"}}>
                <I n="copy" s={13} c="#64748b"/>
              </button>
            </div>
          </div>
        );
      })}
      {active.length===0&&<div style={{textAlign:"center",padding:"40px 0",color:"#94a3b8",fontSize:14}}>No students added yet</div>}
    </Sheet>
  );
};

// ══════════════════════════════════════════════════════════════
// PAYMENT RECEIPT — professional, printable, shareable
// ══════════════════════════════════════════════════════════════
const PaymentReceipt=({store,payment,student,onClose,toast}) => {
  const{settings,students,payments}=store;
  const receiptNo=payment.receiptNo||genReceiptNo(payments.filter(p=>new Date(p.created||0)<=new Date(payment.created||0)));
  const {currentDue,carryForward}=calcOutstanding(student.id,payment.monthKey,students,payments);
  const printRef=useRef(null);

  const receiptHTML=()=>{
    return `
<!DOCTYPE html><html><head><meta charset="utf-8"/><title>Receipt ${receiptNo}</title>
<style>
  * { box-sizing:border-box; margin:0; padding:0; }
  body { font-family: -apple-system, 'Segoe UI', Roboto, Arial, sans-serif; padding:32px; color:#0f0a2e; background:#f8faff; }
  .receipt { max-width:480px; margin:0 auto; background:#fff; border-radius:16px; overflow:hidden; box-shadow:0 4px 24px rgba(0,0,0,.08); border:1px solid #eef2ff; }
  .head { background:linear-gradient(135deg,#0d1b42,#1e3a8a); color:#fff; padding:28px 28px 22px; }
  .head .inst { font-size:19px; font-weight:900; letter-spacing:-.3px; }
  .head .sub { font-size:12px; opacity:.75; margin-top:3px; }
  .head .badge { display:inline-block; margin-top:14px; background:rgba(255,255,255,.15); border-radius:8px; padding:4px 12px; font-size:11px; font-weight:700; letter-spacing:.5px; }
  .body { padding:24px 28px; }
  .row { display:flex; justify-content:space-between; padding:9px 0; border-bottom:1px solid #f1f5f9; font-size:13px; }
  .row .l { color:#64748b; font-weight:600; }
  .row .r { color:#0f0a2e; font-weight:700; text-align:right; }
  .amount-box { background:linear-gradient(135deg,#ecfdf5,#d1fae5); border:1.5px solid #86efac; border-radius:14px; padding:20px; text-align:center; margin:20px 0; }
  .amount-box .label { font-size:11px; font-weight:700; color:#166534; text-transform:uppercase; letter-spacing:1px; }
  .amount-box .amt { font-size:32px; font-weight:900; color:#065f46; margin-top:6px; letter-spacing:-1px; }
  .amount-box .words { font-size:11px; color:#166534; margin-top:6px; font-style:italic; }
  .status-paid { display:inline-block; background:#dcfce7; color:#15803d; font-size:11px; font-weight:800; padding:4px 14px; border-radius:20px; text-transform:uppercase; letter-spacing:.5px; }
  .outstanding { background:#fff7ed; border:1.5px solid #fed7aa; border-radius:12px; padding:14px 16px; margin-top:16px; font-size:12px; color:#c2410c; }
  .outstanding b { color:#9a3412; }
  .footer { padding:18px 28px 26px; text-align:center; border-top:1px dashed #e2e8f0; margin-top:8px; }
  .footer .thanks { font-size:13px; font-weight:700; color:#0f0a2e; }
  .footer .note { font-size:11px; color:#94a3b8; margin-top:4px; }
  .sign { display:flex; justify-content:space-between; margin-top:24px; padding-top:16px; }
  .sign div { text-align:center; font-size:11px; color:#94a3b8; }
  .sign .line { width:120px; border-top:1.5px solid #cbd5e1; margin-bottom:6px; }
  @media print { body{background:#fff;padding:0;} .receipt{box-shadow:none;border:none;max-width:100%;} }
</style></head>
<body>
  <div class="receipt">
    <div class="head">
      <div class="inst">${settings.institute}</div>
      <div class="sub">${settings.teacher ? "Teacher: "+settings.teacher : ""}</div>
      <div class="badge">RECEIPT #${receiptNo}</div>
    </div>
    <div class="body">
      <div class="row"><span class="l">Student Name</span><span class="r">${student.name}</span></div>
      <div class="row"><span class="l">Phone</span><span class="r">${student.phone||"—"}</span></div>
      <div class="row"><span class="l">Payment Date</span><span class="r">${fmtDate(payment.date)}</span></div>
      <div class="row"><span class="l">Fee Month</span><span class="r">${monthFull(payment.monthKey)}</span></div>
      <div class="row"><span class="l">Payment Method</span><span class="r">${payment.method}</span></div>
      ${payment.note?`<div class="row"><span class="l">Note</span><span class="r">${payment.note}</span></div>`:""}

      <div class="amount-box">
        <div class="label">Amount Paid</div>
        <div class="amt">${settings.currency}${payment.amount.toLocaleString("en-IN")}</div>
        <div class="words">${numberToWords(payment.amount)} Rupees Only</div>
      </div>

      <div style="text-align:center;"><span class="status-paid">Payment Received</span></div>

      ${(currentDue>0||carryForward>0)?`<div class="outstanding">⚠ <b>Remaining balance for ${monthFull(payment.monthKey)}: ${settings.currency}${currentDue}</b>${carryForward>0?`<br/>Previous months pending: ${settings.currency}${carryForward}`:""}</div>`:`<div class="outstanding" style="background:#f0fdf4;border-color:#bbf7d0;color:#166534;"><b>✓ Fully paid for ${monthFull(payment.monthKey)}</b></div>`}

      <div class="sign">
        <div><div class="line"></div>Student / Parent Signature</div>
        <div><div class="line"></div>Authorized Signature</div>
      </div>
    </div>
    <div class="footer">
      <div class="thanks">Thank you for your payment!</div>
      <div class="note">This is a computer-generated receipt · Generated on ${fmtDate(todayStr())}</div>
    </div>
  </div>
</body></html>`;
  };

  const openPrintWindow=()=>{
    const w=window.open("","_blank");
    w.document.write(receiptHTML());
    w.document.close();
    setTimeout(()=>w.print(),300);
  };

  const shareWhatsApp=()=>{
    const phone=student.phone?.replace(/\D/g,"");
    const text=`Payment Receipt - ${settings.institute}\nReceipt #${receiptNo}\n\nStudent: ${student.name}\nAmount Paid: ${settings.currency}${payment.amount}\nDate: ${fmtDate(payment.date)}\nMonth: ${monthFull(payment.monthKey)}\nMethod: ${payment.method}\n\n${(currentDue>0||carryForward>0)?`Remaining due: ${settings.currency}${currentDue+carryForward}`:"Fully paid ✓"}\n\nThank you!`;
    window.open(`https://wa.me/${phone?`91${phone}`:""}?text=${encodeURIComponent(text)}`,"_blank");
  };

  const shareEmail=()=>{
    const text=`Payment Receipt - ${settings.institute}\nReceipt #${receiptNo}\n\nStudent: ${student.name}\nAmount Paid: ${settings.currency}${payment.amount}\nDate: ${fmtDate(payment.date)}\nMonth: ${monthFull(payment.monthKey)}\nMethod: ${payment.method}\n\n${(currentDue>0||carryForward>0)?`Remaining due: ${settings.currency}${currentDue+carryForward}`:"Fully paid"}\n\nThank you!`;
    window.open(`mailto:${student.email||""}?subject=${encodeURIComponent(`Payment Receipt #${receiptNo} - ${student.name}`)}&body=${encodeURIComponent(text)}`,"_blank");
  };

  return(
    <Sheet title="Payment Receipt" onClose={onClose}>
      {/* Receipt preview card */}
      <div style={{borderRadius:18,overflow:"hidden",border:"1.5px solid #eef2ff",boxShadow:"0 4px 16px rgba(0,0,0,.06)"}}>
        <div style={{background:"linear-gradient(135deg,#0d1b42,#1e3a8a)",color:"#fff",padding:"22px 22px 18px"}}>
          <div style={{fontSize:17,fontWeight:900,letterSpacing:-.3}}>{settings.institute}</div>
          {settings.teacher&&<div style={{fontSize:11,opacity:.75,marginTop:3}}>Teacher: {settings.teacher}</div>}
          <div style={{display:"inline-block",marginTop:12,background:"rgba(255,255,255,.15)",borderRadius:8,padding:"4px 12px",fontSize:11,fontWeight:700,letterSpacing:.5}}>RECEIPT #{receiptNo}</div>
        </div>
        <div style={{padding:"20px 22px",background:"#fff"}}>
          {[["Student Name",student.name],["Phone",student.phone||"—"],["Payment Date",fmtDate(payment.date)],["Fee Month",monthFull(payment.monthKey)],["Method",payment.method]].map(([l,v])=>(
            <div key={l} style={{display:"flex",justifyContent:"space-between",padding:"8px 0",borderBottom:"1px solid #f1f5f9",fontSize:13}}>
              <span style={{color:"#64748b",fontWeight:600}}>{l}</span><span style={{color:"#0f0a2e",fontWeight:700}}>{v}</span>
            </div>
          ))}
          <div style={{background:"linear-gradient(135deg,#ecfdf5,#d1fae5)",border:"1.5px solid #86efac",borderRadius:14,padding:"18px",textAlign:"center",margin:"16px 0"}}>
            <div style={{fontSize:10,fontWeight:800,color:"#166534",textTransform:"uppercase",letterSpacing:1}}>Amount Paid</div>
            <div style={{fontSize:28,fontWeight:900,color:"#065f46",marginTop:5,letterSpacing:-1}}>{settings.currency}{payment.amount.toLocaleString("en-IN")}</div>
            <div style={{fontSize:10,color:"#166534",marginTop:5,fontStyle:"italic"}}>{numberToWords(payment.amount)} Rupees Only</div>
          </div>
          {(currentDue>0||carryForward>0)?(
            <div style={{background:"#fff7ed",border:"1.5px solid #fed7aa",borderRadius:12,padding:"12px 14px",fontSize:12,color:"#c2410c"}}>
              ⚠ <b style={{color:"#9a3412"}}>Remaining for {monthLabel(payment.monthKey)}: {settings.currency}{currentDue}</b>
              {carryForward>0&&<div style={{marginTop:2}}>Previous pending: {settings.currency}{carryForward}</div>}
            </div>
          ):(
            <div style={{background:"#f0fdf4",border:"1.5px solid #bbf7d0",borderRadius:12,padding:"12px 14px",fontSize:12,color:"#166534",textAlign:"center",fontWeight:700}}>
              ✓ Fully paid for {monthLabel(payment.monthKey)}
            </div>
          )}
        </div>
      </div>

      {/* Action buttons */}
      <div style={{display:"flex",gap:8,marginTop:16}}>
        <button onClick={openPrintWindow} style={{flex:1,background:"#ede9fe",border:"none",borderRadius:11,padding:"12px",fontSize:12,fontWeight:700,color:"#5b21b6",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:6}}>
          <I n="printer" s={18} c="#5b21b6"/> Print / PDF
        </button>
        <button onClick={shareWhatsApp} style={{flex:1,background:"#dcfce7",border:"none",borderRadius:11,padding:"12px",fontSize:12,fontWeight:700,color:"#166534",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:6}}>
          <svg width={18} height={18} viewBox="0 0 24 24" fill="#16a34a"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
          WhatsApp
        </button>
        <button onClick={shareEmail} style={{flex:1,background:"#dbeafe",border:"none",borderRadius:11,padding:"12px",fontSize:12,fontWeight:700,color:"#1e40af",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:6}}>
          <I n="mail" s={18} c="#1e40af"/> Email
        </button>
      </div>
    </Sheet>
  );
};

// Converts a number to words (Indian numbering system) for receipt amount-in-words
const numberToWords=(num)=>{
  if(num===0) return "Zero";
  const ones=["","One","Two","Three","Four","Five","Six","Seven","Eight","Nine","Ten","Eleven","Twelve","Thirteen","Fourteen","Fifteen","Sixteen","Seventeen","Eighteen","Nineteen"];
  const tens=["","","Twenty","Thirty","Forty","Fifty","Sixty","Seventy","Eighty","Ninety"];
  const twoDigits=n=>{
    if(n<20) return ones[n];
    return tens[Math.floor(n/10)]+(n%10?" "+ones[n%10]:"");
  };
  const threeDigits=n=>{
    if(n<100) return twoDigits(n);
    return ones[Math.floor(n/100)]+" Hundred"+(n%100?" "+twoDigits(n%100):"");
  };
  let n=Math.floor(num);
  if(n===0) return "Zero";
  let result="";
  const crore=Math.floor(n/10000000); n%=10000000;
  const lakh=Math.floor(n/100000); n%=100000;
  const thousand=Math.floor(n/1000); n%=1000;
  const hundred=n;
  if(crore) result+=threeDigits(crore)+" Crore ";
  if(lakh) result+=threeDigits(lakh)+" Lakh ";
  if(thousand) result+=threeDigits(thousand)+" Thousand ";
  if(hundred) result+=threeDigits(hundred);
  return result.trim();
};

// ══════════════════════════════════════════════════════════════
// 30-DAY MILESTONE + FEE ALERTS
// ══════════════════════════════════════════════════════════════
const useAlerts=(students,payments)=>{
  return students.filter(s=>!s.archived).map(s=>{
    const days=daysSince(s.joining);
    const mk=curMK();
    const {total}=calcOutstanding(s.id,mk,students,payments);
    const alerts=[];
    if(days>=30&&days<=37) alerts.push({type:"joining",msg:`${s.name} has completed 30 days! Confirm next month's fee.`,color:"#2563eb",icon:"party"});
    if(total>0) alerts.push({type:"fee",msg:`${s.name} has ₹${total} outstanding.`,color:"#ef4444",icon:"rupee"});
    return alerts;
  }).flat().slice(0,6);
};

// ══════════════════════════════════════════════════════════════
// NOTES & REMINDERS — per-student to-do timeline
// ══════════════════════════════════════════════════════════════
const NotesPanel=({store,studentId,toast})=>{
  const{notes,setNotes}=store;
  const[showAdd,setShowAdd]=useState(false);
  const[form,setForm]=useState({text:"",dueDate:"",priority:"normal"});
  const sf=(k,v)=>setForm(f=>({...f,[k]:v}));
  const studentNotes=notes.filter(n=>n.studentId===studentId).sort((a,b)=>{
    if(a.done!==b.done) return a.done?1:-1;
    return (a.dueDate||"9999").localeCompare(b.dueDate||"9999");
  });

  const addNote=()=>{
    if(!form.text.trim()) return toast.error("Please write a note");
    setNotes(ns=>[...ns,{id:uid(),studentId,text:form.text,dueDate:form.dueDate,priority:form.priority,done:false,created:Date.now()}]);
    toast.success("Reminder added","Added!");
    setForm({text:"",dueDate:"",priority:"normal"});
    setShowAdd(false);
  };
  const toggleDone=id=>setNotes(ns=>ns.map(n=>n.id===id?{...n,done:!n.done}:n));
  const deleteNote=id=>{setNotes(ns=>ns.filter(n=>n.id!==id));toast.info("Reminder removed");};

  const priorityColor={high:"#ef4444",normal:"#1e3a8a",low:"#94a3b8"};
  const today=todayStr();

  return(
    <div style={{background:"var(--card)",borderRadius:16,padding:"16px",border:"1px solid var(--cardBorder)",marginBottom:12}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
        <div style={{fontWeight:800,fontSize:13,color:"var(--text)",textTransform:"uppercase",letterSpacing:.5,display:"flex",alignItems:"center",gap:6}}>
          <I n="note" s={15} c="#1e3a8a"/> Notes & Reminders
        </div>
        <button onClick={()=>setShowAdd(true)} style={{background:"#ede9fe",border:"none",borderRadius:9,padding:"5px 10px",cursor:"pointer",display:"flex",alignItems:"center",gap:4}}>
          <I n="plus" s={13} c="#1e3a8a"/><span style={{fontSize:11,fontWeight:700,color:"#1e3a8a"}}>Add</span>
        </button>
      </div>

      {studentNotes.length===0&&<div style={{textAlign:"center",padding:"16px 0",color:"var(--textFaint)",fontSize:13}}>No reminders yet. Add notes like "Call about fee" or "Discuss test result".</div>}

      {studentNotes.map(n=>{
        const isOverdue=n.dueDate&&n.dueDate<today&&!n.done;
        return(
          <div key={n.id} style={{display:"flex",alignItems:"flex-start",gap:10,padding:"10px 0",borderBottom:"1px solid var(--cardBorder)"}}>
            <button onClick={()=>toggleDone(n.id)} style={{background:"none",border:"none",cursor:"pointer",padding:0,marginTop:1,flexShrink:0}}>
              <div style={{width:19,height:19,borderRadius:6,border:`2px solid ${n.done?"#10b981":priorityColor[n.priority]||"#1e3a8a"}`,background:n.done?"#10b981":"transparent",display:"flex",alignItems:"center",justifyContent:"center"}}>
                {n.done&&<I n="check" s={11} c="#fff"/>}
              </div>
            </button>
            <div style={{flex:1,minWidth:0}}>
              <div style={{fontSize:13,fontWeight:600,color:n.done?"var(--textFaint)":"var(--text)",textDecoration:n.done?"line-through":"none",lineHeight:1.4}}>{n.text}</div>
              <div style={{display:"flex",gap:8,marginTop:4,alignItems:"center"}}>
                {n.dueDate&&<span style={{fontSize:10,fontWeight:700,color:isOverdue?"#ef4444":"var(--textFaint)",background:isOverdue?"#fee2e2":"var(--inputBg)",borderRadius:6,padding:"2px 7px"}}>{isOverdue?"Overdue: ":""}{fmtDate(n.dueDate)}</span>}
                {n.priority==="high"&&!n.done&&<span style={{fontSize:10,fontWeight:700,color:"#ef4444",background:"#fee2e2",borderRadius:6,padding:"2px 7px"}}>High Priority</span>}
              </div>
            </div>
            <button onClick={()=>deleteNote(n.id)} style={{background:"none",border:"none",cursor:"pointer",padding:4,flexShrink:0}}><I n="x" s={14} c="var(--textFaint)"/></button>
          </div>
        );
      })}

      {showAdd&&(
        <div style={{marginTop:12,paddingTop:12,borderTop:"1px solid var(--cardBorder)"}}>
          <Inp label="Reminder Note" value={form.text} onChange={v=>sf("text",v)} placeholder="e.g. Call parent about fee payment" req/>
          <div style={{display:"flex",gap:10}}>
            <div style={{flex:1}}><Inp label="Due Date (optional)" value={form.dueDate} onChange={v=>sf("dueDate",v)} type="date"/></div>
            <div style={{flex:1}}>
              <label style={{display:"block",fontSize:11,fontWeight:700,color:"var(--textMuted)",marginBottom:5,textTransform:"uppercase",letterSpacing:.6}}>Priority</label>
              <select value={form.priority} onChange={e=>sf("priority",e.target.value)} style={{width:"100%",padding:"11px 13px",border:"1.5px solid var(--cardBorder)",borderRadius:11,fontSize:14,color:"var(--text)",background:"var(--inputBg)",outline:"none",boxSizing:"border-box",fontFamily:"inherit"}}>
                <option value="high">High</option><option value="normal">Normal</option><option value="low">Low</option>
              </select>
            </div>
          </div>
          <div style={{display:"flex",gap:10,marginTop:4}}>
            <Btn onClick={()=>{setShowAdd(false);setForm({text:"",dueDate:"",priority:"normal"});}} outline c="#64748b" full sm>Cancel</Btn>
            <Btn onClick={addNote} full sm>Save Reminder</Btn>
          </div>
        </div>
      )}
    </div>
  );
};


// ══════════════════════════════════════════════════════════════
// STUDENT ATTENDANCE DETAIL — full monthly calendar per student
// ══════════════════════════════════════════════════════════════
const StudentAttendanceDetail=({store,student,onBack}) => {
  const{shifts,attend}=store;
  const[viewMK,setViewMK]=useState(()=>curMK());
  const[mkY,mkM]=viewMK.split("-").map(Number);
  const myShiftIds=getShiftIds(student);
  const myShifts=myShiftIds.map(id=>shifts.find(sh=>sh.id===id)).filter(Boolean);
  const shift=myShifts; // array — studentMonthAttendance merges scheduled days across all enrolled batches
  const shiftLabel=myShifts.length?myShifts.map(s=>s.name).join(" + "):"No batch assigned";
  const detail=studentMonthAttendance(student,shift,mkY,mkM,attend);
  const isCurrentViewMonth=viewMK===curMK();
  const remainingClasses=detail.rows.filter(r=>r.isFuture&&!r.beforeJoining).length;

  const monthOpts=[];
  for(let i=0;i<8;i++){const d=new Date();d.setMonth(d.getMonth()-i);monthOpts.push({v:mkKey(d.getFullYear(),d.getMonth()+1),l:monthLabel(mkKey(d.getFullYear(),d.getMonth()+1))});}

  // Build calendar grid
  const firstDay=new Date(mkY,mkM-1,1).getDay();
  const daysInMonth=new Date(mkY,mkM,0).getDate();
  const cells=[];
  for(let i=0;i<firstDay;i++) cells.push(null);
  for(let d=1;d<=daysInMonth;d++) cells.push(d);
  while(cells.length%7!==0) cells.push(null);

  const rowByDay={}; // day -> array of rows (could be >1 if student has multiple classes that day)
  detail.rows.forEach(r=>{(rowByDay[r.day]=rowByDay[r.day]||[]).push(r);});
  const statusPriority={absent:0,leave:1,"":2,present:3};
  const worstRowForDay=day=>{
    const list=rowByDay[day];
    if(!list)return null;
    return [...list].sort((a,b)=>(statusPriority[a.status]??2)-(statusPriority[b.status]??2))[0];
  };

  // Overall lifetime stats (all months combined) for this student
  const allKeys=Object.entries(attend).filter(([k])=>k.startsWith(student.id+"-"));
  const lifetimePresent=allKeys.filter(([,v])=>v==="present").length;
  const lifetimeAbsent=allKeys.filter(([,v])=>v==="absent").length;
  const lifetimeTotal=allKeys.length;
  const lifetimePct=lifetimeTotal>0?Math.round((lifetimePresent/lifetimeTotal)*1000)/10:0;

  return(
    <div>
      <PageHeader title={`${student.name}'s Attendance`} onBack={onBack}/>
      <div style={{padding:"0 16px 24px"}}>

        {/* Lifetime summary */}
        <div style={{background:"linear-gradient(135deg,#0d1b42,#1e3a8a)",borderRadius:18,padding:"16px 20px",marginBottom:14,color:"#fff"}}>
          <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:12}}>
            <Avatar name={student.name} size={40}/>
            <div>
              <div style={{fontSize:15,fontWeight:900}}>{student.name}</div>
              <div style={{fontSize:11,opacity:.7}}>{shiftLabel}</div>
            </div>
          </div>
          <div style={{display:"flex",justifyContent:"space-around",paddingTop:12,borderTop:"1px solid rgba(255,255,255,.15)"}}>
            <div style={{textAlign:"center"}}><div style={{fontSize:20,fontWeight:900,color:"#86efac"}}>{lifetimePresent}</div><div style={{fontSize:10,opacity:.7}}>PRESENT</div></div>
            <div style={{textAlign:"center"}}><div style={{fontSize:20,fontWeight:900,color:"#fca5a5"}}>{lifetimeAbsent}</div><div style={{fontSize:10,opacity:.7}}>ABSENT</div></div>
            <div style={{textAlign:"center"}}><div style={{fontSize:20,fontWeight:900}}>{lifetimeTotal}</div><div style={{fontSize:10,opacity:.7}}>TOTAL</div></div>
            <div style={{textAlign:"center"}}><div style={{fontSize:20,fontWeight:900,color:lifetimePct>=75?"#86efac":"#fbbf24"}}>{lifetimePct}%</div><div style={{fontSize:10,opacity:.7}}>OVERALL</div></div>
          </div>
        </div>

        {/* Month selector */}
        <select value={viewMK} onChange={e=>setViewMK(e.target.value)} style={{width:"100%",padding:"11px 13px",border:"1.5px solid var(--cardBorder)",borderRadius:12,fontSize:14,color:"var(--text)",background:"var(--card)",outline:"none",marginBottom:12,fontWeight:800,fontFamily:"inherit"}}>
          {monthOpts.map(o=><option key={o.v} value={o.v}>{o.l}</option>)}
        </select>

        {/* This month stats */}
        <div style={{display:"flex",gap:8,marginBottom:14}}>
          <div style={{flex:1,background:"#dcfce7",borderRadius:12,padding:"10px 8px",textAlign:"center"}}>
            <div style={{fontSize:18,fontWeight:900,color:"#166534"}}>{detail.present}</div>
            <div style={{fontSize:9,color:"#166534",fontWeight:700}}>PRESENT</div>
          </div>
          <div style={{flex:1,background:"#fee2e2",borderRadius:12,padding:"10px 8px",textAlign:"center"}}>
            <div style={{fontSize:18,fontWeight:900,color:"#991b1b"}}>{detail.absent}</div>
            <div style={{fontSize:9,color:"#991b1b",fontWeight:700}}>ABSENT</div>
          </div>
          <div style={{flex:1,background:"#ede9fe",borderRadius:12,padding:"10px 8px",textAlign:"center"}}>
            <div style={{fontSize:18,fontWeight:900,color:"#5b21b6"}}>{detail.leave}</div>
            <div style={{fontSize:9,color:"#5b21b6",fontWeight:700}}>LEAVE</div>
          </div>
          <div style={{flex:1,background:"#f1f5f9",borderRadius:12,padding:"10px 8px",textAlign:"center"}}>
            <div style={{fontSize:18,fontWeight:900,color:"#64748b"}}>{detail.notMarked}</div>
            <div style={{fontSize:9,color:"#64748b",fontWeight:700}}>NOT MARKED</div>
          </div>
        </div>

        {/* Progress bar */}
        <div style={{background:"var(--card)",borderRadius:14,padding:"14px 16px",border:"1.5px solid var(--cardBorder)",marginBottom:16}}>
          <div style={{display:"flex",justifyContent:"space-between",fontSize:12,marginBottom:6}}>
            <span style={{color:"var(--textMuted)",fontWeight:700}}>Attendance Rate</span>
            <span style={{fontWeight:900,color:detail.pct>=75?"#10b981":detail.pct>=50?"#f59e0b":"#ef4444"}}>{detail.pct}%</span>
          </div>
          <div style={{background:"var(--inputBg)",borderRadius:8,height:8,overflow:"hidden"}}>
            <div style={{background:detail.pct>=75?"#10b981":detail.pct>=50?"#f59e0b":"#ef4444",height:"100%",width:`${detail.pct}%`,borderRadius:8,transition:"width .3s"}}/>
          </div>
          <div style={{fontSize:11,color:"var(--textFaint)",marginTop:6}}>{detail.present} of {detail.applicable} applicable classes attended (excludes future/pre-joining dates)</div>
        </div>

        {/* Classes remaining this month */}
        {isCurrentViewMonth&&<div style={{background:"linear-gradient(135deg,#ec4899,#f472b6)",borderRadius:14,padding:"14px 16px",marginBottom:16,display:"flex",justifyContent:"space-between",alignItems:"center",color:"#fff"}}>
          <div>
            <div style={{fontSize:11,fontWeight:700,opacity:.85,textTransform:"uppercase",letterSpacing:.5}}>Classes Remaining This Month</div>
            <div style={{fontSize:11,opacity:.75,marginTop:2}}>{detail.totalScheduled} scheduled · {detail.applicable} done so far</div>
          </div>
          <div style={{fontSize:26,fontWeight:900}}>{remainingClasses}</div>
        </div>}

        {/* Calendar grid with per-day status */}
        <div style={{fontWeight:800,fontSize:12,color:"var(--textMuted)",textTransform:"uppercase",letterSpacing:.7,marginBottom:10}}>Daily Calendar — {monthLabel(viewMK)}</div>
        <div style={{background:"var(--card)",borderRadius:16,padding:"16px",border:"1.5px solid var(--cardBorder)",marginBottom:16}}>
          <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:4,marginBottom:8}}>
            {["S","M","T","W","T","F","S"].map((d,i)=><div key={i} style={{textAlign:"center",fontSize:11,fontWeight:800,color:"var(--textFaint)",padding:"4px 0"}}>{d}</div>)}
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:4}}>
            {cells.map((d,i)=>{
              if(!d) return <div key={i}/>;
              const row=worstRowForDay(d);
              const multi=(rowByDay[d]||[]).length>1;
              let bg="transparent",color="var(--textFaint)",label=d;
              if(row){
                if(row.beforeJoining){bg="var(--inputBg)";color="var(--textFaint)";}
                else if(row.isFuture){bg="var(--inputBg)";color="var(--textFaint)";}
                else if(row.status==="present"){bg="#10b981";color="#fff";}
                else if(row.status==="absent"){bg="#ef4444";color="#fff";}
                else if(row.status==="leave"){bg="#2563eb";color="#fff";}
                else {bg="#fef9c3";color="#92400e";}
              }
              return(
                <div key={i} style={{textAlign:"center",padding:"7px 2px",borderRadius:9,background:bg,position:"relative"}}>
                  <div style={{fontSize:12,fontWeight:row?800:400,color}}>{label}</div>
                  {multi&&<div style={{position:"absolute",top:1,right:1,width:6,height:6,borderRadius:"50%",background:color==="#fff"?"rgba(255,255,255,.8)":"#6366f1"}}/>}
                </div>
              );
            })}
          </div>
          {/* Legend */}
          <div style={{display:"flex",gap:12,marginTop:14,paddingTop:12,borderTop:"1px solid var(--cardBorder)",flexWrap:"wrap"}}>
            {[["#10b981","Present"],["#ef4444","Absent"],["#2563eb","Leave"],["#fef9c3","Not Marked"],["var(--inputBg)","N/A"]].map(([c,l])=>(
              <div key={l} style={{display:"flex",alignItems:"center",gap:5}}>
                <div style={{width:10,height:10,borderRadius:3,background:c,border:c==="var(--inputBg)"?"1px solid var(--cardBorder)":"none"}}/>
                <span style={{fontSize:10,color:"var(--textFaint)",fontWeight:600}}>{l}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Class-by-class list */}
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
          <div style={{fontWeight:800,fontSize:12,color:"var(--textMuted)",textTransform:"uppercase",letterSpacing:.7}}>Class-wise Log</div>
          <div style={{fontSize:10,color:"var(--textFaint)",fontWeight:700}}>{monthLabel(viewMK)}</div>
        </div>
        {detail.rows.filter(r=>!r.beforeJoining).length===0&&<div style={{textAlign:"center",padding:"20px 0",color:"var(--textFaint)",fontSize:13}}>No classes yet for this month</div>}
        {[...detail.rows].filter(r=>!r.beforeJoining).reverse().map(r=>(
          <div key={r.date+"-"+r.shiftId} style={{background:"var(--card)",borderRadius:12,padding:"10px 14px",marginBottom:6,border:"1.5px solid var(--cardBorder)",display:"flex",alignItems:"center",justifyContent:"space-between",opacity:r.isFuture?.55:1}}>
            <div>
              <span style={{fontSize:13,fontWeight:700,color:"var(--text)"}}>{fmtDate(r.date)}</span>
              <span style={{fontSize:11,color:"var(--textFaint)",marginLeft:8}}>{new Date(r.date+"T00:00:00").toLocaleDateString("en-IN",{weekday:"short"})}</span>
              {myShifts.length>1&&<div style={{fontSize:10,color:"#6366f1",fontWeight:700,marginTop:2}}>{r.shiftName}</div>}
            </div>
            {r.isFuture?<span style={{fontSize:11,fontWeight:700,color:"var(--textFaint)",background:"var(--inputBg)",borderRadius:20,padding:"2px 10px"}}>UPCOMING</span>:<>
              {r.status==="present"&&<Badge s="present"/>}
              {r.status==="absent"&&<Badge s="absent"/>}
              {r.status==="leave"&&<span style={{fontSize:11,fontWeight:700,color:"#5b21b6",background:"#ede9fe",borderRadius:20,padding:"2px 10px"}}>LEAVE</span>}
              {!r.status&&<span style={{fontSize:11,fontWeight:700,color:"#b45309",background:"#fef9c3",borderRadius:20,padding:"2px 10px"}}>NOT MARKED</span>}
            </>}
          </div>
        ))}
      </div>
    </div>
  );
};

// ══════════════════════════════════════════════════════════════
// DASHBOARD
// ══════════════════════════════════════════════════════════════
const Dashboard=({store,goTo,toast,onStudentLogin,currentTeacher})=>{
  const {students,shifts,attend,payments,settings,notes,messages,leaveRequests,feedbackRequests,marks,teachers,teacherMessages,timetableRequests,holidays,admissionApplications}=store;
  const today=todayStr(), mk=curMK();
  const todayHolidayD=getHoliday(today,holidays);
  const [mkY,mkM]=mk.split("-").map(Number);
  const active=students.filter(s=>!s.archived);
  const presentToday=active.filter(s=>attend[`${s.id}-${today}`]==="present").length;
  const absentToday=active.filter(s=>attend[`${s.id}-${today}`]==="absent").length;
  const totalExpected=active.reduce((a,s)=>a+s.monthlyFee,0);
  const totalPaidMK=payments.filter(p=>p.monthKey===mk).reduce((a,p)=>a+p.amount,0);
  const pendingStudents=active.filter(s=>calcOutstanding(s.id,mk,students,payments).total>0).length;
  const totalClassesMo=shifts.reduce((a,sh)=>a+classesInMonth(sh,mkY,mkM),0);
  const now=new Date();
  const hm=`${String(now.getHours()).padStart(2,"0")}:${String(now.getMinutes()).padStart(2,"0")}`;
  const dayAbbr=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"][now.getDay()];
  const todayShifts=shifts.filter(sh=>sh.days?.includes(dayAbbr)).map(sh=>({...sh,...getShiftTime(sh,dayAbbr)}));
  const currentShift=todayShifts.find(sh=>hm>=sh.start&&hm<=sh.end);
  const nextShift=todayShifts.find(sh=>sh.start>hm);
  const alerts=useAlerts(students,payments);
  const [showReport,setShowReport]=useState(false);
  const [dismissed,setDismissed]=useState(()=>LS.get("tp4_dismissed")||[]);
  const dismissAlert=idx=>{const n=[...dismissed,alerts[idx]?.msg];setDismissed(n);LS.set("tp4_dismissed",n);};
  const visibleAlerts=alerts.filter(a=>!dismissed.includes(a.msg));
  const milestoneStudents=active.filter(s=>{const d=daysSince(s.joining);return d>=28&&d<=35;});
  const favoriteStudents=active.filter(s=>s.favorite);
  const overdueNotes=notes.filter(n=>!n.done&&n.dueDate&&n.dueDate<today&&active.find(s=>s.id===n.studentId));
  const todayNotes=notes.filter(n=>!n.done&&n.dueDate===today&&active.find(s=>s.id===n.studentId));
  const birthdaysSoon=active.filter(s=>{const d=daysToBirthday(s.dob);return d!==null&&d<=7;}).sort((a,b)=>daysToBirthday(a.dob)-daysToBirthday(b.dob));

  // ── Notification Bell (admin sees everything system-wide) ──
  const unreadMsgs=(messages||[]).filter(m=>m.from==="student"&&!m.read);
  const pendingLeaveN=(leaveRequests||[]).filter(lr=>lr.status==="pending");
  const pendingFeedbackN=(feedbackRequests||[]).filter(f=>f.status==="pending");
  const pendingMarksN=(marks||[]).filter(m=>m.status==="pending");
  const unreadTeacherMsgs=(teacherMessages||[]).filter(m=>m.from==="teacher"&&!m.read);
  const pendingTimetableN=(timetableRequests||[]).filter(r=>r.status==="pending");
  const pendingAdmissionsN=(admissionApplications||[]).filter(a=>a.status==="pending");
  const pendingClaimsN=(store.paymentClaims||[]).filter(c=>c.status==="pending");
  const bellItems=[
    ...unreadMsgs.slice(0,6).map(m=>{const st=active.find(s=>s.id===m.studentId);return{icon:"phone",color:"#0ea5e9",title:st?.name||"Student",desc:m.text,unread:true,onClick:()=>goTo("shifts","messages")};}),
    ...unreadTeacherMsgs.slice(0,6).map(m=>{const t=(teachers||[]).find(x=>x.id===m.teacherId);return{icon:"shield",color:"#7c3aed",title:(t?.name||"Teacher")+" (Teacher)",desc:m.text,unread:true,onClick:()=>goTo("shifts","teachermessages")};}),
    ...pendingLeaveN.slice(0,6).map(lr=>{const st=active.find(s=>s.id===lr.studentId);return{icon:"note",color:"#2563eb",title:"Leave Request",desc:`${st?.name||"Student"} · ${lr.reason||"No reason given"}`,unread:true,onClick:()=>goTo("shifts","leaverequests")};}),
    ...pendingTimetableN.slice(0,6).map(r=>{const st=active.find(s=>s.id===r.studentId);return{icon:"cal",color:"#f59e0b",title:"Timetable Report",desc:`${st?.name||"Student"} · ${r.message}`,unread:true,onClick:()=>goTo("shifts","timetablereports")};}),
    ...pendingClaimsN.slice(0,6).map(c=>{const st=active.find(s=>s.id===c.studentId);return{icon:"rupee",color:"#16a34a",title:"UPI payment to verify",desc:`${st?.name||"Student"} · ${settings.currency}${c.amount}`,unread:true,onClick:()=>goTo("more","parents")};}),
    ...pendingAdmissionsN.slice(0,6).map(a=>({icon:"userplus",color:"#16a34a",title:`New ${a.type==="student"?"Admission":"Teacher"} Application`,desc:a.name,unread:true,onClick:()=>goTo("shifts","admissions")})),
    ...pendingFeedbackN.slice(0,6).map(f=>({icon:"zap",color:"#f59e0b",title:`Feedback · ${f.teacherName}`,desc:f.subject,unread:true,onClick:()=>goTo("shifts","feedback")})),
    ...pendingMarksN.slice(0,6).map(m=>{const st=active.find(s=>s.id===m.studentId);return{icon:"book",color:"#f59e0b",title:"Marks Awaiting Verification",desc:`${st?.name||"Student"} · ${m.subject}`,unread:true,onClick:()=>goTo("shifts","marks")};}),
  ];

  const Stat=({label,val,color,icon,sub})=>(
    <div style={{background:"var(--card)",borderRadius:18,padding:"15px 14px 14px",border:"1px solid var(--cardBorder)",flex:"1 1 130px",boxShadow:"0 4px 16px var(--shadow)",position:"relative",overflow:"hidden"}}>
      <div style={{position:"absolute",top:0,left:0,right:0,height:3,background:color}}/>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:10}}>
        <span style={{fontSize:10,color:"var(--textFaint)",fontWeight:700,textTransform:"uppercase",letterSpacing:.7}}>{label}</span>
        <div style={{background:color+"18",borderRadius:9,padding:"5px 7px"}}><I n={icon} s={14} c={color}/></div>
      </div>
      <div style={{fontSize:25,fontWeight:900,color:"var(--text)",letterSpacing:-1}}>{val}</div>
      {sub&&<div style={{fontSize:11,color:"var(--textFaint)",marginTop:3}}>{sub}</div>}
    </div>
  );

  return (
    <div style={{paddingBottom:16}}>
      <div style={{margin:"14px 16px 0",position:"relative",background:"linear-gradient(150deg,#061640 0%,#0d2a6e 58%,#1746b0 100%)",borderRadius:28,padding:"20px 20px 18px",color:"#fff",overflow:"hidden",boxShadow:"0 18px 40px rgba(6,22,64,.34)"}}>
        <svg aria-hidden="true" width="200" height="200" viewBox="0 0 200 200" style={{position:"absolute",right:-62,top:-62,pointerEvents:"none"}}>
          {[96,70,44].map((r,i)=><circle key={r} cx="100" cy="100" r={r} fill="none" stroke="#f5b93a" strokeOpacity={.36-i*.09} strokeWidth="1.5"/>)}
        </svg>
        <div style={{position:"relative"}}>
          <div style={{fontSize:12,color:"rgba(255,255,255,.66)",fontWeight:600}}>{now.toLocaleDateString("en-IN",{weekday:"long",day:"numeric",month:"long",year:"numeric"})}</div>
          <div style={{fontFamily:SERIF,fontSize:27,fontWeight:600,letterSpacing:-.5,marginTop:4,lineHeight:1.15}}>{greetingNow()}{currentTeacher?`, ${String(currentTeacher.name).split(" ")[0]}`:""}</div>
          <div style={{fontSize:13,color:"rgba(255,255,255,.72)",marginTop:3}}>{settings.institute}</div>
        </div>
        <div style={{position:"relative",display:"flex",marginTop:18,paddingTop:14,borderTop:"1px solid rgba(255,255,255,.16)"}}>
          {[[presentToday,"Present today","#86efac"],[absentToday,"Absent today",absentToday>0?"#fca5a5":"#fff"],[`${settings.currency}${Math.max(0,totalExpected-totalPaidMK).toLocaleString("en-IN")}`,"Fees pending","#fcd34d"]].map(([v,l,col],i)=>(
            <div key={l} style={{flex:1,textAlign:"center",borderLeft:i?"1px solid rgba(255,255,255,.16)":"none"}}>
              <div style={{fontFamily:SERIF,fontSize:23,fontWeight:600,color:col,letterSpacing:-.5}}>{v}</div>
              <div style={{fontSize:11,opacity:.7,marginTop:1}}>{l}</div>
            </div>
          ))}
        </div>
        <div style={{position:"relative",display:"flex",gap:8,marginTop:16}}>
          {onStudentLogin&&<button onClick={onStudentLogin} style={{background:"rgba(255,255,255,.14)",border:"1px solid rgba(255,255,255,.18)",borderRadius:12,padding:"8px 10px",cursor:"pointer",backdropFilter:"blur(4px)"}} title="Student Login" aria-label="Student login"><I n="users" s={17} c="#fff"/></button>}
          {isFeatureOn(settings,"notifications")&&<NotificationBell items={bellItems} light/>}
          <button onClick={()=>setShowReport(true)} style={{background:"rgba(255,255,255,.14)",border:"1px solid rgba(255,255,255,.18)",borderRadius:12,padding:"8px 10px",cursor:"pointer",backdropFilter:"blur(4px)"}} title="Full Attendance Sheet" aria-label="Full attendance sheet"><I n="sheet" s={17} c="#fff"/></button>
          <button onClick={()=>goTo("settings")} style={{background:"rgba(255,255,255,.14)",border:"1px solid rgba(255,255,255,.18)",borderRadius:12,padding:"8px 10px",cursor:"pointer",backdropFilter:"blur(4px)",marginLeft:"auto"}} aria-label="Settings"><I n="gear" s={17} c="#fff"/></button>
        </div>
        {currentShift&&(
          <div style={{position:"relative",marginTop:14,background:"rgba(255,255,255,.14)",border:"1px solid rgba(255,255,255,.18)",borderRadius:14,padding:"10px 13px",display:"flex",alignItems:"center",gap:8,backdropFilter:"blur(4px)"}}>
            <div style={{width:7,height:7,borderRadius:"50%",background:"#4ade80",boxShadow:"0 0 0 3px rgba(74,222,128,.25)",flexShrink:0}}/>
            <span style={{fontSize:12,fontWeight:700}}>Live now: {currentShift.name} · {fmtTime(currentShift.start)}–{fmtTime(currentShift.end)}</span>
          </div>
        )}
      </div>

      {pendingClaimsN.length>0&&(
        <div style={{padding:"14px 16px 0"}}>
          <button onClick={()=>goTo("more","parents")} style={{width:"100%",textAlign:"left",background:"linear-gradient(135deg,#fff7e0,#ffeeba)",border:"1.5px solid #f5d27a",borderRadius:18,padding:"13px 16px",display:"flex",alignItems:"center",gap:12,cursor:"pointer",fontFamily:"inherit"}}>
            <div style={{width:38,height:38,borderRadius:12,background:"#f5b93a",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><I n="rupee" s={19} c="#5b3a00"/></div>
            <div style={{flex:1,minWidth:0}}>
              <div style={{fontSize:14,fontWeight:800,color:"#5b3a00"}}>{pendingClaimsN.length} UPI payment{pendingClaimsN.length!==1?"s":""} to verify</div>
              <div style={{fontSize:12,color:"#8a5a00"}}>{settings.currency}{pendingClaimsN.reduce((a,c)=>a+c.amount,0).toLocaleString("en-IN")} from parents. Confirm to issue receipts.</div>
            </div>
            <span style={{fontSize:12,fontWeight:800,color:"#5b3a00"}}>Review</span>
          </button>
        </div>
      )}

      {todayHolidayD&&(
        <div style={{padding:"14px 16px 0"}}>
          <div style={{background:"linear-gradient(135deg,#c2410c,#ea580c)",borderRadius:16,padding:"14px 16px",color:"#fff",display:"flex",alignItems:"center",gap:10}}>
            <div style={{background:"rgba(255,255,255,.2)",borderRadius:10,padding:9,flexShrink:0}}><I n="holiday" s={17} c="#fff"/></div>
            <div>
              <div style={{fontSize:13,fontWeight:900}}>Today is a Holiday — {todayHolidayD.name}</div>
              <div style={{fontSize:11,opacity:.9,marginTop:1}}>Classes are off today</div>
            </div>
          </div>
        </div>
      )}

      {isFeatureOn(settings,"birthdayReminders")&&birthdaysSoon.length>0&&(
        <div style={{padding:"14px 16px 0"}}>
          {birthdaysSoon.map(s=>{
            const days=daysToBirthday(s.dob);
            return(
              <div key={s.id} onClick={()=>goTo("students")} style={{background:"linear-gradient(135deg,#f9737315,#fbbf2415)",border:"1.5px solid #fb923c40",borderRadius:14,padding:"11px 14px",marginBottom:8,display:"flex",alignItems:"center",gap:10,cursor:"pointer"}}>
                <div style={{fontSize:20}}>{days===0?"🎂":"🎈"}</div>
                <div style={{flex:1}}>
                  <div style={{fontSize:12,fontWeight:800,color:"#c2410c"}}>{s.name}'s birthday {days===0?"is today!":days===1?"is tomorrow!":`in ${days} days`}</div>
                  <div style={{fontSize:10,color:"#ea580c"}}>{days===0?"Don't forget to wish them 🎉":`On ${new Date(s.dob).toLocaleDateString("en-IN",{day:"numeric",month:"long"})}`}</div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {favoriteStudents.length>0&&(
        <div style={{padding:"14px 16px 0"}}>
          <div style={{fontWeight:800,fontSize:12,color:"var(--textMuted)",textTransform:"uppercase",letterSpacing:.7,marginBottom:10,display:"flex",alignItems:"center",gap:6}}>
            <svg width={13} height={13} viewBox="0 0 24 24" fill="#f59e0b" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            Favorite Students
          </div>
          <div style={{display:"flex",gap:10,overflowX:"auto",paddingBottom:4}}>
            {favoriteStudents.map(s=>{
              const {total}=calcOutstanding(s.id,mk,students,payments);
              return(
                <div key={s.id} onClick={()=>goTo("students")} style={{flexShrink:0,background:"var(--card)",border:"1.5px solid #fbbf2440",borderRadius:14,padding:"10px 14px",minWidth:110,textAlign:"center",cursor:"pointer"}}>
                  <Avatar name={s.name} size={34}/>
                  <div style={{fontSize:11,fontWeight:800,color:"var(--text)",marginTop:6,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{s.name}</div>
                  {total>0?<div style={{fontSize:10,color:"#dc2626",fontWeight:700,marginTop:2}}>{settings.currency}{total} due</div>:<div style={{fontSize:10,color:"#16a34a",fontWeight:700,marginTop:2}}>✓ Paid</div>}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {(overdueNotes.length>0||todayNotes.length>0)&&(
        <div style={{padding:"14px 16px 0"}}>
          <div style={{fontWeight:800,fontSize:12,color:"var(--textMuted)",textTransform:"uppercase",letterSpacing:.7,marginBottom:10,display:"flex",alignItems:"center",gap:6}}>
            <I n="note" s={13} c="#1e3a8a"/> Reminders
          </div>
          {overdueNotes.slice(0,3).map(n=>{
            const st=students.find(s=>s.id===n.studentId);
            return(
              <div key={n.id} onClick={()=>goTo("students")} style={{background:"#fee2e2",border:"1.5px solid #fca5a540",borderRadius:14,padding:"10px 14px",marginBottom:8,display:"flex",alignItems:"center",gap:10,cursor:"pointer"}}>
                <div style={{background:"#fecaca",borderRadius:9,padding:6,flexShrink:0}}><I n="alert" s={14} c="#dc2626"/></div>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{fontSize:12,fontWeight:700,color:"#991b1b"}}>{st?.name}: {n.text}</div>
                  <div style={{fontSize:10,color:"#dc2626",fontWeight:600}}>Overdue since {fmtDate(n.dueDate)}</div>
                </div>
              </div>
            );
          })}
          {todayNotes.slice(0,3).map(n=>{
            const st=students.find(s=>s.id===n.studentId);
            return(
              <div key={n.id} onClick={()=>goTo("students")} style={{background:"#ede9fe",border:"1.5px solid #c4b5fd40",borderRadius:14,padding:"10px 14px",marginBottom:8,display:"flex",alignItems:"center",gap:10,cursor:"pointer"}}>
                <div style={{background:"#ddd6fe",borderRadius:9,padding:6,flexShrink:0}}><I n="note" s={14} c="#1e3a8a"/></div>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{fontSize:12,fontWeight:700,color:"#4338ca"}}>{st?.name}: {n.text}</div>
                  <div style={{fontSize:10,color:"#1e3a8a",fontWeight:600}}>Due today</div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {visibleAlerts.length>0&&(
        <div style={{padding:"12px 16px 0"}}>
          {visibleAlerts.map((a,i)=>(
            <div key={i} style={{background:a.color+"12",border:`1.5px solid ${a.color}30`,borderRadius:14,padding:"11px 14px",marginBottom:8,display:"flex",alignItems:"center",gap:10}}>
              <div style={{background:a.color+"20",borderRadius:9,padding:"6px",flexShrink:0}}><I n={a.icon} s={15} c={a.color}/></div>
              <span style={{fontSize:12,fontWeight:700,color:a.color,flex:1}}>{a.msg}</span>
              <button onClick={()=>dismissAlert(i)} style={{background:"transparent",border:"none",cursor:"pointer",padding:4,flexShrink:0}}><I n="x" s={14} c="#94a3b8"/></button>
            </div>
          ))}
        </div>
      )}

      <div style={{padding:"12px 16px 0"}}>
        {currentShift&&<div style={{background:"linear-gradient(135deg,#1e3a8a,#2563eb)",borderRadius:14,padding:"11px 14px",marginBottom:8,display:"flex",alignItems:"center",gap:8,fontSize:13,color:"#fff",fontWeight:700}}>
          <I n="clock" s={15} c="#fff"/> Active now: {currentShift.name} · {fmtTime(currentShift.start)}–{fmtTime(currentShift.end)}
        </div>}
        {!currentShift&&nextShift&&<div style={{background:"#ede9fe",borderRadius:14,padding:"11px 14px",marginBottom:8,display:"flex",alignItems:"center",gap:8,fontSize:13,color:"#5b21b6",fontWeight:700}}>
          <I n="clock" s={15} c="#7c3aed"/> Next class: {nextShift.name} at {fmtTime(nextShift.start)}
        </div>}
      </div>

      <div style={{padding:"14px 16px 0",display:"flex",flexWrap:"wrap",gap:10}}>
        <Stat label="Total Students" val={active.length} color="#1e3a8a" icon="users"/>
        <Stat label={`Classes in ${MONTHS[mkM-1]}`} val={totalClassesMo} color="#2563eb" icon="cal" sub="all shifts combined"/>
      </div>

      <div style={{margin:"14px 16px 0",background:"linear-gradient(135deg,#0d1b42,#1e3a8a)",borderRadius:20,padding:"20px 20px 16px",color:"#fff"}}>
        <div style={{fontSize:12,fontWeight:700,opacity:.7,marginBottom:14,textTransform:"uppercase",letterSpacing:.8}}>{monthFull(mk)} — Fee Summary</div>
        <div style={{display:"flex",justifyContent:"space-between",marginBottom:14}}>
          <div><div style={{fontSize:10,opacity:.6,fontWeight:700,textTransform:"uppercase"}}>Expected</div><div style={{fontSize:22,fontWeight:900,letterSpacing:-1}}>{settings.currency}{totalExpected.toLocaleString("en-IN")}</div></div>
          <div style={{textAlign:"center"}}><div style={{fontSize:10,opacity:.6,fontWeight:700,textTransform:"uppercase"}}>Received</div><div style={{fontSize:22,fontWeight:900,letterSpacing:-1,color:"#86efac"}}>{settings.currency}{totalPaidMK.toLocaleString("en-IN")}</div></div>
          <div style={{textAlign:"right"}}><div style={{fontSize:10,opacity:.6,fontWeight:700,textTransform:"uppercase"}}>Pending</div><div style={{fontSize:22,fontWeight:900,letterSpacing:-1,color:"#fca5a5"}}>{settings.currency}{Math.max(0,totalExpected-totalPaidMK).toLocaleString("en-IN")}</div></div>
        </div>
        <div style={{background:"rgba(255,255,255,.12)",borderRadius:8,height:7,overflow:"hidden"}}>
          <div style={{background:"#86efac",height:"100%",width:`${totalExpected>0?Math.min(100,(totalPaidMK/totalExpected)*100):0}%`,borderRadius:8}}/>
        </div>
        <div style={{fontSize:11,opacity:.6,marginTop:6}}>{totalExpected>0?Math.round((totalPaidMK/totalExpected)*100):0}% collected this month</div>
      </div>

      <div style={{padding:"18px 16px 0"}}>
        <div style={{fontWeight:800,fontSize:12,color:"var(--textMuted)",textTransform:"uppercase",letterSpacing:.7,marginBottom:12}}>Quick Actions</div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10}}>
          {[
            {label:"Add Student", icon:"users",    c:"#1e3a8a",to:"students",act:"add"},
            {label:"Attendance",  icon:"checkbig", c:"#10b981",to:"attendance"},
            {label:"Add Payment", icon:"rupee",    c:"#2563eb",to:"fees",    act:"pay"},
            {label:"Shifts",      icon:"layers",   c:"#f59e0b",to:"more",act:"shifts"},
            {label:"Reports",     icon:"chart",    c:"#06b6d4",to:"more",act:"reports"},
            {label:"Expenses",    icon:"wallet",   c:"#10b981",to:"more",act:"expenses"},
            {label:"Parents",     icon:"users",    c:"#16a34a",to:"more",act:"parents",badge:pendingClaimsN.length},
            {label:"Test Marks",  icon:"book",     c:"#f59e0b",to:"more",act:"marks"},
            {label:"Messages",    icon:"phone",    c:"#0ea5e9",to:"more",act:"messages"},
          ].map(a=>(
            <button key={a.label} onClick={()=>goTo(a.to,a.act)} style={{background:"var(--card)",border:"1.5px solid var(--cardBorder)",borderRadius:16,padding:"14px 8px 12px",display:"flex",flexDirection:"column",alignItems:"center",gap:8,cursor:"pointer",boxShadow:"0 2px 8px var(--shadow)"}}>
              <div style={{background:a.c+"18",borderRadius:12,padding:10,position:"relative"}}><I n={a.icon} s={18} c={a.c}/>{a.badge>0&&<span style={{position:"absolute",top:-6,right:-8,background:"#ef4444",color:"#fff",borderRadius:20,minWidth:18,height:18,display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,fontWeight:800,padding:"0 4px"}}>{a.badge}</span>}</div>
              <span style={{fontSize:11,fontWeight:700,color:"var(--textMuted)",textAlign:"center",lineHeight:1.3}}>{a.label}</span>
            </button>
          ))}
        </div>
      </div>

      {todayShifts.length>0&&(
        <div style={{padding:"18px 16px 0"}}>
          <div style={{fontWeight:800,fontSize:12,color:"#64748b",textTransform:"uppercase",letterSpacing:.7,marginBottom:12}}>Today's Classes</div>
          {todayShifts.map((sh,idx)=>{
            const cnt=active.filter(s=>hasShift(s,sh.id)).length;
            const isActive=hm>=sh.start&&hm<=sh.end;
            const col=getShiftColor(idx);
            return (
              <div key={sh.id} style={{background:"#fff",borderRadius:14,padding:"14px 16px",marginBottom:8,border:`2px solid ${isActive?"#1e3a8a":"#eef2ff"}`,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                <div style={{display:"flex",alignItems:"center",gap:10}}>
                  <div style={{width:10,height:10,borderRadius:"50%",background:col.dot,flexShrink:0}}/>
                  <div>
                    <div style={{fontWeight:800,color:"#0f0a2e",fontSize:14}}>{sh.name}</div>
                    <div style={{fontSize:12,color:"#94a3b8",marginTop:2}}>{fmtTime(sh.start)} – {fmtTime(sh.end)} · {cnt} students</div>
                  </div>
                </div>
                {isActive?<Badge s="present"/>:<span style={{fontSize:11,color:"#f59e0b",fontWeight:700,background:"#fef9c3",padding:"3px 9px",borderRadius:8}}>UPCOMING</span>}
              </div>
            );
          })}
        </div>
      )}

      {milestoneStudents.length>0&&(
        <div style={{padding:"18px 16px 0"}}>
          <div style={{fontWeight:800,fontSize:12,color:"#64748b",textTransform:"uppercase",letterSpacing:.7,marginBottom:10}}>🎯 30-Day Milestones</div>
          {milestoneStudents.map(s=>(
            <div key={s.id} style={{background:"linear-gradient(135deg,#7c3aed15,#ec489915)",borderRadius:14,padding:"12px 16px",marginBottom:8,border:"1.5px solid #7c3aed30",display:"flex",alignItems:"center",gap:12}}>
              <Avatar name={s.name} size={36}/>
              <div>
                <div style={{fontWeight:800,fontSize:13,color:"#0f0a2e"}}>{s.name}</div>
                <div style={{fontSize:11,color:"#7c3aed",fontWeight:700}}>Day {daysSince(s.joining)} — confirm next month's fee</div>
              </div>
              <div style={{marginLeft:"auto",background:"#7c3aed",borderRadius:8,padding:"4px 10px",fontSize:11,fontWeight:800,color:"#fff"}}>{daysSince(s.joining)}d</div>
            </div>
          ))}
        </div>
      )}

      {showReport&&<AttendanceReportSheet store={store} onClose={()=>setShowReport(false)}/>}
    </div>
  );
};

// ══════════════════════════════════════════════════════════════
// STUDENT FILTER HELPERS — shared by Students & Attendance
// ══════════════════════════════════════════════════════════════
const clsKey=s=>String(s.studentClass||"").trim().toLowerCase();
// Unique class names (with student counts) for a list of students. Empty when there is nothing to choose between.
const buildClassOptions=list=>{
  const m=new Map();
  list.forEach(st=>{const k=clsKey(st);const e=m.get(k);if(e)e.n++;else m.set(k,{key:k,label:k?String(st.studentClass).trim():"No class",n:1});});
  const arr=[...m.values()].sort((a,b)=>!a.key?1:!b.key?-1:a.label.localeCompare(b.label,undefined,{numeric:true}));
  return arr.length>=2?arr:[];
};
const matchStudent=(st,q)=>{
  const m=String(q||"").trim().toLowerCase();
  if(!m) return true;
  return st.name.toLowerCase().includes(m)||(st.phone||"").includes(m)||String(st.studentClass||"").toLowerCase().includes(m);
};
const StudentFilterBar=({search,onSearch,classOpts,classVal,onClass,total,shown,placeholder="Search name, phone or class..."})=>{
  const filtering=!!search.trim()||classVal!=="all";
  return(
    <div style={{marginBottom:12}}>
      <div style={{position:"relative"}}>
        <div style={{position:"absolute",left:12,top:"50%",transform:"translateY(-50%)",pointerEvents:"none"}}><I n="search" s={16} c="var(--textFaint)"/></div>
        <input value={search} onChange={e=>onSearch(e.target.value)} placeholder={placeholder}
          style={{width:"100%",padding:`10px ${search?38:12}px 10px 36px`,border:"1.5px solid var(--cardBorder)",borderRadius:12,fontSize:14,color:"var(--text)",background:"var(--card)",outline:"none",boxSizing:"border-box",fontFamily:"inherit"}}/>
        {search&&<button onClick={()=>onSearch("")} aria-label="Clear search" style={{position:"absolute",right:8,top:"50%",transform:"translateY(-50%)",background:"var(--inputBg)",border:"none",borderRadius:8,width:24,height:24,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer"}}><I n="x" s={12} c="var(--textMuted)"/></button>}
      </div>
      {classOpts.length>=2&&(
        <div style={{display:"flex",alignItems:"center",gap:8,marginTop:10,overflowX:"auto",paddingBottom:2}}>
          <span style={{fontSize:11,fontWeight:800,color:"var(--textFaint)",flexShrink:0}}>Class</span>
          <Chip label="All" active={classVal==="all"} onClick={()=>onClass("all")} c="#7c3aed"/>
          {classOpts.map(o=><Chip key={o.key||"none"} label={`${o.label} · ${o.n}`} active={classVal===o.key} onClick={()=>onClass(o.key)} c="#7c3aed"/>)}
        </div>
      )}
      {filtering&&(
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:8,fontSize:11.5,color:"var(--textMuted)",fontWeight:600}}>
          <span>Showing {shown} of {total} students</span>
          <button onClick={()=>{onSearch("");onClass("all");}} style={{background:"none",border:"none",color:"#2563eb",fontWeight:800,fontSize:11.5,cursor:"pointer",fontFamily:"inherit",padding:0}}>Clear filters</button>
        </div>
      )}
    </div>
  );
};

// ══════════════════════════════════════════════════════════════
// STUDENTS
// ══════════════════════════════════════════════════════════════
const Students=({store,toast,initAct})=>{
  const {students,setStudents,shifts,setShifts,payments,settings,attend}=store;
  const [search,setSearch]=useState("");
  const [shiftFilter,setShiftFilter]=useState("all");
  const [classFilter,setClassFilter]=useState("all");
  const [showForm,setShowForm]=useState(false);
  const [editing,setEditing]=useState(null);
  const [viewing,setViewing]=useState(null);
  const [editingCode,setEditingCode]=useState(false);
  const [codeInput,setCodeInput]=useState("");
  const [confirmArch,setConfirmArch]=useState(null);
  const [confirmRestore,setConfirmRestore]=useState(null);
  const [confirmDelete,setConfirmDelete]=useState(null);
  const [showReport,setShowReport]=useState(false);
  const [showArchived,setShowArchived]=useState(false);
  const [favOnly,setFavOnly]=useState(false);
  const [viewingReceipt,setViewingReceipt]=useState(null);
  const [showImport,setShowImport]=useState(false);
  const [importText,setImportText]=useState("");
  const [importPreview,setImportPreview]=useState(null); // {rows, errors}
  const [importFileRef]=useState(()=>({current:null}));
  const fileInputRef=useRef(null);
  const photoRef=useRef(null);
  const[uploadingPhoto,setUploadingPhoto]=useState(false);
  const onPickPhoto=e=>{
    const file=e.target.files?.[0];
    if(!file)return;
    if(!file.type.startsWith("image/"))return toast.error("Please choose an image file");
    setUploadingPhoto(true);
    const reader=new FileReader();
    reader.onload=ev=>{sf("photo",ev.target.result);setUploadingPhoto(false);};
    reader.onerror=()=>{toast.error("Couldn't read that image");setUploadingPhoto(false);};
    reader.readAsDataURL(file);
    e.target.value="";
  };
  const mk=curMK();
  const blank={name:"",phone:"",parent:"",fatherName:"",studentClass:"",monthlyFee:"",joining:todayStr(),address:"",shiftId:"",shiftIds:[],notes:"",favorite:false,dob:"",photo:"",category:"General",offerEligible:false,offerReason:"",discount:{type:"percent",value:0,reason:""}};
  const [form,setForm]=useState(blank);
  const sf=(k,v)=>setForm(f=>({...f,[k]:v}));
  const toggleFormShift=id=>{
    const cur=form.shiftIds||[];
    if(!cur.includes(id)){
      // Adding a new batch — hard-block if it truly overlaps in time with one already selected
      const newSh=shifts.find(s=>s.id===id);
      for(const otherId of cur){
        const other=shifts.find(s=>s.id===otherId);
        if(!other||!newSh) continue;
        const sharedDays=(newSh.days||[]).filter(d=>other.days?.includes(d));
        for(const d of sharedDays){
          const t1=getShiftTime(newSh,d),t2=getShiftTime(other,d);
          if(t1.start&&t1.end&&t2.start&&t2.end&&timeRangesOverlap(t1.start,t1.end,t2.start,t2.end)){
            toast.error(`This student is already in "${other.name}" which runs ${fmtTime(t2.start)}–${fmtTime(t2.end)} on ${d} — same time as "${newSh.name}" (${fmtTime(t1.start)}–${fmtTime(t1.end)}). A student can't attend two classes at once.`,"Can't Add Batch");
            return;
          }
        }
      }
    }
    setForm(f=>{const c=f.shiftIds||[];const next=c.includes(id)?c.filter(x=>x!==id):[...c,id];return{...f,shiftIds:next,shiftId:next[0]||""};});
  };
  useEffect(()=>{if(initAct==="add")setShowForm(true);},[initAct]);
  const active=students.filter(s=>!s.archived);
  const archivedList=students.filter(s=>s.archived);
  const openEdit=s=>{setForm({...blank,...s,shiftIds:getShiftIds(s),monthlyFee:String(s.monthlyFee),discount:s.discount||{type:"percent",value:0,reason:""},category:s.category||"General"});setEditing(s);setShowForm(true);};
  const closeForm=()=>{setShowForm(false);setEditing(null);setForm(blank);};
  const submit=()=>{
    if(!form.name.trim()) return toast.error("Student name is required");
    if(!form.monthlyFee||+form.monthlyFee<=0) return toast.error("Please enter a valid monthly fee");
    const shiftIds=form.shiftIds||[];
    const payload={...form,shiftIds,shiftId:shiftIds[0]||""};
    if(editing){setStudents(ss=>ss.map(s=>s.id===editing.id?{...s,...payload,monthlyFee:+form.monthlyFee}:s));toast.success("Student updated successfully","Updated");}
    else{setStudents(ss=>[...ss,{...payload,id:uid(),monthlyFee:+form.monthlyFee,archived:false,studentCode:genLoginId(form.name,form.phone,students.map(x=>x.studentCode)),pin:genPin4(),portalEnabled:true}]);toast.success("Student added successfully — a portal login has been generated, view it from the student's profile","Added!");}
    closeForm();
  };
  const doArchive=id=>{setStudents(ss=>ss.map(s=>s.id===id?{...s,archived:true}:s));setConfirmArch(null);setViewing(null);toast.info("Student archived","Archived");};
  const doRestore=id=>{setStudents(ss=>ss.map(s=>s.id===id?{...s,archived:false}:s));setConfirmRestore(null);toast.success("Student restored","Restored");};
  const doDeleteForever=id=>{setStudents(ss=>ss.filter(s=>s.id!==id));setConfirmDelete(null);toast.info("Student permanently deleted","Deleted");};
  const toggleFavorite=(id,e)=>{e?.stopPropagation();setStudents(ss=>ss.map(s=>s.id===id?{...s,favorite:!s.favorite}:s));};

  // ── CSV IMPORT ──
  const parseCSV=(text)=>{
    const lines=text.split(/\r?\n/).filter(l=>l.trim());
    if(lines.length<2) return {rows:[],errors:["File must have a header row and at least one data row"]};
    const header=lines[0].split(",").map(h=>h.trim().toLowerCase());
    const nameIdx=header.findIndex(h=>h.includes("name"));
    const phoneIdx=header.findIndex(h=>h.includes("phone"));
    const feeIdx=header.findIndex(h=>h.includes("fee"));
    const parentIdx=header.findIndex(h=>h.includes("parent")||h.includes("guardian"));
    const addressIdx=header.findIndex(h=>h.includes("address"));
    if(nameIdx===-1||feeIdx===-1) return {rows:[],errors:["CSV must have at least 'Name' and 'Fee' columns. Found: "+header.join(", ")]};
    const rows=[]; const errors=[];
    for(let i=1;i<lines.length;i++){
      const cols=lines[i].split(",").map(c=>c.trim());
      const name=cols[nameIdx];
      const fee=+cols[feeIdx];
      if(!name){errors.push(`Row ${i+1}: missing name`);continue;}
      if(!fee||fee<=0){errors.push(`Row ${i+1}: invalid fee for ${name}`);continue;}
      rows.push({
        name,
        phone:phoneIdx>=0?cols[phoneIdx]||"":"",
        parent:parentIdx>=0?cols[parentIdx]||"":"",
        monthlyFee:fee,
        address:addressIdx>=0?cols[addressIdx]||"":"",
        joining:todayStr(),shiftId:"",shiftIds:[],notes:"",favorite:false,dob:"",
      });
    }
    return {rows,errors};
  };

  const handleFileSelect=(e)=>{
    const file=e.target.files?.[0];
    if(!file) return;
    const reader=new FileReader();
    reader.onload=(ev)=>{
      const text=ev.target.result;
      setImportText(text);
      setImportPreview(parseCSV(text));
    };
    reader.readAsText(file);
  };

  const handlePasteImport=()=>{
    if(!importText.trim()) return toast.error("Please paste CSV data first");
    setImportPreview(parseCSV(importText));
  };

  const confirmImport=()=>{
    if(!importPreview?.rows.length) return;
    setStudents(ss=>{
      const running=[...ss];
      const withCreds=importPreview.rows.map(r=>{const rec={...r,id:uid(),archived:false,studentCode:genLoginId(r.name,r.phone,running.map(x=>x.studentCode)),pin:genPin4(),portalEnabled:true};running.push(rec);return rec;});
      return[...ss,...withCreds];
    });
    toast.success(`${importPreview.rows.length} students imported successfully`,"Import Complete!");
    setShowImport(false);setImportText("");setImportPreview(null);
  };

  const downloadSampleCSV=()=>{
    const sample="Name,Phone,Parent,Fee,Address\nRahul Sharma,9876543210,Suresh Sharma,1000,MG Road Indore\nPriya Patel,9876543211,Ramesh Patel,1200,AB Road Indore";
    const blob=new Blob([sample],{type:"text/csv"});
    const url=URL.createObjectURL(blob);
    const a=document.createElement("a");
    a.href=url;a.download="student-import-sample.csv";
    document.body.appendChild(a);a.click();document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const classOptsS=buildClassOptions(active.filter(s=>shiftFilter==="all"||hasShift(s,shiftFilter)));
  const effClassS=classOptsS.some(o=>o.key===classFilter)?classFilter:"all";
  const filtered=active.filter(s=>{
    return matchStudent(s,search)&&(shiftFilter==="all"||hasShift(s,shiftFilter))&&(effClassS==="all"||clsKey(s)===effClassS)&&(!favOnly||s.favorite);
  }).sort((a,b)=>(b.favorite?1:0)-(a.favorite?1:0));

  // ── ARCHIVED STUDENTS VIEW ──
  if(showArchived){
    return(
      <div>
        <PageHeader title="Archived Students" onBack={()=>setShowArchived(false)}/>
        <div style={{padding:"0 16px 24px"}}>
          {archivedList.length===0&&<div style={{textAlign:"center",padding:"50px 20px"}}>
            <div style={{fontSize:44,marginBottom:12}}>📦</div>
            <div style={{fontWeight:800,fontSize:16,color:"var(--text)",marginBottom:6}}>No archived students</div>
            <div style={{fontSize:13,color:"var(--textFaint)"}}>Archived students will appear here</div>
          </div>}
          {archivedList.map(s=>(
            <div key={s.id} style={{background:"var(--card)",borderRadius:16,padding:"14px 16px",marginBottom:10,border:"1.5px solid var(--cardBorder)",display:"flex",alignItems:"center",gap:14,opacity:.85}}>
              <Avatar name={s.name} g="135deg,#94a3b8,#64748b"/>
              <div style={{flex:1,minWidth:0}}>
                <div style={{fontWeight:800,fontSize:14,color:"var(--text)"}}>{s.name}</div>
                <div style={{fontSize:11,color:"var(--textFaint)",marginTop:2}}>{s.phone||"No phone"} · Archived</div>
              </div>
              <div style={{display:"flex",gap:6}}>
                <button onClick={()=>setConfirmRestore(s.id)} style={{background:"#dcfce7",border:"none",borderRadius:9,padding:"7px 9px",cursor:"pointer"}} title="Restore"><I n="checkbig" s={14} c="#16a34a"/></button>
                <button onClick={()=>setConfirmDelete(s.id)} style={{background:"#fee2e2",border:"none",borderRadius:9,padding:"7px 9px",cursor:"pointer"}} title="Delete Forever"><I n="trash" s={14} c="#ef4444"/></button>
              </div>
            </div>
          ))}
        </div>
        {confirmRestore&&<Confirm msg="Restore this student back to your active list?" onYes={()=>doRestore(confirmRestore)} onNo={()=>setConfirmRestore(null)} yesLabel="Restore" yesColor="#16a34a"/>}
        {confirmDelete&&<Confirm msg="Permanently delete this student and ALL their payment/attendance history? This cannot be undone!" onYes={()=>doDeleteForever(confirmDelete)} onNo={()=>setConfirmDelete(null)} yesLabel="Delete Forever" yesColor="#ef4444"/>}
      </div>
    );
  }

  if(viewing){
    const s=viewing;
    const myShiftIds=getShiftIds(s);
    const myShifts=myShiftIds.map(id=>shifts.find(x=>x.id===id)).filter(Boolean);
    const sh=myShifts[0];
    const shIdx=sh?shifts.findIndex(x=>x.id===sh.id):-1;
    const col=shIdx>=0?getShiftColor(shIdx):{grad:"135deg,#94a3b8,#64748b"};
    const{currentDue,carryForward,total,curPaid,breakdown}=calcOutstanding(s.id,mk,students,payments);
    const allPays=payments.filter(p=>p.studentId===s.id).sort((a,b)=>new Date(b.date)-new Date(a.date));
    const attKeys=Object.entries(attend).filter(([k])=>k.startsWith(s.id+"-"));
    const pres=attKeys.filter(([,v])=>v==="present").length;
    const abs=attKeys.filter(([,v])=>v==="absent").length;
    const pct=attKeys.length>0?Math.round((pres/attKeys.length)*1000)/10:0;
    const feeStatus=total===0?"Paid":curPaid>0?"Partially Paid":"Pending";
    const days=daysSince(s.joining);
    const sendReport=()=>{
      const body=`Attendance & Fee Report\n${settings.institute}\nStudent: ${s.name}\nMonth: ${monthFull(mk)}\nAttendance: ${pres}P/${abs}A = ${pct}%\nFee: ${settings.currency}${s.monthlyFee} | Paid: ${settings.currency}${curPaid} | Due: ${settings.currency}${total}`;
      window.open(`mailto:${s.email||""}?subject=${encodeURIComponent(`Report - ${s.name} - ${monthFull(mk)}`)}&body=${encodeURIComponent(body)}`,"_blank");
    };
    return(
      <div>
        <PageHeader title="Student Profile" onBack={()=>setViewing(null)} right={
          <div style={{display:"flex",gap:8}}>
            <button onClick={()=>toggleFavorite(s.id)} style={{background:s.favorite?"#fef3c7":"var(--inputBg)",border:"none",borderRadius:10,padding:"8px 10px",cursor:"pointer"}}>
              <svg width={16} height={16} viewBox="0 0 24 24" fill={s.favorite?"#f59e0b":"none"} stroke={s.favorite?"#f59e0b":"var(--textFaint)"} strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            </button>
            <button onClick={sendReport} style={{background:"#dcfce7",border:"none",borderRadius:10,padding:"8px 10px",cursor:"pointer"}}><I n="mail" s={16} c="#16a34a"/></button>
            <button onClick={()=>{openEdit(s);setViewing(null);}} style={{background:"#ede9fe",border:"none",borderRadius:10,padding:"8px 10px",cursor:"pointer"}}><I n="edit" s={16} c="#1e3a8a"/></button>
            <button onClick={()=>setConfirmArch(s.id)} style={{background:"#fee2e2",border:"none",borderRadius:10,padding:"8px 10px",cursor:"pointer"}}><I n="trash" s={16} c="#ef4444"/></button>
          </div>
        }/>
        <div style={{padding:"0 16px 24px"}}>
          <div style={{background:`linear-gradient(${col.grad})`,borderRadius:20,padding:"20px",marginBottom:14,display:"flex",alignItems:"center",gap:16}}>
            <div style={{width:54,height:54,borderRadius:16,background:"rgba(255,255,255,.2)",display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontSize:20,fontWeight:900}}>{s.name[0].toUpperCase()}</div>
            <div style={{color:"#fff",flex:1}}>
              <div style={{fontSize:18,fontWeight:900}}>{s.name}</div>
              <div style={{fontSize:13,opacity:.8,marginTop:2}}>{s.phone||"No phone added"}</div>
              <div style={{fontSize:11,opacity:.65,marginTop:3,display:"flex",gap:8,flexWrap:"wrap"}}>
                {myShifts.map(m=><span key={m.id} style={{background:"rgba(255,255,255,.2)",borderRadius:6,padding:"1px 8px"}}>{m.name}</span>)}
                <span>Joined {fmtDate(s.joining)}</span>
                <span style={{background:"rgba(255,255,255,.2)",borderRadius:6,padding:"1px 8px"}}>Day {days}</span>
                {s.dob&&<span style={{background:"rgba(255,255,255,.2)",borderRadius:6,padding:"1px 8px"}}>🎂 {new Date(s.dob).toLocaleDateString("en-IN",{day:"numeric",month:"short"})}</span>}
              </div>
            </div>
          </div>

          {/* Quick Contact Actions */}
          {s.phone&&<div style={{display:"flex",gap:8,marginBottom:12}}>
            <a href={`tel:${s.phone}`} style={{flex:1,textDecoration:"none",background:"#dbeafe",borderRadius:12,padding:"10px",display:"flex",alignItems:"center",justifyContent:"center",gap:6,color:"#1e40af",fontSize:12,fontWeight:700}}>
              <I n="phone" s={14} c="#1e40af"/> Call
            </a>
            <a href={`https://wa.me/91${s.phone.replace(/\D/g,"")}`} target="_blank" rel="noopener noreferrer" style={{flex:1,textDecoration:"none",background:"#dcfce7",borderRadius:12,padding:"10px",display:"flex",alignItems:"center",justifyContent:"center",gap:6,color:"#166534",fontSize:12,fontWeight:700}}>
              <svg width={14} height={14} viewBox="0 0 24 24" fill="#16a34a"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              WhatsApp
            </a>
          </div>}

          {days>=28&&days<=37&&<div style={{background:"linear-gradient(135deg,#7c3aed15,#ec489915)",borderRadius:14,padding:"12px 16px",marginBottom:12,border:"1.5px solid #7c3aed40"}}>
            <div style={{fontSize:13,fontWeight:800,color:"#5b21b6"}}>🎯 30-Day Milestone — Day {days}</div>
            <div style={{fontSize:12,color:"#6d28d9",marginTop:3}}>Confirm fees for the next month with this student.</div>
          </div>}
          <div style={{background:"#fff",borderRadius:16,padding:"16px",border:"1px solid #eef2ff",marginBottom:12}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
              <div style={{fontWeight:800,fontSize:13,color:"#0f0a2e",textTransform:"uppercase",letterSpacing:.5}}>Fee — {monthFull(mk)}</div>
              <Badge s={feeStatus}/>
            </div>
            {s.discount?.value>0&&<div style={{background:"#dcfce7",border:"1.5px solid #bbf7d0",borderRadius:10,padding:"8px 12px",marginBottom:10,fontSize:12,color:"#166534",fontWeight:700,display:"flex",alignItems:"center",gap:6}}>
              <I n="discount" s={14} c="#16a34a"/> {s.discount.type==="percent"?`${s.discount.value}% off`:`${settings.currency}${s.discount.value} off`}{s.discount.reason?` — ${s.discount.reason}`:""}
            </div>}
            {[["Original Fee",`${settings.currency}${s.monthlyFee.toLocaleString("en-IN")}`,s.discount?.value>0?"#94a3b8":null],...(s.discount?.value>0?[["Effective Fee",`${settings.currency}${effectiveFee(s).toLocaleString("en-IN")}`,"#16a34a"]]:[]),["Paid This Month",`${settings.currency}${curPaid.toLocaleString("en-IN")}` ,"#10b981"],["This Month Due",`${settings.currency}${currentDue.toLocaleString("en-IN")}` ,"#ef4444"]].map(([l,v,cl])=>(
              <div key={l} style={{display:"flex",justifyContent:"space-between",marginBottom:7}}>
                <span style={{fontSize:13,color:"#64748b"}}>{l}</span>
                <span style={{fontSize:13,fontWeight:700,color:cl||"#0f0a2e",textDecoration:l==="Original Fee"&&s.discount?.value>0?"line-through":"none"}}>{v}</span>
              </div>
            ))}
            {carryForward>0&&<><div style={{height:1,background:"#f1f5f9",margin:"10px 0"}}/><CarryBreakdown breakdown={breakdown} currency={settings.currency}/><div style={{display:"flex",justifyContent:"space-between",padding:"10px 12px",background:"#fef2f2",borderRadius:10,border:"1.5px solid #fecaca"}}><span style={{fontSize:14,color:"#991b1b",fontWeight:800}}>Total Outstanding</span><span style={{fontSize:16,fontWeight:900,color:"#dc2626"}}>{settings.currency}{total.toLocaleString("en-IN")}</span></div></>}
            {total===0&&<div style={{padding:"8px 12px",background:"#f0fdf4",borderRadius:10,fontSize:13,fontWeight:700,color:"#15803d",textAlign:"center"}}>✓ All fees cleared</div>}
          </div>
          <NotesPanel store={store} studentId={s.id} toast={toast}/>
          <div style={{background:"#fff",borderRadius:16,padding:"16px",border:"1px solid #eef2ff",marginBottom:12}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
              <div style={{fontWeight:800,fontSize:13,color:"#0f0a2e",textTransform:"uppercase",letterSpacing:.5}}>Student Portal Login</div>
              <label style={{display:"flex",alignItems:"center",gap:6,cursor:"pointer"}}>
                <span style={{fontSize:11,fontWeight:700,color:s.portalEnabled!==false?"#16a34a":"#94a3b8"}}>{s.portalEnabled!==false?"Enabled":"Disabled"}</span>
                <input type="checkbox" checked={s.portalEnabled!==false} onChange={()=>{setStudents(ss=>ss.map(x=>x.id===s.id?{...x,portalEnabled:!(x.portalEnabled!==false)}:x));setViewing(v=>({...v,portalEnabled:!(v.portalEnabled!==false)}));}} style={{width:16,height:16,accentColor:"#16a34a"}}/>
              </label>
            </div>
            {!s.studentCode?(
              <Btn onClick={()=>{const code=genLoginId(s.name,s.phone,students.map(x=>x.studentCode));const pin=genPin4();setStudents(ss=>ss.map(x=>x.id===s.id?{...x,studentCode:code,pin,portalEnabled:true}:x));setViewing(v=>({...v,studentCode:code,pin,portalEnabled:true}));toast.success("Login credentials created","Done!");}} c="#1e3a8a" full sm>Generate Portal Login</Btn>
            ):(
              <>
                <div style={{fontSize:11,color:"#94a3b8",marginBottom:10,lineHeight:1.5}}>Share this User ID & Password with {s.name} to let them log into their own portal — attendance, marks, and fee details only. They can change their password anytime from the portal.</div>
                <div style={{display:"flex",gap:8,marginBottom:10}}>
                  <div style={{flex:1,background:"#f8fafc",borderRadius:10,padding:"10px 12px"}}>
                    <div style={{fontSize:10,color:"#94a3b8",fontWeight:700,letterSpacing:.5,marginBottom:2,textAlign:"center"}}>USER ID</div>
                    {editingCode?(
                      <input value={codeInput} onChange={e=>setCodeInput(e.target.value)} autoFocus style={{width:"100%",textAlign:"center",fontSize:14,fontWeight:900,color:"#0f0a2e",border:"1.5px solid #c7d2fe",borderRadius:7,padding:"4px 2px",outline:"none",fontFamily:"inherit",boxSizing:"border-box"}}/>
                    ):(
                      <div onClick={()=>{setCodeInput(s.studentCode);setEditingCode(true);}} style={{fontSize:18,fontWeight:900,color:"#0f0a2e",letterSpacing:1,textAlign:"center",cursor:"pointer"}}>{s.studentCode}</div>
                    )}
                  </div>
                  <div style={{flex:1,background:"#f8fafc",borderRadius:10,padding:"10px 12px",textAlign:"center"}}>
                    <div style={{fontSize:10,color:"#94a3b8",fontWeight:700,letterSpacing:.5}}>PASSWORD</div>
                    <div style={{fontSize:18,fontWeight:900,color:"#0f0a2e",letterSpacing:1}}>{s.pin}</div>
                  </div>
                </div>
                {editingCode?(
                  <div style={{display:"flex",gap:8,marginBottom:10}}>
                    <button onClick={()=>{setEditingCode(false);}} style={{flex:1,background:"var(--inputBg)",border:"1.5px solid var(--cardBorder)",borderRadius:10,padding:"9px",cursor:"pointer",fontSize:12,fontWeight:700,color:"var(--textMuted)",fontFamily:"inherit"}}>Cancel</button>
                    <button onClick={()=>{
                      const clean=slugifyId(codeInput)||codeInput.replace(/\D/g,"");
                      if(!clean){toast.error("Enter a valid User ID");return;}
                      if(students.some(x=>x.id!==s.id&&(x.studentCode||"").toLowerCase()===clean.toLowerCase())){toast.error("This User ID is already taken");return;}
                      setStudents(ss=>ss.map(x=>x.id===s.id?{...x,studentCode:clean}:x));setViewing(v=>({...v,studentCode:clean}));setEditingCode(false);toast.success("User ID updated","Saved");
                    }} style={{flex:1,background:"#1e3a8a",border:"none",borderRadius:10,padding:"9px",cursor:"pointer",fontSize:12,fontWeight:700,color:"#fff",fontFamily:"inherit"}}>Save</button>
                  </div>
                ):(
                  <div style={{fontSize:10,color:"#94a3b8",marginBottom:10,textAlign:"center"}}>Tap the User ID to edit it (defaults to phone number or name)</div>
                )}
                <div style={{display:"flex",gap:8}}>
                  {s.phone&&<a href={`https://wa.me/91${s.phone.replace(/\D/g,"")}?text=${encodeURIComponent(`${settings.institute}\nYour Student Portal Login:\nUser ID: ${s.studentCode}\nPassword: ${s.pin}`)}`} target="_blank" rel="noopener noreferrer" style={{flex:1,textDecoration:"none",background:"#dcfce7",borderRadius:10,padding:"9px",display:"flex",alignItems:"center",justifyContent:"center",gap:6,color:"#166534",fontSize:12,fontWeight:700}}>Share on WhatsApp</a>}
                  <button onClick={()=>{const pin=genPin4();setStudents(ss=>ss.map(x=>x.id===s.id?{...x,pin}:x));setViewing(v=>({...v,pin}));toast.info("New password generated","Regenerated");}} style={{flex:s.phone?"none":1,background:"var(--inputBg)",border:"1.5px solid var(--cardBorder)",borderRadius:10,padding:"9px 12px",cursor:"pointer",fontSize:12,fontWeight:700,color:"var(--textMuted)",fontFamily:"inherit"}}>Regenerate Password</button>
                </div>
              </>
            )}
          </div>
          <div style={{background:"#fff",borderRadius:16,padding:"16px",border:"1px solid #eef2ff",marginBottom:12}}>
            <div style={{fontWeight:800,fontSize:13,color:"#0f0a2e",textTransform:"uppercase",letterSpacing:.5,marginBottom:12}}>Attendance Summary</div>
            <div style={{display:"flex",justifyContent:"space-around"}}>
              <div style={{textAlign:"center"}}><div style={{fontSize:26,fontWeight:900,color:"#10b981"}}>{pres}</div><div style={{fontSize:11,color:"#94a3b8",fontWeight:700}}>PRESENT</div></div>
              <div style={{textAlign:"center"}}><div style={{fontSize:26,fontWeight:900,color:"#ef4444"}}>{abs}</div><div style={{fontSize:11,color:"#94a3b8",fontWeight:700}}>ABSENT</div></div>
              <div style={{textAlign:"center"}}><div style={{fontSize:26,fontWeight:900,color:pct>=75?"#10b981":"#ef4444"}}>{pct}%</div><div style={{fontSize:11,color:"#94a3b8",fontWeight:700}}>RATE</div></div>
            </div>
          </div>
          <div style={{background:"#fff",borderRadius:16,padding:"16px",border:"1px solid #eef2ff"}}>
            <div style={{fontWeight:800,fontSize:13,color:"#0f0a2e",textTransform:"uppercase",letterSpacing:.5,marginBottom:12}}>Payment History</div>
            {allPays.length===0?<div style={{color:"#94a3b8",fontSize:13,textAlign:"center",padding:"16px 0"}}>No payments recorded yet</div>
              :allPays.map(p=>(
                <div key={p.id} onClick={()=>setViewingReceipt({payment:p,student:s})} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 0",borderBottom:"1px solid #f8fafc",cursor:"pointer"}}>
                  <div>
                    <div style={{fontSize:14,fontWeight:700,color:"#0f0a2e"}}>{settings.currency}{p.amount.toLocaleString("en-IN")}</div>
                    <div style={{fontSize:11,color:"#94a3b8"}}>{fmtDate(p.date)} · {p.method} · {monthLabel(p.monthKey)}</div>
                  </div>
                  <div style={{display:"flex",alignItems:"center",gap:8}}>
                    {p.note&&<span style={{fontSize:11,color:"#94a3b8",fontStyle:"italic",maxWidth:80,textAlign:"right"}}>{p.note}</span>}
                    <div style={{background:"#ede9fe",borderRadius:8,padding:"5px 7px"}}><I n="receipt" s={14} c="#1e3a8a"/></div>
                  </div>
                </div>
              ))}
          </div>
        </div>
        {confirmArch&&<Confirm msg={`Archive "${s.name}"? All history will be preserved.`} onYes={()=>doArchive(confirmArch)} onNo={()=>setConfirmArch(null)} yesLabel="Archive"/>}
        {viewingReceipt&&<PaymentReceipt store={store} payment={viewingReceipt.payment} student={viewingReceipt.student} onClose={()=>setViewingReceipt(null)} toast={toast}/>}
      </div>
    );
  }

  return(
    <div>
      <PageHeader title="Students" right={
        <div style={{display:"flex",gap:8}}>
          <button onClick={()=>setShowArchived(true)} style={{background:"var(--inputBg)",border:"none",borderRadius:11,padding:"8px 10px",cursor:"pointer",position:"relative"}} title="Archived Students">
            <I n="trash" s={16} c="var(--textMuted)"/>
            {archivedList.length>0&&<span style={{position:"absolute",top:-4,right:-4,background:"#94a3b8",color:"#fff",borderRadius:8,fontSize:9,fontWeight:800,padding:"1px 5px",minWidth:14,textAlign:"center"}}>{archivedList.length}</span>}
          </button>
          <button onClick={()=>setShowImport(true)} style={{background:"#dcfce7",border:"none",borderRadius:11,padding:"8px 10px",cursor:"pointer"}} title="Bulk Import"><I n="upload" s={16} c="#16a34a"/></button>
          <button onClick={()=>setShowReport(true)} style={{background:"#ede9fe",border:"none",borderRadius:11,padding:"8px 10px",cursor:"pointer"}}><I n="sheet" s={16} c="#1e3a8a"/></button>
          <Btn onClick={()=>setShowForm(true)} sm><I n="plus" s={14}/> Add</Btn>
        </div>
      }/>
      <div style={{padding:"0 16px"}}>
        <div style={{position:"relative",marginBottom:10}}>
          <div style={{position:"absolute",left:12,top:"50%",transform:"translateY(-50%)"}}><I n="search" s={16} c="var(--textFaint)"/></div>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search by name, phone or class..."
            style={{width:"100%",padding:"10px 12px 10px 36px",border:"1.5px solid var(--cardBorder)",borderRadius:12,fontSize:14,color:"var(--text)",background:"var(--card)",outline:"none",boxSizing:"border-box",fontFamily:"inherit"}}/>
        </div>
        <div style={{display:"flex",gap:8,marginBottom:classOptsS.length>=2?8:14,overflowX:"auto",paddingBottom:4}}>
          <Chip label="All" active={shiftFilter==="all"} onClick={()=>setShiftFilter("all")}/>
          {shifts.map((sh,i)=><Chip key={sh.id} label={sh.name} active={shiftFilter===sh.id} onClick={()=>setShiftFilter(sh.id)} c={getShiftColor(i).dot}/>)}
          <Chip label="⭐ Favorites" active={favOnly} onClick={()=>setFavOnly(f=>!f)} c="#f59e0b"/>
        </div>
        {classOptsS.length>=2&&(
          <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:14,overflowX:"auto",paddingBottom:4}}>
            <span style={{fontSize:11,fontWeight:800,color:"var(--textFaint)",flexShrink:0}}>Class</span>
            <Chip label="All" active={effClassS==="all"} onClick={()=>setClassFilter("all")} c="#7c3aed"/>
            {classOptsS.map(o=><Chip key={o.key||"none"} label={`${o.label} · ${o.n}`} active={effClassS===o.key} onClick={()=>setClassFilter(o.key)} c="#7c3aed"/>)}
          </div>
        )}
        {active.length===0&&(
          <div style={{textAlign:"center",padding:"50px 20px"}}>
            <div style={{fontSize:48,marginBottom:12}}>👨‍🎓</div>
            <div style={{fontWeight:800,fontSize:16,color:"var(--text)",marginBottom:6}}>No students yet</div>
            <div style={{fontSize:13,color:"var(--textFaint)",marginBottom:20}}>Add your first student to get started</div>
            <Btn onClick={()=>setShowForm(true)}><I n="plus" s={14}/> Add Student</Btn>
          </div>
        )}
        {filtered.map(s=>{
          const sh=shifts.find(x=>x.id===s.shiftId);
          const shIdx=shifts.findIndex(x=>x.id===s.shiftId);
          const col=shIdx>=0?getShiftColor(shIdx):null;
          const{total,curPaid}=calcOutstanding(s.id,mk,students,payments);
          const attKeys=Object.entries(attend).filter(([k])=>k.startsWith(s.id+"-"));
          const pres=attKeys.filter(([,v])=>v==="present").length;
          const pct=attKeys.length>0?Math.round((pres/attKeys.length)*1000)/10:0;
          const status=total===0?"Paid":curPaid>0?"Partially Paid":"Pending";
          return(
            <div key={s.id} onClick={()=>setViewing(s)} style={{background:"var(--card)",borderRadius:16,padding:"14px 16px",marginBottom:10,border:`1.5px solid ${s.favorite?"#fbbf2450":"var(--cardBorder)"}`,boxShadow:"0 2px 8px rgba(30,58,138,.05)",cursor:"pointer",display:"flex",alignItems:"center",gap:12}}>
              <button onClick={e=>toggleFavorite(s.id,e)} style={{background:"none",border:"none",cursor:"pointer",padding:2,flexShrink:0}}>
                <svg width={18} height={18} viewBox="0 0 24 24" fill={s.favorite?"#f59e0b":"none"} stroke={s.favorite?"#f59e0b":"var(--textFaint)"} strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
              </button>
              <div style={{width:42,height:42,borderRadius:13,overflow:"hidden",background:col?`linear-gradient(${col.grad})`:"linear-gradient(135deg,#94a3b8,#64748b)",display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontSize:16,fontWeight:900,flexShrink:0}}>{s.photo?<img src={s.photo} alt="" style={{width:"100%",height:"100%",objectFit:"cover"}}/>:s.name[0].toUpperCase()}</div>
              <div style={{flex:1,minWidth:0}}>
                <div style={{fontWeight:800,fontSize:14,color:"var(--text)"}}>{s.name}</div>
                <div style={{fontSize:11,color:"var(--textFaint)",marginTop:2,display:"flex",alignItems:"center",gap:5}}>
                  {col&&<span style={{width:6,height:6,borderRadius:"50%",background:col.dot,display:"inline-block"}}/>}
                  {sh?.name||"No shift"} · {settings.currency}{s.monthlyFee}/mo
                </div>
              </div>
              <div style={{textAlign:"right",flexShrink:0}}>
                <Badge s={status}/>
                <div style={{fontSize:11,color:pct>=75?"#10b981":"#ef4444",fontWeight:700,marginTop:5}}>{pct}% att.</div>
                {total>0&&<div style={{fontSize:11,color:"#dc2626",fontWeight:800}}>{settings.currency}{total} due</div>}
              </div>
            </div>
          );
        })}
        {filtered.length===0&&active.length>0&&<div style={{textAlign:"center",color:"#94a3b8",padding:"40px 0",fontSize:14}}>No matching students found</div>}
      </div>
      {showForm&&(
        <Sheet title={editing?"Edit Student":"Add New Student"} onClose={closeForm}>
          <div style={{display:"flex",justifyContent:"center",marginBottom:18}}>
            <div style={{position:"relative"}}>
              <div style={{width:88,height:88,borderRadius:"50%",overflow:"hidden",background:"var(--inputBg)",border:"2px solid var(--cardBorder)",display:"flex",alignItems:"center",justifyContent:"center"}}>
                <Avatar name={form.name||"?"} size={88} photo={form.photo}/>
              </div>
              <input ref={photoRef} type="file" accept="image/*" onChange={onPickPhoto} style={{display:"none"}}/>
              <button type="button" onClick={()=>photoRef.current?.click()} disabled={uploadingPhoto} style={{position:"absolute",bottom:0,right:0,width:30,height:30,borderRadius:"50%",background:"#1e3a8a",border:"3px solid var(--card)",display:"flex",alignItems:"center",justifyContent:"center",cursor:uploadingPhoto?"default":"pointer"}}>
                <I n="upload" s={13} c="#fff"/>
              </button>
              {form.photo&&<button type="button" onClick={()=>sf("photo","")} style={{position:"absolute",top:-4,left:-4,width:22,height:22,borderRadius:"50%",background:"#ef4444",border:"2px solid var(--card)",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer"}}><I n="x" s={11} c="#fff"/></button>}
            </div>
          </div>
          <Inp label="Full Name" value={form.name} onChange={v=>sf("name",v)} req placeholder="e.g. Rahul Sharma"/>
          <Inp label="Phone Number" value={form.phone} onChange={v=>sf("phone",v)} placeholder="e.g. 9876543210"/>
          <Inp label="Parent / Guardian Name" value={form.parent} onChange={v=>sf("parent",v)} placeholder="e.g. Suresh Sharma"/>
          <Inp label="Father's Name" value={form.fatherName} onChange={v=>sf("fatherName",v)} placeholder="e.g. Suresh Sharma"/>
          <Inp label="Class" value={form.studentClass} onChange={v=>sf("studentClass",v)} placeholder="e.g. Class 10"/>
          <Inp label="Monthly Fee (₹)" value={form.monthlyFee} onChange={v=>sf("monthlyFee",v)} type="number" req placeholder="e.g. 1000" hint="Unpaid months carry forward automatically"/>

          {/* Category — some categories auto-apply a 10% discount */}
          <div style={{marginBottom:14}}>
            <label style={{display:"block",fontSize:11,fontWeight:700,color:"var(--textMuted)",marginBottom:8,textTransform:"uppercase",letterSpacing:.6}}>Category</label>
            <select value={form.category||"General"} onChange={e=>{
              const cat=e.target.value;
              sf("category",cat);
              if(cat!=="General"){
                sf("discount",{type:"percent",value:10,reason:cat});
              }else if(form.discount?.reason&&STUDENT_CATEGORIES.includes(form.discount.reason)){
                sf("discount",{type:"percent",value:0,reason:""});
              }
            }} style={{width:"100%",padding:"11px 13px",border:"1.5px solid var(--cardBorder)",borderRadius:11,fontSize:14,color:"var(--text)",background:"var(--inputBg)",outline:"none",boxSizing:"border-box",fontFamily:"inherit"}}>
              {STUDENT_CATEGORIES.map(c=><option key={c} value={c}>{c}</option>)}
            </select>
            {form.category&&form.category!=="General"&&<div style={{marginTop:8,fontSize:11,color:"#166534",fontWeight:700,background:"#f0fdf4",border:"1.5px solid #bbf7d0",borderRadius:9,padding:"6px 10px"}}>✓ 10% discount auto-applied for this category — adjust below if needed</div>}
          </div>

          {/* Eligible for offers/scholarships */}
          <div style={{marginBottom:14}}>
            <button type="button" onClick={()=>sf("offerEligible",!form.offerEligible)} style={{display:"flex",alignItems:"center",gap:10,background:"none",border:"none",cursor:"pointer",padding:0,width:"100%",marginBottom:form.offerEligible!==undefined?8:0}}>
              <div style={{width:38,height:22,borderRadius:20,background:form.offerEligible?"#16a34a":"#e2e8f0",position:"relative",flexShrink:0,transition:"background .2s"}}>
                <div style={{width:16,height:16,borderRadius:"50%",background:"#fff",position:"absolute",top:3,left:form.offerEligible?19:3,transition:"left .2s",boxShadow:"0 1px 3px rgba(0,0,0,.2)"}}/>
              </div>
              <span style={{fontSize:12,fontWeight:700,color:"var(--textMuted)"}}>Eligible for offers / scholarship</span>
            </button>
            <textarea value={form.offerReason} onChange={e=>sf("offerReason",e.target.value)} rows={2} placeholder={form.offerEligible?"Why they're eligible (e.g. top scorer, financial need)...":"Why they're not eligible (optional)..."} style={{width:"100%",padding:"10px 12px",border:"1.5px solid var(--cardBorder)",borderRadius:10,fontSize:13,color:"var(--text)",background:"var(--inputBg)",outline:"none",fontFamily:"inherit",resize:"vertical",boxSizing:"border-box"}}/>
          </div>

          {/* Discount / Scholarship */}
          <div style={{marginBottom:14}}>
            <label style={{display:"block",fontSize:11,fontWeight:700,color:"var(--textMuted)",marginBottom:8,textTransform:"uppercase",letterSpacing:.6}}>Discount / Scholarship (optional)</label>
            <div style={{display:"flex",gap:8,marginBottom:8}}>
              <button onClick={()=>sf("discount",{...form.discount,type:"percent"})} style={{flex:1,padding:"9px",borderRadius:10,border:`2px solid ${form.discount?.type==="percent"?"#10b981":"var(--cardBorder)"}`,background:form.discount?.type==="percent"?"#dcfce7":"var(--inputBg)",color:form.discount?.type==="percent"?"#166534":"var(--textMuted)",fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>% Percentage</button>
              <button onClick={()=>sf("discount",{...form.discount,type:"flat"})} style={{flex:1,padding:"9px",borderRadius:10,border:`2px solid ${form.discount?.type==="flat"?"#10b981":"var(--cardBorder)"}`,background:form.discount?.type==="flat"?"#dcfce7":"var(--inputBg)",color:form.discount?.type==="flat"?"#166534":"var(--textMuted)",fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>{settings.currency} Flat Amount</button>
            </div>
            <input type="number" value={form.discount?.value||""} onChange={e=>sf("discount",{...form.discount,value:+e.target.value||0})} placeholder={form.discount?.type==="percent"?"e.g. 10 (for 10%)":"e.g. 200"}
              style={{width:"100%",padding:"11px 13px",border:"1.5px solid var(--cardBorder)",borderRadius:11,fontSize:14,color:"var(--text)",background:"var(--inputBg)",outline:"none",boxSizing:"border-box",fontFamily:"inherit",marginBottom:8}}/>
            <input value={form.discount?.reason||""} onChange={e=>sf("discount",{...form.discount,reason:e.target.value})} placeholder="Reason (e.g. Sibling discount, Scholarship)"
              style={{width:"100%",padding:"11px 13px",border:"1.5px solid var(--cardBorder)",borderRadius:11,fontSize:14,color:"var(--text)",background:"var(--inputBg)",outline:"none",boxSizing:"border-box",fontFamily:"inherit"}}/>
            {form.discount?.value>0&&form.monthlyFee&&(
              <div style={{marginTop:8,background:"#f0fdf4",border:"1.5px solid #bbf7d0",borderRadius:10,padding:"8px 12px",fontSize:12,color:"#166534",fontWeight:700}}>
                Effective fee: {settings.currency}{effectiveFee({monthlyFee:+form.monthlyFee,discount:form.discount})}/month (was {settings.currency}{form.monthlyFee})
              </div>
            )}
          </div>

          <Inp label="Joining Date" value={form.joining} onChange={v=>sf("joining",v)} type="date"/>
          <Inp label="Date of Birth (optional)" value={form.dob} onChange={v=>sf("dob",v)} type="date" hint="Get reminded on their birthday"/>
          <div style={{marginBottom:14}}>
            <label style={{display:"block",fontSize:11,fontWeight:700,color:"var(--textMuted)",marginBottom:8,textTransform:"uppercase",letterSpacing:.6}}>Batches (select one or more)</label>
            <div style={{display:"flex",gap:7,flexWrap:"wrap"}}>
              {shifts.length===0&&<span style={{fontSize:12,color:"var(--textFaint)"}}>No batches created yet</span>}
              {shifts.map((sh,i)=>{
                const col=getShiftColor(i);
                const on=(form.shiftIds||[]).includes(sh.id);
                return(
                  <button key={sh.id} type="button" onClick={()=>toggleFormShift(sh.id)} style={{padding:"7px 13px",borderRadius:20,border:`2px solid ${on?col.dot:"var(--cardBorder)"}`,background:on?col.bg:"var(--inputBg)",color:on?col.text:"var(--textMuted)",fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:"inherit",display:"flex",alignItems:"center",gap:6}}>
                    {on&&<span style={{width:6,height:6,borderRadius:"50%",background:col.dot}}/>}
                    {sh.name}
                  </button>
                );
              })}
            </div>
            {(form.shiftIds||[]).length>1&&<div style={{fontSize:11,color:"var(--textFaint)",marginTop:6}}>This student will appear in attendance & schedule for all {form.shiftIds.length} selected batches.</div>}
            {(()=>{
              const conflicts=findStudentShiftConflicts(form.shiftIds||[],shifts);
              if(!conflicts.length)return null;
              return(
                <div style={{marginTop:10,background:"#fef2f2",border:"1.5px solid #fecaca",borderRadius:12,padding:"12px 14px"}}>
                  <div style={{fontSize:12,fontWeight:800,color:"#991b1b",marginBottom:8,display:"flex",alignItems:"center",gap:6}}>⚠️ Scheduling conflict — student can't attend both</div>
                  {conflicts.map((c,i)=>{
                    const suggestedStart=minutesToTime(Math.max(timeToMinutes(c.ta.end),timeToMinutes(c.tb.end))+60);
                    const laterIsB=timeToMinutes(c.tb.start)>=timeToMinutes(c.ta.start);
                    const laterShift=laterIsB?c.b:c.a, laterTime=laterIsB?c.tb:c.ta;
                    const durationMin=timeToMinutes(laterTime.end)-timeToMinutes(laterTime.start);
                    const newStart=suggestedStart, newEnd=minutesToTime(timeToMinutes(suggestedStart)+durationMin);
                    const autoFix=()=>{
                      setShifts(ss=>ss.map(s=>s.id===laterShift.id?{...s,customTiming:true,perDayTimes:{...s.perDayTimes,[c.day]:{start:newStart,end:newEnd}}}:s));
                      toast.success(`${laterShift.name}'s ${DAY_FULL[c.day]} time set to ${fmtTime(newStart)}–${fmtTime(newEnd)} for everyone in that batch`,"Adjusted");
                    };
                    return(
                      <div key={i} style={{fontSize:12,color:"#7f1d1d",marginBottom:8,lineHeight:1.5}}>
                        <b>{DAY_FULL[c.day]}:</b> {c.a.name} ({fmtTime(c.ta.start)}–{fmtTime(c.ta.end)}) & {c.b.name} ({fmtTime(c.tb.start)}–{fmtTime(c.tb.end)}) are too close — need at least 1 hour gap.
                        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginTop:4,gap:8}}>
                          <span style={{color:"#b91c1c",fontWeight:700}}>Fix: move {laterShift.name} to {fmtTime(newStart)}–{fmtTime(newEnd)} on {c.day}</span>
                          <button type="button" onClick={autoFix} style={{background:"#dc2626",color:"#fff",border:"none",borderRadius:8,padding:"5px 10px",fontSize:11,fontWeight:800,cursor:"pointer",fontFamily:"inherit",flexShrink:0}}>Auto-Fix</button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            })()}
          </div>
          <Inp label="Address" value={form.address} onChange={v=>sf("address",v)} placeholder="e.g. MG Road, Indore"/>
          <Inp label="Notes" value={form.notes} onChange={v=>sf("notes",v)} placeholder="Any special notes..."/>
          <button onClick={()=>sf("favorite",!form.favorite)} style={{display:"flex",alignItems:"center",gap:10,background:form.favorite?"#fef3c7":"var(--inputBg)",border:`1.5px solid ${form.favorite?"#fbbf24":"var(--cardBorder)"}`,borderRadius:11,padding:"11px 13px",marginBottom:14,cursor:"pointer",width:"100%",fontFamily:"inherit"}}>
            <svg width={18} height={18} viewBox="0 0 24 24" fill={form.favorite?"#f59e0b":"none"} stroke={form.favorite?"#f59e0b":"var(--textFaint)"} strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            <span style={{fontSize:13,fontWeight:700,color:form.favorite?"#92400e":"var(--textMuted)"}}>Mark as Favorite Student</span>
          </button>
          <div style={{display:"flex",gap:10,marginTop:8}}><Btn onClick={closeForm} outline c="#64748b" full>Cancel</Btn><Btn onClick={submit} full>{editing?"Save Changes":"Add Student"}</Btn></div>
        </Sheet>
      )}
      {showReport&&<AttendanceReportSheet store={store} onClose={()=>setShowReport(false)}/>}

      {showImport&&(
        <Sheet title="Bulk Import Students" onClose={()=>{setShowImport(false);setImportText("");setImportPreview(null);}}>
          {!importPreview?(
            <>
              <div style={{background:"#ede9fe",borderRadius:12,padding:"12px 14px",marginBottom:16,fontSize:12,color:"#5b21b6",lineHeight:1.6}}>
                Upload a CSV file or paste CSV text with columns: <b>Name, Phone, Parent, Fee, Address</b>. Only Name and Fee are required.
              </div>

              <button onClick={downloadSampleCSV} style={{width:"100%",background:"var(--inputBg)",border:"1.5px dashed var(--cardBorder)",borderRadius:12,padding:"12px",marginBottom:16,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:8,fontFamily:"inherit"}}>
                <I n="filecsv" s={16} c="var(--textMuted)"/>
                <span style={{fontSize:12,fontWeight:700,color:"var(--textMuted)"}}>Download Sample CSV</span>
              </button>

              <input ref={fileInputRef} type="file" accept=".csv,text/csv" onChange={handleFileSelect} style={{display:"none"}}/>
              <Btn onClick={()=>fileInputRef.current?.click()} full c="#10b981"><I n="upload" s={15}/> Choose CSV File</Btn>

              <div style={{textAlign:"center",fontSize:11,color:"var(--textFaint)",margin:"14px 0",fontWeight:700}}>— OR PASTE CSV TEXT —</div>

              <textarea value={importText} onChange={e=>setImportText(e.target.value)} placeholder={"Name,Phone,Parent,Fee,Address\nRahul Sharma,9876543210,Suresh Sharma,1000,Indore"}
                rows={6} style={{width:"100%",padding:"11px 13px",border:"1.5px solid var(--cardBorder)",borderRadius:11,fontSize:12,color:"var(--text)",background:"var(--inputBg)",outline:"none",boxSizing:"border-box",fontFamily:"monospace",marginBottom:12,resize:"vertical"}}/>
              <Btn onClick={handlePasteImport} full outline c="#1e3a8a">Preview Import</Btn>
            </>
          ):(
            <>
              <div style={{display:"flex",gap:8,marginBottom:14}}>
                <div style={{flex:1,background:"#dcfce7",borderRadius:12,padding:"12px",textAlign:"center"}}>
                  <div style={{fontSize:22,fontWeight:900,color:"#166534"}}>{importPreview.rows.length}</div>
                  <div style={{fontSize:10,color:"#166534",fontWeight:700}}>READY TO IMPORT</div>
                </div>
                {importPreview.errors.length>0&&<div style={{flex:1,background:"#fee2e2",borderRadius:12,padding:"12px",textAlign:"center"}}>
                  <div style={{fontSize:22,fontWeight:900,color:"#991b1b"}}>{importPreview.errors.length}</div>
                  <div style={{fontSize:10,color:"#991b1b",fontWeight:700}}>ERRORS</div>
                </div>}
              </div>

              {importPreview.errors.length>0&&(
                <div style={{background:"#fff7ed",border:"1.5px solid #fed7aa",borderRadius:12,padding:"12px 14px",marginBottom:14}}>
                  {importPreview.errors.map((e,i)=>(
                    <div key={i} style={{fontSize:11,color:"#c2410c",marginBottom:4}}>⚠ {e}</div>
                  ))}
                </div>
              )}

              {importPreview.rows.length>0&&(
                <div style={{marginBottom:16,maxHeight:280,overflowY:"auto"}}>
                  <div style={{fontWeight:800,fontSize:11,color:"var(--textFaint)",textTransform:"uppercase",letterSpacing:.6,marginBottom:8}}>Preview</div>
                  {importPreview.rows.map((r,i)=>(
                    <div key={i} style={{display:"flex",alignItems:"center",gap:10,padding:"8px 10px",background:"var(--inputBg)",borderRadius:9,marginBottom:6}}>
                      <Avatar name={r.name} size={30}/>
                      <div style={{flex:1,minWidth:0}}>
                        <div style={{fontSize:12,fontWeight:700,color:"var(--text)"}}>{r.name}</div>
                        <div style={{fontSize:10,color:"var(--textFaint)"}}>{r.phone||"No phone"} · {settings.currency}{r.monthlyFee}/mo</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div style={{display:"flex",gap:10}}>
                <Btn onClick={()=>{setImportPreview(null);setImportText("");}} outline c="#64748b" full>Back</Btn>
                <Btn onClick={confirmImport} c="#10b981" full disabled={importPreview.rows.length===0}>Import {importPreview.rows.length} Students</Btn>
              </div>
            </>
          )}
        </Sheet>
      )}
    </div>
  );
};

// ══════════════════════════════════════════════════════════════
// ATTENDANCE
// ══════════════════════════════════════════════════════════════
const Attendance=({store,toast,currentTeacher})=>{
  const{students:allStudents,shifts:allShifts,attend,setAttend,payments,settings,holidays,setAttendLog}=store;
  const isLimited=currentTeacher&&currentTeacher.role==="teacher";
  const scopedIds=isLimited&&currentTeacher.allowedShiftIds?.length?currentTeacher.allowedShiftIds:null;
  const shifts=scopedIds?allShifts.filter(sh=>scopedIds.includes(sh.id)):allShifts;
  const students=scopedIds?allStudents.filter(s=>getShiftIds(s).some(id=>scopedIds.includes(id))):allStudents;
  const[mode,setMode]=useState("mark"); // "mark" | "history"
  const[date,setDate]=useState(todayStr());
  const[activeShiftId,setActiveShiftId]=useState(null);
  const[local,setLocal]=useState({});
  const[saving,setSaving]=useState(false);
  const[viewingStudent,setViewingStudent]=useState(null);
  const[historyShiftFilter,setHistoryShiftFilter]=useState("all");
  const[search,setSearch]=useState("");
  const[classFilter,setClassFilter]=useState("all");
  const[hSearch,setHSearch]=useState("");
  const[hClass,setHClass]=useState("all");
  const active=students.filter(s=>!s.archived);

  const d=new Date(date+"T00:00:00");
  const dayAbbr=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"][d.getDay()];
  const scheduledShifts=shifts.filter(sh=>sh.days?.includes(dayAbbr)&&(!isLimited||teacherVisibleForDay(sh,dayAbbr,currentTeacher?.id)));
  const todayHoliday=getHoliday(date,holidays);
  const noClassesToday=scheduledShifts.length===0||!!todayHoliday;

  useEffect(()=>{
    if(scheduledShifts.length>0) setActiveShiftId(scheduledShifts[0].id);
    else setActiveShiftId("all");
    // eslint-disable-next-line
  },[date]);

  const getStudentsForShift=shiftId=>shiftId==="all"?active:active.filter(s=>hasShift(s,shiftId));

  useEffect(()=>{
    if(!activeShiftId) return;
    const targets=getStudentsForShift(activeShiftId);
    const init={};
    targets.forEach(s=>{init[s.id]=getAttStatus(attend,s.id,date,activeShiftId);});
    setLocal(init);
    // eslint-disable-next-line
  },[date,activeShiftId]);

  const mark=(id,val)=>setLocal(l=>({...l,[id]:l[id]===val?"":val}));
  const markAll=(shiftId,val)=>{
    const targets=visibleStudents; // only the students currently shown (respects class / search filter)
    setLocal(l=>{const n={...l};targets.forEach(s=>{if(l[s.id]!=="leave")n[s.id]=val;});return n;});
  };

  const save=async()=>{
    setSaving(true);
    await new Promise(r=>setTimeout(r,500));
    const upd={...attend};
    const markerName=currentTeacher?currentTeacher.name:(settings.institute?`${settings.institute} Admin`:"Admin");
    const markerId=currentTeacher?currentTeacher.id:"admin";
    const now=Date.now();
    const newLogEntries=[];
    const shiftForLog=activeShiftId==="all"?null:shifts.find(sh=>sh.id===activeShiftId);
    Object.entries(local).forEach(([id,val])=>{
      const key=attKey(id,date,activeShiftId);
      const prevVal=getAttStatus(attend,id,date,activeShiftId);
      if(val)upd[key]=val;else delete upd[key];
      if(val&&val!==prevVal){
        newLogEntries.push({id:uid(),studentId:id,date,status:val,shiftId:activeShiftId==="all"?null:activeShiftId,shiftName:shiftForLog?.name||null,markedBy:markerId,markedByName:markerName,markedAt:now});
      }
    });
    setAttend(upd);
    if(newLogEntries.length)setAttendLog(list=>[...(list||[]),...newLogEntries]);
    setSaving(false);
    const p=Object.values(local).filter(v=>v==="present").length;
    const a=Object.values(local).filter(v=>v==="absent").length;
    const label=shiftForLog?` for ${shiftForLog.name}`:"";
    toast.success(`${p} present, ${a} absent saved${label} on ${new Date(date+"T00:00:00").toLocaleDateString("en-IN",{day:"2-digit",month:"short"})}`, "Attendance Saved ✓");
  };

  const currentStudents=activeShiftId?getStudentsForShift(activeShiftId):active;
  const classOpts=buildClassOptions(currentStudents);
  const effClass=classOpts.some(o=>o.key===classFilter)?classFilter:"all";
  const visibleStudents=currentStudents.filter(s=>(effClass==="all"||clsKey(s)===effClass)&&matchStudent(s,search));
  const curUnmarked=visibleStudents.filter(s=>!["present","absent","leave"].includes(local[s.id])).length;
  const shiftTabs=[{id:"all",name:"All Students",days:DAYS_ALL,start:"",end:""},...shifts];

  // ── VIEW: Individual student's full attendance detail ──
  if(viewingStudent){
    return <StudentAttendanceDetail store={store} student={viewingStudent} onBack={()=>setViewingStudent(null)}/>;
  }

  // ── VIEW: History / batch-wise monthly overview ──
  if(mode==="history"){
    const mk=curMK();
    const [mkY,mkM]=mk.split("-").map(Number);
    const histBase=active.filter(s=>historyShiftFilter==="all"||hasShift(s,historyShiftFilter));
    const hOpts=buildClassOptions(histBase);
    const hEff=hOpts.some(o=>o.key===hClass)?hClass:"all";
    const historyStudents=histBase.filter(s=>(hEff==="all"||clsKey(s)===hEff)&&matchStudent(s,hSearch));
    return(
      <div style={{background:"var(--bg)",minHeight:"var(--app-h,100vh)"}}>
        <div style={{padding:"20px 16px 0",position:"sticky",top:"env(safe-area-inset-top)",background:"var(--bg)",zIndex:10}}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:14}}>
            <span style={{fontWeight:900,fontSize:19,color:"var(--text)"}}>Attendance</span>
          </div>
          {/* Mode toggle */}
          <div style={{display:"flex",gap:6,background:"var(--card)",borderRadius:13,padding:4,marginBottom:14,border:"1px solid var(--cardBorder)"}}>
            <button onClick={()=>setMode("mark")} style={{flex:1,borderRadius:10,padding:"9px 4px",fontSize:12,fontWeight:800,border:"none",background:"transparent",color:"var(--textFaint)",cursor:"pointer",fontFamily:"inherit"}}>Mark Attendance</button>
            <button onClick={()=>setMode("history")} style={{flex:1,borderRadius:10,padding:"9px 4px",fontSize:12,fontWeight:800,border:"none",background:"#1e3a8a",color:"#fff",cursor:"pointer",fontFamily:"inherit",boxShadow:"0 1px 4px rgba(0,0,0,.08)"}}>View by Student</button>
          </div>
        </div>

        <div style={{padding:"0 16px 24px"}}>
          {/* Batch summary cards */}
          <div style={{fontWeight:800,fontSize:12,color:"var(--textMuted)",textTransform:"uppercase",letterSpacing:.7,marginBottom:10}}>Batch-wise Summary — {monthFull(mk)}</div>
          <div style={{display:"flex",gap:10,overflowX:"auto",paddingBottom:8,marginBottom:14}}>
            {shifts.map((sh,i)=>{
              const col=getShiftColor(i);
              const cnt=active.filter(s=>hasShift(s,sh.id)).length;
              const totalClasses=classesInMonth(sh,mkY,mkM);
              // avg attendance % across students in this shift
              const shStudents=active.filter(s=>hasShift(s,sh.id));
              const avgPct=shStudents.length>0?Math.round(shStudents.reduce((a,s)=>a+studentMonthAttendance(s,sh,mkY,mkM,attend).pct,0)/shStudents.length):0;
              return(
                <button key={sh.id} onClick={()=>setHistoryShiftFilter(sh.id)} style={{flexShrink:0,background:historyShiftFilter===sh.id?col.bg:"var(--card)",border:`2px solid ${historyShiftFilter===sh.id?col.dot:"var(--cardBorder)"}`,borderRadius:14,padding:"12px 16px",minWidth:130,textAlign:"left",cursor:"pointer",fontFamily:"inherit"}}>
                  <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:6}}>
                    <div style={{width:8,height:8,borderRadius:"50%",background:col.dot}}/>
                    <span style={{fontSize:12,fontWeight:800,color:historyShiftFilter===sh.id?col.text:"var(--text)"}}>{sh.name}</span>
                  </div>
                  <div style={{fontSize:11,color:"var(--textFaint)",marginBottom:4}}>{cnt} students · {totalClasses} classes</div>
                  <div style={{fontSize:18,fontWeight:900,color:avgPct>=75?"#10b981":avgPct>=50?"#f59e0b":"#ef4444"}}>{avgPct}%<span style={{fontSize:10,fontWeight:600,color:"var(--textFaint)"}}> avg</span></div>
                </button>
              );
            })}
            <button onClick={()=>setHistoryShiftFilter("all")} style={{flexShrink:0,background:historyShiftFilter==="all"?"#ede9fe":"var(--card)",border:`2px solid ${historyShiftFilter==="all"?"#1e3a8a":"var(--cardBorder)"}`,borderRadius:14,padding:"12px 16px",minWidth:110,textAlign:"center",cursor:"pointer",fontFamily:"inherit",display:"flex",alignItems:"center",justifyContent:"center"}}>
              <span style={{fontSize:12,fontWeight:800,color:historyShiftFilter==="all"?"#4f46e5":"var(--textMuted)"}}>All Students</span>
            </button>
          </div>

          {/* Student list with mini stats — tap to open full detail */}
          <div style={{fontWeight:800,fontSize:12,color:"var(--textMuted)",textTransform:"uppercase",letterSpacing:.7,marginBottom:10}}>Tap a student to view full history</div>
          <StudentFilterBar search={hSearch} onSearch={setHSearch} classOpts={hOpts} classVal={hEff} onClass={setHClass} total={histBase.length} shown={historyStudents.length}/>
          {historyStudents.length===0&&<div style={{textAlign:"center",padding:"30px 0",color:"var(--textFaint)",fontSize:13}}>{histBase.length===0?"No students in this batch":"No student matches this filter"}</div>}
          {historyStudents.map(s=>{
            const sh=historyShiftFilter!=="all"?shifts.find(x=>x.id===historyShiftFilter):shifts.find(x=>hasShift(s,x.id));
            const shIdx=shifts.findIndex(x=>x.id===sh?.id);
            const col=shIdx>=0?getShiftColor(shIdx):{grad:"135deg,#94a3b8,#64748b",dot:"#94a3b8"};
            const det=studentMonthAttendance(s,sh,mkY,mkM,attend);
            return(
              <button key={s.id} onClick={()=>setViewingStudent(s)} style={{width:"100%",background:"var(--card)",borderRadius:16,padding:"14px 16px",marginBottom:10,border:"1.5px solid var(--cardBorder)",boxShadow:"0 2px 8px var(--shadow)",cursor:"pointer",display:"flex",alignItems:"center",gap:14,textAlign:"left",fontFamily:"inherit"}}>
                <Avatar name={s.name} g={col.grad}/>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{fontWeight:800,fontSize:14,color:"var(--text)"}}>{s.name}</div>
                  <div style={{fontSize:11,color:"var(--textFaint)",marginTop:2}}>{s.studentClass?`${String(s.studentClass).trim()} · `:""}{sh?.name||"No shift"} · {det.present}P/{det.absent}A of {det.totalScheduled} classes</div>
                </div>
                <div style={{textAlign:"right",flexShrink:0}}>
                  <div style={{fontSize:18,fontWeight:900,color:det.pct>=75?"#10b981":det.pct>=50?"#f59e0b":"#ef4444"}}>{det.pct}%</div>
                  {det.notMarked>0&&<div style={{fontSize:10,color:"#f59e0b",fontWeight:700}}>{det.notMarked} unmarked</div>}
                </div>
                <I n="back" s={16} c="var(--cardBorder)"/>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  return(
    <div style={{background:"var(--bg)",minHeight:"var(--app-h,100vh)"}}>
      <div style={{padding:"20px 16px 0",position:"sticky",top:"env(safe-area-inset-top)",background:"var(--bg)",zIndex:10}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:14}}>
          <span style={{fontWeight:900,fontSize:19,color:"var(--text)"}}>Attendance</span>
          <div style={{background:"var(--card)",borderRadius:12,padding:"8px 14px",border:"1.5px solid var(--cardBorder)",display:"flex",alignItems:"center",gap:8}}>
            <I n="cal" s={16} c="#1e3a8a"/>
            <input type="date" value={date} onChange={e=>setDate(e.target.value)} style={{border:"none",fontSize:13,fontWeight:800,color:"var(--text)",outline:"none",background:"transparent",fontFamily:"inherit"}}/>
          </div>
        </div>

        {/* Mode toggle */}
        <div style={{display:"flex",gap:6,background:"var(--card)",borderRadius:13,padding:4,marginBottom:12,border:"1px solid var(--cardBorder)"}}>
          <button onClick={()=>setMode("mark")} style={{flex:1,borderRadius:10,padding:"9px 4px",fontSize:12,fontWeight:800,border:"none",background:"#1e3a8a",color:"#fff",cursor:"pointer",fontFamily:"inherit",boxShadow:"0 1px 4px rgba(0,0,0,.08)"}}>Mark Attendance</button>
          <button onClick={()=>setMode("history")} style={{flex:1,borderRadius:10,padding:"9px 4px",fontSize:12,fontWeight:800,border:"none",background:"transparent",color:"var(--textFaint)",cursor:"pointer",fontFamily:"inherit"}}>View by Student</button>
        </div>

        <div style={{background:"linear-gradient(135deg,#0d1b42,#1e3a8a)",borderRadius:14,padding:"12px 16px",marginBottom:12,display:"flex",alignItems:"center",justifyContent:"space-between",color:"#fff"}}>
          <div>
            <div style={{fontSize:13,fontWeight:800}}>{DAY_FULL[dayAbbr]||dayAbbr}, {fmtDate(date)}</div>
            <div style={{fontSize:11,opacity:.7,marginTop:2}}>{scheduledShifts.length>0?`${scheduledShifts.length} shift${scheduledShifts.length>1?"s":""} scheduled`:"No shifts scheduled today"}</div>
          </div>
          <div style={{display:"flex",gap:12,fontSize:12}}>
            <div style={{textAlign:"center"}}><div style={{fontSize:20,fontWeight:900,color:"#86efac"}}>{Object.values(local).filter(v=>v==="present").length}</div><div style={{opacity:.7}}>Present</div></div>
            <div style={{textAlign:"center"}}><div style={{fontSize:20,fontWeight:900,color:"#fca5a5"}}>{Object.values(local).filter(v=>v==="absent").length}</div><div style={{opacity:.7}}>Absent</div></div>
          </div>
        </div>

        {todayHoliday&&(
          <div style={{background:"#fff7ed",border:"1.5px solid #fed7aa",borderRadius:14,padding:"12px 16px",marginBottom:12,display:"flex",alignItems:"center",gap:10}}>
            <div style={{background:"#fed7aa",borderRadius:9,padding:8,flexShrink:0}}><I n="holiday" s={16} c="#c2410c"/></div>
            <div>
              <div style={{fontSize:13,fontWeight:800,color:"#9a3412"}}>{todayHoliday.name}</div>
              <div style={{fontSize:11,color:"#c2410c"}}>Marked as holiday — classes are off today</div>
            </div>
          </div>
        )}

        {!noClassesToday&&active.length>0&&<div style={{display:"flex",gap:8,overflowX:"auto",paddingBottom:8}}>
          {shiftTabs.map((sh,i)=>{
            const isActive=activeShiftId===sh.id;
            const col=sh.id==="all"?{dot:"#1e3a8a",bg:"#ede9fe",text:"#4f46e5"}:getShiftColor(i-1);
            const cnt=sh.id==="all"?active.length:active.filter(s=>hasShift(s,sh.id)).length;
            const tabIsActive=activeShiftId===sh.id;
            const tabTargets=sh.id==="all"?active:active.filter(s=>hasShift(s,sh.id));
            const pCount=tabIsActive?Object.values(local).filter(v=>v==="present").length:tabTargets.filter(s=>getAttStatus(attend,s.id,date,sh.id)==="present").length;
            const isScheduled=sh.id==="all"||sh.days?.includes(dayAbbr);
            return(
              <button key={sh.id} onClick={()=>setActiveShiftId(sh.id)} style={{flexShrink:0,borderRadius:14,padding:"9px 14px",border:`2px solid ${isActive?col.dot:"var(--cardBorder)"}`,background:isActive?col.bg:"var(--card)",cursor:"pointer",fontFamily:"inherit",minWidth:110,textAlign:"left",position:"relative"}}>
                {sh.id!=="all"&&<div style={{position:"absolute",top:6,right:8,width:7,height:7,borderRadius:"50%",background:isScheduled?col.dot:"#e2e8f0"}}/>}
                <div style={{fontSize:11,fontWeight:800,color:isActive?col.text:"var(--textMuted)"}}>{sh.name}</div>
                <div style={{fontSize:10,color:isActive?col.dot:"#94a3b8",marginTop:2}}>{sh.id!=="all"?`${fmtTime(sh.start)}–${fmtTime(sh.end)}`:"All shifts"}</div>
                <div style={{fontSize:13,fontWeight:900,color:isActive?col.dot:"#94a3b8",marginTop:3}}>{pCount}<span style={{fontSize:10,opacity:.7}}>/{cnt}</span></div>
              </button>
            );
          })}
        </div>}
      </div>

      {noClassesToday?(
        <div style={{padding:"20px 16px 100px"}}>
          <div style={{textAlign:"center",padding:"50px 20px",background:"var(--card)",border:"1.5px solid var(--cardBorder)",borderRadius:20}}>
            <div style={{fontSize:44,marginBottom:14}}>{todayHoliday?"🎉":"📭"}</div>
            <div style={{fontSize:16,fontWeight:900,color:"var(--text)",marginBottom:6}}>No Classes Today</div>
            <div style={{fontSize:13,color:"var(--textFaint)",lineHeight:1.6,maxWidth:280,margin:"0 auto"}}>
              {todayHoliday
                ? <>Today is <b style={{color:"var(--text)"}}>{todayHoliday.name}</b> — classes are off. Attendance can't be marked on a holiday.</>
                : isLimited
                  ? <>You don't have any batch scheduled on <b style={{color:"var(--text)"}}>{DAY_FULL[dayAbbr]}</b>. Attendance can't be marked when there's no class.</>
                  : <>No batch is scheduled on <b style={{color:"var(--text)"}}>{DAY_FULL[dayAbbr]}</b>. Attendance can't be marked when there's no class.</>}
            </div>
          </div>
        </div>
      ):(
      <div style={{padding:"0 16px 100px"}}>
        {active.length===0&&<div style={{textAlign:"center",padding:"60px 0",color:"#94a3b8"}}><div style={{fontSize:40,marginBottom:12}}>📋</div><div style={{fontSize:14}}>Add students first</div></div>}

        {activeShiftId&&currentStudents.length>0&&(
          <>
            <StudentFilterBar search={search} onSearch={setSearch} classOpts={classOpts} classVal={effClass} onClass={setClassFilter} total={currentStudents.length} shown={visibleStudents.length}/>
            {visibleStudents.length===0&&<div style={{textAlign:"center",padding:"36px 16px",background:"var(--card)",border:"1.5px solid var(--cardBorder)",borderRadius:16,color:"var(--textFaint)",fontSize:13,lineHeight:1.6}}>No student matches this filter.<br/>Try another class or clear the search.</div>}
            {visibleStudents.length>0&&<div style={{display:"flex",gap:8,marginBottom:14}}>
              <button onClick={()=>markAll(activeShiftId,"present")} style={{flex:1,background:"#dcfce7",border:"2px solid #86efac",borderRadius:11,padding:"10px",fontSize:12,fontWeight:800,color:"#166534",cursor:"pointer",fontFamily:"inherit",display:"flex",alignItems:"center",justifyContent:"center",gap:6}}>
                <I n="check" s={13} c="#16a34a"/> All Present
              </button>
              <button onClick={()=>markAll(activeShiftId,"absent")} style={{flex:1,background:"#fee2e2",border:"2px solid #fca5a5",borderRadius:11,padding:"10px",fontSize:12,fontWeight:800,color:"#991b1b",cursor:"pointer",fontFamily:"inherit",display:"flex",alignItems:"center",justifyContent:"center",gap:6}}>
                <I n="x" s={13} c="#dc2626"/> All Absent
              </button>
              <div style={{background:"var(--inputBg)",borderRadius:11,padding:"10px 14px",fontSize:12,fontWeight:800,color:"var(--textMuted)",display:"flex",alignItems:"center",gap:4}}>{curUnmarked}<span style={{fontSize:10,opacity:.7}}>left</span></div>
            </div>}

            <div style={{display:"flex",flexDirection:"column",gap:8}}>
              {visibleStudents.map((s,idx)=>{
                const shIdx=shifts.findIndex(x=>x.id===(activeShiftId!=="all"?activeShiftId:primaryShiftId(s)));
                const col=shIdx>=0?getShiftColor(shIdx):{dot:"#94a3b8",grad:"135deg,#94a3b8,#64748b"};
                const status=local[s.id];
                const isPresent=status==="present";
                const isAbsent=status==="absent";
                const isLeave=status==="leave";
                return(
                  <div key={s.id} style={{background:"var(--card)",borderRadius:14,padding:"10px 12px",border:`2px solid ${isPresent?"#86efac":isAbsent?"#fca5a5":isLeave?"#c4b5fd":"var(--cardBorder)"}`,boxShadow:`0 2px 10px ${isPresent?"rgba(16,185,129,.08)":isAbsent?"rgba(239,68,68,.08)":isLeave?"rgba(139,92,246,.1)":"rgba(30,58,138,.04)"}`,display:"flex",alignItems:"center",gap:12,transition:"all .15s"}}>
                    <div style={{width:16,fontSize:11,fontWeight:800,color:"var(--textFaint)",textAlign:"center",flexShrink:0}}>{idx+1}</div>
                    <div style={{width:38,height:38,borderRadius:12,background:isPresent?"linear-gradient(135deg,#10b981,#34d399)":isAbsent?"linear-gradient(135deg,#ef4444,#f87171)":isLeave?"linear-gradient(135deg,#2563eb,#a78bfa)":`linear-gradient(${col.grad})`,display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontSize:15,fontWeight:900,flexShrink:0,transition:"all .2s"}}>
                      {isPresent?<I n="check" s={17} c="#fff"/>:isAbsent?<I n="x" s={17} c="#fff"/>:isLeave?<I n="cal" s={15} c="#fff"/>:s.name[0].toUpperCase()}
                    </div>
                    <div style={{flex:1,minWidth:0}}>
                      <div style={{fontSize:13,fontWeight:800,color:"var(--text)",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{s.name}</div>
                      <div style={{fontSize:10,color:"var(--textFaint)",marginTop:1,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{[s.studentClass&&String(s.studentClass).trim(),activeShiftId!=="all"?(shifts.find(sh=>sh.id===activeShiftId)?.name||"No shift"):(getShiftIds(s).map(id=>shifts.find(sh=>sh.id===id)?.name).filter(Boolean).join(", ")||"No shift")].filter(Boolean).join(" · ")}</div>
                    </div>
                    {isLeave?(
                      <div style={{flexShrink:0,fontSize:9,fontWeight:800,color:"#6d28d9",background:"#ede9fe",borderRadius:9,padding:"7px 10px",whiteSpace:"nowrap"}}>ON LEAVE</div>
                    ):(
                      <div style={{display:"flex",gap:6,flexShrink:0}}>
                        <button onClick={()=>mark(s.id,"present")} style={{width:40,padding:"8px 0",borderRadius:9,border:`2px solid ${isPresent?"#10b981":"var(--cardBorder)"}`,background:isPresent?"#10b981":"var(--inputBg)",color:isPresent?"#fff":"var(--textMuted)",fontSize:12,fontWeight:800,cursor:"pointer",fontFamily:"inherit",transition:"all .15s"}}>P</button>
                        <button onClick={()=>mark(s.id,"absent")} style={{width:40,padding:"8px 0",borderRadius:9,border:`2px solid ${isAbsent?"#ef4444":"var(--cardBorder)"}`,background:isAbsent?"#ef4444":"var(--inputBg)",color:isAbsent?"#fff":"var(--textMuted)",fontSize:12,fontWeight:800,cursor:"pointer",fontFamily:"inherit",transition:"all .15s"}}>A</button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
      )}

      {active.length>0&&!noClassesToday&&(
        <div style={{position:"fixed",bottom:"calc(74px + env(safe-area-inset-bottom))",left:"50%",transform:"translateX(-50%)",width:"100%",maxWidth:480,padding:"0 16px",boxSizing:"border-box",zIndex:20}}>
          <button onClick={save} disabled={saving} style={{width:"100%",background:saving?"#3b82f6":"linear-gradient(135deg,#1e3a8a,#2563eb)",border:"none",borderRadius:16,padding:"16px 20px",fontSize:15,fontWeight:800,color:"#fff",cursor:saving?"not-allowed":"pointer",fontFamily:"inherit",display:"flex",alignItems:"center",justifyContent:"center",gap:10,boxShadow:"0 6px 24px rgba(30,58,138,.4)"}}>
            {saving?(
              <>
                <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" style={{animation:"spin 1s linear infinite"}}><path d="M12 2v4 M12 18v4 M4.93 4.93l2.83 2.83 M16.24 16.24l2.83 2.83 M2 12h4 M18 12h4 M4.93 19.07l2.83-2.83 M16.24 7.76l2.83-2.83"/></svg>
                Saving Attendance...
              </>
            ):(
              <><I n="checkbig" s={18}/> Submit Attendance — {Object.values(local).filter(v=>v==="present").length}P / {Object.values(local).filter(v=>v==="absent").length}A</>
            )}
          </button>
          <style>{`@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}`}</style>
        </div>
      )}
    </div>
  );
};

// ══════════════════════════════════════════════════════════════
// FEES
// ══════════════════════════════════════════════════════════════
const ONE_TIME_FEE_TYPES=[
  {v:"admission",l:"Admission Fee",icon:"userplus",c:"#1e3a8a"},
  {v:"exam",l:"Exam Fee",icon:"book",c:"#f59e0b"},
  {v:"books",l:"Books / Material",icon:"note",c:"#10b981"},
  {v:"uniform",l:"Uniform",icon:"tag",c:"#ec4899"},
  {v:"late",l:"Late Fee",icon:"clock",c:"#ef4444"},
  {v:"other",l:"Other",icon:"receipt",c:"#64748b"},
];
const oneTimeInfo=v=>ONE_TIME_FEE_TYPES.find(t=>t.v===v)||ONE_TIME_FEE_TYPES[ONE_TIME_FEE_TYPES.length-1];

const Fees=({store,toast,initAct})=>{
  const{students,payments,setPayments,settings,shifts,oneTimeFees,setOneTimeFees,feeReminders,setFeeReminders}=store;
  const[feeTab,setFeeTab]=useState("monthly"); // "monthly" | "onetime"
  const[mk,setMk]=useState(curMK());
  const[showPay,setShowPay]=useState(false);
  const[selSid,setSelSid]=useState("");
  const[filter,setFilter]=useState("all");
  const[pf,setPf]=useState({amount:"",date:todayStr(),method:"Cash",note:""});
  const[viewingReceipt,setViewingReceipt]=useState(null); // {payment, student}
  const[expandedStudent,setExpandedStudent]=useState(null);
  const[showOneTime,setShowOneTime]=useState(false);
  const[otf,setOtf]=useState({studentId:"",type:"admission",amount:"",date:todayStr(),note:""});
  const[confirmDelOT,setConfirmDelOT]=useState(null);
  const[remindTarget,setRemindTarget]=useState(null); // single student row being reminded, or "bulk"
  const[remindMsg,setRemindMsg]=useState("");
  const[remindDueDate,setRemindDueDate]=useState("");
  const[remindLateFee,setRemindLateFee]=useState("100");
  const sotf=(k,v)=>setOtf(f=>({...f,[k]:v}));
  const spf=(k,v)=>setPf(f=>({...f,[k]:v}));
  useEffect(()=>{if(initAct==="pay")setShowPay(true);},[initAct]);
  const active=students.filter(s=>!s.archived);
  const monthOpts=[];
  for(let i=0;i<6;i++){const d=new Date();d.setMonth(d.getMonth()-i);const k=mkKey(d.getFullYear(),d.getMonth()+1);monthOpts.push({v:k,l:monthFull(k)});}
  const rows=active.map(s=>{
    const{currentDue,carryForward,total,curPaid,breakdown,fee}=calcOutstanding(s.id,mk,students,payments);
    const sh=shifts.find(x=>x.id===s.shiftId);
    const status=total===0?"Paid":curPaid>0?"Partially Paid":"Pending";
    const studentPayments=payments.filter(p=>p.studentId===s.id&&p.monthKey===mk).sort((a,b)=>new Date(b.date)-new Date(a.date));
    return{...s,currentDue,carryForward,total,curPaid,breakdown,fee,shiftName:sh?.name||"—",status,studentPayments};
  }).filter(r=>filter==="all"||r.status.toLowerCase().replace(" ","_")===filter||r.status.toLowerCase()===filter||
    (filter==="paid"&&r.status==="Paid")||(filter==="pending"&&r.status==="Pending")||(filter==="partial"&&r.status==="Partially Paid"));
  const totExp=active.reduce((a,s)=>a+effectiveFee(s),0);
  const totPaid=payments.filter(p=>p.monthKey===mk).reduce((a,p)=>a+p.amount,0);
  const selStudent=students.find(s=>s.id===selSid);
  const selOut=selSid?calcOutstanding(selSid,mk,students,payments):null;
  const submitPay=()=>{
    if(!selSid) return toast.error("Please select a student");
    if(!pf.amount||+pf.amount<=0) return toast.error("Please enter a valid amount");
    const newPayment={id:uid(),studentId:selSid,monthKey:mk,amount:+pf.amount,date:pf.date,method:pf.method,note:pf.note,created:Date.now(),receiptNo:genReceiptNo(payments)};
    setPayments(ps=>[...ps,newPayment]);
    toast.success(`${settings.currency}${(+pf.amount).toLocaleString("en-IN")} recorded for ${selStudent?.name}`,"Payment Saved ✓");
    setShowPay(false);setPf({amount:"",date:todayStr(),method:"Cash",note:""});setSelSid("");
    // Offer receipt immediately
    setTimeout(()=>setViewingReceipt({payment:newPayment,student:students.find(s=>s.id===selSid)}),400);
  };

  // One-time fee logic
  const submitOneTime=()=>{
    if(!otf.studentId) return toast.error("Please select a student");
    if(!otf.amount||+otf.amount<=0) return toast.error("Please enter a valid amount");
    setOneTimeFees(fs=>[...fs,{id:uid(),...otf,amount:+otf.amount,created:Date.now()}]);
    const st=students.find(s=>s.id===otf.studentId);
    toast.success(`${settings.currency}${otf.amount} ${oneTimeInfo(otf.type).l} recorded for ${st?.name}`,"Added!");
    setOtf({studentId:"",type:"admission",amount:"",date:todayStr(),note:""});
    setShowOneTime(false);
  };
  const delOneTime=id=>{setOneTimeFees(fs=>fs.filter(f=>f.id!==id));setConfirmDelOT(null);toast.info("Removed");};
  const sortedOneTime=[...oneTimeFees].sort((a,b)=>new Date(b.date)-new Date(a.date));
  const totalOneTime=oneTimeFees.reduce((a,f)=>a+f.amount,0);
  const oneTimeByType=ONE_TIME_FEE_TYPES.map(t=>({...t,total:oneTimeFees.filter(f=>f.type===t.v).reduce((a,f)=>a+f.amount,0)})).filter(t=>t.total>0);

  // ── Fee Reminders ──
  const buildRemindMsg=(amt,due,fee)=>{
    const feeLine=(+fee>0)?` If unpaid by then, a late fee of ${settings.currency}${fee} will apply.`:"";
    return amt!=null
      ?`Your fee for ${monthFull(mk)} is pending. Total due: ${settings.currency}${amt.toLocaleString("en-IN")}. Please clear it by ${fmtDateNice(due)}.${feeLine}`
      :`Your fee for ${monthFull(mk)} is pending. Please clear it by ${fmtDateNice(due)}.${feeLine}`;
  };
  const openRemind=r=>{
    const due=addDaysStr(5);
    setRemindTarget(r);setRemindDueDate(due);setRemindLateFee("100");
    setRemindMsg(buildRemindMsg(r.total,due,"100"));
  };
  const openBulkRemind=()=>{
    const due=rows.filter(r=>r.total>0);
    if(due.length===0)return toast.info("No students have a pending fee this month");
    const d=addDaysStr(5);
    setRemindTarget("bulk");setRemindDueDate(d);setRemindLateFee("100");
    setRemindMsg(buildRemindMsg(null,d,"100"));
  };
  const onRemindDueDateChange=v=>{setRemindDueDate(v);setRemindMsg(buildRemindMsg(remindTarget==="bulk"?null:remindTarget.total,v,remindLateFee));};
  const onRemindLateFeeChange=v=>{setRemindLateFee(v);setRemindMsg(buildRemindMsg(remindTarget==="bulk"?null:remindTarget.total,remindDueDate,v));};
  const sendReminder=()=>{
    if(!remindMsg.trim())return toast.error("Please write a reminder message");
    if(!remindDueDate)return toast.error("Please pick a due date");
    const targets=remindTarget==="bulk"?rows.filter(r=>r.total>0):[remindTarget];
    if(targets.length===0)return toast.error("No students with pending fees");
    const now=Date.now();
    const lateFeeNum=Math.max(0,+remindLateFee||0);
    const newR=targets.map((r,i)=>({id:uid(),studentId:r.id,monthKey:mk,amount:r.total,message:remindMsg.trim(),dueDate:remindDueDate,lateFee:lateFeeNum,createdAt:now+i,sentBy:"admin",senderName:settings.institute||"Admin",read:false}));
    setFeeReminders(list=>[...newR,...(list||[])]);
    toast.success(`Reminder sent to ${targets.length} student${targets.length!==1?"s":""}`,"Reminder Sent!");
    setRemindTarget(null);setRemindMsg("");
  };

  return(
    <div>
      <PageHeader title="Fees" right={feeTab==="monthly"?(
        <div style={{display:"flex",gap:6}}>
          <Btn onClick={openBulkRemind} sm outline c="#f59e0b"><I n="bell" s={13}/> Remind</Btn>
          <Btn onClick={()=>setShowPay(true)} sm><I n="plus" s={14}/> Payment</Btn>
        </div>
      ):<Btn onClick={()=>setShowOneTime(true)} sm c="#f59e0b"><I n="plus" s={14}/> Add</Btn>}/>
      <div style={{padding:"0 16px 24px"}}>

        {/* Tab Switch */}
        <div style={{display:"flex",gap:6,background:"#f1f5f9",borderRadius:13,padding:4,marginBottom:14}}>
          <button onClick={()=>setFeeTab("monthly")} style={{flex:1,borderRadius:10,padding:"9px 4px",fontSize:12,fontWeight:800,border:"none",background:feeTab==="monthly"?"#fff":"transparent",color:feeTab==="monthly"?"#1e3a8a":"#94a3b8",cursor:"pointer",fontFamily:"inherit",boxShadow:feeTab==="monthly"?"0 1px 4px rgba(0,0,0,.08)":"none"}}>Monthly Fees</button>
          {isFeatureOn(settings,"oneTimeFees")&&<button onClick={()=>setFeeTab("onetime")} style={{flex:1,borderRadius:10,padding:"9px 4px",fontSize:12,fontWeight:800,border:"none",background:feeTab==="onetime"?"#fff":"transparent",color:feeTab==="onetime"?"#f59e0b":"#94a3b8",cursor:"pointer",fontFamily:"inherit",boxShadow:feeTab==="onetime"?"0 1px 4px rgba(0,0,0,.08)":"none"}}>One-Time Fees</button>}
        </div>

        {feeTab==="onetime"?(
          <>
            {/* One-time fee summary */}
            <div style={{background:"linear-gradient(135deg,#92400e,#f59e0b)",borderRadius:18,padding:"16px 20px",marginBottom:14,color:"#fff"}}>
              <div style={{fontSize:11,fontWeight:700,opacity:.8,textTransform:"uppercase",letterSpacing:.7,marginBottom:6}}>Total One-Time Fees Collected</div>
              <div style={{fontSize:28,fontWeight:900,letterSpacing:-1}}>{settings.currency}{totalOneTime.toLocaleString("en-IN")}</div>
            </div>

            {/* By type breakdown */}
            {oneTimeByType.length>0&&<div style={{background:"var(--card)",borderRadius:16,padding:"16px",border:"1.5px solid var(--cardBorder)",marginBottom:14}}>
              <div style={{fontWeight:800,fontSize:13,color:"var(--text)",marginBottom:12,textTransform:"uppercase",letterSpacing:.5}}>By Fee Type</div>
              {oneTimeByType.map(t=>(
                <div key={t.v} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"8px 0",borderBottom:"1px solid var(--cardBorder)"}}>
                  <div style={{display:"flex",alignItems:"center",gap:8}}><I n={t.icon} s={14} c={t.c}/><span style={{fontSize:13,color:"var(--textMuted)",fontWeight:600}}>{t.l}</span></div>
                  <span style={{fontSize:13,fontWeight:800,color:"var(--text)"}}>{settings.currency}{t.total.toLocaleString("en-IN")}</span>
                </div>
              ))}
            </div>}

            {/* List */}
            <div style={{fontWeight:800,fontSize:12,color:"var(--textMuted)",textTransform:"uppercase",letterSpacing:.7,marginBottom:10}}>All Records</div>
            {sortedOneTime.length===0&&<div style={{textAlign:"center",padding:"40px 0",color:"var(--textFaint)"}}><div style={{fontSize:36,marginBottom:10}}>🧾</div><div style={{fontSize:14}}>No one-time fees recorded yet</div></div>}
            {sortedOneTime.map(f=>{
              const st=students.find(s=>s.id===f.studentId);
              const info=oneTimeInfo(f.type);
              return(
                <div key={f.id} style={{background:"var(--card)",borderRadius:14,padding:"12px 14px",marginBottom:8,border:"1.5px solid var(--cardBorder)",display:"flex",alignItems:"center",gap:12}}>
                  <div style={{background:info.c+"18",borderRadius:11,padding:9,flexShrink:0}}><I n={info.icon} s={16} c={info.c}/></div>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{fontSize:13,fontWeight:700,color:"var(--text)"}}>{st?.name||"Unknown"} — {info.l}</div>
                    <div style={{fontSize:11,color:"var(--textFaint)"}}>{fmtDate(f.date)}{f.note?` · ${f.note}`:""}</div>
                  </div>
                  <div style={{fontSize:14,fontWeight:800,color:"#10b981"}}>+{settings.currency}{f.amount.toLocaleString("en-IN")}</div>
                  <button onClick={()=>setConfirmDelOT(f.id)} style={{background:"none",border:"none",cursor:"pointer",padding:4}}><I n="x" s={14} c="var(--textFaint)"/></button>
                </div>
              );
            })}
          </>
        ):(
        <>
        <select value={mk} onChange={e=>setMk(e.target.value)} style={{width:"100%",padding:"11px 13px",border:"1.5px solid #e2e8f0",borderRadius:12,fontSize:14,color:"#0f0a2e",background:"#fff",outline:"none",marginBottom:12,fontWeight:800,fontFamily:"inherit"}}>
          {monthOpts.map(o=><option key={o.v} value={o.v}>{o.l}</option>)}
        </select>
        <div style={{background:"linear-gradient(135deg,#0d1b42,#1e3a8a)",borderRadius:18,padding:"16px 20px",marginBottom:12,color:"#fff",display:"flex",justifyContent:"space-around"}}>
          <div style={{textAlign:"center"}}><div style={{fontSize:10,opacity:.7,fontWeight:700,textTransform:"uppercase"}}>Expected</div><div style={{fontSize:18,fontWeight:900}}>{settings.currency}{totExp.toLocaleString("en-IN")}</div></div>
          <div style={{width:1,background:"rgba(255,255,255,.15)"}}/>
          <div style={{textAlign:"center"}}><div style={{fontSize:10,opacity:.7,fontWeight:700,textTransform:"uppercase"}}>Received</div><div style={{fontSize:18,fontWeight:900,color:"#86efac"}}>{settings.currency}{totPaid.toLocaleString("en-IN")}</div></div>
          <div style={{width:1,background:"rgba(255,255,255,.15)"}}/>
          <div style={{textAlign:"center"}}><div style={{fontSize:10,opacity:.7,fontWeight:700,textTransform:"uppercase"}}>Pending</div><div style={{fontSize:18,fontWeight:900,color:"#fca5a5"}}>{settings.currency}{Math.max(0,totExp-totPaid).toLocaleString("en-IN")}</div></div>
        </div>
        <div style={{display:"flex",gap:8,marginBottom:14,overflowX:"auto",paddingBottom:4}}>
          {[["all","All"],["paid","Paid"],["partial","Partial"],["pending","Pending"]].map(([v,l])=><Chip key={v} label={l} active={filter===v} onClick={()=>setFilter(v)}/>)}
        </div>
        {active.length===0&&<div style={{textAlign:"center",padding:"50px 20px",color:"#94a3b8"}}><div style={{fontSize:36,marginBottom:10}}>💰</div><div style={{fontSize:14}}>Add students first</div></div>}
        {rows.map(r=>(
          <div key={r.id} style={{background:"#fff",borderRadius:16,padding:"14px 16px",marginBottom:12,border:`1.5px solid ${r.total>0?"#fecaca":"#dcfce7"}`,boxShadow:"0 2px 8px rgba(0,0,0,.04)"}}>
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:10}}>
              <div style={{display:"flex",alignItems:"center",gap:10}}><Avatar name={r.name} size={38}/><div><div style={{fontWeight:800,color:"#0f0a2e",fontSize:14,display:"flex",alignItems:"center",gap:6}}>{r.name}{r.discount?.value>0&&<span style={{background:"#dcfce7",color:"#166534",borderRadius:6,padding:"1px 7px",fontSize:9,fontWeight:800}}>DISCOUNT</span>}</div><div style={{fontSize:11,color:"#94a3b8"}}>{r.shiftName} · {settings.currency}{r.fee}/mo{r.discount?.value>0?<span style={{textDecoration:"line-through",marginLeft:4,opacity:.6}}>{settings.currency}{r.monthlyFee}</span>:""}</div></div></div>
              <Badge s={r.status}/>
            </div>
            <div style={{display:"flex",justifyContent:"space-between",fontSize:13,marginBottom:6}}>
              <span style={{color:"#64748b"}}>Paid: <b style={{color:"#10b981"}}>{settings.currency}{r.curPaid}</b></span>
              <span style={{color:"#64748b"}}>Due: <b style={{color:"#ef4444"}}>{settings.currency}{r.currentDue}</b></span>
            </div>
            {r.carryForward>0&&<div style={{marginTop:4}}><CarryBreakdown breakdown={r.breakdown} currency={settings.currency}/></div>}
            {r.studentPayments.length>0&&(
              <div style={{marginTop:8}}>
                <button onClick={()=>setExpandedStudent(expandedStudent===r.id?null:r.id)} style={{width:"100%",background:"none",border:"none",padding:"6px 0",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:6,fontSize:11,fontWeight:700,color:"#1e3a8a",fontFamily:"inherit"}}>
                  <I n="receipt" s={13} c="#1e3a8a"/> {expandedStudent===r.id?"Hide":"View"} Receipts ({r.studentPayments.length})
                </button>
                {expandedStudent===r.id&&(
                  <div style={{background:"#f8faff",borderRadius:11,padding:"8px",marginTop:4}}>
                    {r.studentPayments.map(p=>(
                      <div key={p.id} onClick={()=>setViewingReceipt({payment:p,student:r})} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"8px 10px",background:"#fff",borderRadius:9,marginBottom:6,cursor:"pointer",border:"1px solid #eef2ff"}}>
                        <div>
                          <div style={{fontSize:12,fontWeight:700,color:"#0f0a2e"}}>{settings.currency}{p.amount.toLocaleString("en-IN")}</div>
                          <div style={{fontSize:10,color:"#94a3b8"}}>{fmtDate(p.date)} · {p.method}</div>
                        </div>
                        <div style={{display:"flex",alignItems:"center",gap:6}}>
                          <span style={{fontSize:10,color:"#1e3a8a",fontWeight:700}}>#{p.receiptNo||"—"}</span>
                          <I n="receipt" s={14} c="#1e3a8a"/>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
            {r.total>0&&<div style={{display:"flex",justifyContent:"space-between",alignItems:"center",paddingTop:10,borderTop:"1px solid #f1f5f9",marginTop:4}}>
              <span style={{fontSize:14,fontWeight:800,color:"#dc2626"}}>Total Due: {settings.currency}{r.total}</span>
              <div style={{display:"flex",gap:6}}>
                <button onClick={()=>openRemind(r)} style={{background:"#fef3c7",border:"none",borderRadius:9,padding:"7px 12px",fontSize:12,fontWeight:800,color:"#92400e",cursor:"pointer",fontFamily:"inherit",display:"flex",alignItems:"center",gap:5}}><I n="bell" s={13} c="#92400e"/> Remind</button>
                <button onClick={()=>{setSelSid(r.id);setShowPay(true);}} style={{background:"#1e3a8a",border:"none",borderRadius:9,padding:"7px 16px",fontSize:12,fontWeight:800,color:"#fff",cursor:"pointer",fontFamily:"inherit"}}>+ Pay</button>
              </div>
            </div>}
          </div>
        ))}
        </>
        )}
      </div>
      {viewingReceipt&&<PaymentReceipt store={store} payment={viewingReceipt.payment} student={viewingReceipt.student} onClose={()=>setViewingReceipt(null)} toast={toast}/>}
      {showPay&&(
        <Sheet title="Record Payment" onClose={()=>{setShowPay(false);setSelSid("");}}>
          <Sel label="Select Student" value={selSid} onChange={setSelSid} options={[{v:"",l:"Choose a student..."},...active.map(s=>({v:s.id,l:s.name}))]} req/>
          {selSid&&selOut&&<div style={{background:selOut.total>0?"#fef2f2":"#f0fdf4",borderRadius:12,padding:"12px 14px",marginBottom:14,border:`1.5px solid ${selOut.total>0?"#fecaca":"#bbf7d0"}`}}>
            <div style={{fontSize:13,fontWeight:800,color:selOut.total>0?"#991b1b":"#166534",marginBottom:4}}>{selStudent?.name} — {monthFull(mk)}</div>
            <div style={{fontSize:12,color:"#64748b"}}>Monthly fee: {settings.currency}{selOut.fee} · Paid: {settings.currency}{selOut.curPaid}</div>
            {selOut.carryForward>0&&<div style={{fontSize:12,color:"#ea580c",fontWeight:700,marginTop:4}}>Previous unpaid: {settings.currency}{selOut.carryForward}</div>}
            <div style={{fontSize:14,fontWeight:900,color:"#dc2626",marginTop:6}}>Total outstanding: {settings.currency}{selOut.total}</div>
          </div>}
          <Inp label="Amount (₹)" value={pf.amount} onChange={v=>spf("amount",v)} type="number" req placeholder="Enter payment amount"/>
          <Inp label="Payment Date" value={pf.date} onChange={v=>spf("date",v)} type="date"/>
          <Sel label="Payment Method" value={pf.method} onChange={v=>spf("method",v)} options={["Cash","UPI","Bank Transfer","Cheque","Other"].map(m=>({v:m,l:m}))}/>
          <Inp label="Note (optional)" value={pf.note} onChange={v=>spf("note",v)} placeholder="Any additional notes..."/>
          <div style={{display:"flex",gap:10,marginTop:8}}><Btn onClick={()=>{setShowPay(false);setSelSid("");}} outline c="#64748b" full>Cancel</Btn><Btn onClick={submitPay} full>Save Payment</Btn></div>
        </Sheet>
      )}
      {showOneTime&&(
        <Sheet title="Add One-Time Fee" onClose={()=>{setShowOneTime(false);setOtf({studentId:"",type:"admission",amount:"",date:todayStr(),note:""});}}>
          <Sel label="Student" value={otf.studentId} onChange={v=>sotf("studentId",v)} req options={[{v:"",l:"Select student..."},...active.map(s=>({v:s.id,l:s.name}))]}/>
          <div style={{marginBottom:14}}>
            <label style={{display:"block",fontSize:11,fontWeight:700,color:"var(--textMuted)",marginBottom:8,textTransform:"uppercase",letterSpacing:.6}}>Fee Type</label>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
              {ONE_TIME_FEE_TYPES.map(t=>(
                <button key={t.v} onClick={()=>sotf("type",t.v)} style={{display:"flex",alignItems:"center",gap:8,padding:"10px 12px",borderRadius:11,border:`2px solid ${otf.type===t.v?t.c:"var(--cardBorder)"}`,background:otf.type===t.v?t.c+"15":"var(--inputBg)",cursor:"pointer",fontFamily:"inherit"}}>
                  <I n={t.icon} s={14} c={t.c}/>
                  <span style={{fontSize:11,fontWeight:700,color:otf.type===t.v?t.c:"var(--textMuted)"}}>{t.l}</span>
                </button>
              ))}
            </div>
          </div>
          <Inp label="Amount (₹)" value={otf.amount} onChange={v=>sotf("amount",v)} type="number" req placeholder="Enter amount"/>
          <Inp label="Date" value={otf.date} onChange={v=>sotf("date",v)} type="date"/>
          <Inp label="Note (optional)" value={otf.note} onChange={v=>sotf("note",v)} placeholder="Any additional notes..."/>
          <div style={{display:"flex",gap:10,marginTop:8}}>
            <Btn onClick={()=>{setShowOneTime(false);setOtf({studentId:"",type:"admission",amount:"",date:todayStr(),note:""});}} outline c="#64748b" full>Cancel</Btn>
            <Btn onClick={submitOneTime} c="#f59e0b" full>Save</Btn>
          </div>
        </Sheet>
      )}
      {remindTarget&&(
        <Sheet title={remindTarget==="bulk"?"Remind All Due Students":`Remind ${remindTarget.name}`} onClose={()=>{setRemindTarget(null);setRemindMsg("");}}>
          <div style={{background:"#fffbeb",border:"1.5px solid #fde68a",borderRadius:14,padding:"12px 14px",marginBottom:16,fontSize:12,color:"#92400e",fontWeight:600,lineHeight:1.5}}>
            {remindTarget==="bulk"
              ?`This will send a fee reminder to every student with a pending due for ${monthFull(mk)} (${rows.filter(r=>r.total>0).length} student${rows.filter(r=>r.total>0).length!==1?"s":""}). It will appear on their Student Portal.`
              :`Send a fee reminder to ${remindTarget.name}. It will appear on their Student Portal.`}
          </div>
          {remindTarget!=="bulk"&&<div style={{background:"#fef2f2",borderRadius:12,padding:"10px 14px",marginBottom:14,border:"1.5px solid #fecaca",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <span style={{fontSize:12,color:"#991b1b",fontWeight:700}}>Amount Due</span>
            <span style={{fontSize:15,fontWeight:900,color:"#dc2626"}}>{settings.currency}{remindTarget.total.toLocaleString("en-IN")}</span>
          </div>}
          <div style={{display:"flex",gap:10,marginBottom:14}}>
            <div style={{flex:1}}>
              <label style={{display:"block",fontSize:11,fontWeight:700,color:"var(--textMuted)",marginBottom:6,textTransform:"uppercase",letterSpacing:.5}}>Due Date</label>
              <input type="date" value={remindDueDate} onChange={e=>onRemindDueDateChange(e.target.value)} style={{width:"100%",padding:"11px 13px",border:"1.5px solid var(--cardBorder)",borderRadius:12,fontSize:13,color:"var(--text)",background:"var(--inputBg)",outline:"none",fontFamily:"inherit",boxSizing:"border-box"}}/>
            </div>
            <div style={{flex:1}}>
              <label style={{display:"block",fontSize:11,fontWeight:700,color:"var(--textMuted)",marginBottom:6,textTransform:"uppercase",letterSpacing:.5}}>Late Fee ({settings.currency})</label>
              <input type="number" min="0" value={remindLateFee} onChange={e=>onRemindLateFeeChange(e.target.value)} placeholder="100" style={{width:"100%",padding:"11px 13px",border:"1.5px solid var(--cardBorder)",borderRadius:12,fontSize:13,color:"var(--text)",background:"var(--inputBg)",outline:"none",fontFamily:"inherit",boxSizing:"border-box"}}/>
            </div>
          </div>
          <div style={{marginBottom:14}}>
            <label style={{display:"block",fontSize:11,fontWeight:700,color:"var(--textMuted)",marginBottom:6,textTransform:"uppercase",letterSpacing:.5}}>Message</label>
            <textarea value={remindMsg} onChange={e=>setRemindMsg(e.target.value)} rows={4} placeholder="Write the reminder message..." style={{width:"100%",padding:"11px 13px",border:"1.5px solid var(--cardBorder)",borderRadius:12,fontSize:14,color:"var(--text)",background:"var(--inputBg)",outline:"none",fontFamily:"inherit",resize:"vertical",boxSizing:"border-box"}}/>
          </div>
          <div style={{display:"flex",gap:10}}>
            <Btn onClick={()=>{setRemindTarget(null);setRemindMsg("");}} outline c="#64748b" full>Cancel</Btn>
            <Btn onClick={sendReminder} c="#f59e0b" full>Send Reminder</Btn>
          </div>
        </Sheet>
      )}
      {confirmDelOT&&<Confirm msg="Delete this fee record?" onYes={()=>delOneTime(confirmDelOT)} onNo={()=>setConfirmDelOT(null)} yesLabel="Delete"/>}
    </div>
  );
};

// ══════════════════════════════════════════════════════════════
// LEAVE REQUESTS — students apply, admin/teacher accept or reject
// ══════════════════════════════════════════════════════════════
// ── Admin/Teacher: review timetable-change reports from students ──
const TimetableRequestsManager=({store,toast,onBack,currentTeacher,onEditBatch})=>{
  const{timetableRequests,setTimetableRequests,students,shifts}=store;
  const isLimited=currentTeacher&&currentTeacher.role==="teacher";
  const scopedIds=isLimited&&currentTeacher.allowedShiftIds?.length?currentTeacher.allowedShiftIds:null;
  const scopedStudentIds=new Set(scopedIds?students.filter(s=>getShiftIds(s).some(id=>scopedIds.includes(id))).map(s=>s.id):students.map(s=>s.id));
  const[filter,setFilter]=useState("pending");
  const[respondingId,setRespondingId]=useState(null);
  const[responseText,setResponseText]=useState("");

  const allRequests=(timetableRequests||[]).filter(r=>scopedStudentIds.has(r.studentId)).sort((a,b)=>b.createdAt-a.createdAt);
  const pendingCount=allRequests.filter(r=>r.status==="pending").length;
  const shown=filter==="pending"?allRequests.filter(r=>r.status==="pending"):allRequests;

  const resolve=(req)=>{
    setTimetableRequests(list=>list.map(r=>r.id===req.id?{...r,status:"resolved",response:responseText.trim()||"Reviewed",respondedBy:currentTeacher?.name||"Admin",respondedAt:Date.now()}:r));
    toast.success("Marked as resolved and reply sent to student","Resolved");
    setRespondingId(null);setResponseText("");
  };

  return(
    <div>
      <PageHeader title="Timetable Reports" onBack={onBack}/>
      <div style={{padding:"0 16px 24px"}}>
        <div style={{display:"flex",gap:6,background:"var(--card)",borderRadius:13,padding:4,marginBottom:16,border:"1px solid var(--cardBorder)"}}>
          <button onClick={()=>setFilter("pending")} style={{flex:1,borderRadius:10,padding:"9px 4px",fontSize:12,fontWeight:800,border:"none",background:filter==="pending"?"#f59e0b":"transparent",color:filter==="pending"?"#fff":"var(--textFaint)",cursor:"pointer",fontFamily:"inherit"}}>Pending ({pendingCount})</button>
          <button onClick={()=>setFilter("all")} style={{flex:1,borderRadius:10,padding:"9px 4px",fontSize:12,fontWeight:800,border:"none",background:filter==="all"?"#f59e0b":"transparent",color:filter==="all"?"#fff":"var(--textFaint)",cursor:"pointer",fontFamily:"inherit"}}>All</button>
        </div>
        {shown.length===0&&<div style={{textAlign:"center",padding:"40px 0",color:"var(--textFaint)",fontSize:13}}>{filter==="pending"?"No pending reports 🎉":"No timetable reports yet"}</div>}
        {shown.map(req=>{
          const stu=students.find(s=>s.id===req.studentId);
          const sh=shifts.find(x=>x.id===req.shiftId);
          if(!stu)return null;
          return(
            <div key={req.id} style={{background:"var(--card)",border:"1.5px solid var(--cardBorder)",borderRadius:16,padding:"14px 16px",marginBottom:12}}>
              <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:10}}>
                <Avatar name={stu.name} size={38}/>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{fontWeight:800,fontSize:14,color:"var(--text)"}}>{stu.name}</div>
                  <div style={{fontSize:11,color:"var(--textFaint)"}}>{sh?.name||"General"} · {fmtDate(new Date(req.createdAt).toISOString().split("T")[0])}</div>
                </div>
                {req.status==="pending"?<span style={{fontSize:10,fontWeight:800,color:"#92400e",background:"#fef9c3",borderRadius:20,padding:"3px 10px",flexShrink:0}}>PENDING</span>:<span style={{fontSize:10,fontWeight:800,color:"#166534",background:"#dcfce7",borderRadius:20,padding:"3px 10px",flexShrink:0}}>RESOLVED</span>}
              </div>
              <div style={{fontSize:13,color:"var(--textMuted)",lineHeight:1.5,marginBottom:10,background:"var(--inputBg)",borderRadius:10,padding:"10px 12px"}}>{req.message}</div>
              {req.response&&<div style={{fontSize:11,color:"#166534",marginBottom:10,background:"#f0fdf4",borderRadius:8,padding:"7px 10px"}}>Your reply: {req.response}</div>}
              {req.status==="pending"&&(respondingId===req.id?(
                <div>
                  <textarea value={responseText} onChange={e=>setResponseText(e.target.value)} rows={2} placeholder="Optional note back to the student..." style={{width:"100%",padding:"9px 11px",border:"1.5px solid var(--cardBorder)",borderRadius:10,fontSize:12,color:"var(--text)",background:"var(--inputBg)",outline:"none",fontFamily:"inherit",resize:"vertical",boxSizing:"border-box",marginBottom:8}}/>
                  <div style={{display:"flex",gap:8}}>
                    <Btn onClick={()=>{setRespondingId(null);setResponseText("");}} outline c="#64748b" full>Cancel</Btn>
                    <Btn onClick={()=>resolve(req)} c="#10b981" full>Mark Resolved</Btn>
                  </div>
                </div>
              ):(
                <div style={{display:"flex",gap:8}}>
                  {sh&&onEditBatch&&<Btn onClick={()=>onEditBatch(sh.id)} outline c="#1e3a8a" full>Edit Batch</Btn>}
                  <Btn onClick={()=>{setRespondingId(req.id);setResponseText("");}} c="#10b981" full>Resolve</Btn>
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const LeaveRequestsManager=({store,toast,onBack,currentTeacher})=>{
  const{leaveRequests,setLeaveRequests,students,setAttend,setAttendLog,settings}=store;
  const isLimited=currentTeacher&&currentTeacher.role==="teacher";
  const scopedIds=isLimited&&currentTeacher.allowedShiftIds?.length?currentTeacher.allowedShiftIds:null;
  const[filter,setFilter]=useState("pending"); // pending | all

  const scopedStudentIds=new Set(
    scopedIds?students.filter(s=>getShiftIds(s).some(id=>scopedIds.includes(id))).map(s=>s.id):students.map(s=>s.id)
  );
  const allRequests=(leaveRequests||[]).filter(lr=>scopedStudentIds.has(lr.studentId)).sort((a,b)=>new Date(b.createdAt)-new Date(a.createdAt));
  const pendingCount=allRequests.filter(r=>r.status==="pending").length;
  const shown=filter==="pending"?allRequests.filter(r=>r.status==="pending"):allRequests;

  const dateRange=(from,to)=>{
    const out=[];
    let d=new Date(from+"T00:00:00");
    const end=new Date(to+"T00:00:00");
    while(d<=end){out.push(d.toISOString().split("T")[0]);d.setDate(d.getDate()+1);}
    return out;
  };
  const respond=(req,status)=>{
    const approverName=currentTeacher?.name||settings?.institute&&`${settings.institute} Admin`||"Admin";
    setLeaveRequests(lr=>lr.map(r=>r.id===req.id?{...r,status,respondedAt:new Date().toISOString(),respondedBy:approverName}:r));
    if(status==="approved"){
      const dates=dateRange(req.fromDate||req.date,req.toDate||req.date);
      setAttend(a=>{
        const next={...a};
        dates.forEach(d=>{next[`${req.studentId}-${d}`]="leave";});
        return next;
      });
      const now=Date.now();
      setAttendLog(list=>[...(list||[]),...dates.map(d=>({id:uid(),studentId:req.studentId,date:d,status:"leave",markedBy:currentTeacher?.id||"admin",markedByName:approverName,markedAt:now,viaLeaveApproval:true}))]);
    }
    toast[status==="approved"?"success":"info"](status==="approved"?"Leave approved — those days won't count as absent":"Leave request rejected", status==="approved"?"Approved":"Rejected");
  };

  return(
    <div>
      <PageHeader title="Leave Requests" onBack={onBack}/>
      <div style={{padding:"0 16px 24px"}}>
        <div style={{display:"flex",gap:6,background:"var(--card)",borderRadius:13,padding:4,marginBottom:16,border:"1px solid var(--cardBorder)"}}>
          <button onClick={()=>setFilter("pending")} style={{flex:1,borderRadius:10,padding:"9px 4px",fontSize:12,fontWeight:800,border:"none",background:filter==="pending"?"#1e3a8a":"transparent",color:filter==="pending"?"#fff":"var(--textFaint)",cursor:"pointer",fontFamily:"inherit"}}>Pending ({pendingCount})</button>
          <button onClick={()=>setFilter("all")} style={{flex:1,borderRadius:10,padding:"9px 4px",fontSize:12,fontWeight:800,border:"none",background:filter==="all"?"#1e3a8a":"transparent",color:filter==="all"?"#fff":"var(--textFaint)",cursor:"pointer",fontFamily:"inherit"}}>All</button>
        </div>

        {shown.length===0&&<div style={{textAlign:"center",padding:"40px 0",color:"var(--textFaint)",fontSize:13}}>{filter==="pending"?"No pending leave requests":"No leave requests yet"}</div>}

        {shown.map(req=>{
          const stu=students.find(s=>s.id===req.studentId);
          if(!stu)return null;
          return(
            <div key={req.id} style={{background:"var(--card)",border:"1.5px solid var(--cardBorder)",borderRadius:16,padding:"14px 16px",marginBottom:12}}>
              <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:10}}>
                <Avatar name={stu.name} size={38}/>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{fontWeight:800,fontSize:14,color:"var(--text)"}}>{stu.name}</div>
                  <div style={{fontSize:11,color:"var(--textFaint)"}}>{req.toDate&&req.toDate!==(req.fromDate||req.date)?`${fmtDate(req.fromDate||req.date)} – ${fmtDate(req.toDate)} (${dateRange(req.fromDate||req.date,req.toDate).length} days)`:fmtDate(req.fromDate||req.date)}</div>
                </div>
                {req.status==="pending"&&<span style={{fontSize:10,fontWeight:800,color:"#92400e",background:"#fef9c3",borderRadius:20,padding:"3px 10px",flexShrink:0}}>PENDING</span>}
                {req.status==="approved"&&<span style={{fontSize:10,fontWeight:800,color:"#166534",background:"#dcfce7",borderRadius:20,padding:"3px 10px",flexShrink:0}}>APPROVED</span>}
                {req.status==="rejected"&&<span style={{fontSize:10,fontWeight:800,color:"#991b1b",background:"#fee2e2",borderRadius:20,padding:"3px 10px",flexShrink:0}}>REJECTED</span>}
              </div>
              <div style={{fontSize:13,color:"var(--textMuted)",lineHeight:1.5,marginBottom:10,background:"var(--inputBg)",borderRadius:10,padding:"10px 12px"}}>{req.reason}</div>
              {req.status!=="pending"&&req.respondedBy&&<div style={{fontSize:11,color:"var(--textFaint)",marginBottom:4}}>{req.status==="approved"?"Approved":"Rejected"} by {req.respondedBy}</div>}
              {req.status==="pending"&&(
                <div style={{display:"flex",gap:10}}>
                  <Btn onClick={()=>respond(req,"rejected")} outline c="#ef4444" full>Reject</Btn>
                  <Btn onClick={()=>respond(req,"approved")} c="#10b981" full>Accept</Btn>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ══════════════════════════════════════════════════════════════
// MESSAGES — student ↔ teacher/admin doubt chat, one thread per student
// ══════════════════════════════════════════════════════════════
const MessagesThread=({store,student,role,authorName,onBack,title,placeholder})=>{
  const{messages,setMessages}=store;
  const[text,setText]=useState("");
  const endRef=useRef(null);
  const myMsgs=(messages||[]).filter(m=>m.studentId===student.id).sort((a,b)=>a.createdAt-b.createdAt);

  useEffect(()=>{
    setMessages(list=>{
      const l=list||[];
      if(!l.some(m=>m.studentId===student.id&&m.from!==role&&!m.read))return l;
      return l.map(m=>m.studentId===student.id&&m.from!==role&&!m.read?{...m,read:true}:m);
    });
    // eslint-disable-next-line
  },[student.id]);

  useEffect(()=>{endRef.current?.scrollIntoView({behavior:"smooth"});},[myMsgs.length]);

  const send=()=>{
    if(!text.trim())return;
    setMessages(list=>[...(list||[]),{id:uid(),studentId:student.id,from:role,authorName,text:text.trim(),createdAt:Date.now(),read:false}]);
    setText("");
  };

  return(
    <div>
      <PageHeader title={title||(role==="student"?"Ask a Doubt":student.name)} onBack={onBack}/>
      <div style={{padding:"0 16px",display:"flex",flexDirection:"column",height:"calc(var(--app-h,100vh) - 140px)"}}>
        <div style={{flex:1,overflowY:"auto",paddingBottom:12}}>
          {myMsgs.length===0&&<div style={{textAlign:"center",padding:"40px 20px",color:"var(--textFaint)",fontSize:13}}>{role==="student"?"Have a doubt? Type below and your teacher will reply here.":"No messages yet with this student."}</div>}
          {myMsgs.map(m=>{
            const mine=m.from===role;
            return(
              <div key={m.id} style={{display:"flex",justifyContent:mine?"flex-end":"flex-start",marginBottom:8}}>
                <div style={{maxWidth:"75%",background:mine?"linear-gradient(135deg,#1e3a8a,#2563eb)":"var(--card)",color:mine?"#fff":"var(--text)",border:mine?"none":"1.5px solid var(--cardBorder)",borderRadius:mine?"16px 16px 4px 16px":"16px 16px 16px 4px",padding:"9px 13px"}}>
                  {!mine&&<div style={{fontSize:10,fontWeight:800,color:"#3b82f6",marginBottom:2}}>{m.authorName}</div>}
                  <div style={{fontSize:13,lineHeight:1.5,whiteSpace:"pre-wrap",wordBreak:"break-word"}}>{m.text}</div>
                  <div style={{fontSize:9,opacity:.7,marginTop:3,textAlign:"right"}}>{new Date(m.createdAt).toLocaleTimeString("en-IN",{hour:"2-digit",minute:"2-digit"})}</div>
                </div>
              </div>
            );
          })}
          <div ref={endRef}/>
        </div>
        <div style={{display:"flex",gap:8,padding:"10px 0 16px",borderTop:"1px solid var(--cardBorder)"}}>
          <input value={text} onChange={e=>setText(e.target.value)} onKeyDown={e=>{if(e.key==="Enter"){e.preventDefault();send();}}} placeholder={placeholder||(role==="student"?"Type your doubt...":"Type a reply...")} style={{flex:1,padding:"11px 14px",borderRadius:20,border:"1.5px solid var(--cardBorder)",background:"var(--inputBg)",fontSize:13,color:"var(--text)",outline:"none",fontFamily:"inherit",minWidth:0}}/>
          <button onClick={send} disabled={!text.trim()} style={{width:42,height:42,borderRadius:"50%",border:"none",background:text.trim()?"linear-gradient(135deg,#1e3a8a,#2563eb)":"var(--cardBorder)",display:"flex",alignItems:"center",justifyContent:"center",cursor:text.trim()?"pointer":"default",flexShrink:0}}>
            <div style={{transform:"rotate(180deg)",display:"flex"}}><I n="back" s={17} c="#fff"/></div>
          </button>
        </div>
      </div>
    </div>
  );
};

// ── Teacher ↔ Admin direct chat (separate channel from student-staff messages) ──
const TeacherAdminThread=({store,teacher,role,authorName,onBack})=>{
  const{teacherMessages,setTeacherMessages}=store;
  const[text,setText]=useState("");
  const endRef=useRef(null);
  const myMsgs=(teacherMessages||[]).filter(m=>m.teacherId===teacher.id).sort((a,b)=>a.createdAt-b.createdAt);

  useEffect(()=>{
    setTeacherMessages(list=>{
      const l=list||[];
      if(!l.some(m=>m.teacherId===teacher.id&&m.from!==role&&!m.read))return l;
      return l.map(m=>m.teacherId===teacher.id&&m.from!==role&&!m.read?{...m,read:true}:m);
    });
    // eslint-disable-next-line
  },[teacher.id]);

  useEffect(()=>{endRef.current?.scrollIntoView({behavior:"smooth"});},[myMsgs.length]);

  const send=()=>{
    if(!text.trim())return;
    setTeacherMessages(list=>[...(list||[]),{id:uid(),teacherId:teacher.id,from:role,authorName,text:text.trim(),createdAt:Date.now(),read:false}]);
    setText("");
  };

  return(
    <div>
      <PageHeader title={role==="teacher"?"Message Admin":teacher.name} onBack={onBack}/>
      <div style={{padding:"0 16px",display:"flex",flexDirection:"column",height:"calc(var(--app-h,100vh) - 140px)"}}>
        <div style={{flex:1,overflowY:"auto",paddingBottom:12}}>
          {myMsgs.length===0&&<div style={{textAlign:"center",padding:"40px 20px",color:"var(--textFaint)",fontSize:13}}>{role==="teacher"?"Need to ask something or flag something for verification? Type below and admin will reply here.":"No messages yet with this teacher."}</div>}
          {myMsgs.map(m=>{
            const mine=m.from===role;
            return(
              <div key={m.id} style={{display:"flex",justifyContent:mine?"flex-end":"flex-start",marginBottom:8}}>
                <div style={{maxWidth:"75%",background:mine?"linear-gradient(135deg,#1e3a8a,#2563eb)":"var(--card)",color:mine?"#fff":"var(--text)",border:mine?"none":"1.5px solid var(--cardBorder)",borderRadius:mine?"16px 16px 4px 16px":"16px 16px 16px 4px",padding:"9px 13px"}}>
                  {!mine&&<div style={{fontSize:10,fontWeight:800,color:"#3b82f6",marginBottom:2}}>{m.authorName}</div>}
                  <div style={{fontSize:13,lineHeight:1.5,whiteSpace:"pre-wrap",wordBreak:"break-word"}}>{m.text}</div>
                  <div style={{fontSize:9,opacity:.7,marginTop:3,textAlign:"right"}}>{new Date(m.createdAt).toLocaleTimeString("en-IN",{hour:"2-digit",minute:"2-digit"})}</div>
                </div>
              </div>
            );
          })}
          <div ref={endRef}/>
        </div>
        <div style={{display:"flex",gap:8,padding:"10px 0 16px",borderTop:"1px solid var(--cardBorder)"}}>
          <input value={text} onChange={e=>setText(e.target.value)} onKeyDown={e=>{if(e.key==="Enter"){e.preventDefault();send();}}} placeholder={role==="teacher"?"Ask admin something or request verification...":"Type a reply..."} style={{flex:1,padding:"11px 14px",borderRadius:20,border:"1.5px solid var(--cardBorder)",background:"var(--inputBg)",fontSize:13,color:"var(--text)",outline:"none",fontFamily:"inherit",minWidth:0}}/>
          <button onClick={send} disabled={!text.trim()} style={{width:42,height:42,borderRadius:"50%",border:"none",background:text.trim()?"linear-gradient(135deg,#1e3a8a,#2563eb)":"var(--cardBorder)",display:"flex",alignItems:"center",justifyContent:"center",cursor:text.trim()?"pointer":"default",flexShrink:0}}>
            <div style={{transform:"rotate(180deg)",display:"flex"}}><I n="back" s={17} c="#fff"/></div>
          </button>
        </div>
      </div>
    </div>
  );
};

// Admin-side inbox — lists teacher accounts with a message thread
const AdminTeacherInbox=({store,toast,onBack})=>{
  const{teachers,teacherMessages}=store;
  const staffList=teachers.filter(t=>!t.archived&&t.role!=="admin");
  const[openTeacherId,setOpenTeacherId]=useState(null);
  const[q,setQ]=useState("");

  if(openTeacherId){
    const t=teachers.find(x=>x.id===openTeacherId);
    if(t)return <TeacherAdminThread store={store} teacher={t} role="admin" authorName="Admin" onBack={()=>setOpenTeacherId(null)}/>;
  }

  const ql=q.trim().toLowerCase();
  const threadsInfo=staffList
    .filter(t=>ql?t.name.toLowerCase().includes(ql):true)
    .map(t=>{
      const msgs=(teacherMessages||[]).filter(m=>m.teacherId===t.id).sort((a,b)=>a.createdAt-b.createdAt);
      const last=msgs[msgs.length-1];
      const unread=msgs.filter(m=>m.from==="teacher"&&!m.read).length;
      return {teacher:t,last,unread};
    })
    .sort((a,b)=>{
      if((a.unread>0)!==(b.unread>0))return b.unread-a.unread;
      const at=a.last?a.last.createdAt:0, bt=b.last?b.last.createdAt:0;
      return bt-at;
    });

  return(
    <div>
      <PageHeader title="Teacher Messages" onBack={onBack}/>
      <div style={{padding:"0 16px 24px"}}>
        <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search teacher..." style={{width:"100%",padding:"11px 14px",borderRadius:12,border:"1.5px solid var(--cardBorder)",background:"var(--inputBg)",fontSize:13,color:"var(--text)",outline:"none",boxSizing:"border-box",fontFamily:"inherit",marginBottom:14}}/>
        {threadsInfo.length===0&&<div style={{textAlign:"center",padding:"40px 0",color:"var(--textFaint)",fontSize:13}}>No teacher accounts found</div>}
        {threadsInfo.map(({teacher,last,unread})=>(
          <button key={teacher.id} onClick={()=>setOpenTeacherId(teacher.id)} style={{width:"100%",background:"var(--card)",border:"1.5px solid var(--cardBorder)",borderRadius:16,padding:"12px 14px",display:"flex",alignItems:"center",gap:12,cursor:"pointer",marginBottom:10,textAlign:"left",fontFamily:"inherit"}}>
            <Avatar name={teacher.name} size={40}/>
            <div style={{flex:1,minWidth:0}}>
              <div style={{fontWeight:800,fontSize:13,color:"var(--text)"}}>{teacher.name}</div>
              <div style={{fontSize:11,color:"var(--textFaint)",marginTop:2,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{last?(last.from==="admin"?"You: ":"")+last.text:"No messages yet — tap to start"}</div>
            </div>
            {unread>0&&<span style={{background:"#ef4444",color:"#fff",borderRadius:20,minWidth:20,height:20,display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,fontWeight:800,padding:"0 5px",flexShrink:0}}>{unread}</span>}
          </button>
        ))}
      </div>
    </div>
  );
};

// Staff-side inbox — lists students with a doubt/message thread (scoped to a
// limited teacher's own batches; full admin/unrestricted teachers see everyone)
const StaffMessagesInbox=({store,toast,onBack,currentTeacher})=>{
  const{students,messages,setMessages,shifts:allShifts}=store;
  const isLimited=currentTeacher&&currentTeacher.role==="teacher";
  const scopedIds=isLimited&&currentTeacher.allowedShiftIds?.length?currentTeacher.allowedShiftIds:null;
  const myShifts=isLimited?(scopedIds?allShifts.filter(sh=>scopedIds.includes(sh.id)):allShifts):allShifts;
  const scopedStudents=students.filter(s=>!s.archived&&(scopedIds?getShiftIds(s).some(id=>scopedIds.includes(id)):true));
  const[openStudentId,setOpenStudentId]=useState(null);
  const[q,setQ]=useState("");
  const[showBroadcast,setShowBroadcast]=useState(false);
  const blankBc={target:"all",targetId:myShifts[0]?.id||"",text:""};
  const[bc,setBc]=useState(blankBc);

  if(openStudentId){
    const stu=students.find(s=>s.id===openStudentId);
    if(stu)return <StaffMessagesInboxThreadWrap store={store} student={stu} currentTeacher={currentTeacher} onBack={()=>setOpenStudentId(null)}/>;
  }

  const broadcastTargets=()=>{
    if(bc.target==="batch")return scopedStudents.filter(s=>getShiftIds(s).includes(bc.targetId));
    return scopedStudents;
  };

  const sendBroadcast=()=>{
    if(!bc.text.trim())return toast.error("Please write a message");
    if(bc.target==="batch"&&!bc.targetId)return toast.error("Please choose a batch");
    const targets=broadcastTargets();
    if(targets.length===0)return toast.error("No students found for this target");
    const authorName=currentTeacher?currentTeacher.name:(store.settings.teacher||"Admin");
    const now=Date.now();
    const newMsgs=targets.map((s,i)=>({id:uid(),studentId:s.id,from:"staff",authorName,text:bc.text.trim(),createdAt:now+i,read:false}));
    setMessages(list=>[...(list||[]),...newMsgs]);
    toast.success(`Message sent to ${targets.length} student${targets.length!==1?"s":""}`,"Broadcast sent!");
    setBc(blankBc);setShowBroadcast(false);
  };

  const ql=q.trim().toLowerCase();
  const threadsInfo=scopedStudents
    .filter(s=>ql?s.name.toLowerCase().includes(ql):true)
    .map(s=>{
      const msgs=(messages||[]).filter(m=>m.studentId===s.id).sort((a,b)=>a.createdAt-b.createdAt);
      const last=msgs[msgs.length-1];
      const unread=msgs.filter(m=>m.from==="student"&&!m.read).length;
      return {student:s,last,unread};
    })
    .sort((a,b)=>{
      if((a.unread>0)!==(b.unread>0))return b.unread-a.unread;
      const at=a.last?a.last.createdAt:0, bt=b.last?b.last.createdAt:0;
      return bt-at;
    });

  return(
    <div>
      <PageHeader title="Messages" onBack={onBack} right={<Btn onClick={()=>{setBc(blankBc);setShowBroadcast(true);}} sm c="#0ea5e9"><I n="users" s={14}/> Broadcast</Btn>}/>
      <div style={{padding:"0 16px 24px"}}>
        <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search student..." style={{width:"100%",padding:"11px 14px",borderRadius:12,border:"1.5px solid var(--cardBorder)",background:"var(--inputBg)",fontSize:13,color:"var(--text)",outline:"none",boxSizing:"border-box",fontFamily:"inherit",marginBottom:14}}/>
        {threadsInfo.length===0&&<div style={{textAlign:"center",padding:"40px 0",color:"var(--textFaint)",fontSize:13}}>No students found</div>}
        {threadsInfo.map(({student,last,unread})=>(
          <button key={student.id} onClick={()=>setOpenStudentId(student.id)} style={{width:"100%",background:"var(--card)",border:"1.5px solid var(--cardBorder)",borderRadius:16,padding:"12px 14px",display:"flex",alignItems:"center",gap:12,cursor:"pointer",marginBottom:10,textAlign:"left",fontFamily:"inherit"}}>
            <Avatar name={student.name} size={40}/>
            <div style={{flex:1,minWidth:0}}>
              <div style={{fontWeight:800,fontSize:13,color:"var(--text)"}}>{student.name}</div>
              <div style={{fontSize:11,color:"var(--textFaint)",marginTop:2,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{last?(last.from==="staff"?"You: ":"")+last.text:"No messages yet — tap to start"}</div>
            </div>
            {unread>0&&<span style={{background:"#ef4444",color:"#fff",borderRadius:20,minWidth:20,height:20,display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,fontWeight:800,padding:"0 5px",flexShrink:0}}>{unread}</span>}
          </button>
        ))}
      </div>
      {showBroadcast&&(
        <Sheet title="Broadcast Message" onClose={()=>{setShowBroadcast(false);setBc(blankBc);}}>
          <div style={{background:"#eef2ff",border:"1.5px solid #c7d2fe",borderRadius:14,padding:"12px 14px",marginBottom:16,fontSize:12,color:"#4338ca",fontWeight:600,lineHeight:1.5}}>
            Send the same message to many students at once. It will appear in each student's chat, as if sent individually.
          </div>
          <Sel label="Send To" value={bc.target} onChange={v=>setBc(f=>({...f,target:v}))} options={[
            {v:"all",l:isLimited?"All My Students":"All Students"},
            {v:"batch",l:"Specific Batch"},
          ]}/>
          {bc.target==="batch"&&<Sel label="Choose Batch" value={bc.targetId} onChange={v=>setBc(f=>({...f,targetId:v}))} req options={[{v:"",l:"Select batch..."},...myShifts.map(sh=>({v:sh.id,l:sh.name}))]}/>}
          <div style={{marginBottom:14}}>
            <label style={{display:"block",fontSize:11,fontWeight:700,color:"var(--textMuted)",marginBottom:6,textTransform:"uppercase",letterSpacing:.5}}>Message</label>
            <textarea value={bc.text} onChange={e=>setBc(f=>({...f,text:e.target.value}))} rows={4} placeholder="Write your message here..." style={{width:"100%",padding:"11px 13px",border:"1.5px solid var(--cardBorder)",borderRadius:12,fontSize:14,color:"var(--text)",background:"var(--inputBg)",outline:"none",fontFamily:"inherit",resize:"vertical",boxSizing:"border-box"}}/>
          </div>
          <div style={{fontSize:11,color:"var(--textFaint)",marginBottom:14}}>{broadcastTargets().length} student{broadcastTargets().length!==1?"s":""} will receive this.</div>
          <div style={{display:"flex",gap:10}}>
            <Btn onClick={()=>{setShowBroadcast(false);setBc(blankBc);}} outline c="#64748b" full>Cancel</Btn>
            <Btn onClick={sendBroadcast} c="#0ea5e9" full>Send to All</Btn>
          </div>
        </Sheet>
      )}
    </div>
  );
};
const StaffMessagesInboxThreadWrap=({store,student,currentTeacher,onBack})=>(
  <MessagesThread store={store} student={student} role="staff" authorName={currentTeacher?currentTeacher.name:(store.settings.teacher||"Admin")} onBack={onBack}/>
);

// ══════════════════════════════════════════════════════════════
// MORE
// ══════════════════════════════════════════════════════════════
// ══════════════════════════════════════════════════════════════
// TEACHER HOME — professional dashboard for a limited teacher account:
// today's classes, batch/student snapshot, quick actions, and a way
// to send feature requests / feedback to the admin.
// ══════════════════════════════════════════════════════════════
const TeacherHome=({store,toast,currentTeacher,goTo}) => {
  const{students,shifts:allShifts,attend,leaveRequests,homework,feedbackRequests,setFeedbackRequests,settings,messages,announcements,teacherMessages,timetableRequests,holidays}=store;
  const scopedIds=currentTeacher?.allowedShiftIds?.length?currentTeacher.allowedShiftIds:null;
  const myShifts=scopedIds?allShifts.filter(sh=>scopedIds.includes(sh.id)):allShifts;
  const myStudents=students.filter(s=>!s.archived&&getShiftIds(s).some(id=>myShifts.some(sh=>sh.id===id)));
  const myStudentIds=new Set(myStudents.map(s=>s.id));

  const today=todayStr();
  const now=new Date();
  const hm=`${String(now.getHours()).padStart(2,"0")}:${String(now.getMinutes()).padStart(2,"0")}`;
  const dayAbbr=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"][now.getDay()];
  const todayShifts=myShifts.filter(sh=>sh.days?.includes(dayAbbr)&&teacherVisibleForDay(sh,dayAbbr,currentTeacher?.id)).map(sh=>({...sh,...getShiftTime(sh,dayAbbr)}));
  const currentShift=todayShifts.find(sh=>hm>=sh.start&&hm<=sh.end);
  const todayHoliday=getHoliday(today,holidays);

  const presentToday=myStudents.filter(s=>attend[`${s.id}-${today}`]==="present").length;
  const absentToday=myStudents.filter(s=>attend[`${s.id}-${today}`]==="absent").length;
  const markedToday=presentToday+absentToday;
  const pendingLeave=(leaveRequests||[]).filter(lr=>lr.status==="pending"&&myStudentIds.has(lr.studentId)).length;
  const recentHomework=(homework||[]).filter(h=>myShifts.some(sh=>sh.id===h.shiftId)).sort((a,b)=>b.createdAt-a.createdAt).slice(0,3);

  const myFeedback=(feedbackRequests||[]).filter(f=>f.teacherId===currentTeacher?.id).sort((a,b)=>b.createdAt-a.createdAt);

  // ── Notification Bell (teacher's own scoped view) ──
  const viewerKey=`teacher:${currentTeacher?.id}`;
  const unreadMsgsT=(messages||[]).filter(m=>m.from==="student"&&!m.read&&myStudentIds.has(m.studentId));
  const pendingLeaveList=(leaveRequests||[]).filter(lr=>lr.status==="pending"&&myStudentIds.has(lr.studentId));
  const annSeenTs=getSeenTs(store,viewerKey+":announcements");
  const myAnnouncements=getAnnouncementsFor(announcements||[],"teacher",currentTeacher?.id,scopedIds||[]).filter(a=>a.senderId!==currentTeacher?.id);
  const newAnnouncements=myAnnouncements.filter(a=>a.createdAt>annSeenTs);
  const unreadAdminReplies=(teacherMessages||[]).filter(m=>m.teacherId===currentTeacher?.id&&m.from==="admin"&&!m.read);
  const pendingTimetableList=(timetableRequests||[]).filter(r=>r.status==="pending"&&myStudentIds.has(r.studentId));
  const bellItems=[
    ...unreadMsgsT.slice(0,6).map(m=>{const st=myStudents.find(s=>s.id===m.studentId);return{icon:"phone",color:"#0ea5e9",title:st?.name||"Student",desc:m.text,unread:true,onClick:()=>goTo("more","messages")};}),
    ...unreadAdminReplies.slice(0,6).map(m=>({icon:"shield",color:"#7c3aed",title:"Admin",desc:m.text,unread:true,onClick:()=>goTo("more","askadmin")})),
    ...pendingLeaveList.slice(0,6).map(lr=>{const st=myStudents.find(s=>s.id===lr.studentId);return{icon:"note",color:"#2563eb",title:"Leave Request",desc:`${st?.name||"Student"} · ${lr.reason||"No reason given"}`,unread:true,onClick:()=>goTo("more","leaverequests")};}),
    ...pendingTimetableList.slice(0,6).map(r=>{const st=myStudents.find(s=>s.id===r.studentId);return{icon:"cal",color:"#f59e0b",title:"Timetable Report",desc:`${st?.name||"Student"} · ${r.message}`,unread:true,onClick:()=>goTo("more","timetablereports")};}),
    ...newAnnouncements.slice(0,6).map(a=>({icon:"mail",color:"#1e3a8a",title:a.title,desc:a.message,unread:true,onClick:()=>goTo("more","myannouncements")})),
  ];
  const openBell=()=>{if(newAnnouncements.length)markSeenNow(store,viewerKey+":announcements");};

  const[showFeedback,setShowFeedback]=useState(false);
  const blank={type:"feature",subject:"",message:""};
  const[form,setForm]=useState(blank);
  const sf=(k,v)=>setForm(f=>({...f,[k]:v}));

  const submitFeedback=()=>{
    if(!form.subject.trim()) return toast.error("Please add a short subject");
    if(!form.message.trim()) return toast.error("Please describe your request or feedback");
    setFeedbackRequests(fr=>[{id:uid(),teacherId:currentTeacher.id,teacherName:currentTeacher.name,type:form.type,subject:form.subject.trim(),message:form.message.trim(),status:"pending",createdAt:Date.now()},...(fr||[])]);
    toast.success("Sent to admin","Thank you!");
    setForm(blank);setShowFeedback(false);
  };

  const TYPE_INFO={feature:{label:"Feature Request",c:"#1e3a8a",icon:"zap"},bug:{label:"Bug Report",c:"#ef4444",icon:"warn"},feedback:{label:"General Feedback",c:"#0ea5e9",icon:"mail"}};

  const QuickAction=({icon,label,c,onClick,sub})=>(
    <button onClick={onClick} style={{flex:"1 1 130px",background:"var(--card)",border:"1.5px solid var(--cardBorder)",borderRadius:16,padding:"14px",display:"flex",flexDirection:"column",alignItems:"flex-start",gap:8,cursor:"pointer",fontFamily:"inherit",boxShadow:"0 2px 10px var(--shadow)"}}>
      <div style={{background:c+"18",borderRadius:12,padding:9}}><I n={icon} s={18} c={c}/></div>
      <div style={{textAlign:"left"}}>
        <div style={{fontWeight:800,color:"var(--text)",fontSize:13}}>{label}</div>
        {sub&&<div style={{fontSize:11,color:"var(--textFaint)",marginTop:2}}>{sub}</div>}
      </div>
    </button>
  );

  return(
    <div style={{paddingBottom:24}}>
      <div style={{padding:"20px 16px 0"}}>
        <div style={{background:`linear-gradient(135deg,${ROLE_INFO[currentTeacher.role]?.color||"#1e3a8a"} 0%,${ROLE_INFO[currentTeacher.role]?.color||"#1e3a8a"}dd 100%)`,borderRadius:24,padding:"20px",color:"#fff",position:"relative",overflow:"hidden",boxShadow:`0 14px 34px ${ROLE_INFO[currentTeacher.role]?.color||"#1e3a8a"}40`}}>
          <div style={{position:"absolute",top:-30,right:-30,width:130,height:130,borderRadius:"50%",background:"rgba(255,255,255,.08)"}}/>
          <div style={{position:"relative",display:"flex",alignItems:"center",gap:14,marginBottom:14}}>
            <Avatar name={currentTeacher.name} size={50}/>
            <div style={{flex:1}}>
              <div style={{fontSize:17,fontWeight:900}}>{currentTeacher.name}</div>
              <div style={{fontSize:12,opacity:.8,marginTop:2}}>{ROLE_INFO[currentTeacher.role]?.label||"Teacher"} · {settings.institute}</div>
            </div>
            {isFeatureOn(settings,"notifications",{type:"teacher",id:currentTeacher?.id})&&<NotificationBell items={bellItems} onOpen={openBell} light/>}
          </div>
          <div style={{position:"relative",fontSize:12,opacity:.85,fontWeight:600}}>{now.toLocaleDateString("en-IN",{weekday:"long",day:"numeric",month:"long"})}</div>
          {todayHoliday?(
            <div style={{position:"relative",marginTop:10,background:"rgba(255,255,255,.2)",borderRadius:12,padding:"9px 12px",display:"flex",alignItems:"center",gap:8,fontSize:12,fontWeight:800}}>
              <I n="holiday" s={14} c="#fff"/> Today is a holiday — {todayHoliday.name}. Classes are off today.
            </div>
          ):currentShift?(
            <div style={{marginTop:10,background:"rgba(255,255,255,.15)",borderRadius:12,padding:"9px 12px",display:"flex",alignItems:"center",gap:8,fontSize:12,fontWeight:700}}>
              <I n="clock" s={14} c="#fff"/> Live now: {currentShift.name} · {fmtTime(currentShift.start)}–{fmtTime(currentShift.end)}
            </div>
          ):todayShifts.length>0?(
            <div style={{marginTop:10,background:"rgba(255,255,255,.15)",borderRadius:12,padding:"9px 12px",display:"flex",alignItems:"center",gap:8,fontSize:12,fontWeight:700}}>
              <I n="cal" s={14} c="#fff"/> {todayShifts.length} class{todayShifts.length!==1?"es":""} today
            </div>
          ):(
            <div style={{marginTop:10,background:"rgba(255,255,255,.15)",borderRadius:12,padding:"9px 12px",fontSize:12,fontWeight:700}}>No classes scheduled today</div>
          )}
        </div>
      </div>

      <div style={{padding:"14px 16px 0",display:"flex",gap:10}}>
        <div style={{flex:1,background:"var(--card)",border:"1.5px solid var(--cardBorder)",borderRadius:14,padding:"12px",textAlign:"center"}}>
          <div style={{fontSize:20,fontWeight:900,color:"var(--text)"}}>{myShifts.length}</div>
          <div style={{fontSize:10,color:"var(--textFaint)",fontWeight:700,marginTop:2}}>MY BATCHES</div>
        </div>
        <div style={{flex:1,background:"var(--card)",border:"1.5px solid var(--cardBorder)",borderRadius:14,padding:"12px",textAlign:"center"}}>
          <div style={{fontSize:20,fontWeight:900,color:"var(--text)"}}>{myStudents.length}</div>
          <div style={{fontSize:10,color:"var(--textFaint)",fontWeight:700,marginTop:2}}>MY STUDENTS</div>
        </div>
        <div style={{flex:1,background:"var(--card)",border:"1.5px solid var(--cardBorder)",borderRadius:14,padding:"12px",textAlign:"center"}}>
          <div style={{fontSize:20,fontWeight:900,color:markedToday>0?"#10b981":"var(--textFaint)"}}>{markedToday}/{myStudents.length}</div>
          <div style={{fontSize:10,color:"var(--textFaint)",fontWeight:700,marginTop:2}}>MARKED TODAY</div>
        </div>
      </div>

      {todayShifts.length>0&&<div style={{padding:"14px 16px 0"}}>
        <div style={{fontWeight:800,fontSize:12,color:"var(--textMuted)",textTransform:"uppercase",letterSpacing:.7,marginBottom:10}}>Today's Classes</div>
        {todayShifts.map(sh=>{
          const cnt=myStudents.filter(s=>hasShift(s,sh.id)).length;
          const isLive=currentShift?.id===sh.id;
          return(
            <div key={sh.id} style={{background:"var(--card)",border:`1.5px solid ${isLive?"#10b981":"var(--cardBorder)"}`,borderRadius:14,padding:"12px 14px",marginBottom:8,display:"flex",alignItems:"center",gap:10}}>
              <div style={{background:isLive?"#10b98118":"#1e3a8a18",borderRadius:10,padding:9}}><I n="cal" s={16} c={isLive?"#10b981":"#1e3a8a"}/></div>
              <div style={{flex:1}}>
                <div style={{fontSize:13,fontWeight:800,color:"var(--text)"}}>{sh.name}</div>
                <div style={{fontSize:11,color:"var(--textFaint)"}}>{fmtTime(sh.start)} – {fmtTime(sh.end)} · {cnt} student{cnt!==1?"s":""}</div>
              </div>
              {isLive&&<span style={{fontSize:10,fontWeight:800,color:"#166534",background:"#dcfce7",borderRadius:20,padding:"3px 10px"}}>LIVE</span>}
            </div>
          );
        })}
      </div>}

      <div style={{padding:"14px 16px 0"}}>
        <div style={{fontWeight:800,fontSize:12,color:"var(--textMuted)",textTransform:"uppercase",letterSpacing:.7,marginBottom:10}}>Quick Actions</div>
        <div style={{display:"flex",flexWrap:"wrap",gap:10}}>
          <QuickAction icon="checkbig" label="Attendance" c="#10b981" onClick={()=>goTo("attendance")} sub="Mark today's class"/>
          <QuickAction icon="cal" label="Schedule" c="#2563eb" onClick={()=>goTo("shifts")} sub="Monthly class calendar"/>
          <QuickAction icon="note" label="Leave Requests" c="#f59e0b" onClick={()=>goTo("more")} sub={pendingLeave>0?`${pendingLeave} pending`:"None pending"}/>
          <QuickAction icon="edit" label="Homework" c="#0ea5e9" onClick={()=>goTo("more")} sub={recentHomework.length?`${recentHomework.length} recent`:"Assign homework"}/>
          <QuickAction icon="mail" label="Announcements" c="#1e3a8a" onClick={()=>goTo("more")} sub="Message your batch"/>
        </div>
      </div>

      <div style={{padding:"18px 16px 0"}}>
        <div style={{background:"linear-gradient(135deg,#0d1b42,#1e3a8a)",borderRadius:18,padding:"16px",color:"#fff"}}>
          <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:6}}>
            <I n="zap" s={16} c="#fbbf24"/>
            <span style={{fontSize:14,fontWeight:800}}>Have an idea or ran into a problem?</span>
          </div>
          <div style={{fontSize:12,opacity:.8,marginBottom:12,lineHeight:1.5}}>Request a new feature, report a bug, or send feedback directly to your admin.</div>
          <Btn onClick={()=>{setForm(blank);setShowFeedback(true);}} c="#fff" tc="#312e81" full>Send Feedback / Request Feature</Btn>
        </div>
      </div>

      {myFeedback.length>0&&<div style={{padding:"18px 16px 0"}}>
        <div style={{fontWeight:800,fontSize:12,color:"var(--textMuted)",textTransform:"uppercase",letterSpacing:.7,marginBottom:10}}>My Submissions</div>
        {myFeedback.map(f=>{
          const ti=TYPE_INFO[f.type]||TYPE_INFO.feedback;
          return(
            <div key={f.id} style={{background:"var(--card)",border:"1.5px solid var(--cardBorder)",borderRadius:14,padding:"12px 14px",marginBottom:8}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:6,gap:8}}>
                <div style={{fontSize:13,fontWeight:800,color:"var(--text)"}}>{f.subject}</div>
                {f.status==="pending"&&<span style={{fontSize:10,fontWeight:800,color:"#92400e",background:"#fef9c3",borderRadius:20,padding:"3px 10px",flexShrink:0}}>PENDING</span>}
                {f.status==="reviewed"&&<span style={{fontSize:10,fontWeight:800,color:"#1e40af",background:"#dbeafe",borderRadius:20,padding:"3px 10px",flexShrink:0}}>REVIEWED</span>}
                {f.status==="resolved"&&<span style={{fontSize:10,fontWeight:800,color:"#166534",background:"#dcfce7",borderRadius:20,padding:"3px 10px",flexShrink:0}}>RESOLVED</span>}
              </div>
              <div style={{fontSize:12,color:"var(--textMuted)",lineHeight:1.5,marginBottom:6}}>{f.message}</div>
              <div style={{display:"flex",gap:8,alignItems:"center"}}>
                <span style={{background:ti.c+"18",color:ti.c,borderRadius:20,padding:"2px 10px",fontSize:10,fontWeight:800}}>{ti.label}</span>
                <span style={{fontSize:11,color:"var(--textFaint)"}}>{new Date(f.createdAt).toLocaleDateString("en-IN",{day:"2-digit",month:"short"})}</span>
              </div>
              {f.adminReply&&<div style={{marginTop:8,paddingTop:8,borderTop:"1px solid var(--cardBorder)"}}>
                <div style={{fontSize:10,fontWeight:800,color:"var(--textFaint)",textTransform:"uppercase",letterSpacing:.5,marginBottom:3}}>Admin Reply</div>
                <div style={{fontSize:12,color:"var(--textMuted)",lineHeight:1.5}}>{f.adminReply}</div>
              </div>}
            </div>
          );
        })}
      </div>}

      {showFeedback&&(
        <Sheet title="Send Feedback / Request Feature" onClose={()=>{setShowFeedback(false);setForm(blank);}}>
          <Sel label="Type" value={form.type} onChange={v=>sf("type",v)} options={[
            {v:"feature",l:"Feature Request"},
            {v:"bug",l:"Bug Report"},
            {v:"feedback",l:"General Feedback"},
          ]}/>
          <Inp label="Subject" value={form.subject} onChange={v=>sf("subject",v)} req placeholder="e.g. Add bulk WhatsApp reminder"/>
          <div style={{marginBottom:14}}>
            <label style={{display:"block",fontSize:11,fontWeight:700,color:"var(--textMuted)",marginBottom:6,textTransform:"uppercase",letterSpacing:.5}}>Details</label>
            <textarea value={form.message} onChange={e=>sf("message",e.target.value)} rows={5} placeholder="Describe what you need or what went wrong..." style={{width:"100%",padding:"11px 13px",border:"1.5px solid var(--cardBorder)",borderRadius:12,fontSize:14,color:"var(--text)",background:"var(--inputBg)",outline:"none",fontFamily:"inherit",resize:"vertical",boxSizing:"border-box"}}/>
          </div>
          <div style={{display:"flex",gap:10,marginTop:8}}>
            <Btn onClick={()=>{setShowFeedback(false);setForm(blank);}} outline c="#64748b" full>Cancel</Btn>
            <Btn onClick={submitFeedback} c="#1e3a8a" full>Send to Admin</Btn>
          </div>
        </Sheet>
      )}
    </div>
  );
};

// ══════════════════════════════════════════════════════════════
// MORE — everything that isn't a bottom-tab, grouped into 5 categories.
// To add a new feature: add one entry to `defs` inside More (pick its `cat`),
// and one line to MORE_SUB_CAT below. It appears in its category, in search,
// and (if it has a badge) in Notifications automatically.
// ══════════════════════════════════════════════════════════════
const MORE_CATS=[
  {id:"academic",     label:"Academic",      icon:"grad",   c:"#2563eb",blurb:"Classes, homework and results"},
  {id:"communication",label:"Communication", icon:"phone",  c:"#0ea5e9",blurb:"Messages and notices"},
  {id:"management",   label:"Management",    icon:"layers", c:"#7c3aed",blurb:"Batches, people and requests"},
  {id:"reports",      label:"Reports",       icon:"chart",  c:"#06b6d4",blurb:"Fees, attendance and results"},
  {id:"settings",     label:"Settings",      icon:"gear",   c:"#64748b",blurb:"Centre, security and backup"},
];
// which category a screen belongs to — used when a screen is opened from elsewhere (e.g. the Home dashboard)
const MORE_SUB_CAT={
  schedule:"academic",studymaterial:"academic",homework:"academic",teachertests:"academic",marks:"academic",holidays:"academic",
  messages:"communication",teachermessages:"communication",askadmin:"communication",announcements:"communication",myannouncements:"communication",notifications:"communication",feedback:"communication",
  shifts:"management",leaverequests:"management",timetablereports:"management",team:"management",admissions:"management",parents:"management",activitylog:"management",
  reports:"reports",expenses:"reports",
  settings:"settings",features:"settings",backup:"settings",
};

const NotificationsCentre=({rows,onOpen,onBack})=>(
  <div>
    <PageHeader title="Notifications" onBack={onBack}/>
    <div style={{padding:"0 16px 24px"}}>
      {rows.length===0?(
        <div style={{textAlign:"center",padding:"44px 20px",background:"var(--card)",border:"1.5px solid var(--cardBorder)",borderRadius:20}}>
          <div style={{width:54,height:54,borderRadius:18,background:"#dcfce7",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 12px"}}><I n="check" s={26} c="#16a34a"/></div>
          <div style={{fontFamily:SERIF,fontSize:20,fontWeight:600,color:"var(--text)"}}>You're all caught up</div>
          <div style={{fontSize:12.5,color:"var(--textMuted)",lineHeight:1.6,marginTop:6}}>New messages, requests and payments to verify will show up here.</div>
        </div>
      ):(
        <>
          <div style={{fontSize:12.5,color:"var(--textMuted)",margin:"0 2px 12px"}}>{rows.length} thing{rows.length!==1?"s":""} waiting for you. Tap one to open it.</div>
          <div style={{background:"var(--card)",border:"1.5px solid var(--cardBorder)",borderRadius:18,padding:"2px 14px"}}>
            {rows.map((r,i)=>(
              <button key={r.key} onClick={()=>onOpen(r)} style={{width:"100%",display:"flex",alignItems:"center",gap:12,padding:"13px 0",background:"none",border:"none",borderBottom:i<rows.length-1?"1px solid var(--cardBorder)":"none",cursor:"pointer",fontFamily:"inherit",textAlign:"left"}}>
                <div style={{background:r.c+"18",borderRadius:12,padding:10,display:"flex",flexShrink:0}}><I n={r.icon} s={19} c={r.c}/></div>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{fontSize:14,fontWeight:800,color:"var(--text)"}}>{r.label}</div>
                  <div style={{fontSize:12,color:"var(--textFaint)",marginTop:1,lineHeight:1.4}}>{r.desc}</div>
                </div>
                <span style={{background:"#ef4444",color:"#fff",borderRadius:20,minWidth:22,height:22,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:800,padding:"0 6px",flexShrink:0}}>{r.badge}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  </div>
);

const More=({store,toast,currentTeacher,onSwitchAccount,limited,initSub,goTab})=>{
  const[sub,setSub]=useState(null);
  const[arg,setArg]=useState(null);
  const[cat,setCat]=useState(null);
  const[q,setQ]=useState("");
  useEffect(()=>{if(initSub){setSub(initSub);setArg(null);setCat(MORE_SUB_CAT[initSub]||null);}},[initSub]); // eslint-disable-line

  const isAdmin=!currentTeacher||currentTeacher.role==="admin";
  const scopedIdsForBadge=limited&&currentTeacher?.allowedShiftIds?.length?currentTeacher.allowedShiftIds:null;
  const scopedStudentIdsForBadge=new Set(
    scopedIdsForBadge?store.students.filter(s=>getShiftIds(s).some(id=>scopedIdsForBadge.includes(id))).map(s=>s.id):store.students.map(s=>s.id)
  );
  const pendingLeaveCount=(store.leaveRequests||[]).filter(lr=>lr.status==="pending"&&scopedStudentIdsForBadge.has(lr.studentId)).length;
  const pendingFeedbackCount=(store.feedbackRequests||[]).filter(f=>f.status==="pending").length;
  const unreadMessagesCount=(store.messages||[]).filter(m=>m.from==="student"&&!m.read&&scopedStudentIdsForBadge.has(m.studentId)).length;
  const pendingMarksCount=(store.marks||[]).filter(m=>m.status==="pending"&&scopedStudentIdsForBadge.has(m.studentId)).length;
  const myPendingMarksCount=limited&&currentTeacher?(store.marks||[]).filter(m=>m.status==="pending"&&m.addedBy===currentTeacher.id).length:0;
  const myPendingTestsCount=limited&&currentTeacher?(store.tests||[]).filter(t=>t.audience==="teacher"&&(!t.forTeacherIds?.length||t.forTeacherIds.includes(currentTeacher.id))&&!(store.testAttempts||[]).some(a=>a.testId===t.id&&a.attempterId===currentTeacher.id)).length:0;
  const pendingTestReviewCount=(store.testAttempts||[]).filter(a=>!a.seenByAdmin).length;
  const unreadFromAdminCount=limited&&currentTeacher?(store.teacherMessages||[]).filter(m=>m.teacherId===currentTeacher.id&&m.from==="admin"&&!m.read).length:0;
  const unreadFromTeachersCount=(store.teacherMessages||[]).filter(m=>m.from==="teacher"&&!m.read).length;
  const scopedTimetableIds=isAdmin?null:scopedStudentIdsForBadge;
  const pendingTimetableCount=(store.timetableRequests||[]).filter(r=>r.status==="pending"&&(scopedTimetableIds?scopedTimetableIds.has(r.studentId):true)).length;
  const pendingAdmissionsCount=(store.admissionApplications||[]).filter(a=>a.status==="pending").length;
  const pendingClaimsCount=(store.paymentClaims||[]).filter(c=>c.status==="pending").length;
  const activeStudentCount=store.students.filter(s=>!s.archived).length;
  const parentCount=(store.parents||[]).length;
  const plural=(n,w,p)=>`${n} ${n!==1?(p||w+"s"):w}`;
  const viewer=limited?{type:"teacher",id:currentTeacher?.id}:undefined;
  const gateOk=it=>{const k=FEATURE_GATE[it.sub];return !k||isFeatureOn(store.settings,k,viewer);};

  // ── every screen reachable from More, in display order ──
  const defs=[
    // Academic
    {cat:"academic",sub:"schedule",icon:"cal",c:"#ec4899",label:"Schedule",desc:"Monthly class calendar per batch"},
    {cat:"academic",sub:"studymaterial",icon:"download",c:"#0ea5e9",label:"Study Material",desc:limited?"Share notes and links with your students":"Notes and resource links per batch"},
    {cat:"academic",sub:"homework",icon:"edit",c:"#0ea5e9",label:"Homework",desc:limited?"Assign homework to your batches":"Assign homework to a batch"},
    {cat:"academic",sub:"teachertests",icon:"grad",c:"#7c3aed",label:limited?"My Mock Tests":"Mock Tests",show:limited||isAdmin,badge:limited?myPendingTestsCount:pendingTestReviewCount,
      desc:limited?(myPendingTestsCount>0?`${plural(myPendingTestsCount,"test")} to take`:"Eligibility and mock tests assigned to you"):(pendingTestReviewCount>0?`${plural(pendingTestReviewCount,"submission")} to review`:"Create tests and review submissions")},
    {cat:"academic",sub:"marks",icon:"book",c:"#f59e0b",label:"Test Results",badge:limited?myPendingMarksCount:pendingMarksCount,
      desc:limited?(myPendingMarksCount>0?`${myPendingMarksCount} awaiting admin verification`:"Add exam scores for your students"):(pendingMarksCount>0?`${plural(pendingMarksCount,"result")} awaiting your verification`:"Track exam scores and progress")},
    {cat:"academic",sub:"holidays",icon:"holiday",c:"#ef4444",label:"Holidays",desc:limited?"View leave and festival days":"Mark leave and festival days"},
    // Communication
    {cat:"communication",sub:"messages",icon:"phone",c:"#0ea5e9",label:"Messages",badge:unreadMessagesCount,
      desc:unreadMessagesCount>0?`${plural(unreadMessagesCount,"new message")} from students and parents`:"Chat with students and parents, answer doubts"},
    {cat:"communication",sub:"teachermessages",icon:"shield",c:"#7c3aed",label:"Teacher Messages",show:isAdmin&&!limited,badge:unreadFromTeachersCount,
      desc:unreadFromTeachersCount>0?`${plural(unreadFromTeachersCount,"new message")} from teachers`:"Chat directly with your teachers"},
    {cat:"communication",sub:"askadmin",icon:"shield",c:"#7c3aed",label:"Message Admin",show:!!limited,badge:unreadFromAdminCount,
      desc:unreadFromAdminCount>0?`${plural(unreadFromAdminCount,"new reply","replies")} from admin`:"Ask a question or request verification"},
    {cat:"communication",sub:limited?"myannouncements":"announcements",icon:"mail",c:"#1e3a8a",label:"Announcements",show:limited||isAdmin,
      desc:limited?"Message your students and view updates":"Post notices for students, parents and teachers"},
    {cat:"communication",sub:"notifications",icon:"bell",c:"#f59e0b",label:"Notifications",desc:""},
    {cat:"communication",sub:"feedback",icon:"zap",c:"#f59e0b",label:"Feedback & Requests",show:isAdmin&&!limited,badge:pendingFeedbackCount,
      desc:pendingFeedbackCount>0?`${pendingFeedbackCount} new from teachers`:"Feature requests and feedback from teachers"},
    // Management
    {cat:"management",sub:"shifts",icon:"layers",c:"#2563eb",label:limited?"My Batches":"Shifts & Assign",
      desc:limited?"Set timing, days and assign your students":"Create batches, assign and move students"},
    {cat:"management",sub:"leaverequests",icon:"note",c:"#2563eb",label:"Leave Requests",badge:pendingLeaveCount,
      desc:pendingLeaveCount>0?`${plural(pendingLeaveCount,"pending request")}`:"Accept or reject student leave"},
    {cat:"management",sub:"timetablereports",icon:"cal",c:"#f59e0b",label:"Timetable Reports",badge:pendingTimetableCount,
      desc:pendingTimetableCount>0?`${plural(pendingTimetableCount,"student")} reported timing issues`:"Students' schedule feedback"},
    {cat:"management",sub:"__students",goTab:"students",icon:"users",c:"#1e3a8a",label:"Students",show:isAdmin&&!limited&&!!goTab,desc:`${plural(activeStudentCount,"active student")}. Add, edit, archive`},
    {cat:"management",sub:"team",icon:"shield",c:"#7c3aed",label:"Teachers & Access",show:isAdmin&&!limited,desc:"Manage teacher accounts and permissions"},
    {cat:"management",sub:"parents",icon:"users",c:"#16a34a",label:"Parents & Payments",show:isAdmin&&!limited,badge:pendingClaimsCount,
      desc:pendingClaimsCount>0?`${plural(pendingClaimsCount,"UPI payment")} to verify`:parentCount>0?`${plural(parentCount,"parent login")}. Verify UPI payments`:"Parent logins and online fee payments"},
    {cat:"management",sub:"admissions",icon:"userplus",c:"#16a34a",label:"Admissions",show:isAdmin&&!limited,badge:pendingAdmissionsCount,
      desc:pendingAdmissionsCount>0?`${plural(pendingAdmissionsCount,"new application")}`:"Review online admission and job applications"},
    {cat:"management",sub:"activitylog",icon:"sheet",c:"#1e3a8a",label:"Activity Log",show:isAdmin&&!limited,desc:"Who marked attendance and approved leave"},
    // Reports
    {cat:"reports",sub:"reports",arg:"fees",icon:"rupee",c:"#10b981",label:"Fee Reports",show:!limited,desc:"Collected, pending and carry-forward"},
    {cat:"reports",sub:"reports",arg:"attendance",icon:"checkbig",c:"#2563eb",label:"Attendance Reports",show:!limited,desc:"Present, absent and attendance rate"},
    {cat:"reports",sub:"reports",arg:"academic",icon:"award",c:"#f59e0b",label:"Academic Reports",show:!limited,desc:"Test averages by student and subject"},
    {cat:"reports",sub:"expenses",icon:"wallet",c:"#10b981",label:"Expenses & Profit",show:isAdmin&&!limited,desc:"Track costs and net profit"},
    // Settings
    {cat:"settings",sub:"settings",arg:"set-institute",icon:"users",c:"#1e3a8a",label:"Profile",show:isAdmin&&!limited,desc:"Institute name and teacher name"},
    {cat:"settings",sub:"settings",arg:"set-appearance",icon:"gear",c:"#64748b",label:"Centre Settings",show:isAdmin&&!limited,desc:"Appearance, multi-teacher login, data overview"},
    {cat:"settings",sub:"settings",arg:"set-upi",icon:"rupee",c:"#16a34a",label:"Fee Payment (UPI)",show:isAdmin&&!limited,
      desc:upiReady(store.settings)?`Parents pay to ${store.settings.upiId}`:"Add your UPI ID so parents can pay online"},
    {cat:"settings",sub:"features",icon:"bell",c:"#f59e0b",label:"Notifications & Features",show:isAdmin&&!limited,desc:"Choose which alerts and features are on"},
    {cat:"settings",sub:"backup",icon:"upload",c:"#dc2626",label:"Backup & Restore",show:isAdmin&&!limited,desc:"Download or restore all your data"},
    {cat:"settings",sub:"settings",arg:"set-pin",icon:"lock",c:"#7c3aed",label:"Security",show:isAdmin&&!limited,desc:store.settings.pinEnabled?"App lock is on":"Set an app lock PIN"},
  ];
  const visible=defs.filter(d=>d.show!==false).filter(gateOk);
  const attention=visible.filter(d=>d.sub!=="notifications"&&d.badge>0);
  const attentionTotal=attention.reduce((a,d)=>a+d.badge,0);
  const items=visible.map(d=>d.sub==="notifications"?{...d,badge:attentionTotal,desc:attention.length?`${plural(attention.length,"thing")} need your attention`:"You're all caught up"}:d);
  const itemKey=it=>`${it.sub}:${it.arg||""}:${it.label}`;
  const catBadge=id=>items.filter(i=>i.cat===id&&i.sub!=="notifications").reduce((a,i)=>a+(i.badge||0),0);
  const open=it=>{
    if(it.goTab){goTab&&goTab(it.goTab);return;}
    setArg(it.arg||null);setCat(it.cat);setQ("");setSub(it.sub);
  };

  // ── sub screens ──
  const close=()=>setSub(null);
  if(sub==="shifts")   return <Shifts    store={store} toast={toast} onBack={close} currentTeacher={currentTeacher}/>;
  if(sub==="schedule") return <Schedule  store={store} onBack={close} currentTeacher={currentTeacher}/>;
  if(sub==="reports")  return <Reports   store={store} initTab={arg} onBack={close}/>;
  if(sub==="expenses") return <Expenses  store={store} toast={toast} onBack={close}/>;
  if(sub==="marks")    return <MarksTracker store={store} toast={toast} onBack={close} currentTeacher={currentTeacher}/>;
  if(sub==="holidays") return <HolidayManager store={store} toast={toast} onBack={close}/>;
  if(sub==="team")     return <TeamManagement store={store} toast={toast} onBack={close} currentTeacherId={currentTeacher?.id}/>;
  if(sub==="activitylog") return <ActivityLog store={store} toast={toast} onBack={close}/>;
  if(sub==="features") return <FeatureManager store={store} toast={toast} onBack={close}/>;
  if(sub==="backup") return <BackupRestore store={store} toast={toast} onBack={close}/>;
  if(sub==="admissions") return <AdmissionsManager store={store} toast={toast} onBack={close}/>;
  if(sub==="studymaterial") return <StudyMaterialHub store={store} toast={toast} onBack={close} viewerType={limited?"teacher":"admin"} currentTeacher={currentTeacher}/>;
  if(sub==="teachertests") return <TestsHub store={store} toast={toast} onBack={close} viewerType={limited?"teacher":"admin"} viewerId={currentTeacher?.id} viewerName={currentTeacher?.name}/>;
  if(sub==="leaverequests") return <LeaveRequestsManager store={store} toast={toast} onBack={close} currentTeacher={currentTeacher}/>;
  if(sub==="timetablereports") return <TimetableRequestsManager store={store} toast={toast} onBack={close} currentTeacher={currentTeacher} onEditBatch={()=>setSub("shifts")}/>;
  if(sub==="announcements") return <Announcements store={store} toast={toast} onBack={close}/>;
  if(sub==="homework") return <HomeworkManager store={store} toast={toast} onBack={close} currentTeacher={currentTeacher}/>;
  if(sub==="feedback") return <FeedbackManager store={store} toast={toast} onBack={close}/>;
  if(sub==="messages") return <StaffMessagesInbox store={store} toast={toast} onBack={close} currentTeacher={currentTeacher}/>;
  if(sub==="myannouncements") return <Announcements store={store} toast={toast} onBack={close} currentTeacher={currentTeacher}/>;
  if(sub==="askadmin") return <TeacherAdminThread store={store} teacher={currentTeacher} role="teacher" authorName={currentTeacher?.name} onBack={close}/>;
  if(sub==="teachermessages") return <AdminTeacherInbox store={store} toast={toast} onBack={close}/>;
  if(sub==="parents") return <ParentsManager store={store} toast={toast} onBack={close}/>;
  if(sub==="settings") return <SettingsPage key={arg||"top"} store={store} toast={toast} onBack={close} section={arg}/>;
  if(sub==="notifications") return <NotificationsCentre onBack={close}
    rows={attention.map(d=>({key:itemKey(d),icon:d.icon,c:d.c,label:d.label,desc:d.desc,badge:d.badge,item:d}))}
    onOpen={r=>open(r.item)}/>;

  // ── rows ──
  const Row=({it,last,showCat})=>(
    <button onClick={()=>open(it)} style={{width:"100%",display:"flex",alignItems:"center",gap:13,padding:"13px 0",background:"none",border:"none",borderBottom:last?"none":"1px solid var(--cardBorder)",cursor:"pointer",fontFamily:"inherit",textAlign:"left"}}>
      <div style={{background:it.c+"18",borderRadius:13,padding:10,display:"flex",flexShrink:0}}><I n={it.icon} s={20} c={it.c}/></div>
      <div style={{flex:1,minWidth:0}}>
        <div style={{fontWeight:800,color:"var(--text)",fontSize:14.5}}>{it.label}</div>
        <div style={{fontSize:12,color:"var(--textFaint)",marginTop:1,lineHeight:1.4}}>{showCat?`${MORE_CATS.find(c=>c.id===it.cat)?.label} · `:""}{it.desc}</div>
      </div>
      {it.badge>0?<span style={{background:"#ef4444",color:"#fff",borderRadius:20,minWidth:22,height:22,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:800,padding:"0 6px",flexShrink:0}}>{it.badge}</span>:<I n="back" s={17} c="var(--cardBorder)"/>}
    </button>
  );
  const listCard={background:"var(--card)",border:"1.5px solid var(--cardBorder)",borderRadius:18,padding:"2px 14px",boxShadow:"0 2px 10px var(--shadow)"};

  const curCat=MORE_CATS.find(c=>c.id===cat);
  if(curCat&&!q.trim()){
    const list=items.filter(i=>i.cat===curCat.id);
    return(
      <div>
        <PageHeader title={curCat.label} onBack={()=>setCat(null)}/>
        <div style={{padding:"0 16px 24px"}}>
          <div style={{fontSize:12.5,color:"var(--textMuted)",margin:"-4px 2px 12px"}}>{curCat.blurb}</div>
          <div style={listCard}>{list.map((it,i)=><Row key={itemKey(it)} it={it} last={i===list.length-1}/>)}</div>
        </div>
      </div>
    );
  }

  const term=q.trim().toLowerCase();
  const results=term?items.filter(i=>`${i.label} ${i.desc} ${MORE_CATS.find(c=>c.id===i.cat)?.label}`.toLowerCase().includes(term)):[];
  const shownCats=MORE_CATS.filter(c=>items.some(i=>i.cat===c.id));

  return(
    <div>
      <PageHeader title="More" right={currentTeacher&&onSwitchAccount?(
        <button onClick={onSwitchAccount} style={{background:"var(--card)",border:"1.5px solid var(--cardBorder)",borderRadius:11,padding:"7px 12px",cursor:"pointer",display:"flex",alignItems:"center",gap:6}}>
          <I n="switch" s={14} c="var(--textMuted)"/>
          <span style={{fontSize:11,fontWeight:700,color:"var(--textMuted)"}}>Switch</span>
        </button>
      ):null}/>
      {currentTeacher&&(
        <div style={{padding:"0 16px 14px"}}>
          <div style={{background:`linear-gradient(135deg,${ROLE_INFO[currentTeacher.role]?.color||"#1e3a8a"},${ROLE_INFO[currentTeacher.role]?.color||"#1e3a8a"}dd)`,borderRadius:16,padding:"14px 16px",display:"flex",alignItems:"center",gap:12,color:"#fff"}}>
            <div style={{width:38,height:38,borderRadius:12,background:"rgba(255,255,255,.2)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:15,fontWeight:900}}>{currentTeacher.name[0].toUpperCase()}</div>
            <div style={{flex:1}}>
              <div style={{fontSize:14,fontWeight:800}}>{currentTeacher.name}</div>
              <div style={{fontSize:11,opacity:.8}}>{ROLE_INFO[currentTeacher.role]?.label||"Teacher"} · Logged in</div>
            </div>
          </div>
        </div>
      )}
      <div style={{padding:"0 16px 24px"}}>
        <div style={{position:"relative",marginBottom:14}}>
          <div style={{position:"absolute",left:13,top:"50%",transform:"translateY(-50%)",display:"flex",pointerEvents:"none"}}><I n="search" s={17} c="var(--textFaint)"/></div>
          <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search for a feature…" aria-label="Search features" style={{width:"100%",boxSizing:"border-box",padding:"12px 14px 12px 40px",border:"1.5px solid var(--cardBorder)",borderRadius:14,fontSize:14,color:"var(--text)",background:"var(--card)",outline:"none",fontFamily:"inherit"}}/>
        </div>

        {term?(
          results.length===0?(
            <div style={{textAlign:"center",padding:"36px 0",color:"var(--textFaint)",fontSize:13}}>Nothing matches “{q.trim()}”</div>
          ):(
            <div style={listCard}>{results.map((it,i)=><Row key={itemKey(it)} it={it} last={i===results.length-1} showCat/>)}</div>
          )
        ):(
          <>
            {attentionTotal>0&&(
              <button onClick={()=>setSub("notifications")} style={{width:"100%",textAlign:"left",background:"linear-gradient(135deg,#fff7e0,#ffeeba)",border:"1.5px solid #f5d27a",borderRadius:18,padding:"13px 16px",marginBottom:14,display:"flex",alignItems:"center",gap:12,cursor:"pointer",fontFamily:"inherit"}}>
                <div style={{width:38,height:38,borderRadius:12,background:"#f5b93a",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><I n="bell" s={19} c="#5b3a00"/></div>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{fontSize:14,fontWeight:800,color:"#5b3a00"}}>{attentionTotal} waiting for you</div>
                  <div style={{fontSize:12,color:"#8a5a00",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{attention.slice(0,3).map(a=>a.label).join(", ")}{attention.length>3?` +${attention.length-3} more`:""}</div>
                </div>
                <span style={{fontSize:12,fontWeight:800,color:"#5b3a00"}}>Review</span>
              </button>
            )}
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
              {shownCats.map((c,i)=>{
                const its=items.filter(x=>x.cat===c.id);
                const b=catBadge(c.id);
                const wide=shownCats.length%2===1&&i===shownCats.length-1;
                return(
                  <button key={c.id} onClick={()=>setCat(c.id)} style={{gridColumn:wide?"1 / -1":undefined,textAlign:"left",background:"var(--card)",border:"1.5px solid var(--cardBorder)",borderRadius:20,padding:"16px 14px 14px",cursor:"pointer",fontFamily:"inherit",boxShadow:"0 2px 10px var(--shadow)",display:"flex",flexDirection:"column",gap:12,minHeight:wide?0:136}}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
                      <div style={{background:c.c+"18",borderRadius:15,padding:12,display:"flex"}}><I n={c.icon} s={23} c={c.c}/></div>
                      {b>0&&<span style={{background:"#ef4444",color:"#fff",borderRadius:20,minWidth:22,height:22,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:800,padding:"0 6px"}}>{b}</span>}
                    </div>
                    <div>
                      <div style={{fontWeight:800,color:"var(--text)",fontSize:16}}>{c.label}</div>
                      <div style={{fontSize:11.5,color:"var(--textFaint)",lineHeight:1.45,marginTop:3}}>{its.slice(0,3).map(x=>x.label).join(", ")}{its.length>3?` +${its.length-3} more`:""}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

// ══════════════════════════════════════════════════════════════
// SHIFTS — with Student Assignment Panel
// ══════════════════════════════════════════════════════════════
const Shifts=({store,toast,onBack,currentTeacher})=>{
  const{students,setStudents,shifts:allShifts,setShifts,teachers,setTeachers}=store;
  const isLimited=currentTeacher&&currentTeacher.role==="teacher";
  const scopedIds=isLimited&&currentTeacher.allowedShiftIds?.length?currentTeacher.allowedShiftIds:null;
  const shifts=scopedIds?allShifts.filter(sh=>scopedIds.includes(sh.id)):allShifts;
  const[sub,setSub]=useState(null); // null | "assign" | "form"
  const[editing,setEditing]=useState(null);
  const[focusShift,setFocusShift]=useState(null);
  const blank={name:"",start:"09:00",end:"11:00",days:["Mon","Tue","Wed","Thu","Fri"],capacity:20,customTiming:false,perDayTimes:{},dayTeachers:{}};
  const[form,setForm]=useState(blank);
  const sf=(k,v)=>setForm(f=>({...f,[k]:v}));
  const toggleDay=d=>sf("days",form.days.includes(d)?form.days.filter(x=>x!==d):[...form.days,d]);
  const setDayTime=(d,which,v)=>setForm(f=>({...f,perDayTimes:{...f.perDayTimes,[d]:{...f.perDayTimes[d],start:f.perDayTimes[d]?.start||f.start,end:f.perDayTimes[d]?.end||f.end,[which]:v}}}));
  const setDayTeacher=(d,teacherId)=>{
    if(teacherId){
      const clash=teacherConflict(teacherId,d);
      if(clash){
        const tname=activeTeacherAccounts.find(t=>t.id===teacherId)?.name||"This teacher";
        toast.error(`${tname} already teaches "${clash.name}" at an overlapping time on ${d} — can't double-book`,"Scheduling Conflict");
        return;
      }
    }
    setForm(f=>({...f,dayTeachers:{...f.dayTeachers,[d]:teacherId||undefined}}));
  };
  const activeTeacherAccounts=(teachers||[]).filter(t=>!t.archived&&t.role==="teacher");

  // ── Double-booking protection: a teacher can't be assigned to two batches
  // at overlapping times on the same day ──
  const getFormDayTime=d=>form.customTiming&&form.perDayTimes?.[d]?{start:form.perDayTimes[d].start||form.start,end:form.perDayTimes[d].end||form.end}:{start:form.start,end:form.end};
  const teacherConflict=(teacherId,d)=>{
    if(!teacherId) return null;
    const{start,end}=getFormDayTime(d);
    if(!start||!end) return null;
    for(const other of allShifts){
      if(editing&&other.id===editing.id) continue;
      if(!other.days?.includes(d)) continue;
      const otherDayTeacher=getDayTeacherId(other,d);
      const teaches=otherDayTeacher?otherDayTeacher===teacherId:teachersForShift(other.id,teachers||[]).some(t=>t.id===teacherId);
      if(!teaches) continue;
      const ot=getShiftTime(other,d);
      if(!ot.start||!ot.end) continue;
      if(timeRangesOverlap(start,end,ot.start,ot.end)) return other;
    }
    return null;
  };

  const openEdit=sh=>{setForm({...blank,...sh,perDayTimes:sh.perDayTimes||{},dayTeachers:sh.dayTeachers||{}});setEditing(sh);setSub("form");};
  const closeForm=()=>{setSub(null);setEditing(null);setForm(blank);};
  const submitShift=()=>{
    if(!form.name.trim()) return toast.error("Shift name is required");
    for(const d of form.days){
      const tid=form.dayTeachers?.[d];
      if(!tid) continue;
      const clash=teacherConflict(tid,d);
      if(clash){
        const tname=activeTeacherAccounts.find(t=>t.id===tid)?.name||"This teacher";
        return toast.error(`${tname} already teaches "${clash.name}" at an overlapping time on ${d}`,"Scheduling Conflict");
      }
    }
    const shiftId=editing?editing.id:uid();
    // Auto-grant access: any teacher assigned to a specific day should have this shift in their allowed batches
    const assignedTeacherIds=[...new Set(Object.values(form.dayTeachers||{}).filter(Boolean))];
    if(assignedTeacherIds.length){
      setTeachers(ts=>ts.map(t=>{
        if(!assignedTeacherIds.includes(t.id))return t;
        if(!t.allowedShiftIds?.length)return t; // already has access to all batches
        if(t.allowedShiftIds.includes(shiftId))return t;
        return{...t,allowedShiftIds:[...t.allowedShiftIds,shiftId]};
      }));
    }
    if(editing){setShifts(ss=>ss.map(s=>s.id===editing.id?{...s,...form}:s));toast.success("Shift updated","Updated");}
    else{setShifts(ss=>[...ss,{...form,id:shiftId}]);toast.success("Shift created successfully","Created!");}
    closeForm();
  };
  const delShift=id=>{
    setStudents(ss=>ss.map(s=>{
      const ids=getShiftIds(s);
      if(!ids.includes(id))return s;
      const next=ids.filter(x=>x!==id);
      return{...s,shiftIds:next,shiftId:next[0]||""};
    }));
    setShifts(ss=>ss.filter(s=>s.id!==id));
    toast.info("Shift deleted","Deleted");
  };
  const autoDiv=()=>{
    if(!shifts.length) return toast.error("Create at least one shift first");
    const act=students.filter(s=>!s.archived);
    let idx=0;
    setStudents(ss=>ss.map(s=>{if(s.archived)return s;const shId=shifts[idx%shifts.length].id;idx++;return{...s,shiftId:shId,shiftIds:[shId]};}));
    toast.success(`${act.length} students auto-divided into ${shifts.length} shifts`,"Auto Divided!");
  };

  // ── ASSIGN PANEL ──
  if(sub==="assign"){
    const active=(isLimited&&scopedIds?students.filter(s=>!s.archived&&(!getShiftIds(s).length||getShiftIds(s).some(id=>scopedIds.includes(id)))):students.filter(s=>!s.archived));
    const assignTo=(studentId,shiftId)=>{
      const stu=students.find(s=>s.id===studentId);
      const cur=stu?getShiftIds(stu):[];
      if(!cur.includes(shiftId)){
        const newSh=allShifts.find(s=>s.id===shiftId);
        for(const otherId of cur){
          const other=allShifts.find(s=>s.id===otherId);
          if(!other||!newSh) continue;
          const sharedDays=(newSh.days||[]).filter(d=>other.days?.includes(d));
          for(const d of sharedDays){
            const t1=getShiftTime(newSh,d),t2=getShiftTime(other,d);
            if(t1.start&&t1.end&&t2.start&&t2.end&&timeRangesOverlap(t1.start,t1.end,t2.start,t2.end)){
              toast.error(`${stu.name} is already in "${other.name}" which runs ${fmtTime(t2.start)}–${fmtTime(t2.end)} on ${d} — same time as "${newSh.name}" (${fmtTime(t1.start)}–${fmtTime(t1.end)}). A student can't attend two classes at once.`,"Can't Assign");
              return;
            }
          }
        }
      }
      setStudents(ss=>ss.map(s=>{
        if(s.id!==studentId)return s;
        const c=getShiftIds(s);
        const next=c.includes(shiftId)?c.filter(x=>x!==shiftId):[...c,shiftId];
        return{...s,shiftIds:next,shiftId:next[0]||""};
      }));
    };
    const clearAll=studentId=>{
      setStudents(ss=>ss.map(s=>s.id===studentId?{...s,shiftIds:[],shiftId:""}:s));
    };
    return(
      <div>
        <PageHeader title="Assign Students" onBack={()=>setSub(null)} right={
          !isLimited?<Btn onClick={autoDiv} sm c="#f59e0b"><I n="shuffle" s={13}/> Auto</Btn>:null
        }/>
        <div style={{padding:"0 16px 24px"}}>
          <div style={{background:"#ede9fe",borderRadius:12,padding:"10px 14px",marginBottom:16,fontSize:13,color:"#5b21b6",fontWeight:600}}>
            {isLimited?"You can only assign students within the batches assigned to you.":"Tap a batch badge to add a student to it, or tap again to remove — a student can be in multiple batches at once."}
          </div>
          {/* Shift columns overview */}
          <div style={{display:"flex",gap:8,marginBottom:16,overflowX:"auto",paddingBottom:4}}>
            {shifts.map((sh,i)=>{
              const col=getShiftColor(i);
              const cnt=active.filter(s=>hasShift(s,sh.id)).length;
              return(
                <div key={sh.id} style={{background:col.bg,border:`2px solid ${col.dot}30`,borderRadius:12,padding:"10px 14px",minWidth:110,flexShrink:0,textAlign:"center"}}>
                  <div style={{width:8,height:8,borderRadius:"50%",background:col.dot,margin:"0 auto 6px"}}/>
                  <div style={{fontWeight:800,fontSize:12,color:col.text}}>{sh.name}</div>
                  <div style={{fontSize:20,fontWeight:900,color:col.dot,margin:"4px 0"}}>{cnt}</div>
                  <div style={{fontSize:10,color:col.text,opacity:.7}}>students</div>
                </div>
              );
            })}
            <div style={{background:"#f1f5f9",borderRadius:12,padding:"10px 14px",minWidth:110,flexShrink:0,textAlign:"center"}}>
              <div style={{width:8,height:8,borderRadius:"50%",background:"#94a3b8",margin:"0 auto 6px"}}/>
              <div style={{fontWeight:800,fontSize:12,color:"#64748b"}}>No Shift</div>
              <div style={{fontSize:20,fontWeight:900,color:"#94a3b8",margin:"4px 0"}}>{active.filter(s=>getShiftIds(s).filter(id=>shifts.some(sh=>sh.id===id)).length===0).length}</div>
              <div style={{fontSize:10,color:"#64748b",opacity:.7}}>students</div>
            </div>
          </div>
          {/* Student list with shift selector */}
          {active.length===0&&<div style={{textAlign:"center",padding:"40px 0",color:"#94a3b8",fontSize:14}}>No students to assign</div>}
          {active.map(s=>{
            const curIds=getShiftIds(s);
            const curShifts=curIds.map(id=>allShifts.find(sh=>sh.id===id)).filter(Boolean);
            const curIdx=shifts.findIndex(sh=>sh.id===curIds[0]);
            const col=curIdx>=0?getShiftColor(curIdx):null;
            return(
              <div key={s.id} style={{background:"#fff",borderRadius:14,padding:"12px 14px",marginBottom:10,border:"1.5px solid #eef2ff",boxShadow:"0 2px 6px rgba(0,0,0,.04)"}}>
                <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:10}}>
                  <div style={{width:38,height:38,borderRadius:11,background:col?`linear-gradient(${col.grad})`:"linear-gradient(135deg,#94a3b8,#64748b)",display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontSize:14,fontWeight:900,flexShrink:0}}>{s.name[0].toUpperCase()}</div>
                  <div>
                    <div style={{fontWeight:800,fontSize:14,color:"#0f0a2e"}}>{s.name}</div>
                    <div style={{fontSize:11,color:"#94a3b8"}}>Currently: <span style={{color:col?.dot||"#94a3b8",fontWeight:700}}>{curShifts.length?curShifts.map(sh=>sh.name).join(", "):"Unassigned"}</span></div>
                  </div>
                </div>
                <div style={{display:"flex",gap:7,flexWrap:"wrap"}}>
                  {shifts.map((sh,i)=>{
                    const c=getShiftColor(i);
                    const isActive=hasShift(s,sh.id);
                    return(
                      <button key={sh.id} onClick={()=>assignTo(s.id,sh.id)} style={{padding:"6px 12px",borderRadius:20,border:`2px solid ${isActive?c.dot:"#e2e8f0"}`,background:isActive?c.bg:"#fff",color:isActive?c.text:"#64748b",fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:"inherit",display:"flex",alignItems:"center",gap:5}}>
                        {isActive&&<I n="check" s={11} c={c.dot}/>}
                        {sh.name}
                      </button>
                    );
                  })}
                  {curIds.length>0&&<button onClick={()=>clearAll(s.id)} style={{padding:"6px 12px",borderRadius:20,border:"2px solid #e2e8f0",background:"#fff",color:"#64748b",fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>Clear all</button>}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // ── MAIN SHIFTS LIST ──
  const active=students.filter(s=>!s.archived);
  return(
    <div>
      <PageHeader title={isLimited?"My Batches":"Shifts"} onBack={onBack} right={
        <div style={{display:"flex",gap:7}}>
          <Btn onClick={()=>setSub("assign")} sm c="#2563eb"><I n="assign" s={13}/> Assign</Btn>
          {!isLimited&&<Btn onClick={()=>{setForm(blank);setEditing(null);setSub("form");}} sm><I n="plus" s={13}/> Add</Btn>}
        </div>
      }/>
      <div style={{padding:"0 16px 24px"}}>
        {isLimited&&<div style={{background:"#ecfeff",border:"1.5px solid #a5f3fc",borderRadius:12,padding:"10px 14px",marginBottom:16,fontSize:12,color:"#0e7490",fontWeight:600,lineHeight:1.5}}>
          You can edit timing/days and assign students only for the batches your admin has given you access to. Ask your admin to add or remove batches.
        </div>}
        {shifts.length===0&&<div style={{textAlign:"center",padding:"50px 20px"}}>
          <div style={{fontSize:48,marginBottom:12}}>📚</div>
          <div style={{fontWeight:800,fontSize:16,color:"#0f0a2e",marginBottom:6}}>{isLimited?"No batches assigned to you yet":"No shifts yet"}</div>
          <div style={{fontSize:13,color:"#94a3b8",marginBottom:20}}>{isLimited?"Ask your admin to assign a batch to your account":"Create a batch to organise students"}</div>
          {!isLimited&&<Btn onClick={()=>setSub("form")}><I n="plus" s={14}/> Create Shift</Btn>}
        </div>}
        {!isLimited&&shifts.length>0&&<div style={{display:"flex",gap:10,marginBottom:16,overflowX:"auto",paddingBottom:4}}>
          <Btn onClick={autoDiv} sm c="#f59e0b" outline><I n="shuffle" s={13}/> Auto Divide All</Btn>
          <Btn onClick={()=>setSub("assign")} sm c="#2563eb"><I n="assign" s={13}/> Assign Students</Btn>
        </div>}
        {shifts.map((sh,idx)=>{
          const cnt=active.filter(s=>hasShift(s,sh.id)).length;
          const names=active.filter(s=>hasShift(s,sh.id)).map(s=>s.name);
          const col=getShiftColor(idx);
          const pct=Math.round((cnt/Math.max(1,sh.capacity))*100);
          return(
            <div key={sh.id} style={{background:"#fff",borderRadius:16,padding:"16px",marginBottom:12,border:"1.5px solid #eef2ff",boxShadow:"0 2px 8px rgba(30,58,138,.05)"}}>
              <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",marginBottom:12}}>
                <div style={{display:"flex",gap:10,alignItems:"center"}}>
                  <div style={{width:10,height:10,borderRadius:"50%",background:col.dot,marginTop:4,flexShrink:0}}/>
                  <div>
                    <div style={{fontWeight:900,color:"#0f0a2e",fontSize:15}}>{sh.name}</div>
                    <div style={{fontSize:12,color:sh.customTiming?"#1e3a8a":"#94a3b8",marginTop:2,fontWeight:sh.customTiming?700:400}}>{shiftTimingLabel(sh)}</div>
                    {sh.customTiming&&<div style={{display:"flex",flexWrap:"wrap",gap:4,marginTop:5}}>
                      {(sh.days||[]).map(d=>{const t=getShiftTime(sh,d);return <span key={d} style={{background:"#eef2ff",color:"#4338ca",borderRadius:6,padding:"2px 7px",fontSize:10,fontWeight:700}}>{d} {fmtTime(t.start)}–{fmtTime(t.end)}</span>;})}
                    </div>}
                    {sh.dayTeachers&&Object.values(sh.dayTeachers).some(Boolean)&&<div style={{display:"flex",flexWrap:"wrap",gap:4,marginTop:5}}>
                      {(sh.days||[]).map(d=>{const tid=sh.dayTeachers?.[d]; if(!tid)return null; const t=(teachers||[]).find(x=>x.id===tid); return <span key={d} style={{background:"#fce7f3",color:"#be185d",borderRadius:6,padding:"2px 7px",fontSize:10,fontWeight:700}}>{d}: {t?.name||"?"}</span>;})}
                    </div>}
                  </div>
                </div>
                <div style={{display:"flex",gap:6}}>
                  <button onClick={()=>openEdit(sh)} style={{background:"#ede9fe",border:"none",borderRadius:9,padding:"7px 9px",cursor:"pointer"}}><I n="edit" s={14} c="#1e3a8a"/></button>
                  {!isLimited&&<button onClick={()=>delShift(sh.id)} style={{background:"#fee2e2",border:"none",borderRadius:9,padding:"7px 9px",cursor:"pointer"}}><I n="trash" s={14} c="#ef4444"/></button>}
                </div>
              </div>
              <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:10}}>
                {(sh.days||[]).map(d=><span key={d} style={{background:col.bg,color:col.text,borderRadius:6,padding:"2px 9px",fontSize:11,fontWeight:700}}>{d}</span>)}
              </div>
              {/* Capacity bar */}
              <div style={{marginBottom:6}}>
                <div style={{display:"flex",justifyContent:"space-between",fontSize:12,color:"#64748b",marginBottom:4}}>
                  <span>{cnt} of {sh.capacity} students</span>
                  <span style={{color:pct>=90?"#ef4444":pct>=70?"#f59e0b":"#10b981",fontWeight:700}}>{pct}% full</span>
                </div>
                <div style={{background:"#f1f5f9",borderRadius:6,height:6,overflow:"hidden"}}>
                  <div style={{background:pct>=90?"#ef4444":pct>=70?"#f59e0b":col.dot,height:"100%",width:`${Math.min(100,pct)}%`,borderRadius:6,transition:"width .3s"}}/>
                </div>
              </div>
              {names.length>0&&<div style={{fontSize:12,color:"#94a3b8",display:"flex",flexWrap:"wrap",gap:5,marginTop:6}}>
                {names.slice(0,5).map(n=><span key={n} style={{background:col.bg,color:col.text,borderRadius:6,padding:"2px 8px",fontSize:11,fontWeight:600}}>{n}</span>)}
                {names.length>5&&<span style={{fontSize:11,color:"#94a3b8",padding:"2px 8px"}}>+{names.length-5} more</span>}
              </div>}
            </div>
          );
        })}
      </div>
      {sub==="form"&&(
        <Sheet title={editing?"Edit Shift":"Create New Shift"} onClose={closeForm}>
          <Inp label="Shift Name" value={form.name} onChange={v=>sf("name",v)} req placeholder="e.g. Morning Batch"/>
          <div style={{marginBottom:14}}>
            <label style={{display:"block",fontSize:11,fontWeight:700,color:"#64748b",marginBottom:8,textTransform:"uppercase",letterSpacing:.6}}>Days</label>
            <div style={{display:"flex",gap:7,flexWrap:"wrap"}}>
              {DAYS_ALL.map(d=><button key={d} onClick={()=>toggleDay(d)} style={{padding:"6px 11px",borderRadius:8,border:`2px solid ${form.days?.includes(d)?"#1e3a8a":"#e2e8f0"}`,background:form.days?.includes(d)?"#1e3a8a":"#fff",color:form.days?.includes(d)?"#fff":"#64748b",fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>{d}</button>)}
            </div>
          </div>
          <button onClick={()=>sf("customTiming",!form.customTiming)} style={{display:"flex",alignItems:"center",gap:8,background:"none",border:"none",cursor:"pointer",padding:"4px 0 14px",fontFamily:"inherit",width:"100%"}}>
            <div style={{width:38,height:22,borderRadius:20,background:form.customTiming?"#1e3a8a":"#e2e8f0",position:"relative",transition:"background .2s",flexShrink:0}}>
              <div style={{width:16,height:16,borderRadius:"50%",background:"#fff",position:"absolute",top:3,left:form.customTiming?19:3,transition:"left .2s",boxShadow:"0 1px 3px rgba(0,0,0,.2)"}}/>
            </div>
            <span style={{fontSize:12,fontWeight:700,color:"#374151",textAlign:"left"}}>Different timing for each day <span style={{color:"#94a3b8",fontWeight:600}}>(e.g. Sunday 10–12, Mon–Fri 5–7)</span></span>
          </button>
          {form.customTiming&&form.days.length>0&&(
            <div style={{marginBottom:14,background:"#f8fafc",borderRadius:14,padding:"12px 14px",border:"1.5px solid #e2e8f0"}}>
              {form.days.map(d=>{
                const dt=form.perDayTimes[d]||{start:form.start,end:form.end};
                return(
                  <div key={d} style={{display:"flex",alignItems:"center",gap:10,marginBottom:10}}>
                    <div style={{width:38,fontSize:12,fontWeight:800,color:"#374151",flexShrink:0}}>{d}</div>
                    <input type="time" value={dt.start} onChange={e=>setDayTime(d,"start",e.target.value)} style={{flex:1,padding:"8px 10px",borderRadius:9,border:"1.5px solid #e2e8f0",fontSize:12,color:"#374151",outline:"none",fontFamily:"inherit",minWidth:0}}/>
                    <span style={{color:"#94a3b8",fontSize:11}}>to</span>
                    <input type="time" value={dt.end} onChange={e=>setDayTime(d,"end",e.target.value)} style={{flex:1,padding:"8px 10px",borderRadius:9,border:"1.5px solid #e2e8f0",fontSize:12,color:"#374151",outline:"none",fontFamily:"inherit",minWidth:0}}/>
                  </div>
                );
              })}
            </div>
          )}
          {!form.customTiming&&<div style={{display:"flex",gap:10}}>
            <div style={{flex:1}}><Inp label="Start Time" value={form.start} onChange={v=>sf("start",v)} type="time"/></div>
            <div style={{flex:1}}><Inp label="End Time" value={form.end} onChange={v=>sf("end",v)} type="time"/></div>
          </div>}
          {!isLimited&&form.days.length>0&&(
            <div style={{marginTop:14,marginBottom:14}}>
              <label style={{display:"block",fontSize:11,fontWeight:700,color:"#64748b",marginBottom:6,textTransform:"uppercase",letterSpacing:.6}}>Assign Teacher Per Day</label>
              <div style={{fontSize:11,color:"#94a3b8",marginBottom:10,lineHeight:1.4}}>Split this batch between two teachers — e.g. Teacher A on Mon/Wed/Fri, Teacher B on Tue/Thu. Leave "Any" if it doesn't matter who's assigned.</div>
              <div style={{background:"#f8fafc",borderRadius:14,padding:"12px 14px",border:"1.5px solid #e2e8f0"}}>
                {form.days.map(d=>(
                  <div key={d} style={{display:"flex",alignItems:"center",gap:10,marginBottom:8}}>
                    <div style={{width:38,fontSize:12,fontWeight:800,color:"#374151",flexShrink:0}}>{d}</div>
                    <select value={form.dayTeachers?.[d]||""} onChange={e=>setDayTeacher(d,e.target.value)} style={{flex:1,padding:"8px 10px",borderRadius:9,border:"1.5px solid #e2e8f0",fontSize:12,color:"#374151",outline:"none",fontFamily:"inherit",background:"#fff"}}>
                      <option value="">Any (shared)</option>
                      {activeTeacherAccounts.map(t=>{const clash=teacherConflict(t.id,d);return <option key={t.id} value={t.id} disabled={!!clash}>{t.name}{clash?` — clash with ${clash.name}`:""}</option>;})}
                    </select>
                  </div>
                ))}
              </div>
              {form.days.some(d=>{const tid=form.dayTeachers?.[d];return tid&&teacherConflict(tid,d);})&&<div style={{fontSize:11,color:"#dc2626",fontWeight:700,marginTop:8}}>⚠️ Resolve the scheduling conflicts above before saving.</div>}
            </div>
          )}
          <Inp label="Max Capacity" value={String(form.capacity)} onChange={v=>sf("capacity",+v)} type="number" placeholder="e.g. 20"/>
          <div style={{display:"flex",gap:10,marginTop:8}}><Btn onClick={closeForm} outline c="#64748b" full>Cancel</Btn><Btn onClick={submitShift} full>{editing?"Save Changes":"Create Shift"}</Btn></div>
        </Sheet>
      )}
    </div>
  );
};

// ══════════════════════════════════════════════════════════════
// SCHEDULE — Monthly calendar per shift
// ══════════════════════════════════════════════════════════════
const Schedule=({store,onBack,currentTeacher})=>{
  const{students:allStudents,shifts:allShifts}=store;
  const isLimited=currentTeacher&&currentTeacher.role==="teacher";
  const scopedIds=isLimited&&currentTeacher.allowedShiftIds?.length?currentTeacher.allowedShiftIds:null;
  const shifts=scopedIds?allShifts.filter(sh=>scopedIds.includes(sh.id)):allShifts;
  const students=scopedIds?allStudents.filter(s=>getShiftIds(s).some(id=>scopedIds.includes(id))):allStudents;
  const active=students.filter(s=>!s.archived);
  const now=new Date();
  const hm=`${String(now.getHours()).padStart(2,"0")}:${String(now.getMinutes()).padStart(2,"0")}`;
  const dayAbbr=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"][now.getDay()];
  const[viewMK,setViewMK]=useState(()=>curMK());
  const[selectedShift,setSelectedShift]=useState("all");
  const[mkY,mkM]=viewMK.split("-").map(Number);
  const todayShifts=shifts.filter(sh=>sh.days?.includes(dayAbbr)&&(!isLimited||teacherVisibleForDay(sh,dayAbbr,currentTeacher?.id))).map(sh=>({...sh,...getShiftTime(sh,dayAbbr)}));

  // Build calendar grid for the month
  const firstDay=new Date(mkY,mkM-1,1).getDay(); // 0=Sun
  const daysInMonth=new Date(mkY,mkM,0).getDate();
  const cells=[];
  for(let i=0;i<firstDay;i++) cells.push(null);
  for(let d=1;d<=daysInMonth;d++) cells.push(d);
  while(cells.length%7!==0) cells.push(null);

  const monthOpts=[];
  for(let i=-1;i<6;i++){const d=new Date();d.setMonth(d.getMonth()+i);monthOpts.push({v:mkKey(d.getFullYear(),d.getMonth()+1),l:monthLabel(mkKey(d.getFullYear(),d.getMonth()+1))});}

  const filteredShifts=selectedShift==="all"?shifts:shifts.filter(sh=>sh.id===selectedShift);

  // which days of month have a class (for selected shifts)
  const classDays=new Set();
  filteredShifts.forEach(sh=>{
    for(let d=1;d<=daysInMonth;d++){
      const abbr=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"][new Date(mkY,mkM-1,d).getDay()];
      if(sh.days?.includes(abbr)) classDays.add(d);
    }
  });

  return(
    <div>
      <PageHeader title="Schedule" onBack={onBack}/>
      <div style={{padding:"0 16px 24px"}}>

        {/* TODAY SECTION */}
        <div style={{fontWeight:800,fontSize:12,color:"#1e3a8a",marginBottom:10,textTransform:"uppercase",letterSpacing:.7}}>
          Today — {now.toLocaleDateString("en-IN",{weekday:"long",day:"numeric",month:"long"})}
        </div>
        {todayShifts.length===0&&<div style={{background:"#f8faff",borderRadius:12,padding:"14px",marginBottom:16,fontSize:13,color:"#94a3b8",textAlign:"center"}}>No classes scheduled today</div>}
        {todayShifts.map((sh,i)=>{
          const isActive=hm>=sh.start&&hm<=sh.end,isPast=hm>sh.end;
          const ss=active.filter(s=>hasShift(s,sh.id));
          const col=getShiftColor(i);
          return(
            <div key={sh.id} style={{background:"#fff",borderRadius:16,padding:"14px 16px",marginBottom:10,border:`2px solid ${isActive?col.dot:"#eef2ff"}`}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
                <div style={{display:"flex",alignItems:"center",gap:8}}>
                  <div style={{width:10,height:10,borderRadius:"50%",background:col.dot}}/>
                  <div><div style={{fontWeight:800,color:"#0f0a2e",fontSize:14}}>{sh.name}</div><div style={{fontSize:12,color:"#94a3b8"}}>{fmtTime(sh.start)} – {fmtTime(sh.end)} · {ss.length} students</div></div>
                </div>
                {isActive?<Badge s="present"/>:isPast?<span style={{fontSize:11,color:"#94a3b8",fontWeight:700}}>DONE</span>:<span style={{fontSize:11,color:"#f59e0b",fontWeight:700,background:"#fef9c3",padding:"3px 9px",borderRadius:8}}>UPCOMING</span>}
              </div>
              <div style={{display:"flex",flexWrap:"wrap",gap:5}}>
                {ss.map(s=><span key={s.id} style={{background:col.bg,color:col.text,borderRadius:7,padding:"3px 10px",fontSize:11,fontWeight:700}}>{s.name}</span>)}
                {ss.length===0&&<span style={{fontSize:12,color:"#94a3b8"}}>No students assigned</span>}
              </div>
            </div>
          );
        })}

        {/* MONTHLY CALENDAR */}
        <div style={{fontWeight:800,fontSize:12,color:"#64748b",marginTop:20,marginBottom:12,textTransform:"uppercase",letterSpacing:.7}}>Monthly Class Calendar</div>
        <div style={{display:"flex",gap:8,marginBottom:12}}>
          <select value={viewMK} onChange={e=>setViewMK(e.target.value)} style={{flex:1,padding:"9px 12px",border:"1.5px solid #e2e8f0",borderRadius:11,fontSize:13,color:"#0f0a2e",background:"#fff",outline:"none",fontWeight:700,fontFamily:"inherit"}}>
            {monthOpts.map(o=><option key={o.v} value={o.v}>{o.l}</option>)}
          </select>
          <select value={selectedShift} onChange={e=>setSelectedShift(e.target.value)} style={{flex:1,padding:"9px 12px",border:"1.5px solid #e2e8f0",borderRadius:11,fontSize:13,color:"#0f0a2e",background:"#fff",outline:"none",fontWeight:700,fontFamily:"inherit"}}>
            <option value="all">All Shifts</option>
            {shifts.map(sh=><option key={sh.id} value={sh.id}>{sh.name}</option>)}
          </select>
        </div>

        {/* Calendar Grid */}
        <div style={{background:"#fff",borderRadius:16,padding:"16px",border:"1.5px solid #eef2ff",marginBottom:16}}>
          <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:4,marginBottom:8}}>
            {["S","M","T","W","T","F","S"].map((d,i)=>(
              <div key={i} style={{textAlign:"center",fontSize:11,fontWeight:800,color:"#94a3b8",padding:"4px 0"}}>{d}</div>
            ))}
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:4}}>
            {cells.map((d,i)=>{
              if(!d) return <div key={i}/>;
              const date=new Date(mkY,mkM-1,d);
              const isToday=d===now.getDate()&&mkY===now.getFullYear()&&mkM===now.getMonth()+1;
              const hasClass=classDays.has(d);
              const isPast=date<new Date(now.getFullYear(),now.getMonth(),now.getDate());
              return(
                <div key={i} style={{textAlign:"center",padding:"6px 2px",borderRadius:10,background:isToday?"#1e3a8a":hasClass?(!isPast?"#ede9fe":"#f1f5f9"):"transparent",position:"relative"}}>
                  <div style={{fontSize:13,fontWeight:isToday?900:hasClass?700:400,color:isToday?"#fff":hasClass?(!isPast?"#5b21b6":"#94a3b8"):"#64748b"}}>{d}</div>
                  {hasClass&&!isToday&&<div style={{width:4,height:4,borderRadius:"50%",background:isPast?"#cbd5e1":"#7c3aed",margin:"2px auto 0"}}/>}
                </div>
              );
            })}
          </div>
        </div>

        {/* Shift-wise class count */}
        {filteredShifts.map((sh,i)=>{
          const col=getShiftColor(shifts.indexOf(sh));
          const cnt=classesInMonth(sh,mkY,mkM);
          const studs=active.filter(s=>hasShift(s,sh.id)).length;
          return(
            <div key={sh.id} style={{background:"#fff",borderRadius:14,padding:"14px 16px",marginBottom:10,border:"1.5px solid #eef2ff",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
              <div>
                <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4}}>
                  <div style={{width:8,height:8,borderRadius:"50%",background:col.dot}}/>
                  <div style={{fontWeight:800,color:"#0f0a2e",fontSize:14}}>{sh.name}</div>
                </div>
                <div style={{fontSize:12,color:"#94a3b8"}}>{(sh.days||[]).join(", ")} · {shiftTimingLabel(sh)}</div>
                <div style={{fontSize:12,color:"#94a3b8",marginTop:2}}>{studs} students assigned</div>
              </div>
              <div style={{textAlign:"center",background:col.bg,borderRadius:12,padding:"10px 16px",border:`2px solid ${col.dot}30`}}>
                <div style={{fontSize:26,fontWeight:900,color:col.dot,lineHeight:1}}>{cnt}</div>
                <div style={{fontSize:10,color:col.text,fontWeight:700,marginTop:2}}>CLASSES</div>
              </div>
            </div>
          );
        })}

        {/* Total */}
        {filteredShifts.length>0&&<div style={{background:"linear-gradient(135deg,#0d1b42,#1e3a8a)",borderRadius:14,padding:"14px 18px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div style={{color:"#fff"}}>
            <div style={{fontSize:13,fontWeight:700}}>Total classes in {monthLabel(viewMK)}</div>
            <div style={{fontSize:11,opacity:.6}}>{selectedShift==="all"?"All shifts":shifts.find(s=>s.id===selectedShift)?.name}</div>
          </div>
          <div style={{fontSize:34,fontWeight:900,color:"#fff"}}>{filteredShifts.reduce((a,sh)=>a+classesInMonth(sh,mkY,mkM),0)}</div>
        </div>}

        {/* Weekly pattern */}
        <div style={{fontWeight:800,fontSize:12,color:"#64748b",marginTop:20,marginBottom:10,textTransform:"uppercase",letterSpacing:.7}}>Weekly Pattern</div>
        {DAYS_ALL.map(d=>{
          const ds=filteredShifts.filter(sh=>sh.days?.includes(d)&&(!isLimited||teacherVisibleForDay(sh,d,currentTeacher?.id)));
          if(!ds.length) return null;
          return(
            <div key={d} style={{marginBottom:8}}>
              <div style={{fontSize:11,color:"#94a3b8",fontWeight:800,textTransform:"uppercase",letterSpacing:.6,marginBottom:5}}>{DAY_FULL[d]}</div>
              {ds.map(sh=>{
                const col=getShiftColor(shifts.indexOf(sh));
                const t=getShiftTime(sh,d);
                const tid=sh.dayTeachers?.[d];
                const teacherName=tid?(store.teachers||[]).find(x=>x.id===tid)?.name:null;
                return <div key={sh.id} style={{background:"#fff",borderRadius:11,padding:"10px 14px",marginBottom:5,border:"1.5px solid #eef2ff",display:"flex",justifyContent:"space-between",fontSize:13,alignItems:"center"}}>
                  <div style={{display:"flex",alignItems:"center",gap:8}}><div style={{width:7,height:7,borderRadius:"50%",background:col.dot}}/><div><span style={{fontWeight:700,color:"#0f0a2e"}}>{sh.name}</span>{!isLimited&&teacherName&&<div style={{fontSize:10,color:"#be185d",fontWeight:700,marginTop:1}}>{teacherName}</div>}</div></div>
                  <span style={{color:"#94a3b8"}}>{fmtTime(t.start)}–{fmtTime(t.end)}</span>
                </div>;
              })}
            </div>
          );
        })}
        {shifts.length===0&&<div style={{textAlign:"center",padding:"20px 0",color:"#94a3b8",fontSize:13}}>No shifts created yet.</div>}
      </div>
    </div>
  );
};

// ══════════════════════════════════════════════════════════════
// REPORTS
// ══════════════════════════════════════════════════════════════
// ══════════════════════════════════════════════════════════════
// REPORTS → OVERVIEW TAB
// KPI cards · fee collection bar · attendance & classes by weekday
// ══════════════════════════════════════════════════════════════
const WD_ABBR=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
const WD_ORDER=[1,2,3,4,5,6,0]; // Mon … Sun

// Crunches everything the Overview tab needs in one pass.
//  - month KPIs are for the selected month `mk`
//  - weekday trend covers the last `nMonths` months ending at `mk`
//  - attendance % = present ÷ (present + absent); leave and un-marked days are not counted against a student
const calcOverview=(store,mk,nMonths)=>{
  const{students,shifts,attend,holidays,marks}=store;
  const active=students.filter(s=>!s.archived);
  const today=todayStr();
  const holidaySet=new Set((holidays||[]).map(h=>h.date));
  const[cy,cm]=mk.split("-").map(Number);
  const ds=(y,m,d)=>`${y}-${String(m).padStart(2,"0")}-${String(d).padStart(2,"0")}`;

  const wd=WD_ABBR.map(()=>({classes:0,present:0,absent:0,leave:0}));
  const stu={};
  let sessTotal=0,sessDone=0;
  const scheduledDays=new Set();

  const monthList=[];
  for(let i=nMonths-1;i>=0;i--){const d=new Date(cy,cm-1-i,1);monthList.push([d.getFullYear(),d.getMonth()+1]);}

  shifts.forEach(sh=>{
    if(!active.some(s=>hasShift(s,sh.id))) return; // batch with nobody in it — ignore
    (sh.days||[]).forEach(d=>scheduledDays.add(d));
    monthList.forEach(([y,m])=>{
      const isSel=(y===cy&&m===cm);
      classDaysInMonth(sh,y,m).forEach(day=>{
        const date=ds(y,m,day);
        if(holidaySet.has(date)) return;
        const dow=new Date(y,m-1,day).getDay();
        let marked=false;
        active.forEach(s=>{
          if(!hasShift(s,sh.id)) return;
          if(s.joining&&String(s.joining).slice(0,10)>date) return;
          const st=getAttStatus(attend,s.id,date,sh.id);
          if(!st) return;
          marked=true;
          const w=wd[dow];
          if(st==="present") w.present++; else if(st==="absent") w.absent++; else if(st==="leave") w.leave++;
          if(isSel){
            const a=stu[s.id]||(stu[s.id]={present:0,absent:0,leave:0});
            if(st==="present") a.present++; else if(st==="absent") a.absent++; else if(st==="leave") a.leave++;
          }
        });
        const done=date<today||(date===today&&marked);
        if(isSel){sessTotal++;if(done) sessDone++;}
        if(done) wd[dow].classes++;
      });
    });
  });

  // average attendance of the selected month (each student counts equally)
  const pcts=Object.values(stu).map(a=>{const b=a.present+a.absent;return b>0?a.present/b*100:null;}).filter(v=>v!=null);
  const avgAtt=pcts.length?pcts.reduce((a,b)=>a+b,0)/pcts.length:null;

  // test marks of the selected month (verified ones only)
  const activeIds=new Set(active.map(s=>s.id));
  const mm=(marks||[]).filter(m=>m.status!=="pending"&&activeIds.has(m.studentId)&&String(m.date||"").startsWith(mk)&&+m.maxMarks>0);
  const testAvg=mm.length?mm.reduce((a,m)=>a+m.marksObtained/m.maxMarks*100,0)/mm.length:null;

  // overall performance: attendance 60% + tests 40% (or whichever exists)
  let perf=null;
  if(avgAtt!=null&&testAvg!=null) perf=avgAtt*0.6+testAvg*0.4;
  else if(avgAtt!=null) perf=avgAtt;
  else if(testAvg!=null) perf=testAvg;

  let days=WD_ORDER.map(i=>{
    const w=wd[i],base=w.present+w.absent;
    return{key:WD_ABBR[i],classes:w.classes,pct:base>0?Math.round(w.present/base*1000)/10:null,present:w.present,absent:w.absent};
  });
  const sched=days.filter(d=>scheduledDays.has(d.key)||d.classes>0);
  if(sched.length) days=sched;

  return{active:active.length,avgAtt,testAvg,testCount:mm.length,perf,sessTotal,sessDone,days,markedCount:pcts.length};
};

const perfInfo=v=>v==null?{l:"No data yet",c:"#94a3b8",bg:"#f1f5f9"}
  :v>=85?{l:"Excellent",c:"#059669",bg:"#d1fae5"}
  :v>=70?{l:"Good",c:"#2563eb",bg:"#dbeafe"}
  :v>=50?{l:"Average",c:"#d97706",bg:"#fef3c7"}
  :{l:"Needs Attention",c:"#dc2626",bg:"#fee2e2"};
const attColor=v=>v==null?"#94a3b8":v>=75?"#10b981":v>=50?"#f59e0b":"#ef4444";

// Smooth (monotone cubic) path through points — never overshoots, so % values stay honest
const smoothPath=P=>{
  const n=P.length;
  if(n<2) return "";
  const f=v=>v.toFixed(1);
  if(n===2) return `M${f(P[0].x)} ${f(P[0].y)} L${f(P[1].x)} ${f(P[1].y)}`;
  const dx=[],m=[],t=[];
  for(let i=0;i<n-1;i++){dx[i]=P[i+1].x-P[i].x;m[i]=(P[i+1].y-P[i].y)/dx[i];}
  t[0]=m[0];t[n-1]=m[n-2];
  for(let i=1;i<n-1;i++) t[i]=m[i-1]*m[i]<=0?0:(m[i-1]+m[i])/2;
  for(let i=0;i<n-1;i++){
    if(m[i]===0){t[i]=0;t[i+1]=0;continue;}
    const a=t[i]/m[i],b=t[i+1]/m[i],q=a*a+b*b;
    if(q>9){const k=3/Math.sqrt(q);t[i]=k*a*m[i];t[i+1]=k*b*m[i];}
  }
  let d=`M${f(P[0].x)} ${f(P[0].y)}`;
  for(let i=0;i<n-1;i++){const h=dx[i]/3;d+=` C${f(P[i].x+h)} ${f(P[i].y+t[i]*h)} ${f(P[i+1].x-h)} ${f(P[i+1].y-t[i+1]*h)} ${f(P[i+1].x)} ${f(P[i+1].y)}`;}
  return d;
};

const OvCard=({children,style})=>(
  <div style={{background:"#fff",borderRadius:18,padding:"16px",border:"1.5px solid #eef2ff",boxShadow:"0 2px 10px rgba(30,58,138,.05)",...style}}>{children}</div>
);
const OvTitle=({icon,color,children,right})=>(
  <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",gap:8,marginBottom:12}}>
    <div style={{display:"flex",alignItems:"center",gap:8,minWidth:0}}>
      <div style={{width:28,height:28,borderRadius:9,background:color+"1f",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><I n={icon} s={15} c={color}/></div>
      <span style={{fontWeight:800,color:"#0f0a2e",fontSize:13,textTransform:"uppercase",letterSpacing:.5}}>{children}</span>
    </div>
    {right}
  </div>
);

const OverviewTab=({store,mk,feeRows,totExp,totPaid,currency})=>{
  const[range,setRange]=useState(1);
  const[grow,setGrow]=useState(false);
  const ov=useMemo(()=>calcOverview(store,mk,range),[store.attend,store.students,store.shifts,store.holidays,store.marks,mk,range]); // eslint-disable-line
  useEffect(()=>{setGrow(false);const t=setTimeout(()=>setGrow(true),80);return()=>clearTimeout(t);},[mk,range]);

  const money=n=>`${currency}${Math.round(n).toLocaleString("en-IN")}`;
  const pi=perfInfo(ov.perf);
  const classPct=ov.sessTotal>0?Math.round(ov.sessDone/ov.sessTotal*100):0;
  const feePct=totExp>0?Math.min(100,Math.round(totPaid/totExp*100)):0;
  const cntPaid=feeRows.filter(r=>r.status==="Paid").length;
  const cntPart=feeRows.filter(r=>r.status==="Partially Paid").length;
  const cntPend=feeRows.filter(r=>r.status==="Pending").length;

  // ── chart geometry ──
  const days=ov.days,n=Math.max(1,days.length);
  const W=340,H=210,L=36,R=16,T=24,B=42,pw=W-L-R,ph=H-T-B;
  const band=pw/n;
  const xC=i=>L+band*i+band/2;
  // y-axis zooms to the data (never below 0) so small day-to-day changes are visible
  const pctVals=days.filter(d=>d.pct!=null).map(d=>d.pct);
  const yLo=pctVals.length?Math.max(0,Math.floor((Math.min(...pctVals)-10)/10)*10):0;
  const yTicks=[yLo,Math.round((yLo+100)/2),100];
  const yP=p=>T+ph-((p-yLo)/(100-yLo))*ph;
  const pts=days.map((d,i)=>d.pct==null?null:{x:xC(i),y:yP(d.pct),p:d.pct});
  const valid=pts.filter(Boolean);
  const linePath=smoothPath(valid);
  const areaPath=valid.length>1?`${linePath} L${valid[valid.length-1].x.toFixed(1)} ${T+ph} L${valid[0].x.toFixed(1)} ${T+ph} Z`:"";
  const hasClasses=days.some(d=>d.classes>0);
  const busiest=hasClasses?days.reduce((a,b)=>b.classes>a.classes?b:a):null;
  const withPct=days.filter(d=>d.pct!=null);
  const best=withPct.length?withPct.reduce((a,b)=>b.pct>a.pct?b:a):null;
  const worst=withPct.length>1?withPct.reduce((a,b)=>b.pct<a.pct?b:a):null;

  const kpi=(icon,color,label,value,sub,extra)=>(
    <OvCard style={{padding:"14px 14px 13px",position:"relative",overflow:"hidden"}}>
      <div style={{display:"flex",alignItems:"center",gap:7,marginBottom:9}}>
        <div style={{width:26,height:26,borderRadius:8,background:color+"1f",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><I n={icon} s={14} c={color}/></div>
        <span style={{fontSize:10.5,fontWeight:800,color:"#64748b",textTransform:"uppercase",letterSpacing:.5,lineHeight:1.2}}>{label}</span>
      </div>
      {value}
      {sub&&<div style={{fontSize:11,color:"#94a3b8",marginTop:4,lineHeight:1.35}}>{sub}</div>}
      {extra}
    </OvCard>
  );

  const C=2*Math.PI*18;
  return(
    <div>
      <style>{`
        @keyframes ovStripe{from{background-position:0 0}to{background-position:28px 0}}
        @keyframes ovPop{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
      `}</style>

      {/* ── KPI cards ── */}
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:12,animation:"ovPop .4s both"}}>
        {kpi("users","#2563eb","Total Students",
          <div style={{fontSize:28,fontWeight:900,color:"#0f0a2e",letterSpacing:-.5,lineHeight:1}}>{ov.active}</div>,
          `${store.shifts.length} batch${store.shifts.length!==1?"es":""}`)}
        {kpi("checkbig","#10b981","Avg Attendance",
          <div style={{fontSize:28,fontWeight:900,color:attColor(ov.avgAtt),letterSpacing:-.5,lineHeight:1}}>{ov.avgAtt==null?"—":`${Math.round(ov.avgAtt)}%`}</div>,
          ov.avgAtt==null?"No attendance marked yet":`${monthLabel(mk)} · ${ov.markedCount} student${ov.markedCount!==1?"s":""}`)}
        {kpi("cal","#f59e0b","Classes Completed",
          <div style={{fontSize:28,fontWeight:900,color:"#0f0a2e",letterSpacing:-.5,lineHeight:1}}>{ov.sessDone}<span style={{fontSize:17,fontWeight:800,color:"#94a3b8"}}>/{ov.sessTotal}</span></div>,
          ov.sessTotal>0?`${classPct}% of ${monthLabel(mk)} done`:"No classes scheduled",
          <div style={{height:5,borderRadius:5,background:"#fef3c7",marginTop:8,overflow:"hidden"}}>
            <div style={{height:"100%",width:grow?`${classPct}%`:"0%",borderRadius:5,background:"linear-gradient(90deg,#f59e0b,#fbbf24)",transition:"width .9s cubic-bezier(.2,.8,.2,1)"}}/>
          </div>)}
        {kpi("award",pi.c,"Overall Performance",
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",gap:6}}>
            <div style={{fontSize:28,fontWeight:900,color:pi.c,letterSpacing:-.5,lineHeight:1}}>{ov.perf==null?"—":`${Math.round(ov.perf)}%`}</div>
            {ov.perf!=null&&<svg width="42" height="42" viewBox="0 0 44 44" style={{flexShrink:0}}>
              <circle cx="22" cy="22" r="18" fill="none" stroke="#eef2ff" strokeWidth="5"/>
              <circle cx="22" cy="22" r="18" fill="none" stroke={pi.c} strokeWidth="5" strokeLinecap="round" strokeDasharray={C} strokeDashoffset={grow?C*(1-Math.min(100,ov.perf)/100):C} transform="rotate(-90 22 22)" style={{transition:"stroke-dashoffset 1s cubic-bezier(.2,.8,.2,1)"}}/>
            </svg>}
          </div>,
          <span style={{display:"inline-block",background:pi.bg,color:pi.c,borderRadius:8,padding:"2px 8px",fontSize:10.5,fontWeight:800}}>{pi.l}</span>)}
      </div>
      {ov.perf!=null&&<div style={{fontSize:11,color:"#94a3b8",margin:"-4px 4px 12px",lineHeight:1.5}}>
        Performance = attendance{ov.testAvg!=null?` (60%) + test marks (40%) · tests avg ${Math.round(ov.testAvg)}% from ${ov.testCount} result${ov.testCount!==1?"s":""}`:" only — add test marks to include exam results"}.
      </div>}

      {/* ── Fees collected ── */}
      <OvCard style={{marginBottom:12,animation:"ovPop .4s .08s both"}}>
        <OvTitle icon="wallet" color="#10b981" right={<span style={{background:"#d1fae5",color:"#047857",borderRadius:8,padding:"3px 9px",fontSize:12,fontWeight:900}}>{feePct}%</span>}>Fees Collected</OvTitle>
        <div style={{display:"flex",alignItems:"baseline",gap:6,flexWrap:"wrap",marginBottom:10}}>
          <span style={{fontSize:26,fontWeight:900,color:"#059669",letterSpacing:-.5}}>{money(totPaid)}</span>
          <span style={{fontSize:13,color:"#94a3b8",fontWeight:700}}>of {money(totExp)}</span>
        </div>
        <div style={{height:20,borderRadius:12,background:"#e6f7ee",overflow:"hidden",position:"relative",boxShadow:"inset 0 1px 3px rgba(5,150,105,.12)"}}>
          <div style={{height:"100%",width:grow?`${feePct}%`:"0%",minWidth:grow&&feePct>0?10:0,borderRadius:12,background:"linear-gradient(90deg,#059669,#10b981 55%,#34d399)",transition:"width 1.1s cubic-bezier(.2,.8,.2,1)",position:"relative",overflow:"hidden"}}>
            <div style={{position:"absolute",inset:0,backgroundImage:"repeating-linear-gradient(115deg,rgba(255,255,255,.22) 0 9px,transparent 9px 18px)",backgroundSize:"28px 100%",animation:"ovStripe 1.2s linear infinite"}}/>
          </div>
        </div>
        <div style={{display:"flex",justifyContent:"space-between",fontSize:11,color:"#94a3b8",fontWeight:600,marginTop:5}}>
          <span>{currency}0</span><span>{totExp>totPaid?`${money(totExp-totPaid)} pending`:"Fully collected 🎉"}</span>
        </div>
        <div style={{display:"flex",gap:8,marginTop:12,flexWrap:"wrap"}}>
          {[["Paid",cntPaid,"#059669","#d1fae5"],["Partial",cntPart,"#d97706","#fef3c7"],["Pending",cntPend,"#dc2626","#fee2e2"]].map(([l,c,fg,bg])=>(
            <div key={l} style={{flex:"1 1 0",minWidth:78,background:bg,borderRadius:12,padding:"8px 10px",textAlign:"center"}}>
              <div style={{fontSize:18,fontWeight:900,color:fg,lineHeight:1.1}}>{c}</div>
              <div style={{fontSize:10.5,fontWeight:700,color:fg,opacity:.85}}>{l}</div>
            </div>
          ))}
        </div>
      </OvCard>

      {/* ── Attendance trend by weekday ── */}
      <OvCard style={{animation:"ovPop .4s .16s both"}}>
        <OvTitle icon="trending" color="#2563eb">Attendance Trend</OvTitle>
        <div style={{display:"flex",gap:4,background:"#f1f5f9",borderRadius:11,padding:3,marginBottom:10}}>
          {[[1,"This Month"],[3,"3 Months"],[6,"6 Months"]].map(([v,l])=>(
            <button key={v} onClick={()=>setRange(v)} style={{flex:1,border:"none",borderRadius:8,padding:"7px 4px",fontSize:11.5,fontWeight:800,cursor:"pointer",fontFamily:"inherit",whiteSpace:"nowrap",background:range===v?"#fff":"transparent",color:range===v?"#1e3a8a":"#94a3b8",boxShadow:range===v?"0 1px 3px rgba(0,0,0,.08)":"none"}}>{l}</button>
          ))}
        </div>

        {!hasClasses?(
          <div style={{textAlign:"center",padding:"30px 10px",color:"#94a3b8",fontSize:13,lineHeight:1.6}}>
            <div style={{fontSize:30,marginBottom:6}}>📊</div>No completed classes in this period yet.<br/>The graph appears once classes are held.
          </div>
        ):(
          <>
            <svg viewBox={`0 0 ${W} ${H}`} style={{width:"100%",height:"auto",display:"block"}} role="img" aria-label="Attendance percentage by weekday, line graph">
              <defs>
                <linearGradient id="ovArea" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#10b981" stopOpacity=".26"/><stop offset="1" stopColor="#10b981" stopOpacity="0"/></linearGradient>
              </defs>
              {yTicks.map(g=>(
                <g key={g}>
                  <line x1={L} x2={W-R} y1={yP(g)} y2={yP(g)} stroke="#e8edf7" strokeWidth="1" strokeDasharray={g===yLo?"0":"3 4"}/>
                  <text x={L-6} y={yP(g)+3.5} textAnchor="end" fontSize="9.5" fill="#94a3b8" fontWeight="600">{g}%</text>
                </g>
              ))}
              {days.map((d,i)=>(
                <line key={d.key} x1={xC(i)} x2={xC(i)} y1={T} y2={T+ph} stroke="#f1f5f9" strokeWidth="1"/>
              ))}
              {areaPath&&<path d={areaPath} fill="url(#ovArea)" style={{opacity:grow?1:0,transition:"opacity .8s .5s"}}/>}
              {valid.length>1&&<path d={linePath} fill="none" stroke="#10b981" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" pathLength="1" strokeDasharray="1" strokeDashoffset={grow?0:1} style={{transition:"stroke-dashoffset 1.2s ease .25s"}}/>}
              {pts.map((p,i)=>p&&(
                <g key={i} style={{opacity:grow?1:0,transition:`opacity .4s ${.5+i*.08}s`}}>
                  <circle cx={p.x} cy={p.y} r="4.8" fill={best&&days[i].key===best.key?"#10b981":"#fff"} stroke="#10b981" strokeWidth="2.4"/>
                  <text x={p.x} y={p.y>T+14?p.y-10:p.y+18} textAnchor="middle" fontSize="10" fontWeight="800" fill="#047857">{Math.round(p.p)}%</text>
                </g>
              ))}
              {days.map((d,i)=>(
                <g key={d.key}>
                  <text x={xC(i)} y={T+ph+17} textAnchor="middle" fontSize="11.5" fontWeight="800" fill={busiest&&d.key===busiest.key?"#1e3a8a":"#334155"}>{d.key}</text>
                  <text x={xC(i)} y={T+ph+31} textAnchor="middle" fontSize="9.5" fontWeight="600" fill="#94a3b8">{d.classes} cls</text>
                </g>
              ))}
            </svg>

            <div style={{display:"flex",justifyContent:"center",gap:16,flexWrap:"wrap",marginTop:6,fontSize:11,color:"#64748b",fontWeight:600}}>
              <span style={{display:"flex",alignItems:"center",gap:6}}><span style={{width:16,height:3,borderRadius:3,background:"#10b981"}}/>Attendance %</span>
              <span style={{display:"flex",alignItems:"center",gap:6,color:"#94a3b8"}}>cls = classes held</span>
            </div>

            <div style={{display:"flex",flexDirection:"column",gap:8,marginTop:14}}>
              {busiest&&<div style={{display:"flex",alignItems:"center",gap:10,background:"#eff6ff",borderRadius:12,padding:"9px 12px"}}>
                <I n="cal" s={16} c="#2563eb"/><div style={{fontSize:12,color:"#1e3a8a",lineHeight:1.4}}>Most classes on <b>{DAY_FULL[busiest.key]}</b> — {busiest.classes} held</div>
              </div>}
              {best&&<div style={{display:"flex",alignItems:"center",gap:10,background:"#ecfdf5",borderRadius:12,padding:"9px 12px"}}>
                <I n="award" s={16} c="#059669"/><div style={{fontSize:12,color:"#065f46",lineHeight:1.4}}>Best attendance on <b>{DAY_FULL[best.key]}</b> — {Math.round(best.pct)}%</div>
              </div>}
              {worst&&best&&worst.pct<best.pct&&<div style={{display:"flex",alignItems:"center",gap:10,background:"#fef2f2",borderRadius:12,padding:"9px 12px"}}>
                <I n="alert" s={16} c="#dc2626"/><div style={{fontSize:12,color:"#991b1b",lineHeight:1.4}}>Lowest attendance on <b>{DAY_FULL[worst.key]}</b> — {Math.round(worst.pct)}%</div>
              </div>}
            </div>
            <div style={{fontSize:10.5,color:"#94a3b8",marginTop:10,lineHeight:1.5}}>Attendance % = present ÷ (present + absent) from marked records. Leave and holidays are not counted.</div>
          </>
        )}
      </OvCard>
    </div>
  );
};

const Reports=({store,onBack,initTab})=>{
  const{students,attend,payments,shifts,settings}=store;
  const[tab,setTab]=useState(initTab||"overview");
  const[mk,setMk]=useState(curMK());
  const active=students.filter(s=>!s.archived);
  const[mkY,mkM]=mk.split("-").map(Number);
  const monthOpts=[];
  for(let i=0;i<6;i++){const d=new Date();d.setMonth(d.getMonth()-i);const k=mkKey(d.getFullYear(),d.getMonth()+1);monthOpts.push({v:k,l:monthFull(k)});}
  const feeRows=active.map(s=>{const{currentDue,carryForward,total,curPaid,breakdown}=calcOutstanding(s.id,mk,students,payments);const status=total===0?"Paid":curPaid>0?"Partially Paid":"Pending";return{...s,currentDue,carryForward,total,curPaid,breakdown,status};});
  const attRows=active.map(s=>{const keys=Object.entries(attend).filter(([k])=>k.startsWith(s.id+"-"));const p=keys.filter(([,v])=>v==="present").length;const a=keys.filter(([,v])=>v==="absent").length;const pct=keys.length>0?Math.round((p/keys.length)*1000)/10:0;return{...s,total:keys.length,present:p,absent:a,pct};});
  const totExp=active.reduce((a,s)=>a+s.monthlyFee,0);
  const totPaid=payments.filter(p=>p.monthKey===mk).reduce((a,p)=>a+p.amount,0);
  const scheduledMo=shifts.reduce((a,sh)=>a+classesInMonth(sh,mkY,mkM),0);
  // Academic tab: verified test results dated in the selected month
  const acadMarks=(store.marks||[]).filter(m=>m.status!=="pending"&&m.maxMarks>0&&String(m.date||"").startsWith(mk));
  const pctOf=m=>m.marksObtained/m.maxMarks*100;
  const avgOf=list=>list.length?Math.round(list.reduce((a,b)=>a+b,0)/list.length):null;
  const acadRows=active.map(st=>{const ms=acadMarks.filter(m=>m.studentId===st.id);return{...st,tests:ms.length,avg:avgOf(ms.map(pctOf))};}).filter(r=>r.tests>0).sort((a,b)=>b.avg-a.avg);
  const subjMap={};acadMarks.forEach(m=>{const k=String(m.subject||"General").trim()||"General";(subjMap[k]=subjMap[k]||[]).push(pctOf(m));});
  const subjRows=Object.entries(subjMap).map(([subject,v])=>({subject,tests:v.length,avg:avgOf(v)})).sort((a,b)=>b.avg-a.avg);
  const classAvg=avgOf(acadMarks.map(pctOf));
  const lowRows=acadRows.filter(r=>r.avg<40);
  const acadColor=v=>v>=75?"#10b981":v>=50?"#f59e0b":"#ef4444";
  return(
    <div>
      <PageHeader title={{fees:"Fee reports",attendance:"Attendance reports",academic:"Academic reports"}[initTab]||"Reports"} onBack={onBack}/>
      <div style={{padding:"0 16px 24px"}}>
        <select value={mk} onChange={e=>setMk(e.target.value)} style={{width:"100%",padding:"11px 13px",border:"1.5px solid #e2e8f0",borderRadius:12,fontSize:14,color:"#0f0a2e",background:"#fff",outline:"none",marginBottom:12,fontWeight:800,fontFamily:"inherit"}}>{monthOpts.map(o=><option key={o.v} value={o.v}>{o.l}</option>)}</select>
        <div style={{display:"flex",gap:6,marginBottom:16,background:"#f1f5f9",borderRadius:13,padding:4,overflowX:"auto"}}>
          {[["overview","Overview"],["fees","Fees"],["attendance","Attendance"],["academic","Academic"],["summary","Summary"],["rank","Leaderboard"]].map(([v,l])=>(
            <button key={v} onClick={()=>setTab(v)} style={{flex:"1 0 auto",borderRadius:10,padding:"9px 10px",fontSize:12,fontWeight:800,border:"none",background:tab===v?"#fff":"transparent",color:tab===v?"#1e3a8a":"#94a3b8",cursor:"pointer",boxShadow:tab===v?"0 1px 4px rgba(0,0,0,.08)":"none",fontFamily:"inherit",whiteSpace:"nowrap"}}>{l}</button>
          ))}
        </div>
        {tab==="overview"&&<OverviewTab store={store} mk={mk} feeRows={feeRows} totExp={totExp} totPaid={totPaid} currency={settings.currency}/>}
        {tab==="fees"&&<>
          <div style={{background:"linear-gradient(135deg,#0d1b42,#1e3a8a)",borderRadius:16,padding:"14px 18px",marginBottom:14,color:"#fff",display:"flex",justifyContent:"space-around"}}>
            <div style={{textAlign:"center"}}><div style={{fontSize:10,opacity:.7}}>EXPECTED</div><div style={{fontSize:16,fontWeight:900}}>{settings.currency}{totExp.toLocaleString("en-IN")}</div></div>
            <div style={{textAlign:"center"}}><div style={{fontSize:10,opacity:.7}}>RECEIVED</div><div style={{fontSize:16,fontWeight:900,color:"#86efac"}}>{settings.currency}{totPaid.toLocaleString("en-IN")}</div></div>
            <div style={{textAlign:"center"}}><div style={{fontSize:10,opacity:.7}}>PENDING</div><div style={{fontSize:16,fontWeight:900,color:"#fca5a5"}}>{settings.currency}{Math.max(0,totExp-totPaid).toLocaleString("en-IN")}</div></div>
          </div>
          {feeRows.map(r=>(
            <div key={r.id} style={{background:"#fff",borderRadius:13,padding:"12px 14px",marginBottom:8,border:"1.5px solid #eef2ff"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}><span style={{fontWeight:800,color:"#0f0a2e",fontSize:13}}>{r.name}</span><Badge s={r.status}/></div>
              <div style={{display:"flex",justifyContent:"space-between",fontSize:12,color:"#64748b"}}>
                <span>Fee: <b style={{color:"#0f0a2e"}}>{settings.currency}{r.monthlyFee}</b></span>
                <span>Paid: <b style={{color:"#10b981"}}>{settings.currency}{r.curPaid}</b></span>
                <span>Due: <b style={{color:"#ef4444"}}>{settings.currency}{r.currentDue}</b></span>
              </div>
              {r.carryForward>0&&<div style={{fontSize:12,color:"#ea580c",fontWeight:700,marginTop:5}}>+Carry-forward: {settings.currency}{r.carryForward} → Total: {settings.currency}{r.total}</div>}
            </div>
          ))}
        </>}
        {tab==="attendance"&&attRows.map(r=>(
          <div key={r.id} style={{background:"#fff",borderRadius:13,padding:"12px 14px",marginBottom:8,border:"1.5px solid #eef2ff",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
            <div><div style={{fontWeight:800,color:"#0f0a2e",fontSize:13}}>{r.name}</div><div style={{fontSize:12,color:"#94a3b8",marginTop:2}}>{r.present}P / {r.absent}A of {r.total} days</div></div>
            <div style={{textAlign:"right"}}><div style={{fontSize:20,fontWeight:900,color:r.pct>=75?"#10b981":r.pct>=50?"#f59e0b":"#ef4444"}}>{r.pct}%</div></div>
          </div>
        ))}
        {tab==="academic"&&(acadMarks.length===0?(
          <div style={{textAlign:"center",padding:"40px 20px",background:"var(--card)",border:"1.5px solid var(--cardBorder)",borderRadius:18}}>
            <div style={{fontSize:32,marginBottom:8}}>📝</div>
            <div style={{fontSize:14,fontWeight:800,color:"var(--text)"}}>No verified results in {monthFull(mk)}</div>
            <div style={{fontSize:12,color:"var(--textMuted)",marginTop:4,lineHeight:1.55}}>Pick another month above, or add and verify results in More → Academic → Test Results.</div>
          </div>
        ):<>
          <div style={{background:"linear-gradient(135deg,#0d1b42,#1e3a8a)",borderRadius:16,padding:"14px 18px",marginBottom:14,color:"#fff",display:"flex",justifyContent:"space-around"}}>
            <div style={{textAlign:"center"}}><div style={{fontSize:10,opacity:.7}}>CLASS AVERAGE</div><div style={{fontSize:20,fontWeight:900}}>{classAvg}%</div></div>
            <div style={{textAlign:"center"}}><div style={{fontSize:10,opacity:.7}}>RESULTS</div><div style={{fontSize:20,fontWeight:900}}>{acadMarks.length}</div></div>
            <div style={{textAlign:"center"}}><div style={{fontSize:10,opacity:.7}}>BELOW 40%</div><div style={{fontSize:20,fontWeight:900,color:lowRows.length?"#fca5a5":"#86efac"}}>{lowRows.length}</div></div>
          </div>
          <div style={{fontWeight:800,fontSize:13,color:"var(--text)",margin:"0 2px 8px"}}>By subject</div>
          <div style={{background:"var(--card)",border:"1.5px solid var(--cardBorder)",borderRadius:16,padding:"4px 14px",marginBottom:14}}>
            {subjRows.map((r,i)=>(
              <div key={r.subject} style={{display:"flex",alignItems:"center",gap:12,padding:"11px 0",borderBottom:i<subjRows.length-1?"1px solid var(--cardBorder)":"none"}}>
                <div style={{flex:1,minWidth:0}}><div style={{fontSize:13,fontWeight:800,color:"var(--text)"}}>{r.subject}</div><div style={{fontSize:11,color:"var(--textFaint)"}}>{r.tests} result{r.tests!==1?"s":""}</div></div>
                <div style={{width:80,background:"var(--inputBg)",borderRadius:6,height:7,overflow:"hidden"}}><div style={{background:acadColor(r.avg),height:"100%",width:`${Math.min(100,r.avg)}%`,borderRadius:6}}/></div>
                <div style={{width:42,textAlign:"right",fontSize:14,fontWeight:900,color:acadColor(r.avg)}}>{r.avg}%</div>
              </div>
            ))}
          </div>
          <div style={{fontWeight:800,fontSize:13,color:"var(--text)",margin:"0 2px 8px"}}>By student</div>
          {acadRows.map((r,i)=>(
            <div key={r.id} style={{background:"var(--card)",border:"1.5px solid var(--cardBorder)",borderRadius:14,padding:"11px 14px",marginBottom:8,display:"flex",alignItems:"center",gap:12}}>
              <div style={{width:24,textAlign:"center",fontSize:13,fontWeight:900,color:"var(--textFaint)"}}>{i+1}</div>
              <Avatar name={r.name} size={34} photo={r.photo}/>
              <div style={{flex:1,minWidth:0}}><div style={{fontWeight:800,fontSize:13,color:"var(--text)"}}>{r.name}</div><div style={{fontSize:11,color:"var(--textFaint)"}}>{r.tests} test{r.tests!==1?"s":""}{r.studentClass?` · ${r.studentClass}`:""}</div></div>
              <div style={{fontSize:18,fontWeight:900,color:acadColor(r.avg)}}>{r.avg}%</div>
            </div>
          ))}
        </>)}
        {tab==="summary"&&<>
          <div style={{background:"#fff",borderRadius:16,padding:"16px",border:"1.5px solid #eef2ff",marginBottom:12}}>
            <div style={{fontWeight:800,color:"#0f0a2e",marginBottom:12,fontSize:13,textTransform:"uppercase",letterSpacing:.5}}>Overview — {monthFull(mk)}</div>
            {[["Total Students",active.length],["Scheduled Classes",scheduledMo],["Expected Fees",`${settings.currency}${totExp.toLocaleString("en-IN")}`],["Received",`${settings.currency}${totPaid.toLocaleString("en-IN")}`],["Pending",`${settings.currency}${Math.max(0,totExp-totPaid).toLocaleString("en-IN")}`],["Avg Attendance",`${active.length>0?Math.round(attRows.reduce((a,r)=>a+r.pct,0)/active.length):0}%`]].map(([l,v])=>(
              <div key={l} style={{display:"flex",justifyContent:"space-between",padding:"8px 0",borderBottom:"1px solid #f8fafc",fontSize:13}}><span style={{color:"#64748b"}}>{l}</span><span style={{fontWeight:800,color:"#0f0a2e"}}>{v}</span></div>
            ))}
          </div>
          <div style={{background:"#fff",borderRadius:16,padding:"16px",border:"1.5px solid #eef2ff"}}>
            <div style={{fontWeight:800,color:"#0f0a2e",marginBottom:12,fontSize:13,textTransform:"uppercase",letterSpacing:.5}}>Shift-wise — {monthFull(mk)}</div>
            {shifts.map((sh,i)=>{const col=getShiftColor(i);const cnt=active.filter(s=>hasShift(s,sh.id)).length;const cls=classesInMonth(sh,mkY,mkM);return(
              <div key={sh.id} style={{display:"flex",justifyContent:"space-between",padding:"8px 0",borderBottom:"1px solid #f8fafc",fontSize:13,alignItems:"center"}}>
                <div style={{display:"flex",alignItems:"center",gap:7}}><div style={{width:7,height:7,borderRadius:"50%",background:col.dot}}/><span style={{color:"#64748b"}}>{sh.name}</span></div>
                <span style={{fontWeight:800,color:"#1e3a8a"}}>{cnt} students · {cls} classes</span>
              </div>
            );})}
          </div>
        </>}

        {tab==="rank"&&<>
          <div style={{background:"linear-gradient(135deg,#f59e0b,#fbbf24)",borderRadius:16,padding:"14px 18px",marginBottom:14,color:"#fff",display:"flex",alignItems:"center",gap:10}}>
            <I n="award" s={20} c="#fff"/>
            <div><div style={{fontSize:13,fontWeight:800}}>Attendance Leaderboard</div><div style={{fontSize:11,opacity:.85}}>Ranked by attendance rate — {monthFull(mk)} onward</div></div>
          </div>
          {attRows.filter(r=>r.total>0).sort((a,b)=>b.pct-a.pct).map((r,i)=>{
            const medal=i===0?"🥇":i===1?"🥈":i===2?"🥉":null;
            return(
              <div key={r.id} style={{background:"#fff",borderRadius:14,padding:"12px 16px",marginBottom:8,border:`1.5px solid ${i<3?"#fbbf2440":"#eef2ff"}`,display:"flex",alignItems:"center",gap:12}}>
                <div style={{width:28,textAlign:"center",fontSize:medal?18:14,fontWeight:900,color:"#94a3b8"}}>{medal||`#${i+1}`}</div>
                <Avatar name={r.name} size={36}/>
                <div style={{flex:1}}>
                  <div style={{fontWeight:800,fontSize:13,color:"#0f0a2e"}}>{r.name}</div>
                  <div style={{fontSize:11,color:"#94a3b8"}}>{r.present}P / {r.absent}A of {r.total} days</div>
                </div>
                <div style={{fontSize:18,fontWeight:900,color:r.pct>=90?"#10b981":r.pct>=75?"#1e3a8a":r.pct>=50?"#f59e0b":"#ef4444"}}>{r.pct}%</div>
              </div>
            );
          })}
          {attRows.filter(r=>r.total>0).length===0&&<div style={{textAlign:"center",padding:"30px 0",color:"#94a3b8",fontSize:13}}>No attendance data yet</div>}
        </>}
      </div>
    </div>
  );
};

// ══════════════════════════════════════════════════════════════
// EXPENSES & PROFIT TRACKER
// ══════════════════════════════════════════════════════════════
const EXPENSE_CATEGORIES=[
  {v:"rent",l:"Rent / Space",icon:"home",c:"#1e3a8a"},
  {v:"books",l:"Books & Stationery",icon:"note",c:"#f59e0b"},
  {v:"utilities",l:"Electricity / Internet",icon:"clock",c:"#06b6d4"},
  {v:"salary",l:"Staff Salary",icon:"users",c:"#2563eb"},
  {v:"marketing",l:"Marketing / Ads",icon:"chart",c:"#ec4899"},
  {v:"maintenance",l:"Maintenance",icon:"gear",c:"#64748b"},
  {v:"other",l:"Other",icon:"tag",c:"#ef4444"},
];
const catInfo=v=>EXPENSE_CATEGORIES.find(c=>c.v===v)||EXPENSE_CATEGORIES[EXPENSE_CATEGORIES.length-1];

const Expenses=({store,toast,onBack})=>{
  const{expenses,setExpenses,payments,students,settings}=store;
  const[mk,setMk]=useState(curMK());
  const[showAdd,setShowAdd]=useState(false);
  const[confirmDel,setConfirmDel]=useState(null);
  const blank={category:"rent",amount:"",date:todayStr(),note:""};
  const[form,setForm]=useState(blank);
  const sf=(k,v)=>setForm(f=>({...f,[k]:v}));

  const monthOpts=[];
  for(let i=0;i<6;i++){const d=new Date();d.setMonth(d.getMonth()-i);const k=mkKey(d.getFullYear(),d.getMonth()+1);monthOpts.push({v:k,l:monthFull(k)});}

  const monthExpenses=expenses.filter(e=>e.date.startsWith(mk)).sort((a,b)=>new Date(b.date)-new Date(a.date));
  const totalExpense=monthExpenses.reduce((a,e)=>a+e.amount,0);
  const active=students.filter(s=>!s.archived);
  const totalIncome=payments.filter(p=>p.monthKey===mk).reduce((a,p)=>a+p.amount,0);
  const netProfit=totalIncome-totalExpense;

  const byCategory=EXPENSE_CATEGORIES.map(c=>({
    ...c,
    total:monthExpenses.filter(e=>e.category===c.v).reduce((a,e)=>a+e.amount,0)
  })).filter(c=>c.total>0).sort((a,b)=>b.total-a.total);

  const submit=()=>{
    if(!form.amount||+form.amount<=0) return toast.error("Please enter a valid amount");
    setExpenses(es=>[...es,{id:uid(),category:form.category,amount:+form.amount,date:form.date,note:form.note,created:Date.now()}]);
    toast.success(`${settings.currency}${form.amount} expense recorded`,"Added!");
    setForm(blank);setShowAdd(false);
  };
  const deleteExpense=id=>{setExpenses(es=>es.filter(e=>e.id!==id));setConfirmDel(null);toast.info("Expense removed");};

  return(
    <div>
      <PageHeader title="Expenses & Profit" onBack={onBack} right={<Btn onClick={()=>setShowAdd(true)} sm c="#10b981"><I n="plus" s={14}/> Add</Btn>}/>
      <div style={{padding:"0 16px 24px"}}>
        <select value={mk} onChange={e=>setMk(e.target.value)} style={{width:"100%",padding:"11px 13px",border:"1.5px solid var(--cardBorder)",borderRadius:12,fontSize:14,color:"var(--text)",background:"var(--card)",outline:"none",marginBottom:12,fontWeight:800,fontFamily:"inherit"}}>{monthOpts.map(o=><option key={o.v} value={o.v}>{o.l}</option>)}</select>

        {/* Profit Summary */}
        <div style={{background:netProfit>=0?"linear-gradient(135deg,#065f46,#10b981)":"linear-gradient(135deg,#7f1d1d,#ef4444)",borderRadius:18,padding:"18px 20px",marginBottom:14,color:"#fff"}}>
          <div style={{fontSize:11,fontWeight:700,opacity:.75,textTransform:"uppercase",letterSpacing:.7,marginBottom:10}}>Net {netProfit>=0?"Profit":"Loss"} — {monthFull(mk)}</div>
          <div style={{fontSize:30,fontWeight:900,letterSpacing:-1,marginBottom:14}}>{settings.currency}{Math.abs(netProfit).toLocaleString("en-IN")}</div>
          <div style={{display:"flex",justifyContent:"space-between",paddingTop:12,borderTop:"1px solid rgba(255,255,255,.2)"}}>
            <div><div style={{fontSize:10,opacity:.7,fontWeight:700}}>INCOME</div><div style={{fontSize:16,fontWeight:800,color:"#bbf7d0"}}>+{settings.currency}{totalIncome.toLocaleString("en-IN")}</div></div>
            <div style={{textAlign:"right"}}><div style={{fontSize:10,opacity:.7,fontWeight:700}}>EXPENSES</div><div style={{fontSize:16,fontWeight:800,color:"#fecaca"}}>-{settings.currency}{totalExpense.toLocaleString("en-IN")}</div></div>
          </div>
        </div>

        {/* By Category */}
        {byCategory.length>0&&<div style={{background:"var(--card)",borderRadius:16,padding:"16px",border:"1.5px solid var(--cardBorder)",marginBottom:14}}>
          <div style={{fontWeight:800,fontSize:13,color:"var(--text)",marginBottom:12,textTransform:"uppercase",letterSpacing:.5}}>By Category</div>
          {byCategory.map(c=>(
            <div key={c.v} style={{marginBottom:10}}>
              <div style={{display:"flex",justifyContent:"space-between",fontSize:12,marginBottom:4}}>
                <span style={{color:"var(--textMuted)",fontWeight:600,display:"flex",alignItems:"center",gap:6}}><I n={c.icon} s={12} c={c.c}/>{c.l}</span>
                <span style={{fontWeight:800,color:"var(--text)"}}>{settings.currency}{c.total.toLocaleString("en-IN")}</span>
              </div>
              <div style={{background:"var(--inputBg)",borderRadius:6,height:6,overflow:"hidden"}}>
                <div style={{background:c.c,height:"100%",width:`${totalExpense>0?(c.total/totalExpense*100):0}%`,borderRadius:6}}/>
              </div>
            </div>
          ))}
        </div>}

        {/* Expense List */}
        <div style={{fontWeight:800,fontSize:12,color:"var(--textMuted)",textTransform:"uppercase",letterSpacing:.7,marginBottom:10}}>All Expenses</div>
        {monthExpenses.length===0&&<div style={{textAlign:"center",padding:"30px 0",color:"var(--textFaint)",fontSize:13}}>No expenses recorded for this month</div>}
        {monthExpenses.map(e=>{
          const c=catInfo(e.category);
          return(
            <div key={e.id} style={{background:"var(--card)",borderRadius:14,padding:"12px 14px",marginBottom:8,border:"1.5px solid var(--cardBorder)",display:"flex",alignItems:"center",gap:12}}>
              <div style={{background:c.c+"18",borderRadius:11,padding:9,flexShrink:0}}><I n={c.icon} s={16} c={c.c}/></div>
              <div style={{flex:1,minWidth:0}}>
                <div style={{fontSize:13,fontWeight:700,color:"var(--text)"}}>{c.l}</div>
                <div style={{fontSize:11,color:"var(--textFaint)"}}>{fmtDate(e.date)}{e.note?` · ${e.note}`:""}</div>
              </div>
              <div style={{fontSize:14,fontWeight:800,color:"#ef4444"}}>-{settings.currency}{e.amount.toLocaleString("en-IN")}</div>
              <button onClick={()=>setConfirmDel(e.id)} style={{background:"none",border:"none",cursor:"pointer",padding:4}}><I n="x" s={14} c="var(--textFaint)"/></button>
            </div>
          );
        })}
      </div>

      {showAdd&&(
        <Sheet title="Add Expense" onClose={()=>{setShowAdd(false);setForm(blank);}}>
          <div style={{marginBottom:14}}>
            <label style={{display:"block",fontSize:11,fontWeight:700,color:"var(--textMuted)",marginBottom:8,textTransform:"uppercase",letterSpacing:.6}}>Category</label>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
              {EXPENSE_CATEGORIES.map(c=>(
                <button key={c.v} onClick={()=>sf("category",c.v)} style={{display:"flex",alignItems:"center",gap:8,padding:"10px 12px",borderRadius:11,border:`2px solid ${form.category===c.v?c.c:"var(--cardBorder)"}`,background:form.category===c.v?c.c+"15":"var(--inputBg)",cursor:"pointer",fontFamily:"inherit"}}>
                  <I n={c.icon} s={14} c={c.c}/>
                  <span style={{fontSize:11,fontWeight:700,color:form.category===c.v?c.c:"var(--textMuted)"}}>{c.l}</span>
                </button>
              ))}
            </div>
          </div>
          <Inp label="Amount (₹)" value={form.amount} onChange={v=>sf("amount",v)} type="number" req placeholder="Enter amount"/>
          <Inp label="Date" value={form.date} onChange={v=>sf("date",v)} type="date"/>
          <Inp label="Note (optional)" value={form.note} onChange={v=>sf("note",v)} placeholder="e.g. Monthly rent payment"/>
          <div style={{display:"flex",gap:10,marginTop:8}}>
            <Btn onClick={()=>{setShowAdd(false);setForm(blank);}} outline c="#64748b" full>Cancel</Btn>
            <Btn onClick={submit} c="#10b981" full>Save Expense</Btn>
          </div>
        </Sheet>
      )}
      {confirmDel&&<Confirm msg="Delete this expense record?" onYes={()=>deleteExpense(confirmDel)} onNo={()=>setConfirmDel(null)} yesLabel="Delete"/>}
    </div>
  );
};

// ══════════════════════════════════════════════════════════════
// HOLIDAY MANAGER
// ══════════════════════════════════════════════════════════════
const HolidayManager=({store,toast,onBack})=>{
  const{holidays,setHolidays}=store;
  const[showAdd,setShowAdd]=useState(false);
  const[confirmDel,setConfirmDel]=useState(null);
  const blank={date:todayStr(),name:"",recurring:false};
  const[form,setForm]=useState(blank);
  const sf=(k,v)=>setForm(f=>({...f,[k]:v}));

  const sorted=[...holidays].sort((a,b)=>new Date(a.date)-new Date(b.date));
  const today=todayStr();
  const upcoming=sorted.filter(h=>h.date>=today);
  const past=sorted.filter(h=>h.date<today);

  const submit=()=>{
    if(!form.name.trim()) return toast.error("Please name the holiday");
    setHolidays(hs=>[...hs,{id:uid(),...form}]);
    toast.success(`${form.name} marked as holiday`,"Added!");
    setForm(blank);setShowAdd(false);
  };
  const del=id=>{setHolidays(hs=>hs.filter(h=>h.id!==id));setConfirmDel(null);toast.info("Holiday removed");};

  const HolidayCard=({h,isPast})=>(
    <div style={{background:"var(--card)",borderRadius:14,padding:"12px 16px",marginBottom:8,border:"1.5px solid var(--cardBorder)",display:"flex",alignItems:"center",gap:12,opacity:isPast?.6:1}}>
      <div style={{background:"#fed7aa",borderRadius:11,padding:9,flexShrink:0}}><I n="holiday" s={16} c="#c2410c"/></div>
      <div style={{flex:1,minWidth:0}}>
        <div style={{fontSize:13,fontWeight:800,color:"var(--text)"}}>{h.name}</div>
        <div style={{fontSize:11,color:"var(--textFaint)"}}>{fmtDate(h.date)} · {new Date(h.date).toLocaleDateString("en-IN",{weekday:"long"})}</div>
      </div>
      <button onClick={()=>setConfirmDel(h.id)} style={{background:"none",border:"none",cursor:"pointer",padding:4}}><I n="x" s={16} c="var(--textFaint)"/></button>
    </div>
  );

  return(
    <div>
      <PageHeader title="Holidays" onBack={onBack} right={<Btn onClick={()=>setShowAdd(true)} sm c="#ef4444"><I n="plus" s={14}/> Add</Btn>}/>
      <div style={{padding:"0 16px 24px"}}>
        <div style={{background:"#fff7ed",border:"1.5px solid #fed7aa",borderRadius:14,padding:"12px 14px",marginBottom:16,fontSize:12,color:"#9a3412",fontWeight:600,lineHeight:1.5}}>
          Mark festival days or teacher leave. On these dates, the Attendance page will show a holiday banner as a reminder that classes are off.
        </div>

        <div style={{fontWeight:800,fontSize:12,color:"var(--textMuted)",textTransform:"uppercase",letterSpacing:.7,marginBottom:10}}>Upcoming ({upcoming.length})</div>
        {upcoming.length===0&&<div style={{textAlign:"center",padding:"20px 0",color:"var(--textFaint)",fontSize:13}}>No upcoming holidays</div>}
        {upcoming.map(h=><HolidayCard key={h.id} h={h}/>)}

        {past.length>0&&<>
          <div style={{fontWeight:800,fontSize:12,color:"var(--textMuted)",textTransform:"uppercase",letterSpacing:.7,marginTop:20,marginBottom:10}}>Past</div>
          {past.slice().reverse().map(h=><HolidayCard key={h.id} h={h} isPast/>)}
        </>}
      </div>

      {showAdd&&(
        <Sheet title="Mark a Holiday" onClose={()=>{setShowAdd(false);setForm(blank);}}>
          <Inp label="Holiday Name" value={form.name} onChange={v=>sf("name",v)} req placeholder="e.g. Diwali, Independence Day, Teacher Leave"/>
          <Inp label="Date" value={form.date} onChange={v=>sf("date",v)} type="date" req/>
          <div style={{display:"flex",gap:10,marginTop:8}}>
            <Btn onClick={()=>{setShowAdd(false);setForm(blank);}} outline c="#64748b" full>Cancel</Btn>
            <Btn onClick={submit} c="#ef4444" full>Mark Holiday</Btn>
          </div>
        </Sheet>
      )}
      {confirmDel&&<Confirm msg="Remove this holiday? Attendance will show as normal for this date again." onYes={()=>del(confirmDel)} onNo={()=>setConfirmDel(null)} yesLabel="Remove"/>}
    </div>
  );
};

// ══════════════════════════════════════════════════════════════
// TEST MARKS TRACKER
// ══════════════════════════════════════════════════════════════
const MarksTracker=({store,toast,onBack,currentTeacher})=>{
  const{students,marks,setMarks,settings,shifts}=store;
  const isLimited=currentTeacher&&currentTeacher.role==="teacher";
  const scopedIds=isLimited&&currentTeacher.allowedShiftIds?.length?currentTeacher.allowedShiftIds:null;
  const[viewStudent,setViewStudent]=useState(null);
  const[showAdd,setShowAdd]=useState(false);
  const[confirmDel,setConfirmDel]=useState(null);
  const[filterShift,setFilterShift]=useState("all");
  const[showPending,setShowPending]=useState(false);
  const active=students.filter(s=>!s.archived&&(scopedIds?getShiftIds(s).some(id=>scopedIds.includes(id)):true));
  const blank={studentId:"",subject:"",testName:"",marksObtained:"",maxMarks:"100",date:todayStr()};
  const[form,setForm]=useState(blank);
  const sf=(k,v)=>setForm(f=>({...f,[k]:v}));
  const pendingMarks=marks.filter(m=>m.status==="pending"&&(scopedIds?active.some(s=>s.id===m.studentId):true));

  const submit=()=>{
    if(!form.studentId) return toast.error("Please select a student");
    if(!form.subject.trim()) return toast.error("Please enter subject");
    if(!form.marksObtained||!form.maxMarks) return toast.error("Please enter marks");
    if(+form.marksObtained>+form.maxMarks) return toast.error("Marks obtained cannot exceed max marks");
    const isTeacherEntry=isLimited;
    setMarks(ms=>[...ms,{
      id:uid(),...form,marksObtained:+form.marksObtained,maxMarks:+form.maxMarks,created:Date.now(),
      status:isTeacherEntry?"pending":"verified",
      addedBy:isTeacherEntry?currentTeacher.id:"admin",
      addedByName:isTeacherEntry?currentTeacher.name:(settings.institute||"Admin"),
      verifiedAt:isTeacherEntry?null:Date.now()
    }]);
    toast.success(isTeacherEntry?"Sent to admin for verification":"Test result recorded",isTeacherEntry?"Awaiting Verification":"Saved!");
    setForm({...blank,studentId:form.studentId});
    setShowAdd(false);
  };
  const del=id=>{setMarks(ms=>ms.filter(m=>m.id!==id));setConfirmDel(null);toast.info("Result removed");};
  const approveMark=id=>{setMarks(ms=>ms.map(m=>m.id===id?{...m,status:"verified",verifiedAt:Date.now()}:m));toast.success("Result verified — now visible to student","Approved");};
  const rejectMark=id=>{setMarks(ms=>ms.filter(m=>m.id!==id));toast.info("Result rejected and removed");};

  const gradeColor=pct=>pct>=90?"#10b981":pct>=75?"#1e3a8a":pct>=50?"#f59e0b":"#ef4444";
  const gradeLabel=pct=>pct>=90?"A+":pct>=80?"A":pct>=70?"B":pct>=60?"C":pct>=40?"D":"F";

  // ── STUDENT DETAIL VIEW ──
  if(viewStudent){
    const s=viewStudent;
    const studentMarks=marks.filter(m=>m.studentId===s.id).sort((a,b)=>new Date(b.date)-new Date(a.date));
    const avgPct=studentMarks.length>0?Math.round(studentMarks.reduce((a,m)=>a+(m.marksObtained/m.maxMarks*100),0)/studentMarks.length):0;
    // trend: compare last 3 vs previous 3
    const sorted=[...studentMarks].reverse();
    const recentAvg=sorted.slice(-3).reduce((a,m,_,arr)=>a+(m.marksObtained/m.maxMarks*100)/arr.length,0);
    const olderAvg=sorted.slice(-6,-3).length>0?sorted.slice(-6,-3).reduce((a,m,_,arr)=>a+(m.marksObtained/m.maxMarks*100)/arr.length,0):null;
    const trend=olderAvg!==null?(recentAvg-olderAvg):null;

    return(
      <div>
        <PageHeader title={`${s.name}'s Results`} onBack={()=>setViewStudent(null)} right={<Btn onClick={()=>{sf("studentId",s.id);setShowAdd(true);}} sm c="#f59e0b"><I n="plus" s={13}/> Add</Btn>}/>
        <div style={{padding:"0 16px 24px"}}>
          <div style={{background:"linear-gradient(135deg,#0d1b42,#1e3a8a)",borderRadius:18,padding:"18px 20px",marginBottom:14,color:"#fff"}}>
            <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:14}}>
              <Avatar name={s.name} size={40}/>
              <div><div style={{fontSize:15,fontWeight:900}}>{s.name}</div><div style={{fontSize:11,opacity:.7}}>{studentMarks.length} test{studentMarks.length!==1?"s":""} recorded</div></div>
            </div>
            <div style={{display:"flex",justifyContent:"space-around",paddingTop:12,borderTop:"1px solid rgba(255,255,255,.15)"}}>
              <div style={{textAlign:"center"}}><div style={{fontSize:22,fontWeight:900,color:gradeColor(avgPct)==="#ef4444"?"#fca5a5":"#86efac"}}>{avgPct}%</div><div style={{fontSize:10,opacity:.7}}>AVERAGE</div></div>
              <div style={{textAlign:"center"}}><div style={{fontSize:22,fontWeight:900}}>{gradeLabel(avgPct)}</div><div style={{fontSize:10,opacity:.7}}>GRADE</div></div>
              {trend!==null&&<div style={{textAlign:"center"}}>
                <div style={{fontSize:22,fontWeight:900,color:trend>=0?"#86efac":"#fca5a5",display:"flex",alignItems:"center",gap:3,justifyContent:"center"}}>
                  <I n="trending" s={16} c={trend>=0?"#86efac":"#fca5a5"}/>{Math.abs(Math.round(trend))}%
                </div>
                <div style={{fontSize:10,opacity:.7}}>{trend>=0?"IMPROVING":"DECLINING"}</div>
              </div>}
            </div>
          </div>

          {studentMarks.length===0&&<div style={{textAlign:"center",padding:"40px 0",color:"var(--textFaint)"}}><div style={{fontSize:36,marginBottom:10}}>📝</div><div style={{fontSize:14}}>No test results yet</div></div>}

          {studentMarks.map(m=>{
            const pct=Math.round(m.marksObtained/m.maxMarks*100);
            return(
              <div key={m.id} style={{background:"var(--card)",borderRadius:14,padding:"14px 16px",marginBottom:10,border:m.status==="pending"?"1.5px solid #fcd34d":"1.5px solid var(--cardBorder)"}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:8}}>
                  <div>
                    <div style={{fontSize:14,fontWeight:800,color:"var(--text)"}}>{m.subject}</div>
                    <div style={{fontSize:11,color:"var(--textFaint)",marginTop:2}}>{m.testName||"Test"} · {fmtDate(m.date)}</div>
                  </div>
                  <button onClick={()=>setConfirmDel(m.id)} style={{background:"none",border:"none",cursor:"pointer",padding:2}}><I n="x" s={14} c="var(--textFaint)"/></button>
                </div>
                <div style={{display:"flex",alignItems:"center",gap:12}}>
                  <div style={{fontSize:20,fontWeight:900,color:"var(--text)"}}>{m.marksObtained}<span style={{fontSize:13,color:"var(--textFaint)",fontWeight:600}}>/{m.maxMarks}</span></div>
                  <div style={{flex:1,background:"var(--inputBg)",borderRadius:6,height:8,overflow:"hidden"}}>
                    <div style={{background:gradeColor(pct),height:"100%",width:`${pct}%`,borderRadius:6}}/>
                  </div>
                  <span style={{fontSize:13,fontWeight:900,color:gradeColor(pct)}}>{pct}%</span>
                  <span style={{background:gradeColor(pct)+"18",color:gradeColor(pct),borderRadius:8,padding:"2px 8px",fontSize:11,fontWeight:800}}>{gradeLabel(pct)}</span>
                </div>
                {m.status==="pending"&&<div style={{marginTop:10,paddingTop:10,borderTop:"1px solid #fef3c7",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                  <span style={{fontSize:11,fontWeight:800,color:"#b45309",display:"flex",alignItems:"center",gap:5}}><I n="clock" s={12} c="#b45309"/> Awaiting admin verification · by {m.addedByName}</span>
                  {!isLimited&&<div style={{display:"flex",gap:6}}>
                    <button onClick={()=>rejectMark(m.id)} style={{background:"#fee2e2",border:"none",borderRadius:8,padding:"5px 10px",fontSize:11,fontWeight:800,color:"#991b1b",cursor:"pointer",fontFamily:"inherit"}}>Reject</button>
                    <button onClick={()=>approveMark(m.id)} style={{background:"#dcfce7",border:"none",borderRadius:8,padding:"5px 10px",fontSize:11,fontWeight:800,color:"#166534",cursor:"pointer",fontFamily:"inherit"}}>Approve</button>
                  </div>}
                </div>}
                {m.status==="verified"&&m.addedBy&&m.addedBy!=="admin"&&<div style={{marginTop:8,fontSize:10,color:"var(--textFaint)",fontWeight:600}}>✓ Verified · added by {m.addedByName}</div>}
              </div>
            );
          })}
        </div>
        {confirmDel&&<Confirm msg="Delete this test result?" onYes={()=>del(confirmDel)} onNo={()=>setConfirmDel(null)} yesLabel="Delete"/>}
      </div>
    );
  }

  // ── STUDENT LIST VIEW ──
  const filtered=active.filter(s=>filterShift==="all"||hasShift(s,filterShift));
  return(
    <div>
      <PageHeader title="Test Marks" onBack={onBack} right={
        <div style={{display:"flex",gap:6}}>
          {!isLimited&&pendingMarks.length>0&&<Btn onClick={()=>setShowPending(true)} sm outline c="#b45309"><I n="clock" s={13}/> {pendingMarks.length} Pending</Btn>}
          <Btn onClick={()=>{setForm(blank);setShowAdd(true);}} sm c="#f59e0b"><I n="plus" s={13}/> Add</Btn>
        </div>
      }/>
      {isLimited&&pendingMarks.length>0&&<div style={{margin:"0 16px 14px",background:"#fffbeb",border:"1.5px solid #fde68a",borderRadius:14,padding:"12px 14px",fontSize:12,color:"#92400e",fontWeight:700,display:"flex",alignItems:"center",gap:8}}><I n="clock" s={14} c="#92400e"/> {pendingMarks.length} result{pendingMarks.length!==1?"s":""} awaiting admin verification</div>}
      <div style={{padding:"0 16px 24px"}}>
        <div style={{display:"flex",gap:8,marginBottom:14,overflowX:"auto",paddingBottom:4}}>
          <Chip label="All" active={filterShift==="all"} onClick={()=>setFilterShift("all")}/>
          {shifts.filter(sh=>!scopedIds||scopedIds.includes(sh.id)).map((sh,i)=><Chip key={sh.id} label={sh.name} active={filterShift===sh.id} onClick={()=>setFilterShift(sh.id)} c={getShiftColor(i).dot}/>)}
        </div>

        {filtered.length===0&&<div style={{textAlign:"center",padding:"50px 20px",color:"var(--textFaint)"}}><div style={{fontSize:40,marginBottom:12}}>📚</div><div style={{fontSize:14}}>No students found</div></div>}

        {filtered.map(s=>{
          const studentMarks=marks.filter(m=>m.studentId===s.id);
          const avgPct=studentMarks.length>0?Math.round(studentMarks.reduce((a,m)=>a+(m.marksObtained/m.maxMarks*100),0)/studentMarks.length):null;
          const shIdx=shifts.findIndex(x=>x.id===s.shiftId);
          const col=shIdx>=0?getShiftColor(shIdx):{grad:"135deg,#94a3b8,#64748b"};
          return(
            <button key={s.id} onClick={()=>setViewStudent(s)} style={{width:"100%",background:"var(--card)",borderRadius:16,padding:"14px 16px",marginBottom:10,border:"1.5px solid var(--cardBorder)",boxShadow:"0 2px 8px var(--shadow)",cursor:"pointer",display:"flex",alignItems:"center",gap:14,textAlign:"left",fontFamily:"inherit"}}>
              <Avatar name={s.name} g={col.grad}/>
              <div style={{flex:1,minWidth:0}}>
                <div style={{fontWeight:800,fontSize:14,color:"var(--text)"}}>{s.name}</div>
                <div style={{fontSize:11,color:"var(--textFaint)",marginTop:2}}>{studentMarks.length} test{studentMarks.length!==1?"s":""} recorded</div>
              </div>
              {avgPct!==null?(
                <div style={{textAlign:"center",background:gradeColor(avgPct)+"15",borderRadius:11,padding:"6px 12px"}}>
                  <div style={{fontSize:16,fontWeight:900,color:gradeColor(avgPct)}}>{avgPct}%</div>
                  <div style={{fontSize:9,fontWeight:700,color:gradeColor(avgPct)}}>{gradeLabel(avgPct)}</div>
                </div>
              ):<span style={{fontSize:11,color:"var(--textFaint)"}}>No data</span>}
              <I n="back" s={16} c="var(--cardBorder)"/>
            </button>
          );
        })}
      </div>

      {showAdd&&(
        <Sheet title="Add Test Result" onClose={()=>{setShowAdd(false);setForm(blank);}}>
          <Sel label="Student" value={form.studentId} onChange={v=>sf("studentId",v)} req options={[{v:"",l:"Select student..."},...active.map(s=>({v:s.id,l:s.name}))]}/>
          <Inp label="Subject" value={form.subject} onChange={v=>sf("subject",v)} req placeholder="e.g. Mathematics"/>
          <Inp label="Test Name (optional)" value={form.testName} onChange={v=>sf("testName",v)} placeholder="e.g. Unit Test 1, Mid-term"/>
          <div style={{display:"flex",gap:10}}>
            <div style={{flex:1}}><Inp label="Marks Obtained" value={form.marksObtained} onChange={v=>sf("marksObtained",v)} type="number" req placeholder="85"/></div>
            <div style={{flex:1}}><Inp label="Max Marks" value={form.maxMarks} onChange={v=>sf("maxMarks",v)} type="number" req placeholder="100"/></div>
          </div>
          <Inp label="Test Date" value={form.date} onChange={v=>sf("date",v)} type="date"/>
          <div style={{display:"flex",gap:10,marginTop:8}}>
            <Btn onClick={()=>{setShowAdd(false);setForm(blank);}} outline c="#64748b" full>Cancel</Btn>
            <Btn onClick={submit} c="#f59e0b" full>Save Result</Btn>
          </div>
        </Sheet>
      )}
      {showPending&&(
        <Sheet title="Pending Verification" onClose={()=>setShowPending(false)}>
          <div style={{background:"#fffbeb",border:"1.5px solid #fde68a",borderRadius:14,padding:"12px 14px",marginBottom:16,fontSize:12,color:"#92400e",fontWeight:600,lineHeight:1.5}}>
            These results were added by teachers and are hidden from students until you verify them.
          </div>
          {pendingMarks.length===0&&<div style={{textAlign:"center",padding:"30px 0",color:"var(--textFaint)",fontSize:13}}>Nothing pending 🎉</div>}
          {pendingMarks.map(m=>{
            const st=students.find(s=>s.id===m.studentId);
            const pct=Math.round(m.marksObtained/m.maxMarks*100);
            return(
              <div key={m.id} style={{background:"var(--card)",border:"1.5px solid #fcd34d",borderRadius:14,padding:"14px 16px",marginBottom:10}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:8}}>
                  <div>
                    <div style={{fontSize:14,fontWeight:800,color:"var(--text)"}}>{st?.name||"Unknown student"}</div>
                    <div style={{fontSize:11,color:"var(--textFaint)",marginTop:2}}>{m.subject} · {m.testName||"Test"} · {fmtDate(m.date)}</div>
                  </div>
                  <div style={{textAlign:"right"}}>
                    <div style={{fontSize:16,fontWeight:900,color:gradeColor(pct)}}>{m.marksObtained}/{m.maxMarks}</div>
                    <div style={{fontSize:10,fontWeight:800,color:gradeColor(pct)}}>{pct}%</div>
                  </div>
                </div>
                <div style={{fontSize:11,color:"var(--textFaint)",marginBottom:10}}>Added by {m.addedByName}</div>
                <div style={{display:"flex",gap:8}}>
                  <button onClick={()=>rejectMark(m.id)} style={{flex:1,background:"#fee2e2",border:"none",borderRadius:10,padding:"9px",fontSize:12,fontWeight:800,color:"#991b1b",cursor:"pointer",fontFamily:"inherit"}}>Reject</button>
                  <button onClick={()=>approveMark(m.id)} style={{flex:1,background:"#dcfce7",border:"none",borderRadius:10,padding:"9px",fontSize:12,fontWeight:800,color:"#166534",cursor:"pointer",fontFamily:"inherit"}}>Approve</button>
                </div>
              </div>
            );
          })}
        </Sheet>
      )}
      {confirmDel&&<Confirm msg="Delete this test result?" onYes={()=>del(confirmDel)} onNo={()=>setConfirmDel(null)} yesLabel="Delete"/>}
    </div>
  );
};

// ══════════════════════════════════════════════════════════════
// SETTINGS
// ══════════════════════════════════════════════════════════════
const SettingsPage=({store,toast,onBack,section})=>{
  const{settings,setSettings,students,setStudents,shifts,setShifts,attend,setAttend,payments,setPayments,notes,setNotes,expenses,setExpenses,marks,setMarks,holidays,setHolidays,oneTimeFees,setOneTimeFees}=store;
  const[form,setForm]=useState({...settings});
  const[confirmReset,setConfirmReset]=useState(false);
  const[showPinSetup,setShowPinSetup]=useState(false);
  const[pinStep,setPinStep]=useState("new"); // "new" | "confirm"
  const[pinInput,setPinInput]=useState("");
  const[pinTemp,setPinTemp]=useState("");
  useEffect(()=>{if(!section)return;const t=setTimeout(()=>{document.getElementById(section)?.scrollIntoView({behavior:"smooth",block:"start"});},80);return()=>clearTimeout(t);},[section]);
  const sf=(k,v)=>setForm(f=>({...f,[k]:v}));
  const save=()=>{setSettings(form);toast.success("Settings saved successfully","Saved!");};
  const reset=()=>{setStudents([]);setShifts([]);setAttend({});setPayments([]);setNotes([]);setExpenses([]);setMarks([]);setHolidays([]);setOneTimeFees([]);setConfirmReset(false);toast.info("All data cleared","Cleared");};
  const exportData=()=>{
    const backup={students,shifts,attend,payments,notes,expenses,marks,holidays,oneTimeFees,settings,exportedAt:new Date().toISOString(),app:"Tuition Planner"};
    const blob=new Blob([JSON.stringify(backup,null,2)],{type:"application/json"});
    const url=URL.createObjectURL(blob);
    const a=document.createElement("a");
    a.href=url;a.download=`tuition-planner-backup-${todayStr()}.json`;
    document.body.appendChild(a);a.click();document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success("Backup file downloaded","Exported!");
  };
  const setTheme=t=>{const nf={...form,theme:t};setForm(nf);setSettings(nf);toast.success(t==="dark"?"Dark mode enabled":"Light mode enabled");};

  const openPinSetup=()=>{setPinStep("new");setPinInput("");setPinTemp("");setShowPinSetup(true);};
  const pinDigit=d=>{
    if(pinInput.length>=4) return;
    const next=pinInput+d;
    setPinInput(next);
    if(next.length===4){
      setTimeout(()=>{
        if(pinStep==="new"){setPinTemp(next);setPinStep("confirm");setPinInput("");}
        else{
          if(next===pinTemp){
            const nf={...form,pin:next,pinEnabled:true};setForm(nf);setSettings(nf);
            toast.success("App lock enabled","PIN Set!");
            setShowPinSetup(false);
          } else {
            toast.error("PINs don't match, try again");
            setPinStep("new");setPinInput("");setPinTemp("");
          }
        }
      },200);
    }
  };
  const pinBackspace=()=>setPinInput(p=>p.slice(0,-1));
  const disablePin=()=>{const nf={...form,pinEnabled:false,pin:""};setForm(nf);setSettings(nf);toast.info("App lock disabled");};

  const activeCount=students.filter(s=>!s.archived).length;
  const archivedCount=students.filter(s=>s.archived).length;
  const favCount=students.filter(s=>s.favorite&&!s.archived).length;
  return(
    <div>
      <PageHeader title="Settings" onBack={onBack}/>
      <div style={{padding:"0 16px 24px"}}>

        {/* THEME TOGGLE */}
        <div id="set-appearance" style={{scrollMarginTop:76,background:"var(--card)",borderRadius:16,padding:"16px",border:"1.5px solid var(--cardBorder)",marginBottom:14}}>
          <div style={{fontWeight:800,fontSize:13,color:"var(--text)",marginBottom:12,textTransform:"uppercase",letterSpacing:.5}}>Appearance</div>
          <div style={{display:"flex",gap:10}}>
            <button onClick={()=>setTheme("light")} style={{flex:1,borderRadius:14,padding:"14px",border:`2px solid ${form.theme!=="dark"?"#1e3a8a":"var(--cardBorder)"}`,background:form.theme!=="dark"?"#ede9fe":"var(--inputBg)",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:8,fontFamily:"inherit"}}>
              <div style={{width:36,height:36,borderRadius:"50%",background:"#fff",border:"2px solid #fbbf24",display:"flex",alignItems:"center",justifyContent:"center"}}>
                <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2 M12 20v2 M4.93 4.93l1.41 1.41 M17.66 17.66l1.41 1.41 M2 12h2 M20 12h2 M6.34 17.66l-1.41 1.41 M19.07 4.93l-1.41 1.41"/></svg>
              </div>
              <span style={{fontSize:12,fontWeight:800,color:form.theme!=="dark"?"#4f46e5":"var(--textMuted)"}}>Light</span>
            </button>
            <button onClick={()=>setTheme("dark")} style={{flex:1,borderRadius:14,padding:"14px",border:`2px solid ${form.theme==="dark"?"#3b82f6":"var(--cardBorder)"}`,background:form.theme==="dark"?"#2d2a5e":"var(--inputBg)",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:8,fontFamily:"inherit"}}>
              <div style={{width:36,height:36,borderRadius:"50%",background:"#151527",border:"2px solid #3b82f6",display:"flex",alignItems:"center",justifyContent:"center"}}>
                <svg width={16} height={16} viewBox="0 0 24 24" fill="#3b82f6" stroke="none"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>
              </div>
              <span style={{fontSize:12,fontWeight:800,color:form.theme==="dark"?"#a5b4fc":"var(--textMuted)"}}>Dark</span>
            </button>
          </div>
        </div>

        {/* MULTI-TEACHER LOGIN */}
        <div style={{background:"var(--card)",borderRadius:16,padding:"16px",border:"1.5px solid var(--cardBorder)",marginBottom:14}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
            <div style={{fontWeight:800,fontSize:13,color:"var(--text)",textTransform:"uppercase",letterSpacing:.5}}>Multi-Teacher Login</div>
            <div style={{background:form.multiLogin?"#ede9fe":"var(--inputBg)",borderRadius:9,padding:8}}>
              <I n="users" s={16} c={form.multiLogin?"#7c3aed":"var(--textFaint)"}/>
            </div>
          </div>
          <div style={{fontSize:12,color:"var(--textFaint)",marginBottom:12,lineHeight:1.5}}>
            {form.multiLogin?"Team members choose their profile and enter their own PIN when the app opens.":"Turn this on if 2-3 teachers share this tuition and need separate accounts."}
          </div>
          <div style={{display:"flex",gap:10}}>
            {!form.multiLogin?(
              <Btn onClick={()=>{const nf={...form,multiLogin:true};setForm(nf);setSettings(nf);toast.success("Multi-teacher login enabled. Add team members below.","Enabled!");}} c="#7c3aed" full><I n="users" s={14}/> Enable Multi-Login</Btn>
            ):(
              <Btn onClick={()=>{const nf={...form,multiLogin:false};setForm(nf);setSettings(nf);toast.info("Multi-teacher login disabled");}} outline c="#ef4444" full sm>Disable</Btn>
            )}
          </div>
          {form.multiLogin&&<div style={{marginTop:10,fontSize:11,color:"var(--textFaint)"}}>Manage teacher accounts in More → Team & Access</div>}
        </div>

        {/* APP LOCK / PIN */}
        <div id="set-pin" style={{scrollMarginTop:76,background:"var(--card)",borderRadius:16,padding:"16px",border:"1.5px solid var(--cardBorder)",marginBottom:14}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
            <div style={{fontWeight:800,fontSize:13,color:"var(--text)",textTransform:"uppercase",letterSpacing:.5}}>App Lock</div>
            <div style={{background:form.pinEnabled?"#dcfce7":"var(--inputBg)",borderRadius:9,padding:8}}>
              <I n={form.pinEnabled?"lock":"unlock"} s={16} c={form.pinEnabled?"#16a34a":"var(--textFaint)"}/>
            </div>
          </div>
          <div style={{fontSize:12,color:"var(--textFaint)",marginBottom:12,lineHeight:1.5}}>
            {form.multiLogin?"Disabled while Multi-Teacher Login is active — each teacher's PIN already protects the app.":form.pinEnabled?"App is protected with a 4-digit PIN. You'll need to enter it every time you open the app.":"Set a 4-digit PIN to keep your student and financial data private."}
          </div>
          {!form.multiLogin&&(form.pinEnabled?(
            <div style={{display:"flex",gap:10}}>
              <Btn onClick={openPinSetup} outline c="#1e3a8a" full sm>Change PIN</Btn>
              <Btn onClick={disablePin} outline c="#ef4444" full sm>Disable Lock</Btn>
            </div>
          ):(
            <Btn onClick={openPinSetup} c="#1e3a8a" full><I n="lock" s={14}/> Set Up PIN Lock</Btn>
          ))}
        </div>

        {/* INSTITUTE DETAILS */}
        <div id="set-institute" style={{scrollMarginTop:76,background:"var(--card)",borderRadius:16,padding:"16px",border:"1.5px solid var(--cardBorder)",marginBottom:14}}>
          <div style={{fontWeight:800,fontSize:13,color:"var(--text)",marginBottom:12,textTransform:"uppercase",letterSpacing:.5}}>Institute Details</div>
          <Inp label="Institute / Tuition Name" value={form.institute} onChange={v=>sf("institute",v)} placeholder="e.g. Bright Minds Coaching"/>
          <Inp label="Teacher Name" value={form.teacher} onChange={v=>sf("teacher",v)} placeholder="e.g. Ravi Sharma"/>
          <Inp label="Currency Symbol" value={form.currency} onChange={v=>sf("currency",v)} placeholder="e.g. ₹"/>
        </div>

        {/* ONLINE FEE PAYMENT */}
        <div id="set-upi" style={{scrollMarginTop:76,background:"var(--card)",borderRadius:16,padding:"16px",border:"1.5px solid var(--cardBorder)",marginBottom:14}}>
          <div style={{fontWeight:800,fontSize:13,color:"var(--text)",marginBottom:4,textTransform:"uppercase",letterSpacing:.5}}>Online fee payment</div>
          <div style={{fontSize:12,color:"var(--textMuted)",lineHeight:1.55,marginBottom:12}}>Parents pay to this UPI ID from the parent portal. Money goes straight to your account. You confirm each payment before the receipt is issued.</div>
          <Inp label="UPI ID" value={form.upiId||""} onChange={v=>sf("upiId",v.trim())} placeholder="e.g. brightminds@okhdfcbank" hint={form.upiId&&!upiReady({...form,enabledFeatures:{}})?"This doesn't look like a UPI ID. It should look like name@bank.":"Leave empty to turn online payment off."}/>
          <Inp label="Name shown to parents" value={form.upiName||""} onChange={v=>sf("upiName",v)} placeholder={form.institute||"Institute name"} hint="Should match the name on the UPI account."/>
        </div>
        <Btn onClick={save} full>Save Settings</Btn>

        {/* DATA OVERVIEW */}
        <div style={{background:"var(--card)",borderRadius:16,padding:"16px",border:"1.5px solid var(--cardBorder)",marginTop:16}}>
          <div style={{fontWeight:800,fontSize:13,color:"var(--text)",marginBottom:12,textTransform:"uppercase",letterSpacing:.5}}>Data Overview</div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10}}>
            <div style={{textAlign:"center",background:"var(--inputBg)",borderRadius:12,padding:"12px 8px"}}>
              <div style={{fontSize:20,fontWeight:900,color:"#1e3a8a"}}>{activeCount}</div>
              <div style={{fontSize:10,color:"var(--textFaint)",fontWeight:700}}>ACTIVE</div>
            </div>
            <div style={{textAlign:"center",background:"var(--inputBg)",borderRadius:12,padding:"12px 8px"}}>
              <div style={{fontSize:20,fontWeight:900,color:"#f59e0b"}}>{favCount}</div>
              <div style={{fontSize:10,color:"var(--textFaint)",fontWeight:700}}>FAVORITES</div>
            </div>
            <div style={{textAlign:"center",background:"var(--inputBg)",borderRadius:12,padding:"12px 8px"}}>
              <div style={{fontSize:20,fontWeight:900,color:"#94a3b8"}}>{archivedCount}</div>
              <div style={{fontSize:10,color:"var(--textFaint)",fontWeight:700}}>ARCHIVED</div>
            </div>
          </div>
        </div>

        {/* BACKUP */}
        <div style={{background:"var(--card)",borderRadius:16,padding:"16px",border:"1.5px solid var(--cardBorder)",marginTop:14}}>
          <div style={{fontWeight:800,fontSize:13,color:"var(--text)",marginBottom:8,textTransform:"uppercase",letterSpacing:.5}}>Data Backup</div>
          <div style={{fontSize:12,color:"var(--textFaint)",marginBottom:12,lineHeight:1.5}}>Download all your students, fees, attendance and notes as a backup file.</div>
          <Btn onClick={exportData} c="#06b6d4" full><I n="download" s={14}/> Export Backup (JSON)</Btn>
        </div>

        <div style={{margin:"24px 0 12px",fontWeight:800,fontSize:13,color:"#ef4444",textTransform:"uppercase",letterSpacing:.5}}>Danger Zone</div>
        <Btn onClick={()=>setConfirmReset(true)} c="#ef4444" outline full>Clear All Data</Btn>
        {confirmReset&&<Confirm msg="This will permanently delete ALL students, payments, attendance, notes and shifts. This cannot be undone!" onYes={reset} onNo={()=>setConfirmReset(false)} yesLabel="Yes, Delete Everything" yesColor="#ef4444"/>}
      </div>

      {showPinSetup&&(
        <Modal title={pinStep==="new"?"Set a New PIN":"Confirm PIN"} onClose={()=>setShowPinSetup(false)}>
          <div style={{textAlign:"center",marginBottom:20}}>
            <div style={{fontSize:12,color:"var(--textFaint)",marginBottom:16}}>{pinStep==="new"?"Enter a 4-digit PIN":"Re-enter the same PIN to confirm"}</div>
            <div style={{display:"flex",justifyContent:"center",gap:12,marginBottom:8}}>
              {[0,1,2,3].map(i=>(
                <div key={i} style={{width:16,height:16,borderRadius:"50%",background:pinInput.length>i?"#1e3a8a":"var(--inputBg)",border:"2px solid #1e3a8a"}}/>
              ))}
            </div>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10}}>
            {["1","2","3","4","5","6","7","8","9","","0","back"].map((k,i)=>k===""?<div key={i}/>:(
              <button key={i} onClick={()=>k==="back"?pinBackspace():pinDigit(k)} style={{padding:"16px 0",borderRadius:14,border:"1.5px solid var(--cardBorder)",background:"var(--inputBg)",fontSize:k==="back"?14:18,fontWeight:800,color:"var(--text)",cursor:"pointer",fontFamily:"inherit",display:"flex",alignItems:"center",justifyContent:"center"}}>
                {k==="back"?<I n="backspace" s={18} c="var(--textMuted)"/>:k}
              </button>
            ))}
          </div>
        </Modal>
      )}
    </div>
  );
};

// ══════════════════════════════════════════════════════════════
// TEACHER LOGIN / SELECT SCREEN — shown when multi-teacher is enabled
// ══════════════════════════════════════════════════════════════
const DEFAULT_FEATURES={messages:true,homework:true,marks:true,feeReminders:true,broadcast:true,timetableReports:true,leaveRequests:true,announcements:true,teacherMessaging:true,activityLog:true,tests:true,weeklySchedule:true,studentProfile:true,notifications:true,expenses:true,reports:true,oneTimeFees:true,birthdayReminders:true,studyMaterial:true,onlinePortal:true,onlinePayments:true};
const FEATURE_LABELS={
  messages:{label:"Student Messages",desc:"Chat between students and teachers/admin"},
  homework:{label:"Homework",desc:"Teachers can assign homework to batches"},
  marks:{label:"Test Marks",desc:"Recording & verifying student test scores"},
  feeReminders:{label:"Fee Reminders",desc:"Send due-date fee reminders to students"},
  broadcast:{label:"Broadcast Messages",desc:"Send one message to many students at once"},
  timetableReports:{label:"Timetable Reports",desc:"Students can report schedule clashes"},
  leaveRequests:{label:"Leave Requests",desc:"Students can request leave for approval"},
  announcements:{label:"Announcements",desc:"Post updates visible to students/teachers"},
  teacherMessaging:{label:"Teacher ↔ Admin Chat",desc:"Direct messaging between teachers and admin"},
  activityLog:{label:"Activity Log",desc:"Audit trail of who marked attendance/leave"},
  tests:{label:"Tests & Exams",desc:"Eligibility/mock tests for teachers or students"},
  weeklySchedule:{label:"Weekly Schedule",desc:"Student-facing weekly class timetable view"},
  studentProfile:{label:"Student Profile Page",desc:"Student's own profile with photo & details"},
  notifications:{label:"Notification Bell",desc:"The bell icon showing new activity, on all portals"},
  expenses:{label:"Expenses & Profit",desc:"Admin's expense tracking and profit reports"},
  reports:{label:"Fee & Attendance Reports",desc:"Admin's summary reports screen"},
  oneTimeFees:{label:"One-Time Fees",desc:"Admission fee & other one-off charges tracking"},
  birthdayReminders:{label:"Birthday Reminders",desc:"Upcoming student birthdays on the dashboard"},
  studyMaterial:{label:"Study Material",desc:"Teachers share notes & links with their batches"},
  onlinePortal:{label:"Online Admission Portal",desc:"Public apply page for new students & teachers, on the login screen"},
  onlinePayments:{label:"Online Fee Payment (UPI)",desc:"Parents can pay fees by UPI from the parent portal"},
};
// isFeatureOn(settings, key, viewer?) — viewer = {type:'teacher'|'student', id} to also
// respect per-audience and per-teacher hide rules set in Manage Features. Omit viewer
// (e.g. for admin's own screens, or the FeatureManager UI itself) to check the global switch only.
const isFeatureOn=(settings,key,viewer)=>{
  if(settings?.enabledFeatures?.[key]===false) return false;
  const cfg=settings?.featureAudience?.[key];
  if(!cfg||!viewer) return true;
  if(viewer.type==="teacher"){
    if(cfg.hideForTeachers) return false;
    if(cfg.hiddenTeacherIds?.includes(viewer.id)) return false;
  }
  if(viewer.type==="student"&&cfg.hideForStudents) return false;
  return true;
};
const FEATURE_GATE={messages:"messages",askadmin:"teacherMessaging",leaverequests:"leaveRequests",timetablereports:"timetableReports",homework:"homework",marks:"marks",myannouncements:"announcements",teachermessages:"teacherMessaging",announcements:"announcements",activitylog:"activityLog",teachertests:"tests",expenses:"expenses",reports:"reports",studymaterial:"studyMaterial"};

const STUDENT_CATEGORIES=["General","Sibling Discount","Staff Ward","Merit Scholarship","Financial Hardship (EWS)"];

const ROLE_INFO={
  admin:{label:"Admin",color:"#1e3a8a",bg:"#dbeafe",desc:"Full access to everything"},
  teacher:{label:"Teacher",color:"#2563eb",bg:"#dbeafe",desc:"Own students & attendance only"},
};

// ══════════════════════════════════════════════════════════════
// AUTH CHOOSER — first screen: keeps Admin/Teacher login and Student
// login as two clearly separate paths, each using its own id + PIN
// ══════════════════════════════════════════════════════════════
const AuthChooser=({settings,onPickStaff,onPickStudent,onApply})=>(
  <div className="bf-sc" style={{position:"fixed",inset:0,background:"linear-gradient(135deg,#0d1b42,#1e3a8a)",zIndex:99999,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"calc(24px + env(safe-area-inset-top)) 24px calc(24px + env(safe-area-inset-bottom))",overflowY:"auto"}}>
    <div style={{background:"rgba(255,255,255,.12)",borderRadius:22,padding:18,marginBottom:18}}>
      <I n="layers" s={28} c="#fff"/>
    </div>
    <div style={{fontSize:19,fontWeight:900,color:"#fff",marginBottom:4,textAlign:"center"}}>{settings.institute}</div>
    <div style={{fontSize:12,color:"rgba(255,255,255,.6)",marginBottom:32,textAlign:"center"}}>Choose how you'd like to log in</div>
    <div style={{width:"100%",maxWidth:340,display:"flex",flexDirection:"column",gap:14}}>
      <button onClick={onPickStaff} style={{background:"rgba(255,255,255,.08)",border:"1.5px solid rgba(255,255,255,.18)",borderRadius:18,padding:"18px 18px",display:"flex",alignItems:"center",gap:14,cursor:"pointer",fontFamily:"inherit",textAlign:"left"}}>
        <div style={{width:46,height:46,borderRadius:14,background:"linear-gradient(135deg,#1e3a8a,#3b82f6)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><I n="shield" s={22} c="#fff"/></div>
        <div style={{flex:1}}>
          <div style={{fontSize:15,fontWeight:800,color:"#fff"}}>Admin / Teacher</div>
          <div style={{fontSize:11,color:"rgba(255,255,255,.55)",marginTop:2}}>Log in with your User ID & Password</div>
        </div>
        <I n="back" s={16} c="rgba(255,255,255,.4)"/>
      </button>
      <button onClick={onPickStudent} style={{background:"rgba(255,255,255,.08)",border:"1.5px solid rgba(255,255,255,.18)",borderRadius:18,padding:"18px 18px",display:"flex",alignItems:"center",gap:14,cursor:"pointer",fontFamily:"inherit",textAlign:"left"}}>
        <div style={{width:46,height:46,borderRadius:14,background:"linear-gradient(135deg,#0ea5e9,#38bdf8)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><I n="users" s={22} c="#fff"/></div>
        <div style={{flex:1}}>
          <div style={{fontSize:15,fontWeight:800,color:"#fff"}}>Student</div>
          <div style={{fontSize:11,color:"rgba(255,255,255,.55)",marginTop:2}}>Log in with your Name/Phone & Password</div>
        </div>
        <I n="back" s={16} c="rgba(255,255,255,.4)"/>
      </button>
      {onApply&&<button onClick={onApply} style={{background:"none",border:"none",cursor:"pointer",fontFamily:"inherit",textAlign:"center",padding:"10px 0",marginTop:4}}>
        <span style={{fontSize:12,color:"rgba(255,255,255,.7)",fontWeight:700,textDecoration:"underline"}}>New here? Apply for admission or a teaching position →</span>
      </button>}
    </div>
  </div>
);

// ══════════════════════════════════════════════════════════════
// BRANDED SPLASH + LOGIN (new design)
// ══════════════════════════════════════════════════════════════
// Splits the institute name into: word 1 (white/navy), word 2 (gold/blue), rest (2nd line)
const splitInstName=(n)=>{
  const w=String(n||"").trim().split(/\s+/).filter(Boolean);
  return{a:w[0]||"My",b:w[1]||"",c:w.slice(2).join(" ")};
};

// Logo — rising sun over an open book. dark=true → for dark/blue backgrounds
const BrandLogo=({w=200,dark=true})=>{
  const b1=dark?"#ffffff":"#1e3a8a", b2=dark?"#dbeafe":"#3b82f6", pc="#1e3a8a";
  const rays=[-162,-136,-112,-90,-68,-44,-18];
  return(
    <svg viewBox="0 0 200 150" style={{display:"block",width:w,maxWidth:"100%",height:"auto"}} aria-hidden="true">
      {rays.map(a=>{
        const r=a*Math.PI/180, long=a===-90?68:60;
        return <line key={a} x1={100+Math.cos(r)*46} y1={80+Math.sin(r)*46} x2={100+Math.cos(r)*long} y2={80+Math.sin(r)*long} stroke="#fbbf24" strokeWidth="5" strokeLinecap="round"/>;
      })}
      <path d="M64 82 A36 36 0 0 1 136 82 Z" fill="#fbbf24"/>
      <circle cx="100" cy="66" r="4.6" fill={pc}/>
      <path d="M100 73 L100 91 M100 79 L91 70 M100 79 L109 70" stroke={pc} strokeWidth="4" strokeLinecap="round" fill="none"/>
      <path d="M14 96 Q56 76 100 104 L100 124 Q58 100 18 114 Z" fill={b1}/>
      <path d="M186 96 Q144 76 100 104 L100 124 Q142 100 182 114 Z" fill={b1}/>
      <path d="M30 118 Q62 104 100 130 L100 138 Q64 114 34 126 Z" fill={b2}/>
      <path d="M170 118 Q138 104 100 130 L100 138 Q136 114 166 126 Z" fill={b2}/>
    </svg>
  );
};

// Desk illustration for the splash: stack of books + pencil cup
const SplashBooks=()=>(
  <svg viewBox="0 0 340 190" style={{width:"100%",display:"block"}} aria-hidden="true">
    <defs>
      <linearGradient id="bfDesk" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#e0a35f"/><stop offset="1" stopColor="#b9773a"/></linearGradient>
      <linearGradient id="bfCover" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#2563eb"/><stop offset="1" stopColor="#1e3a8a"/></linearGradient>
    </defs>
    <ellipse cx="34" cy="86" rx="18" ry="36" fill="#4ade80" opacity=".35" transform="rotate(-20 34 86)"/>
    <ellipse cx="14" cy="100" rx="12" ry="28" fill="#22c55e" opacity=".3" transform="rotate(15 14 100)"/>
    <ellipse cx="318" cy="110" rx="14" ry="30" fill="#4ade80" opacity=".3" transform="rotate(20 318 110)"/>
    <rect x="0" y="152" width="340" height="38" fill="url(#bfDesk)"/>
    {/* bottom book */}
    <rect x="80" y="126" width="200" height="28" rx="4" fill="#1e3a8a"/>
    <rect x="90" y="131" width="184" height="18" rx="2" fill="#f7f1e3"/>
    {/* middle book */}
    <rect x="90" y="100" width="190" height="26" rx="4" fill="#f97316"/>
    <rect x="99" y="105" width="174" height="16" rx="2" fill="#fff8ea"/>
    {/* top book */}
    <rect x="70" y="62" width="180" height="38" rx="6" fill="url(#bfCover)"/>
    <rect x="238" y="62" width="12" height="38" rx="3" fill="#fbbf24"/>
    <path d="M88 74 l3 6 6 .8 -4.5 4.2 1.2 6 -5.7 -3 -5.7 3 1.2 -6 -4.5 -4.2 6 -.8z" fill="#fbbf24" transform="translate(-6 -3) scale(.85)"/>
    <text x="108" y="80" fill="#fff" fontSize="12.5" fontWeight="700" fontFamily="Inter,Arial,sans-serif">Small Steps</text>
    <text x="108" y="95" fill="#fff" fontSize="12.5" fontWeight="700" fontFamily="Inter,Arial,sans-serif">Big Dreams</text>
    {/* pencil cup */}
    <g>
      <line x1="26" y1="106" x2="18" y2="70" stroke="#1e3a8a" strokeWidth="5" strokeLinecap="round"/>
      <line x1="34" y1="106" x2="34" y2="64" stroke="#fbbf24" strokeWidth="5" strokeLinecap="round"/>
      <line x1="42" y1="106" x2="50" y2="68" stroke="#f97316" strokeWidth="5" strokeLinecap="round"/>
      <line x1="48" y1="108" x2="62" y2="78" stroke="#3b82f6" strokeWidth="5" strokeLinecap="round"/>
      <rect x="12" y="104" width="52" height="50" rx="9" fill="#1d4ed8"/>
      <rect x="12" y="104" width="52" height="8" rx="4" fill="#2f6df0"/>
    </g>
  </svg>
);

// ── SPLASH ──
const SplashScreen=({settings,duration=2800})=>{
  const{a,b,c}=splitInstName(settings?.institute);
  return(
    <div style={{position:"fixed",inset:0,background:"#0a2a6e",zIndex:100000,display:"flex",justifyContent:"center",fontFamily:"'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif"}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@600&display=swap');
        @keyframes bfFadeUp{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}
        @keyframes bfRise{from{opacity:0;transform:translateY(24px) scale(.85)}to{opacity:1;transform:translateY(0) scale(1)}}
        @keyframes bfFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
        @keyframes bfProgress{from{width:6%}to{width:100%}}
        @keyframes bfGlow{0%,100%{opacity:.55}50%{opacity:.9}}
        @media (max-height:680px){.bf-hide-short{display:none !important}}
        @media (max-height:520px){.bf-hide-tiny{display:none !important}}
      `}</style>
      <div style={{position:"relative",width:"100%",maxWidth:480,height:"100%",overflow:"hidden",background:"linear-gradient(180deg,#0a2f7a 0%,#1149a8 48%,#2a6fd6 100%)"}}>
        {/* soft decorative blobs */}
        <div style={{position:"absolute",top:-70,right:-70,width:230,height:230,borderRadius:"50%",background:"rgba(96,165,250,.22)"}}/>
        <div style={{position:"absolute",top:"38%",left:-90,width:190,height:190,borderRadius:"50%",background:"rgba(30,64,175,.45)"}}/>
        <div style={{position:"absolute",top:"14%",left:"50%",width:260,height:260,marginLeft:-130,borderRadius:"50%",background:"radial-gradient(circle,rgba(251,191,36,.28),transparent 68%)",animation:"bfGlow 2.4s ease-in-out infinite"}}/>

        <div style={{position:"relative",display:"flex",flexDirection:"column",alignItems:"center",paddingTop:"calc(clamp(20px,6vh,60px) + env(safe-area-inset-top))",textAlign:"center"}}>
          <div style={{animation:"bfRise .9s cubic-bezier(.2,.8,.2,1) both"}}><BrandLogo w={"min(215px,26vh,62vw)"} dark/></div>
          <div style={{marginTop:14,fontSize:"clamp(26px,8.6vw,35px)",fontWeight:800,color:"#fff",letterSpacing:-.5,lineHeight:1.1,animation:"bfFadeUp .7s .35s both",padding:"0 16px"}}>
            {a}{b&&<> <span style={{color:"#fbbf24"}}>{b}</span></>}
          </div>
          {c&&<div style={{fontSize:"clamp(19px,6.2vw,25px)",fontWeight:700,color:"#fff",marginTop:2,animation:"bfFadeUp .7s .5s both"}}>{c}</div>}
          <div style={{marginTop:16,fontSize:"clamp(12px,3.7vw,15px)",color:"rgba(255,255,255,.92)",letterSpacing:.4,animation:"bfFadeUp .7s .7s both"}}>
            Learn <span style={{opacity:.6,margin:"0 6px"}}>•</span> Grow <span style={{opacity:.6,margin:"0 6px"}}>•</span> Build Your Future
          </div>
          <div className="bf-hide-short" style={{marginTop:"clamp(16px,4vh,34px)",animation:"bfFadeUp .8s .95s both"}}>
            <div style={{fontFamily:"'Caveat','Segoe Script','Brush Script MT',cursive",fontStyle:"italic",fontSize:"clamp(23px,7.4vw,29px)",lineHeight:1.05,color:"#93c5fd",transform:"rotate(-7deg)",textAlign:"left"}}>
              Better Learning<br/><span style={{marginLeft:26}}>Brighter Future</span>
            </div>
            <svg width="120" height="14" viewBox="0 0 120 14" style={{display:"block",margin:"2px 0 0 62px"}}><path d="M2 11 Q50 -2 118 3" stroke="#fbbf24" strokeWidth="3.5" fill="none" strokeLinecap="round"/></svg>
          </div>
        </div>

        {/* illustration */}
        <div className="bf-hide-tiny" style={{position:"absolute",left:0,right:0,bottom:"calc(70px + env(safe-area-inset-bottom))",animation:"bfFadeUp .9s 1.1s both"}}>
          <div style={{animation:"bfFloat 4s ease-in-out infinite"}}><SplashBooks/></div>
        </div>

        {/* bottom wave + progress */}
        <div style={{position:"absolute",left:0,right:0,bottom:0,height:"calc(112px + env(safe-area-inset-bottom))"}}>
          <svg viewBox="0 0 480 112" preserveAspectRatio="none" style={{position:"absolute",inset:0,width:"100%",height:"100%"}}><path d="M0 34 Q120 -6 250 22 T480 14 L480 112 L0 112 Z" fill="#f5f8ff"/></svg>
          <div style={{position:"absolute",left:0,right:0,bottom:"calc(24px + env(safe-area-inset-bottom))",display:"flex",flexDirection:"column",alignItems:"center",gap:16}}>
            <div style={{width:104,height:5,borderRadius:5,background:"#d5e0f7",overflow:"hidden"}}>
              <div style={{height:"100%",borderRadius:5,background:"linear-gradient(90deg,#1d4ed8,#3b82f6)",animation:`bfProgress ${duration}ms ease-in-out forwards`}}/>
            </div>
            <div style={{fontSize:10.5,fontWeight:600,letterSpacing:2.4,color:"#4b5b85"}}>TUITION MANAGEMENT SYSTEM</div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ── LOGIN ──
const AuthField=({icon,label,value,onChange,placeholder,type="text",onEnter,right,inputMode,maxLength,autoFocus})=>(
  <div className="bf-field" style={{background:"#fff",border:"1.5px solid #e3eaf8",borderRadius:14,padding:"7px 12px",display:"flex",alignItems:"center",gap:10,boxShadow:"0 1px 6px rgba(30,64,175,.05)",transition:"border-color .15s, box-shadow .15s"}}>
    <div style={{width:34,height:34,borderRadius:10,background:"#eef3ff",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><I n={icon} s={17} c="#1e40af"/></div>
    <div style={{flex:1,minWidth:0}}>
      <div style={{fontSize:12,fontWeight:700,color:"#1e2a5a",marginBottom:1}}>{label}</div>
      <input value={value} onChange={onChange} onKeyDown={e=>{if(e.key==="Enter")onEnter&&onEnter();}} type={type} placeholder={placeholder} inputMode={inputMode} maxLength={maxLength} autoFocus={autoFocus} autoCapitalize="none" autoCorrect="off" spellCheck={false}
        style={{width:"100%",border:"none",outline:"none",background:"transparent",fontSize:15,fontWeight:600,color:"#0f1c4d",padding:"1px 0",fontFamily:"inherit",boxSizing:"border-box"}}/>
    </div>
    {right}
  </div>
);

const EyeToggle=({off,onClick})=>(
  <button type="button" onClick={onClick} aria-label={off?"Show password":"Hide password"} style={{background:"none",border:"none",padding:6,cursor:"pointer",display:"flex"}}>
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1e3a8a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
      {off&&<path d="M3 3l18 18"/>}
    </svg>
  </button>
);

const REMEMBER_KEY="tp4_remember_login";

const PField=({icon,label,value,onChange,placeholder,type="text",onEnter,right,inputMode,maxLength})=>(
  <div>
    <div style={{fontSize:12.5,fontWeight:600,color:"#3a4a78",margin:"0 0 6px 2px"}}>{label}</div>
    <div className="pf-box" style={{display:"flex",alignItems:"center",gap:10,height:54,padding:"0 6px 0 14px",background:"#f3f6ff",border:"1.5px solid #dfe7fb",borderRadius:15,transition:"border-color .15s, box-shadow .15s, background .15s"}}>
      <I n={icon} s={18} c="#5b6fae"/>
      <input value={value} onChange={onChange} onKeyDown={e=>{if(e.key==="Enter")onEnter&&onEnter();}} type={type} placeholder={placeholder} inputMode={inputMode} maxLength={maxLength} autoCapitalize="none" autoCorrect="off" spellCheck={false}
        style={{flex:1,minWidth:0,height:"100%",border:"none",outline:"none",background:"transparent",fontSize:16,fontWeight:600,color:"#0b1a4a",fontFamily:"inherit"}}/>
      {right}
    </div>
  </div>
);

const LOGIN_ROLES=[
  {id:"staff",  icon:"shield", label:"Staff",   sub:"Admin and teachers sign in here."},
  {id:"student",icon:"grad",   label:"Student", sub:"Classes, homework, marks and doubts in one place."},
  {id:"parent", icon:"users",  label:"Parent",  sub:"Follow attendance, homework and marks, and pay fees online by UPI."},
];

const LoginScreen=({store,multiLogin,pinProtected,onStaffLogin,onPinUnlock,onStaffContinue,onStudentLogin,onParentLogin,onForgot,onApply,onBypass})=>{
  const{settings,teachers,students,parents}=store;
  const rem=useRef(LS.get(REMEMBER_KEY)||{}).current;
  const[tab,setTab]=useState("staff"); // "staff" | "student" | "parent"
  const[staffId,setStaffId]=useState(rem.staff||"");
  const[staffPw,setStaffPw]=useState("");
  const[stuId,setStuId]=useState(rem.student||"");
  const[stuPw,setStuPw]=useState("");
  const[parId,setParId]=useState(rem.parent||"");
  const[parPw,setParPw]=useState("");
  const[show,setShow]=useState(false);
  const[remember,setRemember]=useState(!rem.off);
  const[error,setError]=useState("");
  const[info,setInfo]=useState("");
  const[shakeKey,setShakeKey]=useState(0);
  const activeTeachers=(teachers||[]).filter(t=>!t.archived);

  const hr=new Date().getHours();
  const greeting=hr<12?"Good morning":hr<17?"Good afternoon":"Good evening";
  const dateLine=new Date().toLocaleDateString("en-IN",{weekday:"long",day:"numeric",month:"long"});
  const roleIdx=Math.max(0,LOGIN_ROLES.findIndex(r=>r.id===tab));
  const role=LOGIN_ROLES[roleIdx];

  const fail=(m)=>{setError(m);setShakeKey(k=>k+1);};
  const saveRemember=(kind,id)=>{
    const cur=LS.get(REMEMBER_KEY)||{};
    LS.set(REMEMBER_KEY,{...cur,[kind]:remember?id:"",off:!remember});
  };
  const switchTab=(t)=>{setTab(t);setError("");setInfo("");setShow(false);};

  const submit=()=>{
    setError("");setInfo("");
    if(tab==="student"){
      const id=stuId.trim().toLowerCase();
      if(!id||!stuPw.trim()){fail("Enter your User ID and Password");return;}
      const s=(students||[]).find(x=>!x.archived&&(x.studentCode||"").toLowerCase()===id);
      if(!s){fail("No student found with this User ID");return;}
      if(s.portalEnabled===false){fail("Portal access has been disabled for this account. Ask your teacher.");return;}
      if(s.pin!==stuPw.trim()){fail("Incorrect password");return;}
      saveRemember("student",stuId.trim());
      onStudentLogin(s);
      return;
    }
    if(tab==="parent"){
      const raw=parId.trim().toLowerCase();
      const digits=raw.replace(/\D/g,"");
      if(!raw||!parPw.trim()){fail("Enter your Parent ID (or phone number) and Password");return;}
      const cands=(parents||[]).filter(x=>!x.archived&&((x.loginId||"").toLowerCase()===raw||(digits.length>=10&&String(x.phone||"").replace(/\D/g,"").slice(-10)===digits.slice(-10))));
      if(!cands.length){fail("No parent account found with this ID");return;}
      const par=cands.find(x=>x.pin===parPw.trim());
      if(!par){fail("Incorrect password");return;}
      if(par.portalEnabled===false){fail("Parent access is switched off for this account. Contact the institute.");return;}
      saveRemember("parent",parId.trim());
      onParentLogin&&onParentLogin(par);
      return;
    }
    if(multiLogin){
      const id=staffId.trim().toLowerCase();
      if(!id||!staffPw){fail("Enter your User ID and Password");return;}
      const match=activeTeachers.find(t=>(t.loginId||"").toLowerCase()===id||t.name.trim().toLowerCase()===id);
      if(!match){fail("No account found with this User ID");return;}
      if(match.pin!==staffPw){fail("Incorrect password");return;}
      saveRemember("staff",staffId.trim());
      onStaffLogin(match.id);
      return;
    }
    if(pinProtected){
      if(!staffPw){fail("Enter your PIN");return;}
      if(staffPw!==settings.pin){fail("Incorrect PIN");setStaffPw("");return;}
      onPinUnlock();
      return;
    }
    onStaffContinue();
  };

  const isStaff=tab==="staff";
  const noStaffAccounts=isStaff&&multiLogin&&activeTeachers.length===0;
  const noProtection=isStaff&&!multiLogin&&!pinProtected;
  const showFields=!noStaffAccounts&&!noProtection;
  const canForgot=isStaff?multiLogin&&activeTeachers.length>0:true;

  const onForgotClick=()=>{
    if(isStaff){onForgot&&onForgot();}
    else if(tab==="parent") setInfo("Forgot your password? Ask the institute — the admin can reset it from Parent Access and send you a new one.");
    else setInfo("Forgot your password? Ask your teacher or admin — they can look it up or reset it from your student profile.");
  };

  const eye=<EyeToggle off={!show} onClick={()=>setShow(s=>!s)}/>;
  const infoBox=(t)=>(<div style={{background:"#f3f6ff",border:"1.5px solid #dfe7fb",borderRadius:16,padding:"16px",fontSize:13.5,lineHeight:1.55,color:"#3a4a78"}}>{t}</div>);

  return(
    <div style={{position:"fixed",inset:0,background:"#040c22",zIndex:99999,overflowY:"auto",fontFamily:"'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif"}}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,600;9..144,700&display=swap');`}</style>
      <style>{`
        @keyframes lgSheet{from{opacity:0;transform:translateY(40px)}to{opacity:1;transform:translateY(0)}}
        @keyframes lgFade{from{opacity:0}to{opacity:1}}
        @keyframes lgShake{0%,100%{transform:translateX(0)}20%{transform:translateX(-8px)}60%{transform:translateX(8px)}}
        .pf-box:focus-within{border-color:#1d4ed8 !important;background:#fff !important;box-shadow:0 0 0 4px rgba(29,78,216,.12) !important}
        .pf-box input::placeholder{color:#9aa7c7;font-weight:500}
        .lg-role:focus-visible,.lg-cta:focus-visible{outline:3px solid #f5b93b;outline-offset:2px}
        @media (prefers-reduced-motion:reduce){.lg-anim{animation:none !important}.lg-pill{transition:none !important}}
      `}</style>
      <div style={{maxWidth:480,minHeight:"100%",margin:"0 auto",position:"relative",display:"flex",flexDirection:"column"}}>

        {/* Hero — sunrise over the horizon */}
        <div style={{position:"relative",overflow:"hidden",padding:"calc(34px + env(safe-area-inset-top)) 24px 62px",textAlign:"center",
          background:"radial-gradient(120% 75% at 50% 108%, rgba(245,185,59,.62) 0%, rgba(245,185,59,.14) 42%, rgba(245,185,59,0) 62%), linear-gradient(180deg,#040c22 0%,#0a2159 58%,#153c8c 100%)"}}>
          <div style={{display:"flex",justifyContent:"center"}}><BrandLogo w={104} dark/></div>
          <div style={{marginTop:14,fontSize:13.5,color:"#a9bdea",fontWeight:500}}>{greeting}</div>
          <div style={{marginTop:6,fontFamily:"'Fraunces',Georgia,'Times New Roman',serif",fontWeight:600,fontSize:"clamp(27px,8.2vw,35px)",lineHeight:1.12,letterSpacing:-.3,color:"#fff",padding:"0 6px"}}>{settings?.institute||"My Tuition"}</div>
          <div style={{marginTop:8,fontSize:13,color:"rgba(255,255,255,.66)"}}>{dateLine}</div>
        </div>

        {/* Sheet */}
        <div className="lg-anim" style={{position:"relative",marginTop:-34,flex:1,background:"#fff",borderRadius:"30px 30px 0 0",boxShadow:"0 -12px 40px rgba(4,12,34,.35)",padding:"22px 20px calc(30px + env(safe-area-inset-bottom))",animation:"lgSheet .55s cubic-bezier(.2,.8,.2,1) both"}}>

          {/* Role switch */}
          <div role="tablist" aria-label="Sign in as" style={{position:"relative",display:"flex",padding:4,borderRadius:17,background:"#eef2ff",border:"1px solid #e0e8fb"}}>
            <div className="lg-pill" style={{position:"absolute",top:4,left:4,width:"calc((100% - 8px)/3)",height:"calc(100% - 8px)",borderRadius:13,background:"linear-gradient(135deg,#0b2a6b,#1d4ed8)",boxShadow:"0 4px 12px rgba(29,78,216,.32)",transform:`translateX(${roleIdx*100}%)`,transition:"transform .28s cubic-bezier(.3,.8,.3,1)"}}/>
            {LOGIN_ROLES.map(r=>{
              const on=tab===r.id;
              return(
                <button key={r.id} role="tab" aria-selected={on} className="lg-role" type="button" onClick={()=>switchTab(r.id)}
                  style={{position:"relative",flex:1,display:"flex",alignItems:"center",justifyContent:"center",gap:6,height:42,border:"none",background:"transparent",cursor:"pointer",fontFamily:"inherit",fontSize:14,fontWeight:700,color:on?"#fff":"#1e3a8a",transition:"color .2s",borderRadius:13}}>
                  <I n={r.icon} s={16} c={on?"#fff":"#1e3a8a"}/>{r.label}
                </button>
              );
            })}
          </div>
          <div key={"cap"+tab} className="lg-anim" style={{margin:"12px 2px 0",fontSize:13.5,lineHeight:1.5,color:"#5b6a91",animation:"lgFade .3s both"}}>{role.sub}</div>

          <div key={tab+shakeKey} className="lg-anim" style={{marginTop:18,display:"flex",flexDirection:"column",gap:14,animation:error?"lgShake .4s":"lgFade .3s both"}}>
            {showFields&&(isStaff?(
              multiLogin?(
                <>
                  <PField icon="phone" label="User ID or phone number" placeholder="Enter your ID or phone number" value={staffId} onChange={e=>{setStaffId(e.target.value);setError("");}} onEnter={submit}/>
                  <PField icon="lock" label="Password" placeholder="Enter your password" type={show?"text":"password"} value={staffPw} onChange={e=>{setStaffPw(e.target.value);setError("");}} onEnter={submit} right={eye}/>
                </>
              ):(
                <PField icon="lock" label="Admin PIN" placeholder="Enter your PIN" type={show?"text":"password"} inputMode="numeric" value={staffPw} onChange={e=>{setStaffPw(e.target.value.replace(/\D/g,""));setError("");}} onEnter={submit} right={eye}/>
              )
            ):tab==="student"?(
              <>
                <PField icon="phone" label="User ID or phone number" placeholder="Enter your ID or phone number" value={stuId} onChange={e=>{setStuId(e.target.value);setError("");}} onEnter={submit}/>
                <PField icon="lock" label="Password" placeholder="Enter your password" type={show?"text":"password"} value={stuPw} onChange={e=>{setStuPw(e.target.value);setError("");}} onEnter={submit} right={eye}/>
              </>
            ):(
              <>
                <PField icon="phone" label="Parent ID or phone number" placeholder="ID given by the institute, or your phone" value={parId} onChange={e=>{setParId(e.target.value);setError("");}} onEnter={submit}/>
                <PField icon="lock" label="Password" placeholder="Enter your password" type={show?"text":"password"} value={parPw} onChange={e=>{setParPw(e.target.value);setError("");}} onEnter={submit} right={eye}/>
              </>
            ))}
            {noProtection&&infoBox("No PIN is set up for Admin yet. You can set one later in Settings.")}
            {noStaffAccounts&&infoBox("No staff accounts set up yet.")}
          </div>

          {error&&<div role="alert" style={{marginTop:14,background:"#fef2f2",border:"1px solid #fecaca",borderRadius:13,padding:"11px 13px",fontSize:13.5,fontWeight:600,color:"#b91c1c",textAlign:"center"}}>{error}</div>}
          {info&&<div style={{marginTop:14,background:"#eff6ff",border:"1px solid #bfdbfe",borderRadius:13,padding:"11px 13px",fontSize:13,lineHeight:1.5,color:"#1e40af",textAlign:"center"}}>{info}</div>}

          {showFields&&(
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginTop:16,padding:"0 2px"}}>
              {multiLogin||!isStaff?(
                <button type="button" onClick={()=>setRemember(r=>!r)} style={{display:"flex",alignItems:"center",gap:9,cursor:"pointer",fontSize:14,color:"#1e2a5a",fontWeight:500,background:"none",border:"none",padding:0,fontFamily:"inherit"}}>
                  <span style={{width:22,height:22,borderRadius:7,background:remember?"#1d4ed8":"#fff",border:`2px solid ${remember?"#1d4ed8":"#b8c5e6"}`,display:"flex",alignItems:"center",justifyContent:"center",transition:"all .15s"}}>
                    {remember&&<I n="check" s={14} c="#fff"/>}
                  </span>
                  Remember me
                </button>
              ):<span/>}
              {canForgot&&<button type="button" onClick={onForgotClick} style={{background:"none",border:"none",padding:0,cursor:"pointer",fontFamily:"inherit",fontSize:14,fontWeight:600,color:"#1d4ed8"}}>Forgot password?</button>}
            </div>
          )}

          <button type="button" className="lg-cta" onClick={noStaffAccounts?(onBypass||undefined):submit} disabled={noStaffAccounts&&!onBypass}
            style={{width:"100%",marginTop:18,height:54,borderRadius:16,border:"none",cursor:"pointer",fontFamily:"inherit",fontSize:16,fontWeight:800,color:"#0a1a44",display:"flex",alignItems:"center",justifyContent:"center",gap:9,
              background:"linear-gradient(135deg,#fad261,#f2a71b)",boxShadow:"0 10px 22px rgba(242,167,27,.34)",opacity:noStaffAccounts&&!onBypass?.5:1}}>
            <I n="lock" s={17} c="#0a1a44"/>
            {noStaffAccounts?"Continue to setup":noProtection?"Continue as admin":tab==="parent"?"Log in to parent portal":"Log in"}
          </button>

          {onApply&&(
            <>
              <div style={{display:"flex",alignItems:"center",gap:12,margin:"20px 0 14px"}}>
                <div style={{flex:1,height:1,background:"#e1e8f8"}}/><span style={{fontSize:12.5,fontWeight:600,color:"#7a89ad"}}>or</span><div style={{flex:1,height:1,background:"#e1e8f8"}}/>
              </div>
              <button type="button" onClick={onApply} style={{width:"100%",height:48,borderRadius:14,border:"1.5px solid #dbe4f7",background:"#fff",cursor:"pointer",fontFamily:"inherit",fontSize:14.5,fontWeight:600,color:"#12277a",display:"flex",alignItems:"center",justifyContent:"center",gap:8}}>
                <I n="userplus" s={16} c="#1d4ed8"/> Apply for admission
              </button>
            </>
          )}

          <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:8,marginTop:22,fontSize:12.5,color:"#7a89ad",textAlign:"center",lineHeight:1.45}}>
            <I n="shield" s={15} c="#7a89ad"/>
            <span>{tab==="parent"?"Your child's records are visible only to you and the institute.":"Your data stays private to your institute."}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// ── Public admission portal — no login needed. Prospective students/teachers apply,
// admin reviews and approves/rejects from the Admissions screen. ──
const AdmissionApplyScreen=({store,toast,onBack})=>{
  const{shifts,setAdmissionApplications}=store;
  const[type,setType]=useState("student"); // "student" | "teacher"
  const[submitted,setSubmitted]=useState(false);
  const blank={name:"",phone:"",email:"",dob:"",fatherName:"",studentClass:"",qualification:"",subject:"",preferredShiftId:"",message:""};
  const[form,setForm]=useState(blank);
  const sf=(k,v)=>setForm(f=>({...f,[k]:v}));

  const submit=()=>{
    if(!form.name.trim())return toast.error("Please enter your name");
    if(!form.phone.trim())return toast.error("Please enter a phone number");
    setAdmissionApplications(list=>[{id:uid(),type,...form,name:form.name.trim(),phone:form.phone.trim(),status:"pending",createdAt:Date.now()},...(list||[])]);
    setSubmitted(true);
  };

  if(submitted){
    return(
      <div className="bf-sc" style={{position:"fixed",inset:0,background:"linear-gradient(135deg,#0d1b42,#1e3a8a)",zIndex:99999,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"calc(24px + env(safe-area-inset-top)) 24px calc(24px + env(safe-area-inset-bottom))",textAlign:"center"}}>
        <div style={{background:"rgba(255,255,255,.12)",borderRadius:22,padding:18,marginBottom:18}}><I n="checkbig" s={30} c="#4ade80"/></div>
        <div style={{fontSize:18,fontWeight:900,color:"#fff",marginBottom:8}}>Application Submitted!</div>
        <div style={{fontSize:13,color:"rgba(255,255,255,.7)",maxWidth:280,lineHeight:1.6,marginBottom:24}}>The admin will review your application and reach out on the phone number you provided.</div>
        <button onClick={onBack} style={{background:"rgba(255,255,255,.14)",border:"1px solid rgba(255,255,255,.18)",borderRadius:12,padding:"11px 20px",color:"#fff",fontSize:13,fontWeight:800,cursor:"pointer",fontFamily:"inherit"}}>Back to Login</button>
      </div>
    );
  }

  return(
    <div className="bf-sc" style={{position:"fixed",inset:0,background:"linear-gradient(135deg,#0d1b42,#1e3a8a)",zIndex:99999,display:"flex",flexDirection:"column",alignItems:"center",padding:"calc(24px + env(safe-area-inset-top)) 24px calc(24px + env(safe-area-inset-bottom))",overflowY:"auto"}}>
      <button onClick={onBack} style={{position:"absolute",top:"calc(24px + env(safe-area-inset-top))",left:24,background:"rgba(255,255,255,.1)",border:"none",borderRadius:11,padding:"8px 10px",cursor:"pointer"}}><I n="back" s={18} c="#fff"/></button>
      <div style={{width:"100%",maxWidth:360,marginTop:60,paddingBottom:40}}>
        <div style={{fontSize:18,fontWeight:900,color:"#fff",marginBottom:4,textAlign:"center"}}>Apply Here</div>
        <div style={{fontSize:12,color:"rgba(255,255,255,.6)",marginBottom:20,textAlign:"center"}}>{store.settings.institute}</div>
        <div style={{display:"flex",gap:8,background:"rgba(255,255,255,.08)",borderRadius:13,padding:4,marginBottom:20}}>
          <button onClick={()=>setType("student")} style={{flex:1,borderRadius:10,padding:"9px 4px",fontSize:12,fontWeight:800,border:"none",background:type==="student"?"#fff":"transparent",color:type==="student"?"#1e3a8a":"rgba(255,255,255,.7)",cursor:"pointer",fontFamily:"inherit"}}>Student Admission</button>
          <button onClick={()=>setType("teacher")} style={{flex:1,borderRadius:10,padding:"9px 4px",fontSize:12,fontWeight:800,border:"none",background:type==="teacher"?"#fff":"transparent",color:type==="teacher"?"#1e3a8a":"rgba(255,255,255,.7)",cursor:"pointer",fontFamily:"inherit"}}>Teacher Application</button>
        </div>

        <div style={{background:"rgba(255,255,255,.06)",borderRadius:18,padding:18}}>
          {[["Full Name","name","text","e.g. Priya Sharma"],["Phone Number","phone","tel","10-digit mobile number"],["Email (optional)","email","email","you@example.com"]].map(([label,key,htype,ph])=>(
            <div key={key} style={{marginBottom:12}}>
              <label style={{display:"block",fontSize:11,fontWeight:700,color:"rgba(255,255,255,.6)",marginBottom:5,textTransform:"uppercase",letterSpacing:.5}}>{label}</label>
              <input type={htype} value={form[key]} onChange={e=>sf(key,e.target.value)} placeholder={ph} style={{width:"100%",padding:"11px 13px",borderRadius:11,border:"1.5px solid rgba(255,255,255,.18)",background:"rgba(255,255,255,.08)",color:"#fff",fontSize:14,outline:"none",fontFamily:"inherit",boxSizing:"border-box"}}/>
            </div>
          ))}
          {type==="student"?(
            <>
              <div style={{marginBottom:12}}>
                <label style={{display:"block",fontSize:11,fontWeight:700,color:"rgba(255,255,255,.6)",marginBottom:5,textTransform:"uppercase",letterSpacing:.5}}>Father's Name</label>
                <input value={form.fatherName} onChange={e=>sf("fatherName",e.target.value)} placeholder="e.g. Suresh Sharma" style={{width:"100%",padding:"11px 13px",borderRadius:11,border:"1.5px solid rgba(255,255,255,.18)",background:"rgba(255,255,255,.08)",color:"#fff",fontSize:14,outline:"none",fontFamily:"inherit",boxSizing:"border-box"}}/>
              </div>
              <div style={{marginBottom:12}}>
                <label style={{display:"block",fontSize:11,fontWeight:700,color:"rgba(255,255,255,.6)",marginBottom:5,textTransform:"uppercase",letterSpacing:.5}}>Class</label>
                <input value={form.studentClass} onChange={e=>sf("studentClass",e.target.value)} placeholder="e.g. Class 10" style={{width:"100%",padding:"11px 13px",borderRadius:11,border:"1.5px solid rgba(255,255,255,.18)",background:"rgba(255,255,255,.08)",color:"#fff",fontSize:14,outline:"none",fontFamily:"inherit",boxSizing:"border-box"}}/>
              </div>
              <div style={{marginBottom:12}}>
                <label style={{display:"block",fontSize:11,fontWeight:700,color:"rgba(255,255,255,.6)",marginBottom:5,textTransform:"uppercase",letterSpacing:.5}}>Date of Birth</label>
                <input type="date" value={form.dob} onChange={e=>sf("dob",e.target.value)} style={{width:"100%",padding:"11px 13px",borderRadius:11,border:"1.5px solid rgba(255,255,255,.18)",background:"rgba(255,255,255,.08)",color:"#fff",fontSize:14,outline:"none",fontFamily:"inherit",boxSizing:"border-box"}}/>
              </div>
              <div style={{marginBottom:12}}>
                <label style={{display:"block",fontSize:11,fontWeight:700,color:"rgba(255,255,255,.6)",marginBottom:5,textTransform:"uppercase",letterSpacing:.5}}>Preferred Batch</label>
                <select value={form.preferredShiftId} onChange={e=>sf("preferredShiftId",e.target.value)} style={{width:"100%",padding:"11px 13px",borderRadius:11,border:"1.5px solid rgba(255,255,255,.18)",background:"rgba(255,255,255,.08)",color:"#fff",fontSize:14,outline:"none",fontFamily:"inherit",boxSizing:"border-box"}}>
                  <option value="" style={{color:"#000"}}>Not sure yet</option>
                  {shifts.map(sh=><option key={sh.id} value={sh.id} style={{color:"#000"}}>{sh.name}</option>)}
                </select>
              </div>
            </>
          ):(
            <>
              <div style={{marginBottom:12}}>
                <label style={{display:"block",fontSize:11,fontWeight:700,color:"rgba(255,255,255,.6)",marginBottom:5,textTransform:"uppercase",letterSpacing:.5}}>Qualification</label>
                <input value={form.qualification} onChange={e=>sf("qualification",e.target.value)} placeholder="e.g. B.Ed, M.Sc Mathematics" style={{width:"100%",padding:"11px 13px",borderRadius:11,border:"1.5px solid rgba(255,255,255,.18)",background:"rgba(255,255,255,.08)",color:"#fff",fontSize:14,outline:"none",fontFamily:"inherit",boxSizing:"border-box"}}/>
              </div>
              <div style={{marginBottom:12}}>
                <label style={{display:"block",fontSize:11,fontWeight:700,color:"rgba(255,255,255,.6)",marginBottom:5,textTransform:"uppercase",letterSpacing:.5}}>Subject(s) You Teach</label>
                <input value={form.subject} onChange={e=>sf("subject",e.target.value)} placeholder="e.g. Physics, Chemistry" style={{width:"100%",padding:"11px 13px",borderRadius:11,border:"1.5px solid rgba(255,255,255,.18)",background:"rgba(255,255,255,.08)",color:"#fff",fontSize:14,outline:"none",fontFamily:"inherit",boxSizing:"border-box"}}/>
              </div>
            </>
          )}
          <div style={{marginBottom:16}}>
            <label style={{display:"block",fontSize:11,fontWeight:700,color:"rgba(255,255,255,.6)",marginBottom:5,textTransform:"uppercase",letterSpacing:.5}}>Message (optional)</label>
            <textarea value={form.message} onChange={e=>sf("message",e.target.value)} rows={3} placeholder={type==="student"?"Anything you'd like to add...":"Your experience, availability, etc."} style={{width:"100%",padding:"11px 13px",borderRadius:11,border:"1.5px solid rgba(255,255,255,.18)",background:"rgba(255,255,255,.08)",color:"#fff",fontSize:13,outline:"none",fontFamily:"inherit",resize:"vertical",boxSizing:"border-box"}}/>
          </div>
          <button onClick={submit} style={{width:"100%",padding:"14px",borderRadius:12,border:"none",background:"linear-gradient(135deg,#1e3a8a,#2563eb)",color:"#fff",fontSize:14,fontWeight:800,cursor:"pointer",fontFamily:"inherit"}}>Submit Application</button>
        </div>
      </div>
    </div>
  );
};

const TeacherSelectScreen=({store,onLogin,onStudentLogin,onBack,onBypass,initialMode})=>{
  const{settings,teachers,setTeachers}=store;
  const[loginId,setLoginId]=useState("");
  const[pw,setPw]=useState("");
  const[error,setError]=useState("");
  const[mode,setMode]=useState(initialMode||"login"); // "login" | "reset-pick" | "reset-verify" | "reset-form"
  const[resetTarget,setResetTarget]=useState(null);
  const[newPw,setNewPw]=useState("");
  const[confirmPw,setConfirmPw]=useState("");
  const[resetMsg,setResetMsg]=useState("");
  const[secPin,setSecPin]=useState("");
  const[secError,setSecError]=useState("");
  const activeTeachers=teachers.filter(t=>!t.archived);

  const submit=(e)=>{
    e?.preventDefault?.();
    const id=loginId.trim().toLowerCase();
    if(!id||!pw){setError("Enter your User ID and Password");return;}
    const match=activeTeachers.find(t=>(t.loginId||"").toLowerCase()===id||t.name.trim().toLowerCase()===id);
    if(!match){setError("No account found with this User ID");return;}
    if(match.pin!==pw){setError("Incorrect password");return;}
    setError("");
    onLogin(match.id);
  };

  const doReset=()=>{
    setResetMsg("");
    if(!newPw||newPw.length<4){setResetMsg("Password must be at least 4 characters");return;}
    if(newPw!==confirmPw){setResetMsg("Passwords don't match");return;}
    setTeachers(ts=>ts.map(t=>t.id===resetTarget.id?{...t,pin:newPw}:t));
    setResetMsg("✓ Password reset! Redirecting to login...");
    setTimeout(()=>{
      if(initialMode){onBack&&onBack();return;}
      setMode("login");setLoginId(resetTarget.loginId||resetTarget.name);setPw("");
      setResetTarget(null);setNewPw("");setConfirmPw("");setResetMsg("");setError("");
    },1100);
  };

  const verifySecPin=()=>{
    if(!resetTarget.securityPin){setSecError("No recovery PIN was set up for this account. Ask another admin to reset it from Team & Access.");return;}
    if(secPin.trim()!==resetTarget.securityPin){setSecError("Incorrect Security PIN");return;}
    setSecError("");setMode("reset-form");
  };

  // ── Reset: pick which account ──
  if(mode==="reset-pick"){
    return(
      <div className="bf-sc" style={{position:"fixed",inset:0,background:"linear-gradient(135deg,#0d1b42,#1e3a8a)",zIndex:99999,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"calc(24px + env(safe-area-inset-top)) 24px calc(24px + env(safe-area-inset-bottom))",overflowY:"auto"}}>
        <button onClick={()=>initialMode?(onBack&&onBack()):setMode("login")} style={{position:"absolute",top:"calc(24px + env(safe-area-inset-top))",left:24,background:"rgba(255,255,255,.1)",border:"none",borderRadius:11,padding:"8px 10px",cursor:"pointer"}}><I n="back" s={18} c="#fff"/></button>
        <div style={{background:"rgba(255,255,255,.12)",borderRadius:22,padding:16,marginBottom:16}}>
          <I n="key" s={26} c="#fff"/>
        </div>
        <div style={{fontSize:18,fontWeight:900,color:"#fff",marginBottom:4,textAlign:"center"}}>Reset Password</div>
        <div style={{fontSize:12,color:"rgba(255,255,255,.6)",marginBottom:24,textAlign:"center"}}>Which account is this?</div>
        <div style={{width:"100%",maxWidth:340,display:"flex",flexDirection:"column",gap:10}}>
          {activeTeachers.map(t=>{
            const role=ROLE_INFO[t.role]||ROLE_INFO.teacher;
            return(
              <button key={t.id} onClick={()=>{setResetTarget(t);setSecPin("");setSecError("");setNewPw("");setConfirmPw("");setResetMsg("");setMode("reset-verify");}} style={{background:"rgba(255,255,255,.08)",border:"1.5px solid rgba(255,255,255,.15)",borderRadius:16,padding:"14px 16px",display:"flex",alignItems:"center",gap:14,cursor:"pointer",fontFamily:"inherit",textAlign:"left"}}>
                <div style={{width:40,height:40,borderRadius:13,background:`linear-gradient(135deg,${role.color},${role.color}dd)`,display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontSize:16,fontWeight:900,flexShrink:0}}>{t.name[0].toUpperCase()}</div>
                <div style={{flex:1}}>
                  <div style={{fontSize:14,fontWeight:800,color:"#fff"}}>{t.name}</div>
                  <div style={{fontSize:11,color:"rgba(255,255,255,.55)",marginTop:2}}>{role.label}</div>
                </div>
                <I n="back" s={16} c="rgba(255,255,255,.4)"/>
              </button>
            );
          })}
          {activeTeachers.length===0&&<div style={{textAlign:"center",color:"rgba(255,255,255,.6)",fontSize:13,padding:"20px 0"}}>No accounts found.</div>}
        </div>
      </div>
    );
  }

  // ── Reset: verify identity with Security PIN before allowing a new password ──
  if(mode==="reset-verify"&&resetTarget){
    const role=ROLE_INFO[resetTarget.role]||ROLE_INFO.teacher;
    return(
      <div className="bf-sc" style={{position:"fixed",inset:0,background:"linear-gradient(135deg,#0d1b42,#1e3a8a)",zIndex:99999,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"calc(24px + env(safe-area-inset-top)) 24px calc(24px + env(safe-area-inset-bottom))",overflowY:"auto"}}>
        <button onClick={()=>{setMode("reset-pick");setResetTarget(null);}} style={{position:"absolute",top:"calc(24px + env(safe-area-inset-top))",left:24,background:"rgba(255,255,255,.1)",border:"none",borderRadius:11,padding:"8px 10px",cursor:"pointer"}}><I n="back" s={18} c="#fff"/></button>
        <div style={{width:56,height:56,borderRadius:18,background:`linear-gradient(135deg,${role.color},${role.color}dd)`,display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontSize:22,fontWeight:900,marginBottom:14}}>{resetTarget.name[0].toUpperCase()}</div>
        <div style={{fontSize:16,fontWeight:800,color:"#fff",marginBottom:4}}>{resetTarget.name}</div>
        <div style={{fontSize:12,color:"rgba(255,255,255,.6)",marginBottom:24,textAlign:"center",maxWidth:280}}>Enter this account's Security PIN to verify it's really you</div>
        <div style={{width:"100%",maxWidth:320}}>
          <div style={{marginBottom:8}}>
            <input value={secPin} onChange={e=>{setSecPin(e.target.value);setSecError("");}} onKeyDown={e=>{if(e.key==="Enter")verifySecPin();}} type="password" placeholder="Security PIN" autoFocus style={{width:"100%",padding:"13px 14px",borderRadius:12,border:"1.5px solid rgba(255,255,255,.2)",background:"rgba(255,255,255,.08)",color:"#fff",fontSize:15,fontWeight:600,textAlign:"center",outline:"none",fontFamily:"inherit",boxSizing:"border-box"}}/>
          </div>
          {secError&&<div style={{fontSize:12,fontWeight:700,color:"#fca5a5",marginBottom:10,textAlign:"center"}}>{secError}</div>}
          <button onClick={verifySecPin} style={{width:"100%",padding:"14px",borderRadius:12,border:"none",background:"linear-gradient(135deg,#1e3a8a,#2563eb)",color:"#fff",fontSize:14,fontWeight:800,cursor:"pointer",fontFamily:"inherit",marginTop:6}}>Verify</button>
        </div>
      </div>
    );
  }

  // ── Reset: set new password for the picked account (only reachable after PIN verification) ──
  if(mode==="reset-form"&&resetTarget){
    const role=ROLE_INFO[resetTarget.role]||ROLE_INFO.teacher;
    return(
      <div className="bf-sc" style={{position:"fixed",inset:0,background:"linear-gradient(135deg,#0d1b42,#1e3a8a)",zIndex:99999,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"calc(24px + env(safe-area-inset-top)) 24px calc(24px + env(safe-area-inset-bottom))",overflowY:"auto"}}>
        <button onClick={()=>{setMode("reset-pick");setResetTarget(null);}} style={{position:"absolute",top:"calc(24px + env(safe-area-inset-top))",left:24,background:"rgba(255,255,255,.1)",border:"none",borderRadius:11,padding:"8px 10px",cursor:"pointer"}}><I n="back" s={18} c="#fff"/></button>
        <div style={{width:56,height:56,borderRadius:18,background:`linear-gradient(135deg,${role.color},${role.color}dd)`,display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontSize:22,fontWeight:900,marginBottom:14}}>{resetTarget.name[0].toUpperCase()}</div>
        <div style={{fontSize:16,fontWeight:800,color:"#fff",marginBottom:4}}>{resetTarget.name}</div>
        <div style={{fontSize:12,color:"rgba(255,255,255,.6)",marginBottom:24}}>Set a new password</div>
        <div style={{width:"100%",maxWidth:320}}>
          <div style={{marginBottom:12}}>
            <input value={newPw} onChange={e=>{setNewPw(e.target.value);setResetMsg("");}} type="password" placeholder="New password" style={{width:"100%",padding:"13px 14px",borderRadius:12,border:"1.5px solid rgba(255,255,255,.2)",background:"rgba(255,255,255,.08)",color:"#fff",fontSize:15,fontWeight:600,outline:"none",fontFamily:"inherit",boxSizing:"border-box"}}/>
          </div>
          <div style={{marginBottom:8}}>
            <input value={confirmPw} onChange={e=>{setConfirmPw(e.target.value);setResetMsg("");}} type="password" placeholder="Confirm new password" style={{width:"100%",padding:"13px 14px",borderRadius:12,border:"1.5px solid rgba(255,255,255,.2)",background:"rgba(255,255,255,.08)",color:"#fff",fontSize:15,fontWeight:600,outline:"none",fontFamily:"inherit",boxSizing:"border-box"}}/>
          </div>
          {resetMsg&&<div style={{fontSize:12,fontWeight:700,color:resetMsg.startsWith("✓")?"#86efac":"#fca5a5",marginBottom:10,textAlign:"center"}}>{resetMsg}</div>}
          <button onClick={doReset} style={{width:"100%",padding:"14px",borderRadius:12,border:"none",background:"linear-gradient(135deg,#1e3a8a,#2563eb)",color:"#fff",fontSize:14,fontWeight:800,cursor:"pointer",fontFamily:"inherit",marginTop:6}}>Reset Password</button>
        </div>
      </div>
    );
  }

  // ── Login form ──
  return(
    <div className="bf-sc" style={{position:"fixed",inset:0,background:"linear-gradient(135deg,#0d1b42,#1e3a8a)",zIndex:99999,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"calc(24px + env(safe-area-inset-top)) 24px calc(24px + env(safe-area-inset-bottom))",overflowY:"auto"}}>
      {onBack&&<button onClick={onBack} style={{position:"absolute",top:"calc(24px + env(safe-area-inset-top))",left:24,background:"rgba(255,255,255,.1)",border:"none",borderRadius:11,padding:"8px 10px",cursor:"pointer"}}><I n="back" s={18} c="#fff"/></button>}
      <div style={{background:"rgba(255,255,255,.12)",borderRadius:22,padding:16,marginBottom:16}}>
        <I n="shield" s={28} c="#fff"/>
      </div>
      <div style={{fontSize:18,fontWeight:900,color:"#fff",marginBottom:4,textAlign:"center"}}>{settings.institute}</div>
      <div style={{fontSize:12,color:"rgba(255,255,255,.6)",marginBottom:26}}>Admin / Teacher Login</div>

      <div style={{width:"100%",maxWidth:320}}>
        <div style={{marginBottom:12}}>
          <label style={{display:"block",fontSize:11,fontWeight:700,color:"rgba(255,255,255,.55)",marginBottom:6,textTransform:"uppercase",letterSpacing:.6}}>User ID</label>
          <input value={loginId} onChange={e=>{setLoginId(e.target.value);setError("");}} onKeyDown={e=>{if(e.key==="Enter")submit();}} placeholder="e.g. priya" autoCapitalize="none" autoCorrect="off" style={{width:"100%",padding:"13px 14px",borderRadius:12,border:"1.5px solid rgba(255,255,255,.2)",background:"rgba(255,255,255,.08)",color:"#fff",fontSize:15,fontWeight:600,outline:"none",fontFamily:"inherit",boxSizing:"border-box"}}/>
        </div>
        <div style={{marginBottom:8}}>
          <label style={{display:"block",fontSize:11,fontWeight:700,color:"rgba(255,255,255,.55)",marginBottom:6,textTransform:"uppercase",letterSpacing:.6}}>Password</label>
          <input value={pw} onChange={e=>{setPw(e.target.value);setError("");}} onKeyDown={e=>{if(e.key==="Enter")submit();}} type="password" placeholder="Password" style={{width:"100%",padding:"13px 14px",borderRadius:12,border:"1.5px solid rgba(255,255,255,.2)",background:"rgba(255,255,255,.08)",color:"#fff",fontSize:15,fontWeight:600,outline:"none",fontFamily:"inherit",boxSizing:"border-box"}}/>
        </div>
        {error&&<div style={{fontSize:12,color:"#fca5a5",fontWeight:700,marginBottom:10,textAlign:"center"}}>{error}</div>}
        <button onClick={submit} style={{width:"100%",padding:"14px",borderRadius:12,border:"none",background:"linear-gradient(135deg,#1e3a8a,#2563eb)",color:"#fff",fontSize:14,fontWeight:800,cursor:"pointer",fontFamily:"inherit",marginTop:6}}>Login</button>
      </div>

      {activeTeachers.length>0&&<button onClick={()=>setMode("reset-pick")} style={{marginTop:18,background:"none",border:"none",color:"rgba(255,255,255,.65)",fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:"inherit",textDecoration:"underline"}}>Forgot password?</button>}
      {activeTeachers.length===0&&(
        <div style={{textAlign:"center",padding:"20px 0",maxWidth:300}}>
          <div style={{color:"rgba(255,255,255,.6)",fontSize:12,marginBottom:12}}>No staff accounts set up yet.</div>
          {onBypass&&<button onClick={onBypass} style={{background:"rgba(255,255,255,.12)",border:"1.5px solid rgba(255,255,255,.25)",borderRadius:10,padding:"10px 16px",color:"#fff",fontSize:12,fontWeight:800,cursor:"pointer",fontFamily:"inherit"}}>Continue to Setup →</button>}
        </div>
      )}
      {onStudentLogin&&<button onClick={onStudentLogin} style={{marginTop:10,background:"none",border:"none",color:"rgba(255,255,255,.65)",fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:"inherit",textDecoration:"underline"}}>Student? Log in here</button>}
    </div>
  );
};

// ══════════════════════════════════════════════════════════════
// TEAM MANAGEMENT — add/edit/remove teacher accounts (Admin only)
// ══════════════════════════════════════════════════════════════
// ── Admin: full audit trail — who marked attendance, who approved leave, per student ──
// ── Admin: turn optional features on/off across the whole app ──
// ── Teacher Tests — admin creates eligibility/mock tests (MCQ), teachers take them, auto-scored ──
const TestsHub=({store,toast,onBack,viewerType,viewerId,viewerName})=>{
  const{tests,setTests,testAttempts,setTestAttempts,teachers,students}=store;
  const isAdmin=viewerType==="admin";
  const activeTeacherAccounts=(teachers||[]).filter(t=>!t.archived&&t.role==="teacher");
  const activeStudents=(students||[]).filter(s=>!s.archived);
  const[view,setView]=useState("list"); // list | build | assign | submissions | take | result
  const[selectedTest,setSelectedTest]=useState(null);
  const blankQ={id:uid(),text:"",options:["","","",""],correctIndex:0};
  const blankForm={title:"",instructions:"",audience:"teacher",forTeacherIds:[],forStudentIds:[],questions:[{...blankQ}]};
  const[form,setForm]=useState(blankForm);
  const[assignForm,setAssignForm]=useState(null); // {audience,forTeacherIds,forStudentIds}
  const[answers,setAnswers]=useState({});
  const[selectedAttempt,setSelectedAttempt]=useState(null);
  const[confirmLeave,setConfirmLeave]=useState(false);
  const[confirmDelId,setConfirmDelId]=useState(null);

  const myAttempt=t=>(testAttempts||[]).find(a=>a.testId===t.id&&a.attempterId===viewerId);
  const visibleTests=(tests||[]).filter(t=>{
    if(isAdmin)return true;
    if(t.audience!==viewerType)return false;
    const ids=viewerType==="teacher"?t.forTeacherIds:t.forStudentIds;
    return !ids?.length||ids.includes(viewerId);
  });

  // ── Admin: build a new test ──
  const sf=(k,v)=>setForm(f=>({...f,[k]:v}));
  const setQ=(qid,k,v)=>setForm(f=>({...f,questions:f.questions.map(q=>q.id===qid?{...q,[k]:v}:q)}));
  const setQOpt=(qid,idx,v)=>setForm(f=>({...f,questions:f.questions.map(q=>q.id===qid?{...q,options:q.options.map((o,i)=>i===idx?v:o)}:q)}));
  const addQ=()=>setForm(f=>({...f,questions:[...f.questions,{...blankQ,id:uid()}]}));
  const delQ=qid=>setForm(f=>({...f,questions:f.questions.filter(q=>q.id!==qid)}));
  const toggleId=(field,id)=>setForm(f=>({...f,[field]:f[field].includes(id)?f[field].filter(x=>x!==id):[...f[field],id]}));
  const publishTest=()=>{
    if(!form.title.trim())return toast.error("Please give the test a title");
    if(form.questions.some(q=>!q.text.trim()||q.options.some(o=>!o.trim())))return toast.error("Every question needs text and all 4 options filled in");
    const assigneeCount=form.audience==="teacher"?form.forTeacherIds.length:form.forStudentIds.length;
    setTests(list=>[{id:uid(),title:form.title.trim(),instructions:form.instructions.trim(),questions:form.questions,audience:form.audience,forTeacherIds:form.forTeacherIds,forStudentIds:form.forStudentIds,createdAt:Date.now()},...(list||[])]);
    toast.success(`Sent to ${assigneeCount?assigneeCount+" "+form.audience+"(s)":"all "+form.audience+"s"}`,"Test Published!");
    setForm(blankForm);setView("list");
  };
  const delTest=id=>{setTests(list=>list.filter(t=>t.id!==id));setTestAttempts(list=>list.filter(a=>a.testId!==id));toast.info("Test removed");};

  // ── Admin: re-assign an already-created test without rebuilding it ──
  const openAssign=t=>{setSelectedTest(t);setAssignForm({audience:t.audience,forTeacherIds:t.forTeacherIds||[],forStudentIds:t.forStudentIds||[]});setView("assign");};
  const toggleAssignId=(field,id)=>setAssignForm(f=>({...f,[field]:f[field].includes(id)?f[field].filter(x=>x!==id):[...f[field],id]}));
  const saveAssign=()=>{
    setTests(list=>list.map(t=>t.id===selectedTest.id?{...t,audience:assignForm.audience,forTeacherIds:assignForm.forTeacherIds,forStudentIds:assignForm.forStudentIds}:t));
    toast.success("Assignment updated","Saved");
    setView("list");setSelectedTest(null);setAssignForm(null);
  };

  // ── Teacher/Student: take a test ──
  const openTake=t=>{setSelectedTest(t);setAnswers({});setView("take");};
  const submitAttempt=()=>{
    const unanswered=selectedTest.questions.filter(q=>answers[q.id]===undefined).length;
    if(unanswered>0)return toast.error(`${unanswered} question${unanswered!==1?"s":""} still unanswered`);
    const score=selectedTest.questions.filter(q=>answers[q.id]===q.correctIndex).length;
    const attempt={id:uid(),testId:selectedTest.id,attempterId:viewerId,attempterName:viewerName,attempterType:viewerType,answers,score,total:selectedTest.questions.length,submittedAt:Date.now(),seenByAdmin:false};
    setTestAttempts(list=>[...(list||[]),attempt]);
    setSelectedAttempt(attempt);
    toast.success(`Scored ${score}/${selectedTest.questions.length}`,"Test Submitted!");
    setView("result");
  };

  // ═══ ADMIN: Re-assign screen ═══
  if(isAdmin&&view==="assign"&&selectedTest&&assignForm){
    return(
      <div>
        <PageHeader title={`Assign — ${selectedTest.title}`} onBack={()=>{setView("list");setSelectedTest(null);setAssignForm(null);}}/>
        <div style={{padding:"0 16px 24px"}}>
          <div style={{marginBottom:14}}>
            <label style={{display:"block",fontSize:11,fontWeight:700,color:"var(--textMuted)",marginBottom:8,textTransform:"uppercase",letterSpacing:.5}}>Who Is This For</label>
            <div style={{display:"flex",gap:8}}>
              <button onClick={()=>setAssignForm(f=>({...f,audience:"teacher"}))} style={{flex:1,padding:"10px",borderRadius:12,border:`2px solid ${assignForm.audience==="teacher"?"#1e3a8a":"var(--cardBorder)"}`,background:assignForm.audience==="teacher"?"#dbeafe":"var(--inputBg)",color:assignForm.audience==="teacher"?"#1e3a8a":"var(--textMuted)",fontSize:13,fontWeight:800,cursor:"pointer",fontFamily:"inherit"}}>Teachers</button>
              <button onClick={()=>setAssignForm(f=>({...f,audience:"student"}))} style={{flex:1,padding:"10px",borderRadius:12,border:`2px solid ${assignForm.audience==="student"?"#1e3a8a":"var(--cardBorder)"}`,background:assignForm.audience==="student"?"#dbeafe":"var(--inputBg)",color:assignForm.audience==="student"?"#1e3a8a":"var(--textMuted)",fontSize:13,fontWeight:800,cursor:"pointer",fontFamily:"inherit"}}>Students</button>
            </div>
          </div>
          <div style={{marginBottom:14}}>
            <label style={{display:"block",fontSize:11,fontWeight:700,color:"var(--textMuted)",marginBottom:8,textTransform:"uppercase",letterSpacing:.5}}>Assign To</label>
            <div style={{display:"flex",flexWrap:"wrap",gap:7}}>
              <button onClick={()=>setAssignForm(f=>({...f,[f.audience==="teacher"?"forTeacherIds":"forStudentIds"]:[]}))} style={{padding:"7px 13px",borderRadius:20,border:`2px solid ${!(assignForm.audience==="teacher"?assignForm.forTeacherIds:assignForm.forStudentIds).length?"#1e3a8a":"var(--cardBorder)"}`,background:!(assignForm.audience==="teacher"?assignForm.forTeacherIds:assignForm.forStudentIds).length?"#dbeafe":"var(--inputBg)",color:!(assignForm.audience==="teacher"?assignForm.forTeacherIds:assignForm.forStudentIds).length?"#1e3a8a":"var(--textMuted)",fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>{`All ${assignForm.audience==="teacher"?"Teachers":"Students"}`}</button>
              {(assignForm.audience==="teacher"?activeTeacherAccounts:activeStudents).map(p=>{
                const field=assignForm.audience==="teacher"?"forTeacherIds":"forStudentIds";
                const on=assignForm[field].includes(p.id);
                return <button key={p.id} onClick={()=>toggleAssignId(field,p.id)} style={{padding:"7px 13px",borderRadius:20,border:`2px solid ${on?"#1e3a8a":"var(--cardBorder)"}`,background:on?"#dbeafe":"var(--inputBg)",color:on?"#1e3a8a":"var(--textMuted)",fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>{p.name}</button>;
              })}
            </div>
          </div>
          <Btn onClick={saveAssign} full>Save Assignment</Btn>
        </div>
      </div>
    );
  }

  // ═══ ADMIN: Build screen ═══
  if(isAdmin&&view==="build"){
    return(
      <div>
        <PageHeader title="Create Test" onBack={()=>{setForm(blankForm);setView("list");}}/>
        <div style={{padding:"0 16px 100px"}}>
          <Inp label="Test Title" value={form.title} onChange={v=>sf("title",v)} placeholder="e.g. Teaching Eligibility Test 2026"/>
          <div style={{marginBottom:14}}>
            <label style={{display:"block",fontSize:11,fontWeight:700,color:"var(--textMuted)",marginBottom:6,textTransform:"uppercase",letterSpacing:.5}}>Instructions (optional)</label>
            <textarea value={form.instructions} onChange={e=>sf("instructions",e.target.value)} rows={2} placeholder="e.g. Answer all questions. Time: 30 minutes." style={{width:"100%",padding:"11px 13px",border:"1.5px solid var(--cardBorder)",borderRadius:12,fontSize:13,color:"var(--text)",background:"var(--inputBg)",outline:"none",fontFamily:"inherit",resize:"vertical",boxSizing:"border-box"}}/>
          </div>
          <div style={{marginBottom:14}}>
            <label style={{display:"block",fontSize:11,fontWeight:700,color:"var(--textMuted)",marginBottom:8,textTransform:"uppercase",letterSpacing:.5}}>Who Is This For</label>
            <div style={{display:"flex",gap:8}}>
              <button onClick={()=>sf("audience","teacher")} style={{flex:1,padding:"10px",borderRadius:12,border:`2px solid ${form.audience==="teacher"?"#1e3a8a":"var(--cardBorder)"}`,background:form.audience==="teacher"?"#dbeafe":"var(--inputBg)",color:form.audience==="teacher"?"#1e3a8a":"var(--textMuted)",fontSize:13,fontWeight:800,cursor:"pointer",fontFamily:"inherit"}}>Teachers</button>
              <button onClick={()=>sf("audience","student")} style={{flex:1,padding:"10px",borderRadius:12,border:`2px solid ${form.audience==="student"?"#1e3a8a":"var(--cardBorder)"}`,background:form.audience==="student"?"#dbeafe":"var(--inputBg)",color:form.audience==="student"?"#1e3a8a":"var(--textMuted)",fontSize:13,fontWeight:800,cursor:"pointer",fontFamily:"inherit"}}>Students</button>
            </div>
          </div>
          <div style={{marginBottom:14}}>
            <label style={{display:"block",fontSize:11,fontWeight:700,color:"var(--textMuted)",marginBottom:8,textTransform:"uppercase",letterSpacing:.5}}>Assign To</label>
            <div style={{display:"flex",flexWrap:"wrap",gap:7}}>
              <button onClick={()=>sf(form.audience==="teacher"?"forTeacherIds":"forStudentIds",[])} style={{padding:"7px 13px",borderRadius:20,border:`2px solid ${!(form.audience==="teacher"?form.forTeacherIds:form.forStudentIds).length?"#1e3a8a":"var(--cardBorder)"}`,background:!(form.audience==="teacher"?form.forTeacherIds:form.forStudentIds).length?"#dbeafe":"var(--inputBg)",color:!(form.audience==="teacher"?form.forTeacherIds:form.forStudentIds).length?"#1e3a8a":"var(--textMuted)",fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>{`All ${form.audience==="teacher"?"Teachers":"Students"}`}</button>
              {(form.audience==="teacher"?activeTeacherAccounts:activeStudents).map(p=>{
                const field=form.audience==="teacher"?"forTeacherIds":"forStudentIds";
                const on=form[field].includes(p.id);
                return <button key={p.id} onClick={()=>toggleId(field,p.id)} style={{padding:"7px 13px",borderRadius:20,border:`2px solid ${on?"#1e3a8a":"var(--cardBorder)"}`,background:on?"#dbeafe":"var(--inputBg)",color:on?"#1e3a8a":"var(--textMuted)",fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>{p.name}</button>;
              })}
            </div>
          </div>
          <div style={{fontWeight:800,fontSize:12,color:"var(--textMuted)",textTransform:"uppercase",letterSpacing:.7,margin:"18px 0 10px"}}>Questions</div>
          {form.questions.map((q,qi)=>(
            <div key={q.id} style={{background:"var(--card)",border:"1.5px solid var(--cardBorder)",borderRadius:16,padding:"14px 16px",marginBottom:12}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
                <span style={{fontSize:11,fontWeight:800,color:"var(--textFaint)"}}>QUESTION {qi+1}</span>
                {form.questions.length>1&&<button onClick={()=>delQ(q.id)} style={{background:"none",border:"none",cursor:"pointer",padding:2}}><I n="x" s={14} c="var(--textFaint)"/></button>}
              </div>
              <input value={q.text} onChange={e=>setQ(q.id,"text",e.target.value)} placeholder="Type the question..." style={{width:"100%",padding:"10px 12px",border:"1.5px solid var(--cardBorder)",borderRadius:10,fontSize:13,color:"var(--text)",background:"var(--inputBg)",outline:"none",fontFamily:"inherit",boxSizing:"border-box",marginBottom:10,fontWeight:600}}/>
              {q.options.map((opt,oi)=>(
                <div key={oi} style={{display:"flex",alignItems:"center",gap:8,marginBottom:7}}>
                  <button onClick={()=>setQ(q.id,"correctIndex",oi)} style={{width:22,height:22,borderRadius:"50%",border:`2px solid ${q.correctIndex===oi?"#16a34a":"var(--cardBorder)"}`,background:q.correctIndex===oi?"#16a34a":"transparent",flexShrink:0,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>{q.correctIndex===oi&&<I n="check" s={12} c="#fff"/>}</button>
                  <input value={opt} onChange={e=>setQOpt(q.id,oi,e.target.value)} placeholder={`Option ${oi+1}`} style={{flex:1,padding:"8px 11px",border:"1.5px solid var(--cardBorder)",borderRadius:9,fontSize:12,color:"var(--text)",background:"var(--inputBg)",outline:"none",fontFamily:"inherit",boxSizing:"border-box"}}/>
                </div>
              ))}
              <div style={{fontSize:10,color:"var(--textFaint)",marginTop:2}}>Tap the circle to mark the correct answer</div>
            </div>
          ))}
          <button onClick={addQ} style={{width:"100%",padding:"12px",borderRadius:12,border:"1.5px dashed var(--cardBorder)",background:"var(--inputBg)",color:"var(--textMuted)",fontSize:13,fontWeight:700,cursor:"pointer",fontFamily:"inherit",marginBottom:16}}>+ Add Another Question</button>
          <Btn onClick={publishTest} full>Publish Test</Btn>
        </div>
      </div>
    );
  }

  // ═══ ADMIN: View a test's questions & answer key ═══
  if(isAdmin&&view==="preview"&&selectedTest){
    return(
      <div>
        <PageHeader title={selectedTest.title} onBack={()=>setView("submissions")}/>
        <div style={{padding:"0 16px 24px"}}>
          {selectedTest.instructions&&<div style={{background:"#eef2ff",border:"1.5px solid #c7d2fe",borderRadius:14,padding:"12px 14px",marginBottom:16,fontSize:12,color:"#4338ca",fontWeight:600,lineHeight:1.5}}>{selectedTest.instructions}</div>}
          {selectedTest.questions.map((q,qi)=>(
            <div key={q.id} style={{background:"var(--card)",border:"1.5px solid var(--cardBorder)",borderRadius:14,padding:"12px 14px",marginBottom:10}}>
              <div style={{fontSize:13,fontWeight:700,color:"var(--text)",marginBottom:8}}>{qi+1}. {q.text}</div>
              {q.options.map((opt,oi)=>(
                <div key={oi} style={{fontSize:12,padding:"6px 9px",borderRadius:8,marginBottom:4,background:oi===q.correctIndex?"#dcfce7":"transparent",color:oi===q.correctIndex?"#166534":"var(--textMuted)",fontWeight:oi===q.correctIndex?700:500}}>{opt}{oi===q.correctIndex?" ✓ (correct)":""}</div>
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ═══ ADMIN: Submissions for a test ═══
  if(isAdmin&&view==="submissions"&&selectedTest){
    const attempts=(testAttempts||[]).filter(a=>a.testId===selectedTest.id).sort((a,b)=>b.submittedAt-a.submittedAt);
    if(selectedAttempt){
      const t=selectedTest;
      return(
        <div>
          <PageHeader title={selectedAttempt.attempterName} onBack={()=>setSelectedAttempt(null)}/>
          <div style={{padding:"0 16px 24px"}}>
            <div style={{background:"linear-gradient(135deg,#0d1b42,#1e3a8a)",borderRadius:16,padding:"16px",marginBottom:16,color:"#fff",textAlign:"center"}}>
              <div style={{fontSize:28,fontWeight:900}}>{selectedAttempt.score}/{selectedAttempt.total}</div>
              <div style={{fontSize:12,opacity:.8,marginTop:2}}>{Math.round(selectedAttempt.score/selectedAttempt.total*100)}% · Submitted {new Date(selectedAttempt.submittedAt).toLocaleString("en-IN",{day:"2-digit",month:"short",hour:"2-digit",minute:"2-digit"})}</div>
            </div>
            {t.questions.map((q,qi)=>{
              const given=selectedAttempt.answers[q.id];
              const correct=given===q.correctIndex;
              return(
                <div key={q.id} style={{background:"var(--card)",border:`1.5px solid ${correct?"#86efac":"#fca5a5"}`,borderRadius:14,padding:"12px 14px",marginBottom:10}}>
                  <div style={{fontSize:13,fontWeight:700,color:"var(--text)",marginBottom:8}}>{qi+1}. {q.text}</div>
                  {q.options.map((opt,oi)=>(
                    <div key={oi} style={{fontSize:12,padding:"6px 9px",borderRadius:8,marginBottom:4,background:oi===q.correctIndex?"#dcfce7":oi===given?"#fee2e2":"transparent",color:oi===q.correctIndex?"#166534":oi===given?"#991b1b":"var(--textMuted)",fontWeight:oi===q.correctIndex||oi===given?700:500}}>{opt}{oi===q.correctIndex?" ✓":oi===given?" ✗":""}</div>
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      );
    }
    return(
      <div>
        <PageHeader title={selectedTest.title} onBack={()=>{setSelectedTest(null);setView("list");}} right={<Btn onClick={()=>setView("preview")} sm outline c="#7c3aed"><I n="book" s={13}/> Questions</Btn>}/>
        <div style={{padding:"0 16px 24px"}}>
          <div style={{fontSize:11,color:"var(--textFaint)",marginBottom:14}}>{attempts.length} submission{attempts.length!==1?"s":""} · Assigned to {selectedTest.audience==="teacher"?(selectedTest.forTeacherIds?.length||"all")+" teacher(s)":(selectedTest.forStudentIds?.length||"all")+" student(s)"}</div>
          {attempts.length===0&&<div style={{textAlign:"center",padding:"40px 0",color:"var(--textFaint)",fontSize:13}}>No one has taken this test yet</div>}
          {attempts.map(a=>(
            <button key={a.id} onClick={()=>{setSelectedAttempt(a);if(!a.seenByAdmin)setTestAttempts(list=>list.map(x=>x.id===a.id?{...x,seenByAdmin:true}:x));}} style={{width:"100%",background:"var(--card)",border:"1.5px solid var(--cardBorder)",borderRadius:16,padding:"14px 16px",display:"flex",alignItems:"center",gap:12,cursor:"pointer",marginBottom:10,textAlign:"left",fontFamily:"inherit"}}>
              <Avatar name={a.attempterName} size={40}/>
              <div style={{flex:1,minWidth:0}}>
                <div style={{fontWeight:800,fontSize:13,color:"var(--text)"}}>{a.attempterName}{!a.seenByAdmin&&<span style={{marginLeft:6,width:7,height:7,borderRadius:"50%",background:"#ef4444",display:"inline-block"}}/>}</div>
                <div style={{fontSize:11,color:"var(--textFaint)",marginTop:2}}>{a.attempterType==="student"?"Student":"Teacher"} · {new Date(a.submittedAt).toLocaleDateString("en-IN",{day:"2-digit",month:"short"})}</div>
              </div>
              <div style={{fontSize:16,fontWeight:900,color:a.score/a.total>=.75?"#16a34a":a.score/a.total>=.5?"#f59e0b":"#dc2626"}}>{a.score}/{a.total}</div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  // ═══ TEACHER/STUDENT: Take a test ═══
  if(!isAdmin&&view==="take"&&selectedTest){
    return(
      <div>
        <PageHeader title={selectedTest.title} onBack={()=>setConfirmLeave(true)}/>
        {confirmLeave&&<Confirm msg="Leave without submitting? Your answers won't be saved." onYes={()=>{setConfirmLeave(false);setView("list");}} onNo={()=>setConfirmLeave(false)} yesLabel="Leave"/>}
        <div style={{padding:"0 16px 100px"}}>
          {selectedTest.instructions&&<div style={{background:"#eef2ff",border:"1.5px solid #c7d2fe",borderRadius:14,padding:"12px 14px",marginBottom:16,fontSize:12,color:"#4338ca",fontWeight:600,lineHeight:1.5}}>{selectedTest.instructions}</div>}
          {selectedTest.questions.map((q,qi)=>(
            <div key={q.id} style={{background:"var(--card)",border:"1.5px solid var(--cardBorder)",borderRadius:16,padding:"14px 16px",marginBottom:12}}>
              <div style={{fontSize:13,fontWeight:700,color:"var(--text)",marginBottom:10}}>{qi+1}. {q.text}</div>
              {q.options.map((opt,oi)=>{
                const sel=answers[q.id]===oi;
                return(
                  <button key={oi} onClick={()=>setAnswers(a=>({...a,[q.id]:oi}))} style={{width:"100%",display:"flex",alignItems:"center",gap:10,padding:"10px 12px",borderRadius:11,border:`1.5px solid ${sel?"#1e3a8a":"var(--cardBorder)"}`,background:sel?"#dbeafe":"var(--inputBg)",marginBottom:7,cursor:"pointer",fontFamily:"inherit",textAlign:"left"}}>
                    <div style={{width:18,height:18,borderRadius:"50%",border:`2px solid ${sel?"#1e3a8a":"var(--cardBorder)"}`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>{sel&&<div style={{width:9,height:9,borderRadius:"50%",background:"#1e3a8a"}}/>}</div>
                    <span style={{fontSize:13,color:"var(--text)",fontWeight:sel?700:500}}>{opt}</span>
                  </button>
                );
              })}
            </div>
          ))}
        </div>
        <div style={{position:"fixed",bottom:"calc(80px + env(safe-area-inset-bottom))",left:"50%",transform:"translateX(-50%)",width:"100%",maxWidth:480,padding:"0 16px",boxSizing:"border-box",zIndex:150}}>
          <Btn onClick={submitAttempt} full>Submit Test</Btn>
        </div>
      </div>
    );
  }

  // ═══ TEACHER/STUDENT: Result after submit ═══
  if(!isAdmin&&view==="result"&&selectedAttempt&&selectedTest){
    return(
      <div>
        <PageHeader title="Result" onBack={()=>{setView("list");setSelectedAttempt(null);setSelectedTest(null);}}/>
        <div style={{padding:"0 16px 24px"}}>
          <div style={{background:"linear-gradient(135deg,#0d1b42,#1e3a8a)",borderRadius:16,padding:"20px",marginBottom:16,color:"#fff",textAlign:"center"}}>
            <div style={{fontSize:32,fontWeight:900}}>{selectedAttempt.score}/{selectedAttempt.total}</div>
            <div style={{fontSize:13,opacity:.85,marginTop:4}}>{Math.round(selectedAttempt.score/selectedAttempt.total*100)}% Score</div>
          </div>
          {selectedTest.questions.map((q,qi)=>{
            const given=selectedAttempt.answers[q.id];
            const correct=given===q.correctIndex;
            return(
              <div key={q.id} style={{background:"var(--card)",border:`1.5px solid ${correct?"#86efac":"#fca5a5"}`,borderRadius:14,padding:"12px 14px",marginBottom:10}}>
                <div style={{fontSize:13,fontWeight:700,color:"var(--text)",marginBottom:8}}>{qi+1}. {q.text}</div>
                {q.options.map((opt,oi)=>(
                  <div key={oi} style={{fontSize:12,padding:"6px 9px",borderRadius:8,marginBottom:4,background:oi===q.correctIndex?"#dcfce7":oi===given?"#fee2e2":"transparent",color:oi===q.correctIndex?"#166534":oi===given?"#991b1b":"var(--textMuted)",fontWeight:oi===q.correctIndex||oi===given?700:500}}>{opt}{oi===q.correctIndex?" ✓":oi===given?" ✗":""}</div>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // ═══ LIST (default for all roles) ═══
  return(
    <div>
      <PageHeader title={isAdmin?"Tests":"My Tests"} onBack={onBack} right={isAdmin?<Btn onClick={()=>{setForm(blankForm);setView("build");}} sm c="#7c3aed"><I n="plus" s={13}/> Create</Btn>:null}/>
      <div style={{padding:"0 16px 24px"}}>
        {visibleTests.length===0&&<div style={{textAlign:"center",padding:"40px 0",color:"var(--textFaint)",fontSize:13}}>{isAdmin?"No tests created yet":"No tests assigned to you yet"}</div>}
        {visibleTests.map(t=>{
          const attemptsForTest=(testAttempts||[]).filter(a=>a.testId===t.id);
          const mine=!isAdmin?myAttempt(t):null;
          const unseenCount=attemptsForTest.filter(a=>!a.seenByAdmin).length;
          return isAdmin?(
            <div key={t.id} style={{background:"var(--card)",border:"1.5px solid var(--cardBorder)",borderRadius:16,padding:"14px 16px",display:"flex",alignItems:"center",gap:12,marginBottom:10}}>
              <button onClick={()=>{setSelectedTest(t);setView("submissions");}} style={{flex:1,minWidth:0,display:"flex",alignItems:"center",gap:12,background:"none",border:"none",cursor:"pointer",textAlign:"left",fontFamily:"inherit",padding:0}}>
                <div style={{background:"#7c3aed18",borderRadius:12,padding:11,flexShrink:0}}><I n="grad" s={20} c="#7c3aed"/></div>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{fontWeight:800,fontSize:13,color:"var(--text)"}}>{t.title}</div>
                  <div style={{fontSize:11,color:"var(--textFaint)",marginTop:2}}>{t.audience==="student"?"Students":"Teachers"} · {t.questions.length} question{t.questions.length!==1?"s":""} · {attemptsForTest.length} submission{attemptsForTest.length!==1?"s":""}{unseenCount?` · ${unseenCount} new`:""}</div>
                </div>
              </button>
              <div style={{display:"flex",alignItems:"center",gap:6,flexShrink:0}}>
                {unseenCount>0&&<span style={{background:"#ef4444",color:"#fff",borderRadius:20,minWidth:20,height:20,display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,fontWeight:800,padding:"0 5px"}}>{unseenCount}</span>}
                <button onClick={()=>openAssign(t)} style={{background:"#eef2ff",border:"none",borderRadius:9,padding:"6px 10px",fontSize:11,fontWeight:800,color:"#4338ca",cursor:"pointer",fontFamily:"inherit"}}>Assign</button>
                <button onClick={()=>setConfirmDelId(t.id)} style={{background:"none",border:"none",cursor:"pointer",padding:2}}><I n="x" s={15} c="var(--textFaint)"/></button>
              </div>
            </div>
          ):(
            <button key={t.id} onClick={()=>{setSelectedTest(t);mine?(setSelectedAttempt(mine),setView("result")):openTake(t);}} style={{width:"100%",background:"var(--card)",border:"1.5px solid var(--cardBorder)",borderRadius:16,padding:"14px 16px",display:"flex",alignItems:"center",gap:12,marginBottom:10,cursor:"pointer",fontFamily:"inherit",textAlign:"left"}}>
              <div style={{background:"#7c3aed18",borderRadius:12,padding:11,flexShrink:0}}><I n="grad" s={20} c="#7c3aed"/></div>
              <div style={{flex:1,minWidth:0}}>
                <div style={{fontWeight:800,fontSize:13,color:"var(--text)"}}>{t.title}</div>
                <div style={{fontSize:11,color:"var(--textFaint)",marginTop:2}}>{mine?`Completed — ${mine.score}/${mine.total}`:`${t.questions.length} question${t.questions.length!==1?"s":""} · Not started`}</div>
              </div>
              {!mine&&<span style={{background:"#7c3aed",color:"#fff",borderRadius:20,padding:"5px 13px",fontSize:11,fontWeight:800,flexShrink:0}}>Take Test</span>}
              {mine&&<span style={{fontSize:15,fontWeight:900,color:mine.score/mine.total>=.75?"#16a34a":mine.score/mine.total>=.5?"#f59e0b":"#dc2626",flexShrink:0}}>{Math.round(mine.score/mine.total*100)}%</span>}
            </button>
          );
        })}
      </div>
      {confirmDelId&&<Confirm msg="Delete this test? All submissions will be removed too." onYes={()=>{delTest(confirmDelId);setConfirmDelId(null);}} onNo={()=>setConfirmDelId(null)} yesLabel="Delete"/>}
    </div>
  );
};

const FeatureManager=({store,toast,onBack})=>{
  const{settings,setSettings,teachers}=store;
  const enabled=settings.enabledFeatures||{};
  const activeTeacherAccounts=(teachers||[]).filter(t=>!t.archived&&t.role==="teacher");
  const[customizeKey,setCustomizeKey]=useState(null);
  const[audienceForm,setAudienceForm]=useState(null); // {hideForTeachers,hideForStudents,hiddenTeacherIds}

  const toggle=key=>{
    const next={...DEFAULT_FEATURES,...enabled,[key]:!isFeatureOn(settings,key)};
    setSettings(s=>({...s,enabledFeatures:next}));
    toast.success(`${FEATURE_LABELS[key].label} ${next[key]?"enabled":"disabled"}`,next[key]?"Turned On":"Turned Off");
  };
  const openCustomize=key=>{
    const cfg=settings.featureAudience?.[key]||{hideForTeachers:false,hideForStudents:false,hiddenTeacherIds:[]};
    setAudienceForm({...cfg});
    setCustomizeKey(key);
  };
  const toggleHiddenTeacher=id=>setAudienceForm(f=>({...f,hiddenTeacherIds:f.hiddenTeacherIds.includes(id)?f.hiddenTeacherIds.filter(x=>x!==id):[...f.hiddenTeacherIds,id]}));
  const saveAudience=()=>{
    setSettings(s=>({...s,featureAudience:{...(s.featureAudience||{}),[customizeKey]:audienceForm}}));
    toast.success("Visibility rules updated","Saved");
    setCustomizeKey(null);setAudienceForm(null);
  };
  const hasCustomRule=key=>{
    const cfg=settings.featureAudience?.[key];
    return !!(cfg&&(cfg.hideForTeachers||cfg.hideForStudents||cfg.hiddenTeacherIds?.length));
  };

  return(
    <div>
      <PageHeader title="Manage Features" onBack={onBack}/>
      <div style={{padding:"0 16px 24px"}}>
        <div style={{background:"#eef2ff",border:"1.5px solid #c7d2fe",borderRadius:14,padding:"12px 14px",marginBottom:16,fontSize:12,color:"#4338ca",fontWeight:600,lineHeight:1.5}}>
          Turn any feature on or off for everyone, or tap <b>Customize</b> to hide it from just teachers, just students, or one specific teacher. No data is ever deleted.
        </div>
        {Object.keys(FEATURE_LABELS).map(key=>{
          const on=isFeatureOn(settings,key);
          const info=FEATURE_LABELS[key];
          const custom=hasCustomRule(key);
          return(
            <div key={key} style={{background:"var(--card)",border:`1.5px solid ${custom?"#fde68a":"var(--cardBorder)"}`,borderRadius:16,padding:"14px 16px",marginBottom:10}}>
              <div style={{display:"flex",alignItems:"center",gap:14,marginBottom:on?10:0}}>
                <div style={{flex:1}}>
                  <div style={{fontSize:14,fontWeight:800,color:"var(--text)"}}>{info.label}</div>
                  <div style={{fontSize:11,color:"var(--textFaint)",marginTop:2}}>{info.desc}</div>
                </div>
                <button onClick={()=>toggle(key)} style={{width:44,height:26,borderRadius:20,background:on?"#1e3a8a":"#e2e8f0",position:"relative",border:"none",cursor:"pointer",flexShrink:0,transition:"background .2s"}}>
                  <div style={{width:20,height:20,borderRadius:"50%",background:"#fff",position:"absolute",top:3,left:on?21:3,transition:"left .2s",boxShadow:"0 1px 3px rgba(0,0,0,.25)"}}/>
                </button>
              </div>
              {on&&<div style={{display:"flex",alignItems:"center",justifyContent:"space-between",paddingTop:10,borderTop:"1px solid var(--cardBorder)"}}>
                <span style={{fontSize:11,color:custom?"#b45309":"var(--textFaint)",fontWeight:custom?800:600}}>{custom?"⚠️ Custom visibility rule active":"Visible to everyone"}</span>
                <button onClick={()=>openCustomize(key)} style={{background:custom?"#fef3c7":"var(--inputBg)",border:"none",borderRadius:9,padding:"6px 11px",fontSize:11,fontWeight:800,color:custom?"#92400e":"var(--textMuted)",cursor:"pointer",fontFamily:"inherit"}}>Customize</button>
              </div>}
            </div>
          );
        })}
      </div>
      {customizeKey&&audienceForm&&(
        <Sheet title={`Visibility — ${FEATURE_LABELS[customizeKey].label}`} onClose={()=>{setCustomizeKey(null);setAudienceForm(null);}}>
          <div style={{background:"#fffbeb",border:"1.5px solid #fde68a",borderRadius:14,padding:"12px 14px",marginBottom:16,fontSize:12,color:"#92400e",fontWeight:600,lineHeight:1.5}}>
            The feature stays ON overall, but you can hide it from specific people below.
          </div>
          <div style={{background:"var(--card)",border:"1.5px solid var(--cardBorder)",borderRadius:14,padding:"12px 14px",marginBottom:10,display:"flex",alignItems:"center",gap:12}}>
            <div style={{flex:1}}><div style={{fontSize:13,fontWeight:800,color:"var(--text)"}}>Hide from All Teachers</div></div>
            <button onClick={()=>setAudienceForm(f=>({...f,hideForTeachers:!f.hideForTeachers}))} style={{width:40,height:24,borderRadius:20,background:audienceForm.hideForTeachers?"#dc2626":"#e2e8f0",position:"relative",border:"none",cursor:"pointer",flexShrink:0}}>
              <div style={{width:18,height:18,borderRadius:"50%",background:"#fff",position:"absolute",top:3,left:audienceForm.hideForTeachers?19:3,transition:"left .2s"}}/>
            </button>
          </div>
          <div style={{background:"var(--card)",border:"1.5px solid var(--cardBorder)",borderRadius:14,padding:"12px 14px",marginBottom:16,display:"flex",alignItems:"center",gap:12}}>
            <div style={{flex:1}}><div style={{fontSize:13,fontWeight:800,color:"var(--text)"}}>Hide from All Students</div></div>
            <button onClick={()=>setAudienceForm(f=>({...f,hideForStudents:!f.hideForStudents}))} style={{width:40,height:24,borderRadius:20,background:audienceForm.hideForStudents?"#dc2626":"#e2e8f0",position:"relative",border:"none",cursor:"pointer",flexShrink:0}}>
              <div style={{width:18,height:18,borderRadius:"50%",background:"#fff",position:"absolute",top:3,left:audienceForm.hideForStudents?19:3,transition:"left .2s"}}/>
            </button>
          </div>
          {!audienceForm.hideForTeachers&&<div style={{marginBottom:16}}>
            <label style={{display:"block",fontSize:11,fontWeight:700,color:"var(--textMuted)",marginBottom:8,textTransform:"uppercase",letterSpacing:.5}}>Or Hide From Specific Teacher(s)</label>
            <div style={{display:"flex",flexWrap:"wrap",gap:7}}>
              {activeTeacherAccounts.length===0&&<div style={{fontSize:12,color:"var(--textFaint)"}}>No teacher accounts yet</div>}
              {activeTeacherAccounts.map(t=>{
                const on=audienceForm.hiddenTeacherIds.includes(t.id);
                return <button key={t.id} onClick={()=>toggleHiddenTeacher(t.id)} style={{padding:"7px 13px",borderRadius:20,border:`2px solid ${on?"#dc2626":"var(--cardBorder)"}`,background:on?"#fee2e2":"var(--inputBg)",color:on?"#dc2626":"var(--textMuted)",fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>{t.name}</button>;
              })}
            </div>
          </div>}
          <Btn onClick={saveAudience} full>Save Visibility Rules</Btn>
        </Sheet>
      )}
    </div>
  );
};

// ── Backup & Restore — everything lives in this browser's storage only, so a
// downloadable backup is the only safety net against a cleared cache or a new device ──
const BACKUP_KEYS=["tp4_students","tp4_shifts","tp4_attend","tp4_payments","tp4_notes","tp4_expenses","tp4_marks","tp4_holidays","tp4_onetimefees","tp4_announcements","tp4_teachers","tp4_leaverequests","tp4_homework","tp4_feedback","tp4_messages","tp4_feereminders","tp4_notifseen","tp4_teachermessages","tp4_timetablereq","tp4_attendlog","tp4_tests","tp4_testattempts","tp4_studymaterials","tp4_admissions","tp4_parents","tp4_paymentclaims","tp4_settings"];
// ── Admin: review public admission applications, approve to create the real account ──
const AdmissionsManager=({store,toast,onBack})=>{
  const{admissionApplications,setAdmissionApplications,setStudents,setTeachers,shifts}=store;
  const[filter,setFilter]=useState("pending"); // pending | all
  const[typeFilter,setTypeFilter]=useState("all"); // all | student | teacher
  const[approving,setApproving]=useState(null); // application pending the approval form
  const[confirmRejectId,setConfirmRejectId]=useState(null);
  const[approveForm,setApproveForm]=useState({});

  const apps=(admissionApplications||[]).filter(a=>(filter==="all"||a.status==="pending")&&(typeFilter==="all"||a.type===typeFilter)).sort((a,b)=>b.createdAt-a.createdAt);
  const pendingCount=(admissionApplications||[]).filter(a=>a.status==="pending").length;

  const openApprove=app=>{
    setApproving(app);
    setApproveForm(app.type==="student"?{monthlyFee:"",category:"General"}:{loginId:slugifyId(app.name),pin:"",securityPin:""});
  };

  const confirmApprove=()=>{
    if(approving.type==="student"){
      if(!approveForm.monthlyFee||+approveForm.monthlyFee<=0)return toast.error("Please set a monthly fee");
      const cat=approveForm.category||"General";
      setStudents(ss=>[...ss,{
        name:approving.name,phone:approving.phone,parent:"",fatherName:approving.fatherName||"",studentClass:approving.studentClass||"",
        monthlyFee:+approveForm.monthlyFee,joining:todayStr(),
        address:"",shiftId:approving.preferredShiftId||"",shiftIds:approving.preferredShiftId?[approving.preferredShiftId]:[],
        notes:approving.message||"",favorite:false,dob:approving.dob||"",photo:"",category:cat,offerEligible:cat!=="General",offerReason:cat!=="General"?cat:"",
        discount:cat!=="General"?{type:"percent",value:10,reason:cat}:{type:"percent",value:0,reason:""},id:uid()
      }]);
      toast.success(`${approving.name} added as a student`,"Approved!");
    }else{
      if(!approveForm.pin||approveForm.pin.length<4)return toast.error("Please set a password (at least 4 characters)");
      if(!approveForm.securityPin||approveForm.securityPin.length<4)return toast.error("Please set a 4+ digit Security PIN");
      setTeachers(ts=>[...ts,{
        id:uid(),name:approving.name,role:"teacher",loginId:approveForm.loginId||slugifyId(approving.name),
        pin:approveForm.pin,securityPin:approveForm.securityPin,allowedShiftIds:[]
      }]);
      toast.success(`${approving.name} added as a teacher`,"Approved!");
    }
    setAdmissionApplications(list=>list.map(a=>a.id===approving.id?{...a,status:"approved",reviewedAt:Date.now()}:a));
    setApproving(null);setApproveForm({});
  };

  const reject=id=>{setAdmissionApplications(list=>list.map(a=>a.id===id?{...a,status:"rejected",reviewedAt:Date.now()}:a));setConfirmRejectId(null);toast.info("Application rejected");};

  return(
    <div>
      <PageHeader title="Admissions" onBack={onBack}/>
      <div style={{padding:"0 16px 24px"}}>
        <div style={{display:"flex",gap:6,marginBottom:12}}>
          <div style={{display:"flex",gap:6,background:"var(--card)",borderRadius:13,padding:4,border:"1px solid var(--cardBorder)",flex:1}}>
            <button onClick={()=>setFilter("pending")} style={{flex:1,borderRadius:10,padding:"8px 4px",fontSize:11,fontWeight:800,border:"none",background:filter==="pending"?"#1e3a8a":"transparent",color:filter==="pending"?"#fff":"var(--textFaint)",cursor:"pointer",fontFamily:"inherit"}}>Pending ({pendingCount})</button>
            <button onClick={()=>setFilter("all")} style={{flex:1,borderRadius:10,padding:"8px 4px",fontSize:11,fontWeight:800,border:"none",background:filter==="all"?"#1e3a8a":"transparent",color:filter==="all"?"#fff":"var(--textFaint)",cursor:"pointer",fontFamily:"inherit"}}>All</button>
          </div>
        </div>
        <div style={{display:"flex",gap:8,marginBottom:16,overflowX:"auto"}}>
          <Chip label="All Types" active={typeFilter==="all"} onClick={()=>setTypeFilter("all")}/>
          <Chip label="Students" active={typeFilter==="student"} onClick={()=>setTypeFilter("student")}/>
          <Chip label="Teachers" active={typeFilter==="teacher"} onClick={()=>setTypeFilter("teacher")}/>
        </div>
        {apps.length===0&&<div style={{textAlign:"center",padding:"40px 0",color:"var(--textFaint)",fontSize:13}}>No applications here</div>}
        {apps.map(app=>{
          const sh=app.preferredShiftId?shifts.find(x=>x.id===app.preferredShiftId):null;
          return(
            <div key={app.id} style={{background:"var(--card)",border:"1.5px solid var(--cardBorder)",borderRadius:16,padding:"14px 16px",marginBottom:12}}>
              <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:10}}>
                <Avatar name={app.name} size={40}/>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{fontWeight:800,fontSize:14,color:"var(--text)"}}>{app.name}</div>
                  <div style={{fontSize:11,color:"var(--textFaint)",marginTop:1}}>{app.type==="student"?"Student Admission":"Teacher Application"} · {fmtDate(new Date(app.createdAt).toISOString().split("T")[0])}</div>
                </div>
                {app.status==="pending"?<span style={{fontSize:10,fontWeight:800,color:"#92400e",background:"#fef9c3",borderRadius:20,padding:"3px 10px",flexShrink:0}}>PENDING</span>:
                 app.status==="approved"?<span style={{fontSize:10,fontWeight:800,color:"#166534",background:"#dcfce7",borderRadius:20,padding:"3px 10px",flexShrink:0}}>APPROVED</span>:
                 <span style={{fontSize:10,fontWeight:800,color:"#991b1b",background:"#fee2e2",borderRadius:20,padding:"3px 10px",flexShrink:0}}>REJECTED</span>}
              </div>
              <div style={{fontSize:12,color:"var(--textMuted)",lineHeight:1.6,marginBottom:app.message?8:0}}>
                📞 {app.phone}{app.email?` · ${app.email}`:""}<br/>
                {app.type==="student"?(<>{app.fatherName&&<>👨 Father: {app.fatherName}<br/></>}{app.studentClass&&<>🏫 {app.studentClass}<br/></>}{app.dob&&<>🎂 {fmtDate(app.dob)}<br/></>}{sh&&<>Preferred: {sh.name}<br/></>}</>):(<>{app.qualification&&<>🎓 {app.qualification}<br/></>}{app.subject&&<>Subjects: {app.subject}<br/></>}</>)}
              </div>
              {app.message&&<div style={{fontSize:12,color:"var(--textMuted)",background:"var(--inputBg)",borderRadius:10,padding:"8px 11px",marginBottom:10,fontStyle:"italic"}}>"{app.message}"</div>}
              {app.status==="pending"&&<div style={{display:"flex",gap:8}}>
                <button onClick={()=>setConfirmRejectId(app.id)} style={{flex:1,background:"#fee2e2",border:"none",borderRadius:10,padding:"9px",fontSize:12,fontWeight:800,color:"#991b1b",cursor:"pointer",fontFamily:"inherit"}}>Reject</button>
                <button onClick={()=>openApprove(app)} style={{flex:1,background:"#dcfce7",border:"none",borderRadius:10,padding:"9px",fontSize:12,fontWeight:800,color:"#166534",cursor:"pointer",fontFamily:"inherit"}}>Approve</button>
              </div>}
            </div>
          );
        })}
      </div>
      {approving&&(
        <Sheet title={`Approve ${approving.name}`} onClose={()=>setApproving(null)}>
          {approving.type==="student"?(
            <>
              <div style={{background:"#eef2ff",border:"1.5px solid #c7d2fe",borderRadius:14,padding:"12px 14px",marginBottom:16,fontSize:12,color:"#4338ca",fontWeight:600,lineHeight:1.5}}>This will create a new student record. A login ID & PIN will be generated the usual way.</div>
              <Inp label="Monthly Fee" value={approveForm.monthlyFee} onChange={v=>setApproveForm(f=>({...f,monthlyFee:v}))} type="number" placeholder="e.g. 1500"/>
              <Sel label="Category" value={approveForm.category||"General"} onChange={v=>setApproveForm(f=>({...f,category:v}))} options={STUDENT_CATEGORIES.map(c=>({v:c,l:c}))}/>
              {approveForm.category&&approveForm.category!=="General"&&<div style={{marginBottom:14,fontSize:11,color:"#166534",fontWeight:700,background:"#f0fdf4",border:"1.5px solid #bbf7d0",borderRadius:9,padding:"6px 10px"}}>✓ 10% discount will be auto-applied</div>}
            </>
          ):(
            <>
              <div style={{background:"#eef2ff",border:"1.5px solid #c7d2fe",borderRadius:14,padding:"12px 14px",marginBottom:16,fontSize:12,color:"#4338ca",fontWeight:600,lineHeight:1.5}}>This will create a new teacher account they can log in with.</div>
              <Inp label="User ID (Login)" value={approveForm.loginId} onChange={v=>setApproveForm(f=>({...f,loginId:v}))} placeholder="e.g. priya"/>
              <Inp label="Password" value={approveForm.pin} onChange={v=>setApproveForm(f=>({...f,pin:v}))} placeholder="At least 4 characters"/>
              <Inp label="Security PIN (for password recovery)" value={approveForm.securityPin} onChange={v=>setApproveForm(f=>({...f,securityPin:v}))} placeholder="4-digit PIN only they know"/>
            </>
          )}
          <div style={{display:"flex",gap:10,marginTop:6}}>
            <Btn onClick={()=>setApproving(null)} outline c="#64748b" full>Cancel</Btn>
            <Btn onClick={confirmApprove} c="#16a34a" full>Create Account</Btn>
          </div>
        </Sheet>
      )}
      {confirmRejectId&&<Confirm msg="Reject this application?" onYes={()=>reject(confirmRejectId)} onNo={()=>setConfirmRejectId(null)} yesLabel="Reject"/>}
    </div>
  );
};

const BackupRestore=({store,toast,onBack})=>{
  const fileRef=useRef(null);
  const[importing,setImporting]=useState(false);
  const[confirmRestore,setConfirmRestore]=useState(null); // parsed backup pending confirmation

  const lastBackupAt=LS.get("tp4_lastbackupat");

  const exportData=()=>{
    const data={};
    BACKUP_KEYS.forEach(k=>{const v=localStorage.getItem(k);if(v!=null)data[k]=JSON.parse(v);});
    const payload={app:"TuitionPlanner",exportedAt:Date.now(),data};
    const blob=new Blob([JSON.stringify(payload,null,2)],{type:"application/json"});
    const url=URL.createObjectURL(blob);
    const a=document.createElement("a");
    a.href=url;a.download=`tuitionplanner-backup-${todayStr()}.json`;
    document.body.appendChild(a);a.click();document.body.removeChild(a);
    URL.revokeObjectURL(url);
    LS.set("tp4_lastbackupat",Date.now());
    toast.success("Backup file downloaded — keep it somewhere safe (email, Drive, etc.)","Backup Downloaded!");
  };

  const onPickFile=e=>{
    const file=e.target.files[0];
    if(!file)return;
    setImporting(true);
    const reader=new FileReader();
    reader.onload=ev=>{
      setImporting(false);
      try{
        const parsed=JSON.parse(ev.target.result);
        const data=parsed.data||parsed;
        if(typeof data!=="object"||!data)throw new Error("bad shape");
        setConfirmRestore({data,exportedAt:parsed.exportedAt});
      }catch(err){
        toast.error("This doesn't look like a valid backup file","Invalid File");
      }
    };
    reader.onerror=()=>{setImporting(false);toast.error("Couldn't read that file");};
    reader.readAsText(file);
    e.target.value="";
  };

  const doRestore=()=>{
    Object.entries(confirmRestore.data).forEach(([k,v])=>{
      if(BACKUP_KEYS.includes(k)) localStorage.setItem(k,JSON.stringify(v));
    });
    toast.success("Backup restored — reloading...","Restored!");
    setConfirmRestore(null);
    setTimeout(()=>window.location.reload(),1000);
  };

  return(
    <div>
      <PageHeader title="Backup & Restore" onBack={onBack}/>
      <div style={{padding:"0 16px 24px"}}>
        <div style={{background:"#fef2f2",border:"1.5px solid #fecaca",borderRadius:14,padding:"12px 14px",marginBottom:18,fontSize:12,color:"#991b1b",fontWeight:600,lineHeight:1.5}}>
          ⚠️ All your data lives only in this browser. If you clear your cache, switch devices, or reinstall, everything is lost unless you have a backup file. Download one regularly.
        </div>

        <div style={{background:"var(--card)",border:"1.5px solid var(--cardBorder)",borderRadius:16,padding:"18px",marginBottom:16}}>
          <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:12}}>
            <div style={{background:"#1e3a8a18",borderRadius:12,padding:11}}><I n="sheet" s={20} c="#1e3a8a"/></div>
            <div style={{flex:1}}>
              <div style={{fontSize:14,fontWeight:800,color:"var(--text)"}}>Download Backup</div>
              <div style={{fontSize:11,color:"var(--textFaint)",marginTop:2}}>{lastBackupAt?`Last backup: ${new Date(lastBackupAt).toLocaleString("en-IN",{day:"2-digit",month:"short",hour:"2-digit",minute:"2-digit"})}`:"Never backed up yet"}</div>
            </div>
          </div>
          <Btn onClick={exportData} full>Download Backup File</Btn>
        </div>

        <div style={{background:"var(--card)",border:"1.5px solid var(--cardBorder)",borderRadius:16,padding:"18px"}}>
          <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:12}}>
            <div style={{background:"#f59e0b18",borderRadius:12,padding:11}}><I n="upload" s={20} c="#f59e0b"/></div>
            <div style={{flex:1}}>
              <div style={{fontSize:14,fontWeight:800,color:"var(--text)"}}>Restore From Backup</div>
              <div style={{fontSize:11,color:"var(--textFaint)",marginTop:2}}>Replaces all current data with the backup file's data</div>
            </div>
          </div>
          <input ref={fileRef} type="file" accept="application/json" onChange={onPickFile} style={{display:"none"}}/>
          <button onClick={()=>fileRef.current?.click()} disabled={importing} style={{width:"100%",padding:"14px",borderRadius:12,border:"1.5px dashed var(--cardBorder)",background:"var(--inputBg)",color:"var(--textMuted)",fontSize:13,fontWeight:700,cursor:importing?"default":"pointer",fontFamily:"inherit"}}>{importing?"Reading file...":"Choose Backup File"}</button>
        </div>
      </div>
      {confirmRestore&&(
        <Confirm msg={`This will REPLACE all current data with the backup${confirmRestore.exportedAt?` from ${new Date(confirmRestore.exportedAt).toLocaleDateString("en-IN",{day:"2-digit",month:"short",year:"numeric"})}`:""}. This can't be undone. Continue?`} onYes={doRestore} onNo={()=>setConfirmRestore(null)} yesLabel="Restore"/>
      )}
    </div>
  );
};

// ── Study Material — teachers/admin share notes & resource links per batch, students view them ──
const StudyMaterialHub=({store,toast,onBack,viewerType,currentTeacher,student})=>{
  const{studyMaterials,setStudyMaterials,shifts:allShifts,teachers}=store;
  const isAdmin=viewerType==="admin";
  const isTeacher=viewerType==="teacher";
  const scopedIds=isTeacher&&currentTeacher?.allowedShiftIds?.length?currentTeacher.allowedShiftIds:null;
  const myShifts=scopedIds?allShifts.filter(sh=>scopedIds.includes(sh.id)):allShifts;
  const[showAdd,setShowAdd]=useState(false);
  const[confirmDel,setConfirmDel]=useState(null);
  const blank={title:"",shiftId:myShifts[0]?.id||"",description:"",link:""};
  const[form,setForm]=useState(blank);

  const visibleMaterials=(studyMaterials||[]).filter(m=>{
    if(isAdmin||isTeacher)return myShifts.some(sh=>sh.id===m.shiftId)||isAdmin;
    const myShiftIds=getShiftIds(student);
    return myShiftIds.includes(m.shiftId);
  }).sort((a,b)=>b.createdAt-a.createdAt);

  const submit=()=>{
    if(!form.title.trim())return toast.error("Please give it a title");
    if(!form.description.trim()&&!form.link.trim())return toast.error("Add some notes or a link");
    const authorName=currentTeacher?.name||store.settings.institute||"Admin";
    setStudyMaterials(list=>[{id:uid(),title:form.title.trim(),shiftId:form.shiftId,description:form.description.trim(),link:form.link.trim(),uploadedByName:authorName,createdAt:Date.now()},...(list||[])]);
    toast.success("Students in that batch can now see it","Shared!");
    setForm({...blank,shiftId:form.shiftId});setShowAdd(false);
  };
  const del=id=>{setStudyMaterials(list=>list.filter(m=>m.id!==id));setConfirmDel(null);toast.info("Removed");};

  const canAdd=isAdmin||isTeacher;
  return(
    <div>
      <PageHeader title="Study Material" onBack={onBack} right={canAdd?<Btn onClick={()=>{setForm(blank);setShowAdd(true);}} sm c="#0ea5e9"><I n="plus" s={13}/> Share</Btn>:null}/>
      <div style={{padding:"0 16px 24px"}}>
        {visibleMaterials.length===0&&<div style={{textAlign:"center",padding:"40px 0",color:"var(--textFaint)",fontSize:13}}>{canAdd?"Nothing shared yet":"Your teacher hasn't shared anything yet"}</div>}
        {visibleMaterials.map(m=>{
          const sh=allShifts.find(x=>x.id===m.shiftId);
          return(
            <div key={m.id} style={{background:"var(--card)",border:"1.5px solid var(--cardBorder)",borderRadius:16,padding:"14px 16px",marginBottom:10}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:6}}>
                <div style={{display:"flex",alignItems:"center",gap:10}}>
                  <div style={{background:"#0ea5e918",borderRadius:10,padding:9,flexShrink:0}}><I n="book" s={16} c="#0ea5e9"/></div>
                  <div>
                    <div style={{fontWeight:800,fontSize:13,color:"var(--text)"}}>{m.title}</div>
                    <div style={{fontSize:10,color:"var(--textFaint)",marginTop:1}}>{sh?.name||"Batch"} · {m.uploadedByName} · {fmtDate(new Date(m.createdAt).toISOString().split("T")[0])}</div>
                  </div>
                </div>
                {canAdd&&<button onClick={()=>setConfirmDel(m.id)} style={{background:"none",border:"none",cursor:"pointer",padding:2,flexShrink:0}}><I n="x" s={14} c="var(--textFaint)"/></button>}
              </div>
              {m.description&&<div style={{fontSize:13,color:"var(--textMuted)",lineHeight:1.5,marginBottom:m.link?8:0,marginLeft:2}}>{m.description}</div>}
              {m.link&&<a href={m.link} target="_blank" rel="noopener noreferrer" style={{fontSize:12,color:"#0ea5e9",fontWeight:700,textDecoration:"underline",wordBreak:"break-all",marginLeft:2}}>{m.link}</a>}
            </div>
          );
        })}
      </div>
      {showAdd&&(
        <Sheet title="Share Study Material" onClose={()=>setShowAdd(false)}>
          <Inp label="Title" value={form.title} onChange={v=>setForm(f=>({...f,title:v}))} placeholder="e.g. Chapter 5 Notes — Photosynthesis"/>
          <Sel label="Batch" value={form.shiftId} onChange={v=>setForm(f=>({...f,shiftId:v}))} options={myShifts.map(sh=>({v:sh.id,l:sh.name}))}/>
          <div style={{marginBottom:14}}>
            <label style={{display:"block",fontSize:11,fontWeight:700,color:"var(--textMuted)",marginBottom:6,textTransform:"uppercase",letterSpacing:.5}}>Notes (optional)</label>
            <textarea value={form.description} onChange={e=>setForm(f=>({...f,description:e.target.value}))} rows={3} placeholder="Type notes, a summary, or instructions..." style={{width:"100%",padding:"11px 13px",border:"1.5px solid var(--cardBorder)",borderRadius:12,fontSize:14,color:"var(--text)",background:"var(--inputBg)",outline:"none",fontFamily:"inherit",resize:"vertical",boxSizing:"border-box"}}/>
          </div>
          <Inp label="Link (optional)" value={form.link} onChange={v=>setForm(f=>({...f,link:v}))} placeholder="Google Drive / YouTube / any URL"/>
          <div style={{display:"flex",gap:10}}>
            <Btn onClick={()=>setShowAdd(false)} outline c="#64748b" full>Cancel</Btn>
            <Btn onClick={submit} c="#0ea5e9" full>Share with Batch</Btn>
          </div>
        </Sheet>
      )}
      {confirmDel&&<Confirm msg="Remove this study material?" onYes={()=>del(confirmDel)} onNo={()=>setConfirmDel(null)} yesLabel="Remove"/>}
    </div>
  );
};

const ActivityLog=({store,toast,onBack})=>{
  const{students,attendLog,setAttendLog,leaveRequests}=store;
  const active=students.filter(s=>!s.archived);
  const[q,setQ]=useState("");
  const[selectedId,setSelectedId]=useState(null);
  const[showNote,setShowNote]=useState(false);
  const[noteText,setNoteText]=useState("");
  const[confirmDel,setConfirmDel]=useState(null);

  const ql=q.trim().toLowerCase();
  const filtered=active.filter(s=>ql?s.name.toLowerCase().includes(ql):true);
  const selected=students.find(s=>s.id===selectedId);

  const addNote=()=>{
    if(!noteText.trim())return toast.error("Please write a note");
    setAttendLog(list=>[...(list||[]),{id:uid(),studentId:selectedId,date:todayStr(),status:"note",note:noteText.trim(),markedBy:"admin",markedByName:"Admin",markedAt:Date.now()}]);
    toast.success("Note added to activity log","Added");
    setNoteText("");setShowNote(false);
  };
  const delEntry=id=>{setAttendLog(list=>list.filter(e=>e.id!==id));setConfirmDel(null);toast.info("Entry removed from log");};

  if(selected){
    const myAttendLog=(attendLog||[]).filter(e=>e.studentId===selected.id&&!e.viaLeaveApproval);
    const myLeaveDecisions=(leaveRequests||[]).filter(r=>r.studentId===selected.id&&r.status!=="pending");
    const timeline=[
      ...myAttendLog.map(e=>({...e,kind:"attend",ts:e.markedAt})),
      ...myLeaveDecisions.map(r=>({...r,kind:"leave",ts:new Date(r.respondedAt||r.createdAt).getTime()})),
    ].sort((a,b)=>b.ts-a.ts);

    return(
      <div>
        <PageHeader title={selected.name} onBack={()=>setSelectedId(null)} right={<Btn onClick={()=>setShowNote(true)} sm outline c="#1e3a8a"><I n="plus" s={13}/> Note</Btn>}/>
        <div style={{padding:"0 16px 24px"}}>
          {timeline.length===0&&<div style={{textAlign:"center",padding:"40px 0",color:"var(--textFaint)",fontSize:13}}>No activity recorded yet</div>}
          {timeline.map((e,i)=>{
            if(e.kind==="attend"){
              const isNote=e.status==="note";
              const statusColor=isNote?"#1e3a8a":e.status==="present"?"#16a34a":e.status==="absent"?"#dc2626":"#7c3aed";
              const statusLabel=isNote?"NOTE":e.status.toUpperCase();
              return(
                <div key={e.id} style={{background:"var(--card)",border:"1.5px solid var(--cardBorder)",borderRadius:14,padding:"12px 14px",marginBottom:9}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:6}}>
                    <div style={{display:"flex",alignItems:"center",gap:8}}>
                      <span style={{background:statusColor+"18",color:statusColor,borderRadius:8,padding:"3px 9px",fontSize:10,fontWeight:800}}>{statusLabel}</span>
                      {!isNote&&<span style={{fontSize:12,fontWeight:700,color:"var(--text)"}}>{fmtDate(e.date)}</span>}
                    </div>
                    <button onClick={()=>setConfirmDel(e.id)} style={{background:"none",border:"none",cursor:"pointer",padding:2}}><I n="x" s={13} c="var(--textFaint)"/></button>
                  </div>
                  {isNote&&<div style={{fontSize:13,color:"var(--text)",lineHeight:1.5,marginBottom:6}}>{e.note}</div>}
                  <div style={{fontSize:11,color:"var(--textFaint)"}}>By <b style={{color:"var(--textMuted)"}}>{e.markedByName}</b> · {new Date(e.markedAt).toLocaleString("en-IN",{day:"2-digit",month:"short",hour:"2-digit",minute:"2-digit"})}</div>
                </div>
              );
            }
            const isApproved=e.status==="approved";
            return(
              <div key={e.id} style={{background:"var(--card)",border:"1.5px solid var(--cardBorder)",borderRadius:14,padding:"12px 14px",marginBottom:9}}>
                <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:6}}>
                  <span style={{background:(isApproved?"#7c3aed":"#dc2626")+"18",color:isApproved?"#7c3aed":"#dc2626",borderRadius:8,padding:"3px 9px",fontSize:10,fontWeight:800}}>LEAVE {e.status.toUpperCase()}</span>
                  <span style={{fontSize:12,fontWeight:700,color:"var(--text)"}}>{e.toDate&&e.toDate!==(e.fromDate||e.date)?`${fmtDate(e.fromDate||e.date)} – ${fmtDate(e.toDate)}`:fmtDate(e.fromDate||e.date)}</span>
                </div>
                <div style={{fontSize:12,color:"var(--textMuted)",marginBottom:6}}>{e.reason}</div>
                <div style={{fontSize:11,color:"var(--textFaint)"}}>By <b style={{color:"var(--textMuted)"}}>{e.respondedBy||"Admin"}</b> · {e.respondedAt?new Date(e.respondedAt).toLocaleString("en-IN",{day:"2-digit",month:"short",hour:"2-digit",minute:"2-digit"}):""}</div>
              </div>
            );
          })}
        </div>
        {showNote&&(
          <Sheet title="Add Admin Note" onClose={()=>setShowNote(false)}>
            <textarea value={noteText} onChange={e=>setNoteText(e.target.value)} rows={4} placeholder="e.g. Parent called regarding late fee, will pay by Friday..." style={{width:"100%",padding:"11px 13px",border:"1.5px solid var(--cardBorder)",borderRadius:12,fontSize:14,color:"var(--text)",background:"var(--inputBg)",outline:"none",fontFamily:"inherit",resize:"vertical",boxSizing:"border-box",marginBottom:14}}/>
            <div style={{display:"flex",gap:10}}>
              <Btn onClick={()=>setShowNote(false)} outline c="#64748b" full>Cancel</Btn>
              <Btn onClick={addNote} full>Add Note</Btn>
            </div>
          </Sheet>
        )}
        {confirmDel&&<Confirm msg="Remove this entry from the activity log?" onYes={()=>delEntry(confirmDel)} onNo={()=>setConfirmDel(null)} yesLabel="Remove"/>}
      </div>
    );
  }

  return(
    <div>
      <PageHeader title="Activity Log" onBack={onBack}/>
      <div style={{padding:"0 16px 24px"}}>
        <div style={{background:"#eef2ff",border:"1.5px solid #c7d2fe",borderRadius:14,padding:"12px 14px",marginBottom:16,fontSize:12,color:"#4338ca",fontWeight:600,lineHeight:1.5}}>
          See exactly who marked attendance and who approved leave for any student — with names and timestamps.
        </div>
        <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search student..." style={{width:"100%",padding:"11px 14px",borderRadius:12,border:"1.5px solid var(--cardBorder)",background:"var(--inputBg)",fontSize:13,color:"var(--text)",outline:"none",boxSizing:"border-box",fontFamily:"inherit",marginBottom:14}}/>
        {filtered.length===0&&<div style={{textAlign:"center",padding:"40px 0",color:"var(--textFaint)",fontSize:13}}>No students found</div>}
        {filtered.map(s=>{
          const cnt=(attendLog||[]).filter(e=>e.studentId===s.id).length+(leaveRequests||[]).filter(r=>r.studentId===s.id&&r.status!=="pending").length;
          return(
            <button key={s.id} onClick={()=>setSelectedId(s.id)} style={{width:"100%",background:"var(--card)",border:"1.5px solid var(--cardBorder)",borderRadius:16,padding:"12px 14px",display:"flex",alignItems:"center",gap:12,cursor:"pointer",marginBottom:10,textAlign:"left",fontFamily:"inherit"}}>
              <Avatar name={s.name} size={40}/>
              <div style={{flex:1,minWidth:0}}>
                <div style={{fontWeight:800,fontSize:13,color:"var(--text)"}}>{s.name}</div>
                <div style={{fontSize:11,color:"var(--textFaint)",marginTop:2}}>{cnt} logged event{cnt!==1?"s":""}</div>
              </div>
              <I n="back" s={16} c="var(--cardBorder)"/>
            </button>
          );
        })}
      </div>
    </div>
  );
};

const TeamManagement=({store,toast,onBack,currentTeacherId}) => {
  const{teachers,setTeachers,shifts}=store;
  const[showForm,setShowForm]=useState(false);
  const[editing,setEditing]=useState(null);
  const[confirmDel,setConfirmDel]=useState(null);
  const blank={name:"",role:"teacher",loginId:"",pin:"",securityPin:"",allowedShiftIds:[]}; // allowedShiftIds empty = all shifts
  const[form,setForm]=useState(blank);
  const sf=(k,v)=>setForm(f=>({...f,[k]:v}));

  const openAdd=()=>{setForm(blank);setEditing(null);setShowForm(true);};
  const openEdit=t=>{setForm({...t,loginId:t.loginId||""});setEditing(t);setShowForm(true);};
  const closeForm=()=>{setShowForm(false);setEditing(null);setForm(blank);};

  const submit=()=>{
    if(!form.name.trim()) return toast.error("Please enter a name");
    if(!form.pin||form.pin.length<4) return toast.error("Please set a password (at least 4 characters)");
    if(!form.securityPin||form.securityPin.length<4) return toast.error("Please set a 4+ digit Security PIN (used to verify password resets)");
    const others=teachers.filter(t=>!editing||t.id!==editing.id);
    let loginId=slugifyId(form.loginId);
    if(!loginId) loginId=genLoginId(form.name,"",others.map(t=>t.loginId));
    if(others.some(t=>(t.loginId||"").toLowerCase()===loginId.toLowerCase())) return toast.error("This User ID is already taken, please choose another");
    const payload={...form,loginId};
    if(editing){
      setTeachers(ts=>ts.map(t=>t.id===editing.id?{...t,...payload}:t));
      toast.success("Teacher account updated","Updated");
    } else {
      setTeachers(ts=>[...ts,{...payload,id:uid(),archived:false,created:Date.now()}]);
      toast.success(`${form.name} added as ${ROLE_INFO[form.role].label}`,"Added!");
    }
    closeForm();
  };
  const del=id=>{
    if(id===currentTeacherId){toast.error("You can't remove your own account while logged in");setConfirmDel(null);return;}
    setTeachers(ts=>ts.filter(t=>t.id!==id));setConfirmDel(null);toast.info("Teacher account removed");
  };

  const toggleShift=shId=>{
    const cur=form.allowedShiftIds||[];
    if(!cur.includes(shId)){
      // Adding new access — check for a day+time clash against batches already selected for this teacher
      const newSh=shifts.find(s=>s.id===shId);
      for(const otherId of cur){
        const other=shifts.find(s=>s.id===otherId);
        if(!other) continue;
        const sharedDays=(newSh.days||[]).filter(d=>other.days?.includes(d));
        for(const d of sharedDays){
          const t1=getShiftTime(newSh,d),t2=getShiftTime(other,d);
          if(t1.start&&t1.end&&t2.start&&t2.end&&timeRangesOverlap(t1.start,t1.end,t2.start,t2.end)){
            toast.error(`"${newSh.name}" clashes with "${other.name}" on ${d} at an overlapping time — can't assign both to the same teacher`,"Scheduling Conflict");
            return;
          }
        }
      }
    }
    sf("allowedShiftIds",cur.includes(shId)?cur.filter(x=>x!==shId):[...cur,shId]);
  };

  return(
    <div>
      <PageHeader title="Team & Access" onBack={onBack} right={<Btn onClick={openAdd} sm c="#7c3aed"><I n="userplus" s={13}/> Add</Btn>}/>
      <div style={{padding:"0 16px 24px"}}>
        <div style={{background:"#ede9fe",border:"1.5px solid #c4b5fd50",borderRadius:14,padding:"12px 14px",marginBottom:16,fontSize:12,color:"#5b21b6",lineHeight:1.6}}>
          Add teacher accounts so multiple people can use this app with their own User ID & Password. <b>Admins</b> see everything. <b>Teachers</b> can be restricted to specific batches.
        </div>

        {teachers.length===0&&<div style={{textAlign:"center",padding:"50px 20px"}}>
          <div style={{fontSize:44,marginBottom:12}}>👥</div>
          <div style={{fontWeight:800,fontSize:16,color:"var(--text)",marginBottom:6}}>No team members yet</div>
          <div style={{fontSize:13,color:"var(--textFaint)",marginBottom:20}}>Add yourself and other teachers to enable multi-login</div>
          <Btn onClick={openAdd} c="#7c3aed"><I n="userplus" s={14}/> Add Teacher</Btn>
        </div>}

        {teachers.map(t=>{
          const role=ROLE_INFO[t.role]||ROLE_INFO.teacher;
          const isYou=t.id===currentTeacherId;
          const shiftNames=t.role==="admin"||!t.allowedShiftIds?.length?"All batches":shifts.filter(s=>t.allowedShiftIds.includes(s.id)).map(s=>s.name).join(", ")||"No batches assigned";
          return(
            <div key={t.id} style={{background:"var(--card)",borderRadius:16,padding:"14px 16px",marginBottom:10,border:"1.5px solid var(--cardBorder)",boxShadow:"0 2px 8px var(--shadow)"}}>
              <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:10}}>
                <div style={{width:42,height:42,borderRadius:13,background:`linear-gradient(135deg,${role.color},${role.color}dd)`,display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontSize:16,fontWeight:900,flexShrink:0}}>{t.name[0].toUpperCase()}</div>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{fontWeight:800,fontSize:14,color:"var(--text)",display:"flex",alignItems:"center",gap:6}}>{t.name}{isYou&&<span style={{fontSize:10,color:"#7c3aed",fontWeight:700}}>(You)</span>}</div>
                  <div style={{fontSize:11,color:"var(--textFaint)",marginTop:2}}>ID: {t.loginId||"—"} · {shiftNames}</div>
                </div>
                <span style={{background:role.bg,color:role.color,borderRadius:20,padding:"3px 10px",fontSize:11,fontWeight:800}}>{role.label}</span>
              </div>
              <div style={{display:"flex",gap:8}}>
                <button onClick={()=>openEdit(t)} style={{flex:1,background:"#ede9fe",border:"none",borderRadius:9,padding:"8px",fontSize:12,fontWeight:700,color:"#5b21b6",cursor:"pointer",fontFamily:"inherit"}}>Edit</button>
                <button onClick={()=>setConfirmDel(t.id)} style={{flex:1,background:"#fee2e2",border:"none",borderRadius:9,padding:"8px",fontSize:12,fontWeight:700,color:"#dc2626",cursor:"pointer",fontFamily:"inherit"}}>Remove</button>
              </div>
            </div>
          );
        })}
      </div>

      {showForm&&(
        <Sheet title={editing?"Edit Teacher":"Add Teacher"} onClose={closeForm}>
          <Inp label="Full Name" value={form.name} onChange={v=>sf("name",v)} req placeholder="e.g. Priya Verma"/>
          <div style={{marginBottom:14}}>
            <label style={{display:"block",fontSize:11,fontWeight:700,color:"var(--textMuted)",marginBottom:8,textTransform:"uppercase",letterSpacing:.6}}>Role</label>
            <div style={{display:"flex",gap:8}}>
              <button onClick={()=>sf("role","admin")} style={{flex:1,padding:"12px",borderRadius:12,border:`2px solid ${form.role==="admin"?"#7c3aed":"var(--cardBorder)"}`,background:form.role==="admin"?"#ede9fe":"var(--inputBg)",cursor:"pointer",fontFamily:"inherit",textAlign:"left"}}>
                <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:3}}><I n="shield" s={14} c="#7c3aed"/><span style={{fontSize:13,fontWeight:800,color:form.role==="admin"?"#5b21b6":"var(--textMuted)"}}>Admin</span></div>
                <div style={{fontSize:10,color:"var(--textFaint)"}}>Full access</div>
              </button>
              <button onClick={()=>sf("role","teacher")} style={{flex:1,padding:"12px",borderRadius:12,border:`2px solid ${form.role==="teacher"?"#0891b2":"var(--cardBorder)"}`,background:form.role==="teacher"?"#cffafe":"var(--inputBg)",cursor:"pointer",fontFamily:"inherit",textAlign:"left"}}>
                <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:3}}><I n="users" s={14} c="#0891b2"/><span style={{fontSize:13,fontWeight:800,color:form.role==="teacher"?"#0e7490":"var(--textMuted)"}}>Teacher</span></div>
                <div style={{fontSize:10,color:"var(--textFaint)"}}>Limited access</div>
              </button>
            </div>
          </div>

          {form.role==="teacher"&&(
            <div style={{marginBottom:14}}>
              <label style={{display:"block",fontSize:11,fontWeight:700,color:"var(--textMuted)",marginBottom:8,textTransform:"uppercase",letterSpacing:.6}}>Assign Batches (leave empty for all)</label>
              <div style={{display:"flex",flexWrap:"wrap",gap:7}}>
                {shifts.map((sh,i)=>{
                  const col=getShiftColor(i);
                  const isSelected=form.allowedShiftIds?.includes(sh.id);
                  return(
                    <button key={sh.id} onClick={()=>toggleShift(sh.id)} style={{padding:"7px 13px",borderRadius:20,border:`2px solid ${isSelected?col.dot:"var(--cardBorder)"}`,background:isSelected?col.bg:"var(--inputBg)",color:isSelected?col.text:"var(--textMuted)",fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>{sh.name}</button>
                  );
                })}
                {shifts.length===0&&<span style={{fontSize:12,color:"var(--textFaint)"}}>No batches created yet</span>}
              </div>
            </div>
          )}

          <Inp label="User ID (Login)" value={form.loginId} onChange={v=>sf("loginId",v)} placeholder={form.name?slugifyId(form.name)||"e.g. priya":"e.g. priya"} hint="Leave blank to auto-generate from the name. Used to log in."/>
          <Inp label="Password" value={form.pin} onChange={v=>sf("pin",v)} type="text" placeholder="At least 4 characters" hint="Teacher/Admin will log in with this User ID & Password."/>
          <Inp label="Security PIN (for password recovery)" value={form.securityPin} onChange={v=>sf("securityPin",v)} type="text" placeholder="e.g. a 4-digit PIN only they know" hint="Needed to verify identity before resetting a forgotten password. Keep it private."/>

          <div style={{display:"flex",gap:10,marginTop:16}}>
            <Btn onClick={closeForm} outline c="#64748b" full>Cancel</Btn>
            <Btn onClick={submit} c="#7c3aed" full>{editing?"Save Changes":"Add Teacher"}</Btn>
          </div>
        </Sheet>
      )}
      {confirmDel&&<Confirm msg="Remove this teacher account? They will no longer be able to log in." onYes={()=>del(confirmDel)} onNo={()=>setConfirmDel(null)} yesLabel="Remove"/>}
    </div>
  );
};

// ══════════════════════════════════════════════════════════════
// ANNOUNCEMENTS — admin compose + target students/teachers
// ══════════════════════════════════════════════════════════════
const getAnnouncementsFor=(announcements,type,id,shiftIds=[])=>{
  return announcements.filter(a=>{
    if(a.target==="everyone") return true;
    if(type==="student") return a.target==="all_students"||(a.target==="student"&&a.targetId===id)||(a.target==="batch"&&shiftIds.includes(a.targetId));
    if(type==="teacher") return a.target==="all_teachers"||(a.target==="teacher"&&a.targetId===id)||a.senderId===id;
    return false;
  }).sort((a,b)=>b.createdAt-a.createdAt);
};

const targetLabel=(a,students,teachers,shifts=[])=>{
  if(a.target==="everyone") return "Everyone";
  if(a.target==="all_students") return "All Students";
  if(a.target==="all_teachers") return "All Teachers/Staff";
  if(a.target==="student") return students.find(s=>s.id===a.targetId)?.name||"A Student";
  if(a.target==="teacher") return teachers.find(t=>t.id===a.targetId)?.name||"A Teacher";
  if(a.target==="batch") return shifts.find(sh=>sh.id===a.targetId)?.name||"A Batch";
  return "";
};

const Announcements=({store,toast,onBack,currentTeacher})=>{
  const{announcements,setAnnouncements,students,teachers,shifts:allShifts}=store;
  const isLimited=!!(currentTeacher&&currentTeacher.role==="teacher");
  const scopedIds=isLimited&&currentTeacher.allowedShiftIds?.length?currentTeacher.allowedShiftIds:null;
  const myShifts=isLimited?(scopedIds?allShifts.filter(sh=>scopedIds.includes(sh.id)):allShifts):allShifts;
  const active=isLimited?students.filter(s=>!s.archived&&getShiftIds(s).some(id=>myShifts.some(sh=>sh.id===id))):students.filter(s=>!s.archived);
  const activeTeachers=teachers.filter(t=>!t.archived);
  const[showAdd,setShowAdd]=useState(false);
  const[confirmDel,setConfirmDel]=useState(null);
  const blank={title:"",message:"",target:isLimited?"batch":"everyone",targetId:isLimited?(myShifts[0]?.id||""):""};
  const[form,setForm]=useState(blank);
  const sf=(k,v)=>setForm(f=>({...f,[k]:v}));

  const submit=()=>{
    if(!form.title.trim()) return toast.error("Please add a title");
    if(!form.message.trim()) return toast.error("Please write a message");
    if((form.target==="student"||form.target==="teacher"||form.target==="batch")&&!form.targetId) return toast.error("Please choose who to send this to");
    setAnnouncements(as=>[{id:uid(),title:form.title,message:form.message,target:form.target,targetId:form.targetId||null,createdAt:Date.now(),senderId:currentTeacher?.id||null,senderName:currentTeacher?.name||"Admin",senderRole:currentTeacher?.role||"admin"},...as]);
    toast.success("Announcement sent","Sent!");
    setForm(blank);setShowAdd(false);
  };
  const del=id=>{setAnnouncements(as=>as.filter(a=>a.id!==id));setConfirmDel(null);toast.info("Announcement removed");};

  const scopedShiftIds=new Set(myShifts.map(sh=>sh.id));
  const visible=isLimited
    ?announcements.filter(a=>a.senderId===currentTeacher.id||a.target==="everyone"||a.target==="all_teachers"||(a.target==="teacher"&&a.targetId===currentTeacher.id))
    :announcements;
  const sorted=[...visible].sort((a,b)=>b.createdAt-a.createdAt);

  return(
    <div>
      <PageHeader title="Announcements" onBack={onBack} right={<Btn onClick={()=>{setForm(blank);setShowAdd(true);}} sm c="#1e3a8a"><I n="plus" s={14}/> New</Btn>}/>
      <div style={{padding:"0 16px 24px"}}>
        <div style={{background:"#eef2ff",border:"1.5px solid #c7d2fe",borderRadius:14,padding:"12px 14px",marginBottom:16,fontSize:12,color:"#4338ca",fontWeight:600,lineHeight:1.5}}>
          {isLimited?"Send a message to your batch or a specific student. It will show up on their portal.":"Send an important message to all students, all teachers, a batch, or one specific person. It will show up on their portal."}
        </div>
        {sorted.length===0&&<div style={{textAlign:"center",padding:"40px 0",color:"var(--textFaint)"}}><div style={{fontSize:36,marginBottom:10}}>📣</div><div style={{fontSize:14}}>No announcements yet</div></div>}
        {sorted.map(a=>(
          <div key={a.id} style={{background:"var(--card)",borderRadius:14,padding:"14px 16px",marginBottom:10,border:"1.5px solid var(--cardBorder)"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:6}}>
              <div style={{fontSize:14,fontWeight:800,color:"var(--text)"}}>{a.title}</div>
              {(!isLimited||a.senderId===currentTeacher?.id)&&<button onClick={()=>setConfirmDel(a.id)} style={{background:"none",border:"none",cursor:"pointer",padding:2}}><I n="x" s={14} c="var(--textFaint)"/></button>}
            </div>
            <div style={{fontSize:13,color:"var(--textMuted)",marginBottom:8,lineHeight:1.5}}>{a.message}</div>
            <div style={{display:"flex",gap:8,alignItems:"center",flexWrap:"wrap"}}>
              <span style={{background:"#ede9fe",color:"#6d28d9",borderRadius:20,padding:"2px 10px",fontSize:10,fontWeight:800}}>{targetLabel(a,students,teachers,allShifts)}</span>
              {a.senderName&&<span style={{background:"var(--inputBg)",color:"var(--textMuted)",borderRadius:20,padding:"2px 10px",fontSize:10,fontWeight:700}}>By {a.senderName}</span>}
              <span style={{fontSize:11,color:"var(--textFaint)"}}>{new Date(a.createdAt).toLocaleDateString("en-IN",{day:"2-digit",month:"short",year:"numeric"})}</span>
            </div>
          </div>
        ))}
      </div>
      {showAdd&&(
        <Sheet title="New Announcement" onClose={()=>{setShowAdd(false);setForm(blank);}}>
          <Inp label="Title" value={form.title} onChange={v=>sf("title",v)} req placeholder="e.g. Diwali Holiday Notice"/>
          <div style={{marginBottom:14}}>
            <label style={{display:"block",fontSize:11,fontWeight:700,color:"var(--textMuted)",marginBottom:6,textTransform:"uppercase",letterSpacing:.5}}>Message</label>
            <textarea value={form.message} onChange={e=>sf("message",e.target.value)} rows={4} placeholder="Write your message here..." style={{width:"100%",padding:"11px 13px",border:"1.5px solid var(--cardBorder)",borderRadius:12,fontSize:14,color:"var(--text)",background:"var(--inputBg)",outline:"none",fontFamily:"inherit",resize:"vertical",boxSizing:"border-box"}}/>
          </div>
          <Sel label="Send To" value={form.target} onChange={v=>sf("target",v)} options={isLimited?[
            {v:"batch",l:"My Batch"},
            {v:"student",l:"Specific Student (my batch)"},
          ]:[
            {v:"everyone",l:"Everyone (students + teachers)"},
            {v:"all_students",l:"All Students"},
            {v:"all_teachers",l:"All Teachers/Staff"},
            {v:"batch",l:"Specific Batch"},
            {v:"student",l:"Specific Student"},
            {v:"teacher",l:"Specific Teacher"},
          ]}/>
          {form.target==="batch"&&<Sel label="Choose Batch" value={form.targetId} onChange={v=>sf("targetId",v)} req options={[...(isLimited?[]:[{v:"",l:"Select batch..."}]),...myShifts.map(sh=>({v:sh.id,l:sh.name}))]}/>}
          {form.target==="student"&&<Sel label="Choose Student" value={form.targetId} onChange={v=>sf("targetId",v)} req options={[{v:"",l:"Select student..."},...active.map(s=>({v:s.id,l:s.name}))]}/>}
          {form.target==="teacher"&&<Sel label="Choose Teacher" value={form.targetId} onChange={v=>sf("targetId",v)} req options={[{v:"",l:"Select teacher..."},...activeTeachers.map(t=>({v:t.id,l:t.name}))]}/>}
          <div style={{display:"flex",gap:10,marginTop:8}}>
            <Btn onClick={()=>{setShowAdd(false);setForm(blank);}} outline c="#64748b" full>Cancel</Btn>
            <Btn onClick={submit} c="#1e3a8a" full>Send</Btn>
          </div>
        </Sheet>
      )}
      {confirmDel&&<Confirm msg="Remove this announcement? It will no longer be visible to its recipients." onYes={()=>del(confirmDel)} onNo={()=>setConfirmDel(null)} yesLabel="Remove"/>}
    </div>
  );
};

// Read-only announcement feed used inside Teacher's limited "More" and the Student Portal
const AnnouncementFeed=({announcements})=>(
  <div>
    {announcements.length===0&&<div style={{textAlign:"center",padding:"20px 0",color:"var(--textFaint)",fontSize:12}}>No announcements yet</div>}
    {announcements.map(a=>(
      <div key={a.id} style={{background:"var(--card)",borderRadius:14,padding:"14px 16px",marginBottom:10,border:"1.5px solid var(--cardBorder)"}}>
        <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:6}}>
          <div style={{background:"#ede9fe",borderRadius:9,padding:6}}><I n="mail" s={13} c="#6d28d9"/></div>
          <div style={{fontSize:14,fontWeight:800,color:"var(--text)"}}>{a.title}</div>
        </div>
        <div style={{fontSize:13,color:"var(--textMuted)",marginBottom:6,lineHeight:1.5}}>{a.message}</div>
        <div style={{fontSize:11,color:"var(--textFaint)"}}>{new Date(a.createdAt).toLocaleDateString("en-IN",{day:"2-digit",month:"short",year:"numeric"})}</div>
      </div>
    ))}
  </div>
);

// ══════════════════════════════════════════════════════════════
// HOMEWORK — teacher assigns text/image homework to a whole batch;
// every student currently in that batch sees it on their portal.
// ══════════════════════════════════════════════════════════════
const HomeworkManager=({store,toast,onBack,currentTeacher})=>{
  const{homework,setHomework,shifts:allShifts,students}=store;
  const isLimited=currentTeacher&&currentTeacher.role==="teacher";
  const scopedIds=isLimited&&currentTeacher.allowedShiftIds?.length?currentTeacher.allowedShiftIds:null;
  const shifts=scopedIds?allShifts.filter(sh=>scopedIds.includes(sh.id)):allShifts;
  const shiftIdx=id=>allShifts.findIndex(sh=>sh.id===id);

  const[showAdd,setShowAdd]=useState(false);
  const[confirmDel,setConfirmDel]=useState(null);
  const[shiftFilter,setShiftFilter]=useState("all");
  const[uploading,setUploading]=useState(false);
  const blank={shiftId:shifts[0]?.id||"",title:"",text:"",dueDate:"",image:null};
  const[form,setForm]=useState(blank);
  const sf=(k,v)=>setForm(f=>({...f,[k]:v}));
  const fileRef=useRef(null);

  const onPickImage=async e=>{
    const file=e.target.files?.[0];
    e.target.value="";
    if(!file) return;
    if(!file.type.startsWith("image/")){toast.error("Please choose an image file");return;}
    setUploading(true);
    try{
      const dataUrl=await fileToCompressedDataURL(file);
      sf("image",dataUrl);
    }catch{
      toast.error("Couldn't read that image, try another");
    }finally{
      setUploading(false);
    }
  };

  const submit=()=>{
    if(!form.shiftId) return toast.error("Please choose a batch");
    if(!form.title.trim()) return toast.error("Please add a title");
    if(!form.text.trim()&&!form.image) return toast.error("Add homework text, an image, or both");
    setHomework(hw=>[{id:uid(),shiftId:form.shiftId,title:form.title.trim(),text:form.text.trim(),image:form.image,dueDate:form.dueDate||null,createdAt:Date.now(),createdBy:currentTeacher?.name||"Admin"},...hw]);
    toast.success("Homework assigned to the batch","Sent!");
    setForm(blank);setShowAdd(false);
  };
  const del=id=>{setHomework(hw=>hw.filter(h=>h.id!==id));setConfirmDel(null);toast.info("Homework removed");};

  const scopedStudentIds=new Set(scopedIds?students.filter(s=>getShiftIds(s).some(id=>scopedIds.includes(id))).map(s=>s.id):students.map(s=>s.id));
  const visible=homework.filter(h=>!scopedIds||scopedIds.includes(h.shiftId));
  const filtered=(shiftFilter==="all"?visible:visible.filter(h=>h.shiftId===shiftFilter)).sort((a,b)=>b.createdAt-a.createdAt);
  const studentCountFor=shId=>students.filter(s=>!s.archived&&hasShift(s,shId)&&scopedStudentIds.has(s.id)).length;

  return(
    <div>
      <PageHeader title="Homework" onBack={onBack} right={<Btn onClick={()=>{setForm({...blank,shiftId:shifts[0]?.id||""});setShowAdd(true);}} sm c="#0ea5e9" disabled={!shifts.length}><I n="plus" s={14}/> New</Btn>}/>
      <div style={{padding:"0 16px 24px"}}>
        <div style={{background:"#e0f2fe",border:"1.5px solid #bae6fd",borderRadius:14,padding:"12px 14px",marginBottom:16,fontSize:12,color:"#075985",fontWeight:600,lineHeight:1.5}}>
          Assign homework — text, an image, or both — to a whole batch. Every student in that batch will see it on their Student Portal.
        </div>
        {!shifts.length&&<div style={{textAlign:"center",padding:"40px 0",color:"var(--textFaint)"}}><div style={{fontSize:36,marginBottom:10}}>📚</div><div style={{fontSize:14}}>Create a batch first, then assign homework to it</div></div>}
        {shifts.length>0&&<div style={{display:"flex",gap:8,overflowX:"auto",paddingBottom:4,marginBottom:14}}>
          <Chip label="All Batches" active={shiftFilter==="all"} onClick={()=>setShiftFilter("all")} c="#0ea5e9"/>
          {shifts.map(sh=>(
            <Chip key={sh.id} label={sh.name} active={shiftFilter===sh.id} onClick={()=>setShiftFilter(sh.id)} c={getShiftColor(shiftIdx(sh.id)).dot}/>
          ))}
        </div>}
        {shifts.length>0&&filtered.length===0&&<div style={{textAlign:"center",padding:"40px 0",color:"var(--textFaint)"}}><div style={{fontSize:36,marginBottom:10}}>📝</div><div style={{fontSize:14}}>No homework assigned yet</div></div>}
        {filtered.map(h=>{
          const sh=allShifts.find(x=>x.id===h.shiftId);
          const col=getShiftColor(shiftIdx(h.shiftId));
          return(
            <div key={h.id} style={{background:"var(--card)",borderRadius:14,padding:"14px 16px",marginBottom:10,border:"1.5px solid var(--cardBorder)"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:6}}>
                <div style={{fontSize:14,fontWeight:800,color:"var(--text)"}}>{h.title}</div>
                <button onClick={()=>setConfirmDel(h.id)} style={{background:"none",border:"none",cursor:"pointer",padding:2}}><I n="x" s={14} c="var(--textFaint)"/></button>
              </div>
              {h.text&&<div style={{fontSize:13,color:"var(--textMuted)",marginBottom:8,lineHeight:1.5,whiteSpace:"pre-wrap"}}>{h.text}</div>}
              {h.image&&<img src={h.image} alt="Homework attachment" style={{width:"100%",borderRadius:10,marginBottom:8,display:"block"}}/>}
              <div style={{display:"flex",gap:8,alignItems:"center",flexWrap:"wrap"}}>
                <span style={{background:col.bg,color:col.text,borderRadius:20,padding:"2px 10px",fontSize:10,fontWeight:800}}>{sh?.name||"Batch removed"}</span>
                {h.dueDate&&<span style={{background:"#fef9c3",color:"#92400e",borderRadius:20,padding:"2px 10px",fontSize:10,fontWeight:800}}>Due {fmtDate(h.dueDate)}</span>}
                <span style={{fontSize:11,color:"var(--textFaint)"}}>{studentCountFor(h.shiftId)} student{studentCountFor(h.shiftId)!==1?"s":""} · {new Date(h.createdAt).toLocaleDateString("en-IN",{day:"2-digit",month:"short"})}</span>
              </div>
            </div>
          );
        })}
      </div>
      {showAdd&&(
        <Sheet title="New Homework" onClose={()=>{setShowAdd(false);setForm(blank);}}>
          <Sel label="Batch" value={form.shiftId} onChange={v=>sf("shiftId",v)} req options={shifts.map(sh=>({v:sh.id,l:sh.name}))}/>
          <Inp label="Title" value={form.title} onChange={v=>sf("title",v)} req placeholder="e.g. Chapter 4 — Exercise 2"/>
          <div style={{marginBottom:14}}>
            <label style={{display:"block",fontSize:11,fontWeight:700,color:"var(--textMuted)",marginBottom:6,textTransform:"uppercase",letterSpacing:.5}}>Homework Text</label>
            <textarea value={form.text} onChange={e=>sf("text",e.target.value)} rows={4} placeholder="Type the homework details here..." style={{width:"100%",padding:"11px 13px",border:"1.5px solid var(--cardBorder)",borderRadius:12,fontSize:14,color:"var(--text)",background:"var(--inputBg)",outline:"none",fontFamily:"inherit",resize:"vertical",boxSizing:"border-box"}}/>
          </div>
          <div style={{marginBottom:14}}>
            <label style={{display:"block",fontSize:11,fontWeight:700,color:"var(--textMuted)",marginBottom:6,textTransform:"uppercase",letterSpacing:.5}}>Attach Image (optional)</label>
            <input ref={fileRef} type="file" accept="image/*" onChange={onPickImage} style={{display:"none"}}/>
            {!form.image?(
              <button onClick={()=>fileRef.current?.click()} disabled={uploading} style={{width:"100%",padding:"14px",borderRadius:12,border:"1.5px dashed var(--cardBorder)",background:"var(--inputBg)",color:"var(--textMuted)",fontSize:13,fontWeight:700,cursor:uploading?"default":"pointer",fontFamily:"inherit",display:"flex",alignItems:"center",justifyContent:"center",gap:8}}>
                <I n="upload" s={16} c="var(--textMuted)"/> {uploading?"Uploading...":"Choose Photo"}
              </button>
            ):(
              <div style={{position:"relative"}}>
                <img src={form.image} alt="Homework preview" style={{width:"100%",borderRadius:12,display:"block"}}/>
                <button onClick={()=>sf("image",null)} style={{position:"absolute",top:8,right:8,background:"rgba(15,15,35,.7)",border:"none",borderRadius:9,padding:"6px 8px",cursor:"pointer"}}><I n="x" s={14} c="#fff"/></button>
              </div>
            )}
          </div>
          <Inp label="Due Date (optional)" type="date" value={form.dueDate} onChange={v=>sf("dueDate",v)}/>
          <div style={{display:"flex",gap:10,marginTop:8}}>
            <Btn onClick={()=>{setShowAdd(false);setForm(blank);}} outline c="#64748b" full>Cancel</Btn>
            <Btn onClick={submit} c="#0ea5e9" full disabled={uploading}>Send</Btn>
          </div>
        </Sheet>
      )}
      {confirmDel&&<Confirm msg="Remove this homework? Students in the batch will no longer see it." onYes={()=>del(confirmDel)} onNo={()=>setConfirmDel(null)} yesLabel="Remove"/>}
    </div>
  );
};

// ══════════════════════════════════════════════════════════════
// FEEDBACK & REQUESTS — admin inbox for teacher-submitted feature
// requests, bug reports, and general feedback
// ══════════════════════════════════════════════════════════════
const FeedbackManager=({store,toast,onBack})=>{
  const{feedbackRequests,setFeedbackRequests}=store;
  const[filter,setFilter]=useState("pending"); // pending | all
  const[replying,setReplying]=useState(null);
  const[replyText,setReplyText]=useState("");
  const[confirmDel,setConfirmDel]=useState(null);

  const TYPE_INFO={feature:{label:"Feature Request",c:"#1e3a8a",icon:"zap"},bug:{label:"Bug Report",c:"#ef4444",icon:"warn"},feedback:{label:"General Feedback",c:"#0ea5e9",icon:"mail"}};

  const all=[...(feedbackRequests||[])].sort((a,b)=>b.createdAt-a.createdAt);
  const pendingCount=all.filter(f=>f.status==="pending").length;
  const shown=filter==="pending"?all.filter(f=>f.status==="pending"):all;

  const setStatus=(id,status)=>{setFeedbackRequests(fr=>fr.map(f=>f.id===id?{...f,status}:f));toast.success(`Marked as ${status}`,"Updated");};
  const sendReply=id=>{
    setFeedbackRequests(fr=>fr.map(f=>f.id===id?{...f,adminReply:replyText.trim(),status:f.status==="pending"?"reviewed":f.status}:f));
    setReplying(null);setReplyText("");
    toast.success("Reply sent to teacher","Sent!");
  };
  const del=id=>{setFeedbackRequests(fr=>fr.filter(f=>f.id!==id));setConfirmDel(null);toast.info("Removed");};

  return(
    <div>
      <PageHeader title="Feedback & Requests" onBack={onBack}/>
      <div style={{padding:"0 16px 24px"}}>
        <div style={{display:"flex",gap:6,background:"var(--card)",borderRadius:13,padding:4,marginBottom:16,border:"1px solid var(--cardBorder)"}}>
          <button onClick={()=>setFilter("pending")} style={{flex:1,borderRadius:10,padding:"9px 4px",fontSize:12,fontWeight:800,border:"none",background:filter==="pending"?"#1e3a8a":"transparent",color:filter==="pending"?"#fff":"var(--textFaint)",cursor:"pointer",fontFamily:"inherit"}}>Pending ({pendingCount})</button>
          <button onClick={()=>setFilter("all")} style={{flex:1,borderRadius:10,padding:"9px 4px",fontSize:12,fontWeight:800,border:"none",background:filter==="all"?"#1e3a8a":"transparent",color:filter==="all"?"#fff":"var(--textFaint)",cursor:"pointer",fontFamily:"inherit"}}>All</button>
        </div>

        {shown.length===0&&<div style={{textAlign:"center",padding:"40px 0",color:"var(--textFaint)"}}><div style={{fontSize:36,marginBottom:10}}>💡</div><div style={{fontSize:14}}>{filter==="pending"?"No pending items":"No feedback submitted yet"}</div></div>}

        {shown.map(f=>{
          const ti=TYPE_INFO[f.type]||TYPE_INFO.feedback;
          return(
            <div key={f.id} style={{background:"var(--card)",border:"1.5px solid var(--cardBorder)",borderRadius:16,padding:"14px 16px",marginBottom:12}}>
              <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:8}}>
                <Avatar name={f.teacherName} size={34}/>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{fontWeight:800,fontSize:13,color:"var(--text)"}}>{f.teacherName}</div>
                  <div style={{fontSize:10,color:"var(--textFaint)"}}>{new Date(f.createdAt).toLocaleDateString("en-IN",{day:"2-digit",month:"short",year:"numeric"})}</div>
                </div>
                <button onClick={()=>setConfirmDel(f.id)} style={{background:"none",border:"none",cursor:"pointer",padding:2,flexShrink:0}}><I n="x" s={14} c="var(--textFaint)"/></button>
              </div>
              <span style={{background:ti.c+"18",color:ti.c,borderRadius:20,padding:"2px 10px",fontSize:10,fontWeight:800}}>{ti.label}</span>
              <div style={{fontSize:14,fontWeight:800,color:"var(--text)",marginTop:8,marginBottom:4}}>{f.subject}</div>
              <div style={{fontSize:13,color:"var(--textMuted)",lineHeight:1.5,marginBottom:10}}>{f.message}</div>

              {f.adminReply&&<div style={{background:"var(--inputBg)",borderRadius:10,padding:"10px 12px",marginBottom:10}}>
                <div style={{fontSize:10,fontWeight:800,color:"var(--textFaint)",textTransform:"uppercase",letterSpacing:.5,marginBottom:3}}>Your Reply</div>
                <div style={{fontSize:12,color:"var(--textMuted)",lineHeight:1.5}}>{f.adminReply}</div>
              </div>}

              {replying===f.id?(
                <div style={{marginBottom:10}}>
                  <textarea value={replyText} onChange={e=>setReplyText(e.target.value)} rows={3} placeholder="Write a reply to the teacher..." style={{width:"100%",padding:"10px 12px",border:"1.5px solid var(--cardBorder)",borderRadius:10,fontSize:13,color:"var(--text)",background:"var(--inputBg)",outline:"none",fontFamily:"inherit",resize:"vertical",boxSizing:"border-box",marginBottom:8}}/>
                  <div style={{display:"flex",gap:8}}>
                    <Btn onClick={()=>{setReplying(null);setReplyText("");}} outline c="#64748b" sm full>Cancel</Btn>
                    <Btn onClick={()=>sendReply(f.id)} c="#1e3a8a" sm full disabled={!replyText.trim()}>Send Reply</Btn>
                  </div>
                </div>
              ):(
                <button onClick={()=>{setReplying(f.id);setReplyText(f.adminReply||"");}} style={{background:"none",border:"none",color:"#1e3a8a",fontSize:12,fontWeight:800,cursor:"pointer",padding:0,marginBottom:10,fontFamily:"inherit"}}>{f.adminReply?"Edit Reply":"+ Reply"}</button>
              )}

              <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
                {f.status!=="pending"&&<Btn onClick={()=>setStatus(f.id,"pending")} outline c="#f59e0b" sm>Pending</Btn>}
                {f.status!=="reviewed"&&<Btn onClick={()=>setStatus(f.id,"reviewed")} outline c="#3b82f6" sm>Reviewed</Btn>}
                {f.status!=="resolved"&&<Btn onClick={()=>setStatus(f.id,"resolved")} c="#16a34a" sm>Mark Resolved</Btn>}
              </div>
            </div>
          );
        })}
      </div>
      {confirmDel&&<Confirm msg="Remove this submission? This can't be undone." onYes={()=>del(confirmDel)} onNo={()=>setConfirmDel(null)} yesLabel="Remove"/>}
    </div>
  );
};

// ══════════════════════════════════════════════════════════════
// PIN LOCK SCREEN — shown on app launch when lock is enabled
// ══════════════════════════════════════════════════════════════
const LockScreen=({settings,onUnlock,onStudentLogin,onBack})=>{
  const[input,setInput]=useState("");
  const[error,setError]=useState(false);
  const digit=d=>{
    if(input.length>=4) return;
    const next=input+d;
    setInput(next);
    if(next.length===4){
      setTimeout(()=>{
        if(next===settings.pin){onUnlock();}
        else{setError(true);setInput("");setTimeout(()=>setError(false),500);}
      },150);
    }
  };
  const backspace=()=>setInput(p=>p.slice(0,-1));
  return(
    <div className="bf-sc" style={{position:"fixed",inset:0,background:"linear-gradient(135deg,#0d1b42,#1e3a8a)",zIndex:99999,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"calc(24px + env(safe-area-inset-top)) 24px calc(24px + env(safe-area-inset-bottom))"}}>
      {onBack&&<button onClick={onBack} style={{position:"absolute",top:"calc(24px + env(safe-area-inset-top))",left:24,background:"rgba(255,255,255,.1)",border:"none",borderRadius:11,padding:"8px 10px",cursor:"pointer"}}><I n="back" s={18} c="#fff"/></button>}
      <div style={{background:"rgba(255,255,255,.12)",borderRadius:22,padding:18,marginBottom:20}}>
        <I n="lock" s={30} c="#fff"/>
      </div>
      <div style={{fontSize:17,fontWeight:800,color:"#fff",marginBottom:4}}>{settings.institute}</div>
      <div style={{fontSize:12,color:"rgba(255,255,255,.6)",marginBottom:28}}>Admin Login — Enter your PIN</div>
      <div style={{display:"flex",gap:14,marginBottom:32,animation:error?"shake .4s":"none"}}>
        {[0,1,2,3].map(i=>(
          <div key={i} style={{width:16,height:16,borderRadius:"50%",background:input.length>i?(error?"#ef4444":"#fff"):"transparent",border:`2px solid ${error?"#ef4444":"rgba(255,255,255,.5)"}`,transition:"all .15s"}}/>
        ))}
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:"clamp(10px,2.2vh,16px)",maxWidth:"min(280px, calc(var(--app-h,100vh)*.44))",width:"100%"}}>
        {["1","2","3","4","5","6","7","8","9","","0","back"].map((k,i)=>k===""?<div key={i}/>:(
          <button key={i} onClick={()=>k==="back"?backspace():digit(k)} style={{padding:"18px 0",borderRadius:"50%",border:"1.5px solid rgba(255,255,255,.2)",background:"rgba(255,255,255,.08)",fontSize:k==="back"?16:20,fontWeight:700,color:"#fff",cursor:"pointer",fontFamily:"inherit",display:"flex",alignItems:"center",justifyContent:"center",aspectRatio:"1"}}>
            {k==="back"?<I n="backspace" s={18} c="#fff"/>:k}
          </button>
        ))}
      </div>
      {onStudentLogin&&<button onClick={onStudentLogin} style={{marginTop:28,background:"none",border:"none",color:"rgba(255,255,255,.65)",fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:"inherit",textDecoration:"underline"}}>Student? Log in here</button>}
      <style>{`@keyframes shake{0%,100%{transform:translateX(0)}25%{transform:translateX(-8px)}75%{transform:translateX(8px)}}`}</style>
    </div>
  );
};

// Shown on the Admin/Teacher path when no PIN/multi-login protection is
// configured yet — a simple confirm step so entry still goes through the
// same "Admin / Teacher" door rather than skipping straight past it.
const NoProtectionContinue=({settings,onContinue,onBack})=>(
  <div className="bf-sc" style={{position:"fixed",inset:0,background:"linear-gradient(135deg,#0d1b42,#1e3a8a)",zIndex:99999,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"calc(24px + env(safe-area-inset-top)) 24px calc(24px + env(safe-area-inset-bottom))"}}>
    {onBack&&<button onClick={onBack} style={{position:"absolute",top:"calc(24px + env(safe-area-inset-top))",left:24,background:"rgba(255,255,255,.1)",border:"none",borderRadius:11,padding:"8px 10px",cursor:"pointer"}}><I n="back" s={18} c="#fff"/></button>}
    <div style={{background:"rgba(255,255,255,.12)",borderRadius:22,padding:18,marginBottom:20}}>
      <I n="shield" s={30} c="#fff"/>
    </div>
    <div style={{fontSize:17,fontWeight:800,color:"#fff",marginBottom:4}}>{settings.institute}</div>
    <div style={{fontSize:12,color:"rgba(255,255,255,.6)",marginBottom:24,textAlign:"center",maxWidth:280}}>No PIN is set up for Admin yet. You can set one later in Settings.</div>
    <button onClick={onContinue} style={{width:"100%",maxWidth:280,padding:"14px",borderRadius:12,border:"none",background:"linear-gradient(135deg,#1e3a8a,#2563eb)",color:"#fff",fontSize:14,fontWeight:800,cursor:"pointer",fontFamily:"inherit"}}>Continue as Admin</button>
  </div>
);

// ══════════════════════════════════════════════════════════════
// STUDENT LOGIN SCREEN — Student ID + PIN
// ══════════════════════════════════════════════════════════════
const StudentLoginScreen=({store,onLogin,onClose})=>{
  const{settings,students}=store;
  const[code,setCode]=useState("");
  const[pin,setPin]=useState("");
  const[error,setError]=useState("");

  const submit=(e)=>{
    e?.preventDefault?.();
    setError("");
    const id=code.trim().toLowerCase();
    if(!id||!pin.trim()){setError("Enter your User ID and Password");return;}
    const s=students.find(x=>!x.archived&&(x.studentCode||"").toLowerCase()===id);
    if(!s){setError("No student found with this User ID");return;}
    if(s.portalEnabled===false){setError("Portal access has been disabled for this account. Ask your teacher.");return;}
    if(s.pin!==pin.trim()){setError("Incorrect password");return;}
    onLogin(s);
  };

  return(
    <div className="bf-sc" style={{position:"fixed",inset:0,background:"linear-gradient(135deg,#0f172a,#1e293b)",zIndex:99999,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"calc(24px + env(safe-area-inset-top)) 24px calc(24px + env(safe-area-inset-bottom))",overflowY:"auto"}}>
      {onClose&&<button onClick={onClose} style={{position:"absolute",top:"calc(24px + env(safe-area-inset-top))",left:24,background:"rgba(255,255,255,.1)",border:"none",borderRadius:11,padding:"8px 10px",cursor:"pointer"}}><I n="back" s={18} c="#fff"/></button>}
      <div style={{background:"rgba(255,255,255,.12)",borderRadius:22,padding:18,marginBottom:18}}>
        <I n="users" s={28} c="#fff"/>
      </div>
      <div style={{fontSize:18,fontWeight:900,color:"#fff",marginBottom:4,textAlign:"center"}}>{settings.institute}</div>
      <div style={{fontSize:12,color:"rgba(255,255,255,.6)",marginBottom:28}}>Student Portal Login</div>
      <div style={{width:"100%",maxWidth:320}}>
        <div style={{marginBottom:14}}>
          <label style={{display:"block",fontSize:11,fontWeight:700,color:"rgba(255,255,255,.7)",marginBottom:6,textTransform:"uppercase",letterSpacing:.6}}>User ID</label>
          <input value={code} onChange={e=>{setCode(e.target.value);setError("");}} onKeyDown={e=>{if(e.key==="Enter")submit();}} autoCapitalize="none" autoCorrect="off" placeholder="Your name or phone number" style={{width:"100%",padding:"13px 14px",borderRadius:12,border:"1.5px solid rgba(255,255,255,.2)",background:"rgba(255,255,255,.08)",color:"#fff",fontSize:15,fontWeight:700,textAlign:"center",outline:"none",fontFamily:"inherit",boxSizing:"border-box"}}/>
        </div>
        <div style={{marginBottom:18}}>
          <label style={{display:"block",fontSize:11,fontWeight:700,color:"rgba(255,255,255,.7)",marginBottom:6,textTransform:"uppercase",letterSpacing:.6}}>Password</label>
          <input value={pin} onChange={e=>{setPin(e.target.value);setError("");}} onKeyDown={e=>{if(e.key==="Enter")submit();}} type="password" placeholder="Password" style={{width:"100%",padding:"13px 14px",borderRadius:12,border:"1.5px solid rgba(255,255,255,.2)",background:"rgba(255,255,255,.08)",color:"#fff",fontSize:15,fontWeight:700,textAlign:"center",outline:"none",fontFamily:"inherit",boxSizing:"border-box"}}/>
        </div>
        {error&&<div style={{background:"rgba(239,68,68,.15)",border:"1px solid rgba(239,68,68,.4)",borderRadius:10,padding:"9px 12px",fontSize:12,color:"#fca5a5",fontWeight:600,marginBottom:14,textAlign:"center"}}>{error}</div>}
        <button onClick={submit} style={{width:"100%",padding:"14px",borderRadius:12,border:"none",background:"linear-gradient(135deg,#1e3a8a,#2563eb)",color:"#fff",fontSize:14,fontWeight:800,cursor:"pointer",fontFamily:"inherit"}}>Log In</button>
        <div style={{fontSize:11,color:"rgba(255,255,255,.5)",textAlign:"center",marginTop:16,lineHeight:1.5}}>Forgot your password, or don't have a User ID yet? Ask your teacher or admin — they can look it up or reset it from your student profile.</div>
      </div>
    </div>
  );
};

// ══════════════════════════════════════════════════════════════
// STUDENT PORTAL — read-only self-service view for logged-in students
// ══════════════════════════════════════════════════════════════
// ── Simple, clean weekly timetable for a student — one row per day, one line per class ──
const StudentWeeklySchedule=({store,student,myShifts,toast,onBack})=>{
  const now=new Date();
  const dayAbbr=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"][now.getDay()];
  const orderedDays=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
  const{timetableRequests,setTimetableRequests}=store;
  const[showReport,setShowReport]=useState(false);
  const blank={shiftId:myShifts[0]?.id||"",message:""};
  const[form,setForm]=useState(blank);
  const myRequests=(timetableRequests||[]).filter(r=>r.studentId===student.id).sort((a,b)=>b.createdAt-a.createdAt);
  const submit=()=>{
    if(!form.message.trim())return toast.error("Please describe the issue or your preferred timing");
    setTimetableRequests(list=>[...(list||[]),{id:uid(),studentId:student.id,shiftId:form.shiftId||null,message:form.message.trim(),status:"pending",createdAt:Date.now()}]);
    toast.success("Your teacher/admin will review this","Request Sent!");
    setForm(blank);setShowReport(false);
  };
  return(
    <div>
      <PageHeader title="Weekly Schedule" onBack={onBack} right={<button onClick={()=>{setForm(blank);setShowReport(true);}} style={{background:"#fef3c7",border:"none",borderRadius:11,padding:"7px 12px",cursor:"pointer",display:"flex",alignItems:"center",gap:5}}><I n="note" s={13} c="#92400e"/><span style={{fontSize:11,fontWeight:800,color:"#92400e"}}>Report</span></button>}/>
      <div style={{padding:"0 16px 24px"}}>
        {!myShifts.length&&<div style={{textAlign:"center",padding:"40px 20px",color:"var(--textFaint)",fontSize:13}}>No batch assigned yet — ask your teacher</div>}
        {orderedDays.map(d=>{
          const classesToday=myShifts.filter(sh=>(sh.days||[]).includes(d)).map(sh=>({...sh,...getShiftTime(sh,d)})).sort((a,b)=>(a.start||"").localeCompare(b.start||""));
          const isToday=d===dayAbbr;
          return(
            <div key={d} style={{marginBottom:14}}>
              <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:8}}>
                <div style={{fontSize:12,fontWeight:900,color:isToday?"#ec4899":"var(--textMuted)",textTransform:"uppercase",letterSpacing:.6}}>{DAY_FULL[d]}</div>
                {isToday&&<span style={{background:"#ec4899",color:"#fff",borderRadius:20,padding:"2px 9px",fontSize:9,fontWeight:800}}>TODAY</span>}
              </div>
              {classesToday.length===0?
                <div style={{fontSize:12,color:"var(--textFaint)",paddingLeft:2}}>No class</div>
              :classesToday.map(sh=>(
                <div key={sh.id} style={{display:"flex",alignItems:"center",justifyContent:"space-between",background:"var(--card)",border:`1.5px solid ${isToday?"#fbcfe8":"var(--cardBorder)"}`,borderRadius:14,padding:"12px 14px",marginBottom:7}}>
                  <div style={{display:"flex",alignItems:"center",gap:10}}>
                    <div style={{width:8,height:8,borderRadius:"50%",background:"#ec4899",flexShrink:0}}/>
                    <div>
                      <div style={{fontSize:13,fontWeight:800,color:"var(--text)"}}>{sh.name}</div>
                      <div style={{fontSize:11,color:"var(--textFaint)",marginTop:1,display:"flex",alignItems:"center",gap:4}}><I n="userplus" s={11} c="var(--textFaint)"/>{dayTeacherName(sh,d,store.teachers||[])}</div>
                    </div>
                  </div>
                  <span style={{fontSize:12,fontWeight:800,color:"#ec4899"}}>{fmtTime(sh.start)} – {fmtTime(sh.end)}</span>
                </div>
              ))}
            </div>
          );
        })}

        {myRequests.length>0&&<>
          <div style={{fontWeight:800,fontSize:12,color:"var(--textMuted)",textTransform:"uppercase",letterSpacing:.7,margin:"20px 0 10px"}}>Your Timetable Reports</div>
          {myRequests.map(r=>(
            <div key={r.id} style={{background:"var(--card)",border:"1.5px solid var(--cardBorder)",borderRadius:14,padding:"12px 14px",marginBottom:8}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
                <span style={{fontSize:12,fontWeight:800,color:"var(--text)"}}>{myShifts.find(sh=>sh.id===r.shiftId)?.name||"General"}</span>
                {r.status==="pending"?<span style={{fontSize:10,fontWeight:800,color:"#92400e",background:"#fef9c3",borderRadius:20,padding:"3px 10px"}}>PENDING</span>:<span style={{fontSize:10,fontWeight:800,color:"#166534",background:"#dcfce7",borderRadius:20,padding:"3px 10px"}}>RESOLVED</span>}
              </div>
              <div style={{fontSize:12,color:"var(--textMuted)",lineHeight:1.5}}>{r.message}</div>
              {r.response&&<div style={{fontSize:11,color:"#1e3a8a",fontWeight:700,marginTop:6,background:"#eef2ff",borderRadius:8,padding:"6px 9px"}}>{r.respondedBy}: {r.response}</div>}
            </div>
          ))}
        </>}
      </div>
      {showReport&&(
        <Sheet title="Report Timetable Issue" onClose={()=>setShowReport(false)}>
          <div style={{background:"#fffbeb",border:"1.5px solid #fde68a",borderRadius:14,padding:"12px 14px",marginBottom:16,fontSize:12,color:"#92400e",fontWeight:600,lineHeight:1.5}}>
            Not happy with your class timing? Let your teacher/admin know — they'll review and can adjust it.
          </div>
          {myShifts.length>1&&<Sel label="Which Batch" value={form.shiftId} onChange={v=>setForm(f=>({...f,shiftId:v}))} options={myShifts.map(sh=>({v:sh.id,l:sh.name}))}/>}
          <div style={{marginBottom:14}}>
            <label style={{display:"block",fontSize:11,fontWeight:700,color:"var(--textMuted)",marginBottom:6,textTransform:"uppercase",letterSpacing:.5}}>What's the issue / preferred timing?</label>
            <textarea value={form.message} onChange={e=>setForm(f=>({...f,message:e.target.value}))} rows={4} placeholder="e.g. Sunday 10 AM clashes with my school class — could it move to 4 PM?" style={{width:"100%",padding:"11px 13px",border:"1.5px solid var(--cardBorder)",borderRadius:12,fontSize:14,color:"var(--text)",background:"var(--inputBg)",outline:"none",fontFamily:"inherit",resize:"vertical",boxSizing:"border-box"}}/>
          </div>
          <div style={{display:"flex",gap:10}}>
            <Btn onClick={()=>setShowReport(false)} outline c="#64748b" full>Cancel</Btn>
            <Btn onClick={submit} c="#f59e0b" full>Send Report</Btn>
          </div>
        </Sheet>
      )}
    </div>
  );
};

// ── Student's own profile — photo (admin-set), personal details, and quick stats ──
const StudentProfileScreen=({store,student,myShifts,onBack})=>{
  const{payments,marks,attend,settings}=store;
  const s=student;
  const mk=curMK();
  const{total,curPaid,fee}=calcOutstanding(s.id,mk,store.students,payments);
  const lifetimePaid=payments.filter(p=>p.studentId===s.id).reduce((a,p)=>a+p.amount,0);
  const lastPayment=[...payments.filter(p=>p.studentId===s.id)].sort((a,b)=>new Date(b.date)-new Date(a.date))[0];
  const attKeys=Object.entries(attend).filter(([k])=>k.startsWith(s.id+"-"));
  const presentCount=attKeys.filter(([,v])=>v==="present").length;
  const absentCount=attKeys.filter(([,v])=>v==="absent").length;
  const markedCount=presentCount+absentCount;
  const attPct=markedCount>0?Math.round((presentCount/markedCount)*1000)/10:null;
  const myMarks=(marks||[]).filter(m=>m.studentId===s.id&&m.status!=="pending");
  const avgMarksPct=myMarks.length>0?Math.round(myMarks.reduce((a,m)=>a+(m.marksObtained/m.maxMarks*100),0)/myMarks.length):null;

  const Row=({label,value})=>(
    <div style={{display:"flex",justifyContent:"space-between",padding:"10px 0",borderBottom:"1px solid var(--cardBorder)"}}>
      <span style={{fontSize:12,color:"var(--textFaint)",fontWeight:600}}>{label}</span>
      <span style={{fontSize:13,color:"var(--text)",fontWeight:700,textAlign:"right"}}>{value||"—"}</span>
    </div>
  );

  return(
    <div>
      <PageHeader title="My Profile" onBack={onBack}/>
      <div style={{padding:"0 16px 24px"}}>
        <div style={{display:"flex",flexDirection:"column",alignItems:"center",marginBottom:20}}>
          <Avatar name={s.name} size={92} photo={s.photo}/>
          <div style={{fontSize:18,fontWeight:900,color:"var(--text)",marginTop:12}}>{s.name}</div>
          <div style={{fontSize:12,color:"var(--textFaint)",marginTop:2}}>{myShifts.length?myShifts.map(sh=>sh.name).join(" • "):"No batch assigned"}</div>
          {!s.photo&&<div style={{fontSize:10,color:"var(--textFaint)",marginTop:6,fontStyle:"italic"}}>Ask your teacher/admin to add your photo</div>}
        </div>

        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8,marginBottom:20}}>
          <div style={{background:"var(--card)",border:"1.5px solid var(--cardBorder)",borderRadius:14,padding:"12px 8px",textAlign:"center"}}>
            <div style={{fontSize:17,fontWeight:900,color:attPct==null?"var(--textFaint)":attPct>=75?"#10b981":attPct>=50?"#f59e0b":"#ef4444"}}>{attPct==null?"—":`${attPct}%`}</div>
            <div style={{fontSize:9,color:"var(--textFaint)",fontWeight:700,textTransform:"uppercase",marginTop:2}}>Attendance</div>
          </div>
          <div style={{background:"var(--card)",border:"1.5px solid var(--cardBorder)",borderRadius:14,padding:"12px 8px",textAlign:"center"}}>
            <div style={{fontSize:17,fontWeight:900,color:avgMarksPct==null?"var(--textFaint)":"#1e3a8a"}}>{avgMarksPct==null?"—":`${avgMarksPct}%`}</div>
            <div style={{fontSize:9,color:"var(--textFaint)",fontWeight:700,textTransform:"uppercase",marginTop:2}}>Avg. Marks</div>
          </div>
          <div style={{background:"var(--card)",border:"1.5px solid var(--cardBorder)",borderRadius:14,padding:"12px 8px",textAlign:"center"}}>
            <div style={{fontSize:17,fontWeight:900,color:total>0?"#ef4444":"#10b981"}}>{total>0?`${settings.currency}${total}`:"Clear"}</div>
            <div style={{fontSize:9,color:"var(--textFaint)",fontWeight:700,textTransform:"uppercase",marginTop:2}}>Fee Due</div>
          </div>
        </div>

        <div style={{fontWeight:800,fontSize:12,color:"var(--textMuted)",textTransform:"uppercase",letterSpacing:.7,marginBottom:8}}>Personal Details</div>
        <div style={{background:"var(--card)",border:"1.5px solid var(--cardBorder)",borderRadius:16,padding:"4px 16px",marginBottom:20}}>
          <Row label="Date of Birth" value={s.dob?fmtDate(s.dob):null}/>
          <Row label="Phone Number" value={s.phone}/>
          <Row label="Parent / Guardian" value={s.parent}/>
          <Row label="Father's Name" value={s.fatherName}/>
          <Row label="Class" value={s.studentClass}/>
          <Row label="Category" value={s.category&&s.category!=="General"?s.category:null}/>
          <Row label="Offer Eligible" value={s.offerEligible?"Yes":"No"}/>
          {s.offerReason&&<Row label="Offer Reason" value={s.offerReason}/>}
          <Row label="Address" value={s.address}/>
          <Row label="Joined On" value={s.joining?fmtDate(s.joining):null}/>
          {s.studentCode&&<Row label="Student ID" value={s.studentCode}/>}
        </div>

        <div style={{fontWeight:800,fontSize:12,color:"var(--textMuted)",textTransform:"uppercase",letterSpacing:.7,marginBottom:8}}>Payment Details</div>
        <div style={{background:"var(--card)",border:"1.5px solid var(--cardBorder)",borderRadius:16,padding:"4px 16px",marginBottom:20}}>
          <Row label="Monthly Fee" value={fee!=null?`${settings.currency}${fee}`:null}/>
          <Row label="Paid This Month" value={`${settings.currency}${curPaid||0}`}/>
          <Row label="Pending This Month" value={`${settings.currency}${total||0}`}/>
          <Row label="Total Paid (Lifetime)" value={`${settings.currency}${lifetimePaid}`}/>
          <Row label="Last Payment" value={lastPayment?`${fmtDate(lastPayment.date)} · ${settings.currency}${lastPayment.amount}`:null}/>
        </div>

        <div style={{fontWeight:800,fontSize:12,color:"var(--textMuted)",textTransform:"uppercase",letterSpacing:.7,marginBottom:8}}>Class Details</div>
        <div style={{background:"var(--card)",border:"1.5px solid var(--cardBorder)",borderRadius:16,padding:"4px 16px",marginBottom:10}}>
          <Row label="Attendance" value={markedCount>0?`${presentCount} present, ${absentCount} absent (${attPct}%)`:"No records yet"}/>
          <Row label="Test Results" value={myMarks.length>0?`${myMarks.length} test${myMarks.length!==1?"s":""}, avg ${avgMarksPct}%`:"No results yet"}/>
        </div>
      </div>
    </div>
  );
};

const StudentPortal=({store,student,onLogout,theme,toast})=>{
  const{shifts,students,setStudents,payments,marks,holidays,settings,announcements,teachers,leaveRequests,setLeaveRequests,homework}=store;
  const[tab,setTab]=useState("home");
  const s=students.find(x=>x.id===student.id)||student;
  const myShifts=getShiftIds(s).map(id=>shifts.find(sh=>sh.id===id)).filter(Boolean);
  const shift=myShifts[0]; // primary batch — kept for backward-compat bits below
  const teacherNamesFor=shId=>{const list=teachersForShift(shId,teachers||[]);return list.length?list.map(t=>t.name).join(", "):"Not assigned yet";};
  const mk=curMK();
  const{currentDue,carryForward,total,curPaid,breakdown,fee}=calcOutstanding(s.id,mk,students,payments);
  const feeStatus=total===0?"Paid":curPaid>0?"Partially Paid":"Pending";
  const allPays=payments.filter(p=>p.studentId===s.id).sort((a,b)=>new Date(b.date)-new Date(a.date));
  const studentMarks=marks.filter(m=>m.studentId===s.id&&m.status!=="pending").sort((a,b)=>new Date(b.date)-new Date(a.date));
  const avgPct=studentMarks.length>0?Math.round(studentMarks.reduce((a,m)=>a+(m.marksObtained/m.maxMarks*100),0)/studentMarks.length):null;
  const todayHolidayS=getHoliday(todayStr(),holidays);
  const gradeColor=pct=>pct>=90?"#10b981":pct>=75?"#1e3a8a":pct>=50?"#f59e0b":"#ef4444";
  const gradeLabel=pct=>pct>=90?"A+":pct>=80?"A":pct>=70?"B":pct>=60?"C":pct>=40?"D":"F";
  const today=todayStr();
  const sortedHolidays=[...holidays].sort((a,b)=>new Date(a.date)-new Date(b.date));
  const upcomingHolidays=sortedHolidays.filter(h=>h.date>=today).slice(0,5);
  const pastHolidays=sortedHolidays.filter(h=>h.date<today).sort((a,b)=>new Date(b.date)-new Date(a.date)).slice(0,5);
  const myShiftIds=getShiftIds(s);
  const myAnnouncements=getAnnouncementsFor(announcements,"student",s.id,myShiftIds);
  const myHomework=(homework||[]).filter(h=>myShiftIds.includes(h.shiftId)).sort((a,b)=>b.createdAt-a.createdAt);
  const shiftNameFor=id=>shifts.find(sh=>sh.id===id)?.name||"Batch";
  const now=new Date();
  const todayDate=now.getDate();
  const dayAbbr=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"][now.getDay()];
  const myLeaveRequests=(leaveRequests||[]).filter(lr=>lr.studentId===s.id).sort((a,b)=>new Date(b.date)-new Date(a.date));
  const myUnreadMsgCount=(store.messages||[]).filter(m=>m.studentId===s.id&&m.from==="staff"&&!m.read).length;
  const myPendingStudentTestsCount=(store.tests||[]).filter(t=>t.audience==="student"&&(!t.forStudentIds?.length||t.forStudentIds.includes(s.id))&&!(store.testAttempts||[]).some(a=>a.testId===t.id&&a.attempterId===s.id)).length;
  const{feeReminders,setFeeReminders}=store;
  const myFeeReminders=(feeReminders||[]).filter(r=>r.studentId===s.id).sort((a,b)=>b.createdAt-a.createdAt);
  const latestFeeReminder=myFeeReminders[0];
  const unreadFeeReminderCount=myFeeReminders.filter(r=>!r.read).length;
  const markFeeRemindersRead=()=>{
    if(!myFeeReminders.some(r=>!r.read))return;
    setFeeReminders(list=>(list||[]).map(r=>r.studentId===s.id&&!r.read?{...r,read:true}:r));
  };
  useEffect(()=>{if(tab==="fees")markFeeRemindersRead();},[tab]); // eslint-disable-line

  // ── Notification Bell ──
  const viewerKey=`student:${s.id}`;
  const annSeenTs=getSeenTs(store,viewerKey+":announcements");
  const hwSeenTs=getSeenTs(store,viewerKey+":homework");
  const marksSeenTs=getSeenTs(store,viewerKey+":marks");
  const newAnnouncementsB=myAnnouncements.filter(a=>a.createdAt>annSeenTs);
  const newHomeworkB=myHomework.filter(h=>h.createdAt>hwSeenTs);
  const newVerifiedMarks=studentMarks.filter(m=>(m.verifiedAt||m.created||0)>marksSeenTs);
  const unreadStaffMsgs=(store.messages||[]).filter(m=>m.studentId===s.id&&m.from==="staff"&&!m.read);
  const bellItems=[
    ...unreadStaffMsgs.slice(0,6).map(m=>({icon:"phone",color:"#0ea5e9",title:m.authorName||"Teacher",desc:m.text,unread:true,onClick:()=>setTab("messages")})),
    ...myFeeReminders.filter(r=>!r.read).slice(0,6).map(r=>({icon:"bell",color:"#f59e0b",title:"Fee Reminder",desc:r.message,unread:true,onClick:()=>setTab("fees")})),
    ...newAnnouncementsB.slice(0,6).map(a=>({icon:"mail",color:"#1e3a8a",title:a.title,desc:a.message,unread:true,onClick:()=>setTab("home")})),
    ...newHomeworkB.slice(0,6).map(h=>({icon:"edit",color:"#0ea5e9",title:"New Homework: "+h.title,desc:h.text,unread:true,onClick:()=>setTab("homework")})),
    ...newVerifiedMarks.slice(0,6).map(m=>({icon:"book",color:"#10b981",title:"New Result: "+m.subject,desc:`${m.marksObtained}/${m.maxMarks} · ${m.testName||"Test"}`,unread:true,onClick:()=>setTab("marks")})),
  ];
  const openBell=()=>{
    if(newAnnouncementsB.length)markSeenNow(store,viewerKey+":announcements");
    if(newHomeworkB.length)markSeenNow(store,viewerKey+":homework");
    if(newVerifiedMarks.length)markSeenNow(store,viewerKey+":marks");
  };
  const[showLeaveForm,setShowLeaveForm]=useState(false);
  const[leaveFromDate,setLeaveFromDate]=useState(todayStr());
  const[leaveToDate,setLeaveToDate]=useState(todayStr());
  const[leaveReason,setLeaveReason]=useState("");
  const submitLeave=()=>{
    if(!leaveReason.trim())return;
    if(leaveToDate<leaveFromDate)return;
    setLeaveRequests(lr=>[...(lr||[]),{id:uid(),studentId:s.id,date:leaveFromDate,fromDate:leaveFromDate,toDate:leaveToDate,reason:leaveReason.trim(),status:"pending",createdAt:new Date().toISOString()}]);
    setLeaveReason("");setLeaveFromDate(todayStr());setLeaveToDate(todayStr());setShowLeaveForm(false);
  };
  const[curPw,setCurPw]=useState("");
  const[newPw,setNewPw]=useState("");
  const[confirmPw,setConfirmPw]=useState("");
  const[pwError,setPwError]=useState("");
  const changePassword=()=>{
    setPwError("");
    if(curPw!==s.pin){setPwError("Current password is incorrect");return;}
    if(!newPw||newPw.length<4){setPwError("New password must be at least 4 characters");return;}
    if(newPw!==confirmPw){setPwError("New passwords don't match");return;}
    setStudents(ss=>ss.map(x=>x.id===s.id?{...x,pin:newPw}:x));
    setCurPw("");setNewPw("");setConfirmPw("");
    setPwError("✓ Password updated successfully");
  };

  if(tab==="profile"){
    return(
      <div style={{
        "--bg":theme.bg,"--card":theme.card,"--cardBorder":theme.cardBorder,"--text":theme.text,
        "--textMuted":theme.textMuted,"--textFaint":theme.textFaint,"--inputBg":theme.inputBg,
        "--navBg":theme.navBg,"--navBorder":theme.navBorder,"--shadow":theme.shadow,
        maxWidth:480,margin:"0 auto",minHeight:"var(--app-h,100vh)",background:"var(--bg)",paddingBottom:"calc(72px + env(safe-area-inset-bottom))",paddingTop:"env(safe-area-inset-top)"
      }}>
        <StudentProfileScreen store={store} student={s} myShifts={myShifts} onBack={()=>setTab("home")}/>
        <StudentPortalNav tab={tab} setTab={setTab} theme={theme} onLogout={onLogout}/>
      </div>
    );
  }

  if(tab==="weeklyschedule"){
    return(
      <div style={{
        "--bg":theme.bg,"--card":theme.card,"--cardBorder":theme.cardBorder,"--text":theme.text,
        "--textMuted":theme.textMuted,"--textFaint":theme.textFaint,"--inputBg":theme.inputBg,
        "--navBg":theme.navBg,"--navBorder":theme.navBorder,"--shadow":theme.shadow,
        maxWidth:480,margin:"0 auto",minHeight:"var(--app-h,100vh)",background:"var(--bg)",paddingBottom:"calc(72px + env(safe-area-inset-bottom))",paddingTop:"env(safe-area-inset-top)"
      }}>
        <StudentWeeklySchedule store={store} student={s} myShifts={myShifts} toast={toast} onBack={()=>setTab("home")}/>
        <StudentPortalNav tab={tab} setTab={setTab} theme={theme} onLogout={onLogout}/>
      </div>
    );
  }

  if(tab==="mytests"){
    return(
      <div style={{
        "--bg":theme.bg,"--card":theme.card,"--cardBorder":theme.cardBorder,"--text":theme.text,
        "--textMuted":theme.textMuted,"--textFaint":theme.textFaint,"--inputBg":theme.inputBg,
        "--navBg":theme.navBg,"--navBorder":theme.navBorder,"--shadow":theme.shadow,
        maxWidth:480,margin:"0 auto",minHeight:"var(--app-h,100vh)",background:"var(--bg)",paddingBottom:"calc(72px + env(safe-area-inset-bottom))",paddingTop:"env(safe-area-inset-top)"
      }}>
        <TestsHub store={store} toast={toast} onBack={()=>setTab("home")} viewerType="student" viewerId={s.id} viewerName={s.name}/>
        <StudentPortalNav tab={tab} setTab={setTab} theme={theme} onLogout={onLogout}/>
      </div>
    );
  }

  if(tab==="studymaterial"){
    return(
      <div style={{
        "--bg":theme.bg,"--card":theme.card,"--cardBorder":theme.cardBorder,"--text":theme.text,
        "--textMuted":theme.textMuted,"--textFaint":theme.textFaint,"--inputBg":theme.inputBg,
        "--navBg":theme.navBg,"--navBorder":theme.navBorder,"--shadow":theme.shadow,
        maxWidth:480,margin:"0 auto",minHeight:"var(--app-h,100vh)",background:"var(--bg)",paddingBottom:"calc(72px + env(safe-area-inset-bottom))",paddingTop:"env(safe-area-inset-top)"
      }}>
        <StudyMaterialHub store={store} toast={toast} onBack={()=>setTab("home")} viewerType="student" student={s}/>
        <StudentPortalNav tab={tab} setTab={setTab} theme={theme} onLogout={onLogout}/>
      </div>
    );
  }

  if(tab==="attendance"){
    return(
      <div style={{
        "--bg":theme.bg,"--card":theme.card,"--cardBorder":theme.cardBorder,"--text":theme.text,
        "--textMuted":theme.textMuted,"--textFaint":theme.textFaint,"--inputBg":theme.inputBg,
        "--navBg":theme.navBg,"--navBorder":theme.navBorder,"--shadow":theme.shadow,
        maxWidth:480,margin:"0 auto",minHeight:"var(--app-h,100vh)",background:"var(--bg)",paddingBottom:"calc(72px + env(safe-area-inset-bottom))",paddingTop:"env(safe-area-inset-top)"
      }}>
        <StudentAttendanceDetail store={store} student={s} onBack={()=>setTab("home")}/>
        <StudentPortalNav tab={tab} setTab={setTab} theme={theme} onLogout={onLogout}/>
      </div>
    );
  }

  if(tab==="messages"){
    return(
      <div style={{
        "--bg":theme.bg,"--card":theme.card,"--cardBorder":theme.cardBorder,"--text":theme.text,
        "--textMuted":theme.textMuted,"--textFaint":theme.textFaint,"--inputBg":theme.inputBg,
        "--navBg":theme.navBg,"--navBorder":theme.navBorder,"--shadow":theme.shadow,
        maxWidth:480,margin:"0 auto",minHeight:"var(--app-h,100vh)",background:"var(--bg)",paddingBottom:"calc(72px + env(safe-area-inset-bottom))",paddingTop:"env(safe-area-inset-top)"
      }}>
        <MessagesThread store={store} student={s} role="student" authorName={s.name} onBack={()=>setTab("home")}/>
        <StudentPortalNav tab={tab} setTab={setTab} theme={theme} onLogout={onLogout}/>
      </div>
    );
  }

  return(
    <div style={{
      "--bg":theme.bg,"--card":theme.card,"--cardBorder":theme.cardBorder,"--text":theme.text,
      "--textMuted":theme.textMuted,"--textFaint":theme.textFaint,"--inputBg":theme.inputBg,
      "--navBg":theme.navBg,"--navBorder":theme.navBorder,"--shadow":theme.shadow,
      maxWidth:480,margin:"0 auto",background:"var(--bg)",minHeight:"var(--app-h,100vh)",fontFamily:"'Inter',-apple-system,BlinkMacSystemFont,sans-serif",paddingBottom:"calc(80px + env(safe-area-inset-bottom))",paddingTop:"env(safe-area-inset-top)"
    }}>
      <div style={{padding:"20px 16px 0"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
          <div style={{fontSize:12,fontWeight:800,color:"var(--textFaint)",textTransform:"uppercase",letterSpacing:.6}}>{settings.institute}</div>
          <div style={{display:"flex",gap:8,alignItems:"center"}}>
            {isFeatureOn(store.settings,"notifications",{type:"student",id:s.id})&&<NotificationBell items={bellItems} onOpen={openBell}/>}
            <button onClick={onLogout} style={{background:"var(--card)",border:"1.5px solid var(--cardBorder)",borderRadius:11,padding:"7px 12px",cursor:"pointer",display:"flex",alignItems:"center",gap:6}}>
              <I n="switch" s={14} c="var(--textMuted)"/><span style={{fontSize:11,fontWeight:700,color:"var(--textMuted)"}}>Logout</span>
            </button>
          </div>
        </div>
        {tab==="home"&&<>
          <div style={{background:"linear-gradient(135deg,#0d1b42 0%,#1e3a8a 55%,#2563eb 100%)",borderRadius:24,padding:"20px",marginBottom:14,color:"#fff",position:"relative",overflow:"hidden",boxShadow:"0 14px 34px rgba(13,27,66,.28)"}}>
            <div style={{position:"absolute",top:-30,right:-30,width:130,height:130,borderRadius:"50%",background:"rgba(255,255,255,.06)"}}/>
            <div style={{position:"relative",display:"flex",alignItems:"center",gap:14}}>
              <Avatar name={s.name} size={50} photo={s.photo}/>
              <div style={{flex:1}}>
                <div style={{fontSize:17,fontWeight:900}}>{s.name}</div>
                <div style={{fontSize:12,opacity:.75,marginTop:2}}>{myShifts.length?myShifts.map(sh=>sh.name).join("  •  "):"No batch assigned"}</div>
              </div>
              <button onClick={()=>setTab("profile")} style={{background:"rgba(255,255,255,.18)",border:"none",borderRadius:11,padding:"8px 12px",cursor:"pointer",display:"flex",alignItems:"center",gap:6,flexShrink:0}}>
                <span style={{fontSize:11,fontWeight:800,color:"#fff"}}>View Profile</span>
                <div style={{transform:"rotate(180deg)",display:"flex"}}><I n="back" s={14} c="#fff"/></div>
              </button>
            </div>
          </div>
          {todayHolidayS&&<div style={{background:"linear-gradient(135deg,#c2410c,#ea580c)",borderRadius:16,padding:"14px 16px",marginBottom:14,color:"#fff",display:"flex",alignItems:"center",gap:10}}>
            <div style={{background:"rgba(255,255,255,.2)",borderRadius:10,padding:9,flexShrink:0}}><I n="holiday" s={17} c="#fff"/></div>
            <div>
              <div style={{fontSize:13,fontWeight:900}}>Today is a Holiday — {todayHolidayS.name}</div>
              <div style={{fontSize:11,opacity:.9,marginTop:1}}>Classes are off today</div>
            </div>
          </div>}

          <div style={{marginBottom:14}}>
            <div style={{fontWeight:800,fontSize:12,color:"var(--textMuted)",textTransform:"uppercase",letterSpacing:.7,marginBottom:10,display:"flex",alignItems:"center",gap:6}}><I n="cal" s={14} c="#ec4899"/> My Batch{myShifts.length>1?"es":""}{myShifts.length>1?` (${myShifts.length})`:""}</div>
            {!myShifts.length?<div style={{background:"var(--card)",border:"1.5px solid var(--cardBorder)",borderRadius:16,padding:"16px",textAlign:"center",color:"var(--textFaint)",fontSize:12}}>No batch assigned yet — ask your teacher</div>:
              myShifts.map((sh,i)=>{
                const shClassDays=classDaysInMonth(sh,now.getFullYear(),now.getMonth()+1);
                return(
                  <div key={sh.id} style={{background:"var(--card)",border:"1.5px solid var(--cardBorder)",borderRadius:16,padding:"16px",marginBottom:i<myShifts.length-1?10:0}}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
                      <div style={{fontSize:14,fontWeight:800,color:"var(--text)"}}>{sh.name}</div>
                      <div style={{fontSize:12,color:"var(--textMuted)",fontWeight:700}}>{shiftTimingLabel(sh)}</div>
                    </div>
                    <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:10}}>
                      <I n="userplus" s={13} c="#1e3a8a"/>
                      <span style={{fontSize:12,color:"var(--textMuted)"}}>Teacher: <span style={{fontWeight:800,color:"var(--text)"}}>{teacherNamesFor(sh.id)}</span></span>
                    </div>
                    <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:12}}>
                      {DAYS_ALL.map(d=>{
                        const on=(sh.days||[]).includes(d);
                        return <span key={d} style={{background:on?"#fce7f3":"var(--inputBg)",color:on?"#be185d":"var(--textFaint)",borderRadius:6,padding:"3px 9px",fontSize:11,fontWeight:700}}>{d}</span>;
                      })}
                    </div>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
                      <span style={{fontSize:12,color:"var(--textMuted)"}}>Classes in {monthLabel(curMK())}</span>
                      <span style={{fontSize:16,fontWeight:900,color:"#ec4899"}}>{shClassDays.length}</span>
                    </div>
                    <div style={{fontSize:10,color:"var(--textFaint)",fontWeight:700,marginBottom:6,textTransform:"uppercase",letterSpacing:.5}}>Class Dates This Month</div>
                    <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
                      {shClassDays.map(d=>(
                        <span key={d} style={{background:d===todayDate?"#ec4899":d<todayDate?"var(--inputBg)":"#fce7f3",color:d===todayDate?"#fff":d<todayDate?"var(--textFaint)":"#be185d",borderRadius:8,padding:"4px 9px",fontSize:11,fontWeight:800,minWidth:22,textAlign:"center"}}>{d}</span>
                      ))}
                    </div>
                  </div>
                );
              })
            }
          </div>

          {myAnnouncements.length>0&&<div style={{marginBottom:14}}>
            <div style={{fontWeight:800,fontSize:12,color:"var(--textMuted)",textTransform:"uppercase",letterSpacing:.7,marginBottom:10,display:"flex",alignItems:"center",gap:6}}><I n="mail" s={14} c="#1e3a8a"/> Announcements</div>
            {myAnnouncements.slice(0,3).map(a=>(
              <div key={a.id} style={{background:"linear-gradient(135deg,#1e3a8a15,#2563eb15)",border:"1.5px solid #1e3a8a40",borderRadius:14,padding:"12px 14px",marginBottom:8}}>
                <div style={{fontSize:13,fontWeight:800,color:"var(--text)",marginBottom:3}}>{a.title}</div>
                <div style={{fontSize:12,color:"var(--textMuted)",lineHeight:1.5,marginBottom:4}}>{a.message}</div>
                <div style={{fontSize:10,color:"var(--textFaint)"}}>{new Date(a.createdAt).toLocaleDateString("en-IN",{day:"2-digit",month:"short",year:"numeric"})}</div>
              </div>
            ))}
          </div>}

          <div style={{display:"flex",gap:10,marginBottom:14}}>
            <div style={{flex:1,background:"var(--card)",border:"1.5px solid var(--cardBorder)",borderRadius:14,padding:"12px",textAlign:"center"}}>
              <div style={{fontSize:20,fontWeight:900,color:total===0?"#10b981":"#ef4444"}}>{settings.currency}{total.toLocaleString("en-IN")}</div>
              <div style={{fontSize:10,color:"var(--textFaint)",fontWeight:700,marginTop:2}}>FEES DUE</div>
            </div>
            <div style={{flex:1,background:"var(--card)",border:"1.5px solid var(--cardBorder)",borderRadius:14,padding:"12px",textAlign:"center"}}>
              <div style={{fontSize:20,fontWeight:900,color:avgPct!==null?gradeColor(avgPct):"var(--textFaint)"}}>{avgPct!==null?`${avgPct}%`:"—"}</div>
              <div style={{fontSize:10,color:"var(--textFaint)",fontWeight:700,marginTop:2}}>TEST AVERAGE</div>
            </div>
          </div>

          {isFeatureOn(store.settings,"studentProfile",{type:"student",id:s.id})&&<button onClick={()=>setTab("profile")} style={{width:"100%",background:"var(--card)",border:"1.5px solid var(--cardBorder)",borderRadius:16,padding:"14px 16px",display:"flex",alignItems:"center",gap:14,cursor:"pointer",marginBottom:10,textAlign:"left",fontFamily:"inherit"}}>
            <div style={{background:"#1e3a8a18",borderRadius:14,padding:12}}><I n="userplus" s={20} c="#1e3a8a"/></div>
            <div style={{flex:1}}><div style={{fontWeight:800,color:"var(--text)",fontSize:14}}>My Profile</div><div style={{fontSize:11,color:"var(--textFaint)",marginTop:2}}>Personal, payment & class details</div></div>
            <I n="back" s={16} c="var(--cardBorder)"/>
          </button>}
          {isFeatureOn(store.settings,"weeklySchedule",{type:"student",id:s.id})&&<button onClick={()=>setTab("weeklyschedule")} style={{width:"100%",background:"var(--card)",border:"1.5px solid var(--cardBorder)",borderRadius:16,padding:"14px 16px",display:"flex",alignItems:"center",gap:14,cursor:"pointer",marginBottom:10,textAlign:"left",fontFamily:"inherit"}}>
            <div style={{background:"#ec489918",borderRadius:14,padding:12}}><I n="cal" s={20} c="#ec4899"/></div>
            <div style={{flex:1}}><div style={{fontWeight:800,color:"var(--text)",fontSize:14}}>Weekly Schedule</div><div style={{fontSize:11,color:"var(--textFaint)",marginTop:2}}>See which day, what time your classes are</div></div>
            <I n="back" s={16} c="var(--cardBorder)"/>
          </button>}
          {isFeatureOn(store.settings,"tests",{type:"student",id:s.id})&&<button onClick={()=>setTab("mytests")} style={{width:"100%",background:"var(--card)",border:"1.5px solid var(--cardBorder)",borderRadius:16,padding:"14px 16px",display:"flex",alignItems:"center",gap:14,cursor:"pointer",marginBottom:10,textAlign:"left",fontFamily:"inherit"}}>
            <div style={{background:"#7c3aed18",borderRadius:14,padding:12}}><I n="grad" s={20} c="#7c3aed"/></div>
            <div style={{flex:1}}><div style={{fontWeight:800,color:"var(--text)",fontSize:14}}>My Tests</div><div style={{fontSize:11,color:"var(--textFaint)",marginTop:2}}>{myPendingStudentTestsCount>0?`${myPendingStudentTestsCount} test${myPendingStudentTestsCount!==1?"s":""} to take`:"Tests assigned by your teacher/admin"}</div></div>
            {myPendingStudentTestsCount>0?<span style={{background:"#7c3aed",color:"#fff",borderRadius:20,minWidth:20,height:20,display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,fontWeight:800,padding:"0 5px",flexShrink:0}}>{myPendingStudentTestsCount}</span>:<I n="back" s={16} c="var(--cardBorder)"/>}
          </button>}
          {isFeatureOn(store.settings,"studyMaterial",{type:"student",id:s.id})&&<button onClick={()=>setTab("studymaterial")} style={{width:"100%",background:"var(--card)",border:"1.5px solid var(--cardBorder)",borderRadius:16,padding:"14px 16px",display:"flex",alignItems:"center",gap:14,cursor:"pointer",marginBottom:10,textAlign:"left",fontFamily:"inherit"}}>
            <div style={{background:"#0ea5e918",borderRadius:14,padding:12}}><I n="download" s={20} c="#0ea5e9"/></div>
            <div style={{flex:1}}><div style={{fontWeight:800,color:"var(--text)",fontSize:14}}>Study Material</div><div style={{fontSize:11,color:"var(--textFaint)",marginTop:2}}>Notes & resources shared by your teacher</div></div>
            <I n="back" s={16} c="var(--cardBorder)"/>
          </button>}
          <button onClick={()=>setTab("attendance")} style={{width:"100%",background:"var(--card)",border:"1.5px solid var(--cardBorder)",borderRadius:16,padding:"14px 16px",display:"flex",alignItems:"center",gap:14,cursor:"pointer",marginBottom:10,textAlign:"left",fontFamily:"inherit"}}>
            <div style={{background:"#dcfce718",borderRadius:14,padding:12}}><I n="checkbig" s={20} c="#10b981"/></div>
            <div style={{flex:1}}><div style={{fontWeight:800,color:"var(--text)",fontSize:14}}>My Attendance</div><div style={{fontSize:11,color:"var(--textFaint)",marginTop:2}}>Monthly calendar, present/absent history</div></div>
            <I n="back" s={16} c="var(--cardBorder)"/>
          </button>
          <button onClick={()=>setTab("marks")} style={{width:"100%",background:"var(--card)",border:"1.5px solid var(--cardBorder)",borderRadius:16,padding:"14px 16px",display:"flex",alignItems:"center",gap:14,cursor:"pointer",marginBottom:10,textAlign:"left",fontFamily:"inherit"}}>
            <div style={{background:"#f59e0b18",borderRadius:14,padding:12}}><I n="book" s={20} c="#f59e0b"/></div>
            <div style={{flex:1}}><div style={{fontWeight:800,color:"var(--text)",fontSize:14}}>My Test Marks</div><div style={{fontSize:11,color:"var(--textFaint)",marginTop:2}}>{studentMarks.length} result{studentMarks.length!==1?"s":""} recorded</div></div>
            <I n="back" s={16} c="var(--cardBorder)"/>
          </button>
          <button onClick={()=>setTab("fees")} style={{width:"100%",background:"var(--card)",border:"1.5px solid var(--cardBorder)",borderRadius:16,padding:"14px 16px",display:"flex",alignItems:"center",gap:14,cursor:"pointer",marginBottom:10,textAlign:"left",fontFamily:"inherit"}}>
            <div style={{background:"#1e3a8a18",borderRadius:14,padding:12}}><I n="rupee" s={20} c="#1e3a8a"/></div>
            <div style={{flex:1}}><div style={{fontWeight:800,color:"var(--text)",fontSize:14}}>My Fees</div><div style={{fontSize:11,color:"var(--textFaint)",marginTop:2}}>{unreadFeeReminderCount>0?`${unreadFeeReminderCount} new fee reminder${unreadFeeReminderCount!==1?"s":""}`:"Pending, paid & payment history"}</div></div>
            {unreadFeeReminderCount>0?<span style={{background:"#f59e0b",color:"#fff",borderRadius:20,minWidth:20,height:20,display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,fontWeight:800,padding:"0 5px",flexShrink:0}}>{unreadFeeReminderCount}</span>:<I n="back" s={16} c="var(--cardBorder)"/>}
          </button>
          <button onClick={()=>setTab("homework")} style={{width:"100%",background:"var(--card)",border:"1.5px solid var(--cardBorder)",borderRadius:16,padding:"14px 16px",display:"flex",alignItems:"center",gap:14,cursor:"pointer",marginBottom:10,textAlign:"left",fontFamily:"inherit"}}>
            <div style={{background:"#0ea5e918",borderRadius:14,padding:12}}><I n="edit" s={20} c="#0ea5e9"/></div>
            <div style={{flex:1}}><div style={{fontWeight:800,color:"var(--text)",fontSize:14}}>My Homework</div><div style={{fontSize:11,color:"var(--textFaint)",marginTop:2}}>{myHomework.length>0?`${myHomework.length} assigned`:"Nothing assigned yet"}</div></div>
            <I n="back" s={16} c="var(--cardBorder)"/>
          </button>
          <button onClick={()=>setTab("leave")} style={{width:"100%",background:"var(--card)",border:"1.5px solid var(--cardBorder)",borderRadius:16,padding:"14px 16px",display:"flex",alignItems:"center",gap:14,cursor:"pointer",marginBottom:10,textAlign:"left",fontFamily:"inherit"}}>
            <div style={{background:"#2563eb18",borderRadius:14,padding:12}}><I n="note" s={20} c="#2563eb"/></div>
            <div style={{flex:1}}><div style={{fontWeight:800,color:"var(--text)",fontSize:14}}>Apply for Leave</div><div style={{fontSize:11,color:"var(--textFaint)",marginTop:2}}>{myLeaveRequests.filter(l=>l.status==="pending").length>0?`${myLeaveRequests.filter(l=>l.status==="pending").length} request(s) pending`:"Request leave & track status"}</div></div>
            <I n="back" s={16} c="var(--cardBorder)"/>
          </button>
          <button onClick={()=>setTab("messages")} style={{width:"100%",background:"var(--card)",border:"1.5px solid var(--cardBorder)",borderRadius:16,padding:"14px 16px",display:"flex",alignItems:"center",gap:14,cursor:"pointer",marginBottom:10,textAlign:"left",fontFamily:"inherit"}}>
            <div style={{background:"#0ea5e918",borderRadius:14,padding:12}}><I n="phone" s={20} c="#0ea5e9"/></div>
            <div style={{flex:1}}><div style={{fontWeight:800,color:"var(--text)",fontSize:14}}>Ask a Doubt</div><div style={{fontSize:11,color:"var(--textFaint)",marginTop:2}}>Message your teacher directly</div></div>
            {myUnreadMsgCount>0?<span style={{background:"#ef4444",color:"#fff",borderRadius:20,minWidth:20,height:20,display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,fontWeight:800,padding:"0 5px"}}>{myUnreadMsgCount}</span>:<I n="back" s={16} c="var(--cardBorder)"/>}
          </button>
          <button onClick={()=>{setPwError("");setTab("password");}} style={{width:"100%",background:"var(--card)",border:"1.5px solid var(--cardBorder)",borderRadius:16,padding:"14px 16px",display:"flex",alignItems:"center",gap:14,cursor:"pointer",marginBottom:16,textAlign:"left",fontFamily:"inherit"}}>
            <div style={{background:"#64748b18",borderRadius:14,padding:12}}><I n="lock" s={20} c="#64748b"/></div>
            <div style={{flex:1}}><div style={{fontWeight:800,color:"var(--text)",fontSize:14}}>Change Password</div><div style={{fontSize:11,color:"var(--textFaint)",marginTop:2}}>Update your portal login password</div></div>
            <I n="back" s={16} c="var(--cardBorder)"/>
          </button>

          <div style={{fontWeight:800,fontSize:12,color:"var(--textMuted)",textTransform:"uppercase",letterSpacing:.7,marginBottom:10}}>Institute Holidays</div>
          <div style={{background:"var(--card)",borderRadius:16,padding:"14px 16px",border:"1.5px solid var(--cardBorder)",marginBottom:14}}>
            {upcomingHolidays.length===0&&pastHolidays.length===0&&<div style={{textAlign:"center",color:"var(--textFaint)",fontSize:12,padding:"6px 0"}}>No holidays marked yet</div>}
            {upcomingHolidays.map(h=>(
              <div key={h.id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"7px 0"}}>
                <div style={{display:"flex",alignItems:"center",gap:8}}><I n="holiday" s={14} c="#c2410c"/><span style={{fontSize:12,fontWeight:700,color:"var(--text)"}}>{h.name}</span></div>
                <span style={{fontSize:11,fontWeight:700,color:"#c2410c"}}>{fmtDate(h.date)}</span>
              </div>
            ))}
            {pastHolidays.length>0&&<>
              {upcomingHolidays.length>0&&<div style={{height:1,background:"var(--cardBorder)",margin:"6px 0"}}/>}
              {pastHolidays.map(h=>(
                <div key={h.id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"7px 0",opacity:.6}}>
                  <div style={{display:"flex",alignItems:"center",gap:8}}><I n="holiday" s={14} c="var(--textFaint)"/><span style={{fontSize:12,fontWeight:700,color:"var(--text)"}}>{h.name}</span></div>
                  <span style={{fontSize:11,fontWeight:700,color:"var(--textFaint)"}}>{fmtDate(h.date)}</span>
                </div>
              ))}
            </>}
          </div>
        </>}

        {tab==="marks"&&<div>
          <button onClick={()=>setTab("home")} style={{background:"none",border:"none",display:"flex",alignItems:"center",gap:6,cursor:"pointer",marginBottom:14,padding:0}}><I n="back" s={18} c="var(--text)"/><span style={{fontSize:14,fontWeight:800,color:"var(--text)"}}>My Test Marks</span></button>
          {avgPct!==null&&<div style={{background:"linear-gradient(135deg,#0d1b42,#1e3a8a)",borderRadius:18,padding:"16px 20px",marginBottom:14,color:"#fff",display:"flex",justifyContent:"space-around"}}>
            <div style={{textAlign:"center"}}><div style={{fontSize:22,fontWeight:900}}>{avgPct}%</div><div style={{fontSize:10,opacity:.7}}>AVERAGE</div></div>
            <div style={{textAlign:"center"}}><div style={{fontSize:22,fontWeight:900}}>{gradeLabel(avgPct)}</div><div style={{fontSize:10,opacity:.7}}>GRADE</div></div>
            <div style={{textAlign:"center"}}><div style={{fontSize:22,fontWeight:900}}>{studentMarks.length}</div><div style={{fontSize:10,opacity:.7}}>TESTS</div></div>
          </div>}
          {studentMarks.length===0&&<div style={{textAlign:"center",padding:"40px 0",color:"var(--textFaint)"}}><div style={{fontSize:36,marginBottom:10}}>📝</div><div style={{fontSize:14}}>No test results yet</div></div>}
          {studentMarks.map(m=>{
            const pct=Math.round(m.marksObtained/m.maxMarks*100);
            return(
              <div key={m.id} style={{background:"var(--card)",borderRadius:14,padding:"14px 16px",marginBottom:10,border:"1.5px solid var(--cardBorder)"}}>
                <div style={{fontSize:14,fontWeight:800,color:"var(--text)"}}>{m.subject}</div>
                <div style={{fontSize:11,color:"var(--textFaint)",marginTop:2,marginBottom:8}}>{m.testName||"Test"} · {fmtDate(m.date)}</div>
                <div style={{display:"flex",alignItems:"center",gap:12}}>
                  <div style={{fontSize:18,fontWeight:900,color:"var(--text)"}}>{m.marksObtained}<span style={{fontSize:12,color:"var(--textFaint)",fontWeight:600}}>/{m.maxMarks}</span></div>
                  <div style={{flex:1,background:"var(--inputBg)",borderRadius:6,height:8,overflow:"hidden"}}><div style={{background:gradeColor(pct),height:"100%",width:`${pct}%`,borderRadius:6}}/></div>
                  <span style={{fontSize:12,fontWeight:900,color:gradeColor(pct)}}>{pct}%</span>
                </div>
              </div>
            );
          })}
        </div>}

        {tab==="fees"&&<div>
          <button onClick={()=>setTab("home")} style={{background:"none",border:"none",display:"flex",alignItems:"center",gap:6,cursor:"pointer",marginBottom:14,padding:0}}><I n="back" s={18} c="var(--text)"/><span style={{fontSize:14,fontWeight:800,color:"var(--text)"}}>My Fees</span></button>
          {latestFeeReminder&&total>0&&(
            <div style={{background:"linear-gradient(135deg,#b45309,#f59e0b)",borderRadius:18,padding:"16px 18px",marginBottom:14,color:"#fff",boxShadow:"0 8px 24px rgba(245,158,11,.25)"}}>
              <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:8}}>
                <div style={{width:34,height:34,borderRadius:11,background:"rgba(255,255,255,.2)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><I n="bell" s={17} c="#fff"/></div>
                <div style={{fontSize:13,fontWeight:900,letterSpacing:.3}}>Fee Reminder</div>
              </div>
              <div style={{fontSize:13,lineHeight:1.6,marginBottom:10,opacity:.96}}>{latestFeeReminder.message}</div>
              {(latestFeeReminder.dueDate||latestFeeReminder.lateFee>0)&&<div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:10}}>
                {latestFeeReminder.dueDate&&<span style={{background:"rgba(255,255,255,.18)",borderRadius:10,padding:"5px 10px",fontSize:11,fontWeight:800,display:"flex",alignItems:"center",gap:5}}><I n="cal" s={12} c="#fff"/> Due {fmtDateNice(latestFeeReminder.dueDate)}</span>}
                {latestFeeReminder.lateFee>0&&<span style={{background:"rgba(255,255,255,.18)",borderRadius:10,padding:"5px 10px",fontSize:11,fontWeight:800}}>+{settings.currency}{latestFeeReminder.lateFee} late fee after due date</span>}
              </div>}
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",paddingTop:10,borderTop:"1px solid rgba(255,255,255,.25)"}}>
                <span style={{fontSize:11,opacity:.85}}>{new Date(latestFeeReminder.createdAt).toLocaleDateString("en-IN",{day:"2-digit",month:"short",year:"numeric"})} · {latestFeeReminder.senderName||"Admin"}</span>
                <span style={{background:"rgba(255,255,255,.22)",borderRadius:20,padding:"3px 10px",fontSize:10,fontWeight:800}}>{settings.currency}{latestFeeReminder.amount.toLocaleString("en-IN")} due</span>
              </div>
            </div>
          )}
          <div style={{background:"var(--card)",borderRadius:16,padding:"16px",border:"1.5px solid var(--cardBorder)",marginBottom:14}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
              <div style={{fontWeight:800,fontSize:13,color:"var(--text)",textTransform:"uppercase",letterSpacing:.5}}>{monthFull(mk)}</div>
              <Badge s={feeStatus}/>
            </div>
            {s.discount?.value>0&&<div style={{background:"#dcfce7",borderRadius:10,padding:"8px 12px",marginBottom:10,fontSize:12,color:"#166534",fontWeight:700}}>{s.discount.type==="percent"?`${s.discount.value}% discount applied`:`${settings.currency}${s.discount.value} discount applied`}</div>}
            {[["Monthly Fee",`${settings.currency}${fee.toLocaleString("en-IN")}`],["Paid This Month",`${settings.currency}${curPaid.toLocaleString("en-IN")}`],["Due This Month",`${settings.currency}${currentDue.toLocaleString("en-IN")}`]].map(([l,v])=>(
              <div key={l} style={{display:"flex",justifyContent:"space-between",marginBottom:7}}>
                <span style={{fontSize:13,color:"var(--textMuted)"}}>{l}</span>
                <span style={{fontSize:13,fontWeight:700,color:"var(--text)"}}>{v}</span>
              </div>
            ))}
            {carryForward>0&&<><div style={{height:1,background:"var(--cardBorder)",margin:"10px 0"}}/><CarryBreakdown breakdown={breakdown} currency={settings.currency}/><div style={{display:"flex",justifyContent:"space-between",padding:"10px 12px",background:"#fef2f2",borderRadius:10,border:"1.5px solid #fecaca",marginTop:8}}><span style={{fontSize:14,color:"#991b1b",fontWeight:800}}>Total Pending</span><span style={{fontSize:16,fontWeight:900,color:"#dc2626"}}>{settings.currency}{total.toLocaleString("en-IN")}</span></div></>}
            {total===0&&<div style={{padding:"8px 12px",background:"#f0fdf4",borderRadius:10,fontSize:13,fontWeight:700,color:"#15803d",textAlign:"center"}}>✓ All fees cleared</div>}
          </div>
          <div style={{fontWeight:800,fontSize:12,color:"var(--textMuted)",textTransform:"uppercase",letterSpacing:.7,marginBottom:10}}>Payment History</div>
          <div style={{background:"var(--card)",borderRadius:16,padding:"6px 16px",border:"1.5px solid var(--cardBorder)"}}>
            {allPays.length===0?<div style={{color:"var(--textFaint)",fontSize:13,textAlign:"center",padding:"16px 0"}}>No payments recorded yet</div>
              :allPays.map(p=>(
                <div key={p.id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 0",borderBottom:"1px solid var(--cardBorder)"}}>
                  <div>
                    <div style={{fontSize:14,fontWeight:700,color:"var(--text)"}}>{settings.currency}{p.amount.toLocaleString("en-IN")}</div>
                    <div style={{fontSize:11,color:"var(--textFaint)"}}>{fmtDate(p.date)} · {p.method} · {monthLabel(p.monthKey)}</div>
                  </div>
                </div>
              ))}
          </div>
        </div>}

        {tab==="homework"&&<div>
          <button onClick={()=>setTab("home")} style={{background:"none",border:"none",display:"flex",alignItems:"center",gap:6,cursor:"pointer",marginBottom:14,padding:0}}><I n="back" s={18} c="var(--text)"/><span style={{fontSize:14,fontWeight:800,color:"var(--text)"}}>My Homework</span></button>
          {myHomework.length===0&&<div style={{textAlign:"center",padding:"40px 0",color:"var(--textFaint)"}}><div style={{fontSize:36,marginBottom:10}}>📚</div><div style={{fontSize:14}}>No homework assigned yet</div></div>}
          {myHomework.map(h=>(
            <div key={h.id} style={{background:"var(--card)",borderRadius:14,padding:"14px 16px",marginBottom:10,border:"1.5px solid var(--cardBorder)"}}>
              <div style={{fontSize:14,fontWeight:800,color:"var(--text)",marginBottom:6}}>{h.title}</div>
              {h.text&&<div style={{fontSize:13,color:"var(--textMuted)",marginBottom:8,lineHeight:1.5,whiteSpace:"pre-wrap"}}>{h.text}</div>}
              {h.image&&<img src={h.image} alt="Homework attachment" style={{width:"100%",borderRadius:10,marginBottom:8,display:"block"}}/>}
              <div style={{display:"flex",gap:8,alignItems:"center",flexWrap:"wrap"}}>
                <span style={{background:"#e0f2fe",color:"#075985",borderRadius:20,padding:"2px 10px",fontSize:10,fontWeight:800}}>{shiftNameFor(h.shiftId)}</span>
                {h.dueDate&&<span style={{background:"#fef9c3",color:"#92400e",borderRadius:20,padding:"2px 10px",fontSize:10,fontWeight:800}}>Due {fmtDate(h.dueDate)}</span>}
                <span style={{fontSize:11,color:"var(--textFaint)"}}>{new Date(h.createdAt).toLocaleDateString("en-IN",{day:"2-digit",month:"short",year:"numeric"})}</span>
              </div>
            </div>
          ))}
        </div>}

        {tab==="leave"&&<div>
          <button onClick={()=>setTab("home")} style={{background:"none",border:"none",display:"flex",alignItems:"center",gap:6,cursor:"pointer",marginBottom:14,padding:0}}><I n="back" s={18} c="var(--text)"/><span style={{fontSize:14,fontWeight:800,color:"var(--text)"}}>Apply for Leave</span></button>

          {!showLeaveForm?(
            <button onClick={()=>setShowLeaveForm(true)} style={{width:"100%",background:"linear-gradient(135deg,#1e3a8a,#2563eb)",border:"none",borderRadius:14,padding:"14px",color:"#fff",fontSize:14,fontWeight:800,cursor:"pointer",fontFamily:"inherit",display:"flex",alignItems:"center",justifyContent:"center",gap:8,marginBottom:16}}>
              <I n="plus" s={16} c="#fff"/> Apply for a Leave
            </button>
          ):(
            <div style={{background:"var(--card)",border:"1.5px solid var(--cardBorder)",borderRadius:16,padding:"16px",marginBottom:16}}>
              <div style={{display:"flex",gap:10,marginBottom:12}}>
                <div style={{flex:1}}>
                  <label style={{display:"block",fontSize:11,fontWeight:700,color:"var(--textMuted)",marginBottom:6,textTransform:"uppercase",letterSpacing:.6}}>From</label>
                  <input type="date" value={leaveFromDate} onChange={e=>{setLeaveFromDate(e.target.value);if(e.target.value>leaveToDate)setLeaveToDate(e.target.value);}} style={{width:"100%",padding:"11px 13px",border:"1.5px solid var(--cardBorder)",borderRadius:11,fontSize:13,color:"var(--text)",background:"var(--inputBg)",outline:"none",boxSizing:"border-box",fontFamily:"inherit"}}/>
                </div>
                <div style={{flex:1}}>
                  <label style={{display:"block",fontSize:11,fontWeight:700,color:"var(--textMuted)",marginBottom:6,textTransform:"uppercase",letterSpacing:.6}}>To</label>
                  <input type="date" value={leaveToDate} min={leaveFromDate} onChange={e=>setLeaveToDate(e.target.value)} style={{width:"100%",padding:"11px 13px",border:"1.5px solid var(--cardBorder)",borderRadius:11,fontSize:13,color:"var(--text)",background:"var(--inputBg)",outline:"none",boxSizing:"border-box",fontFamily:"inherit"}}/>
                </div>
              </div>
              {leaveToDate>leaveFromDate&&<div style={{fontSize:11,color:"#1e3a8a",fontWeight:700,marginBottom:12}}>{Math.round((new Date(leaveToDate)-new Date(leaveFromDate))/86400000)+1} days</div>}
              <label style={{display:"block",fontSize:11,fontWeight:700,color:"var(--textMuted)",marginBottom:6,textTransform:"uppercase",letterSpacing:.6}}>Reason</label>
              <textarea value={leaveReason} onChange={e=>setLeaveReason(e.target.value)} placeholder="e.g. Not feeling well, family function..." rows={3} style={{width:"100%",padding:"11px 13px",border:"1.5px solid var(--cardBorder)",borderRadius:11,fontSize:14,color:"var(--text)",background:"var(--inputBg)",outline:"none",boxSizing:"border-box",fontFamily:"inherit",resize:"vertical",marginBottom:14}}/>
              <div style={{display:"flex",gap:10}}>
                <Btn onClick={()=>{setShowLeaveForm(false);setLeaveReason("");}} outline c="#64748b" full>Cancel</Btn>
                <Btn onClick={submitLeave} disabled={!leaveReason.trim()} full>Submit Request</Btn>
              </div>
            </div>
          )}

          <div style={{fontWeight:800,fontSize:12,color:"var(--textMuted)",textTransform:"uppercase",letterSpacing:.7,marginBottom:10}}>My Leave Requests</div>
          {myLeaveRequests.length===0&&<div style={{textAlign:"center",padding:"30px 0",color:"var(--textFaint)",fontSize:13}}>No leave requests yet</div>}
          {myLeaveRequests.map(lr=>(
            <div key={lr.id} style={{background:"var(--card)",border:"1.5px solid var(--cardBorder)",borderRadius:14,padding:"12px 14px",marginBottom:10}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
                <span style={{fontSize:13,fontWeight:800,color:"var(--text)"}}>{lr.toDate&&lr.toDate!==lr.fromDate?`${fmtDate(lr.fromDate||lr.date)} – ${fmtDate(lr.toDate)}`:fmtDate(lr.fromDate||lr.date)}</span>
                {lr.status==="pending"&&<span style={{fontSize:10,fontWeight:800,color:"#92400e",background:"#fef9c3",borderRadius:20,padding:"3px 10px"}}>PENDING</span>}
                {lr.status==="approved"&&<span style={{fontSize:10,fontWeight:800,color:"#166534",background:"#dcfce7",borderRadius:20,padding:"3px 10px"}}>APPROVED</span>}
                {lr.status==="rejected"&&<span style={{fontSize:10,fontWeight:800,color:"#991b1b",background:"#fee2e2",borderRadius:20,padding:"3px 10px"}}>REJECTED</span>}
              </div>
              <div style={{fontSize:12,color:"var(--textMuted)",lineHeight:1.5}}>{lr.reason}</div>
            </div>
          ))}
        </div>}

        {tab==="password"&&<div>
          <button onClick={()=>setTab("home")} style={{background:"none",border:"none",display:"flex",alignItems:"center",gap:6,cursor:"pointer",marginBottom:14,padding:0}}><I n="back" s={18} c="var(--text)"/><span style={{fontSize:14,fontWeight:800,color:"var(--text)"}}>Change Password</span></button>
          <div style={{background:"var(--card)",border:"1.5px solid var(--cardBorder)",borderRadius:16,padding:"16px",marginBottom:16}}>
            <label style={{display:"block",fontSize:11,fontWeight:700,color:"var(--textMuted)",marginBottom:6,textTransform:"uppercase",letterSpacing:.6}}>Current Password</label>
            <input type="password" value={curPw} onChange={e=>{setCurPw(e.target.value);setPwError("");}} placeholder="Current password" style={{width:"100%",padding:"11px 13px",border:"1.5px solid var(--cardBorder)",borderRadius:11,fontSize:14,color:"var(--text)",background:"var(--inputBg)",outline:"none",boxSizing:"border-box",fontFamily:"inherit",marginBottom:12}}/>
            <label style={{display:"block",fontSize:11,fontWeight:700,color:"var(--textMuted)",marginBottom:6,textTransform:"uppercase",letterSpacing:.6}}>New Password</label>
            <input type="password" value={newPw} onChange={e=>{setNewPw(e.target.value);setPwError("");}} placeholder="At least 4 characters" style={{width:"100%",padding:"11px 13px",border:"1.5px solid var(--cardBorder)",borderRadius:11,fontSize:14,color:"var(--text)",background:"var(--inputBg)",outline:"none",boxSizing:"border-box",fontFamily:"inherit",marginBottom:12}}/>
            <label style={{display:"block",fontSize:11,fontWeight:700,color:"var(--textMuted)",marginBottom:6,textTransform:"uppercase",letterSpacing:.6}}>Confirm New Password</label>
            <input type="password" value={confirmPw} onChange={e=>{setConfirmPw(e.target.value);setPwError("");}} placeholder="Re-enter new password" style={{width:"100%",padding:"11px 13px",border:"1.5px solid var(--cardBorder)",borderRadius:11,fontSize:14,color:"var(--text)",background:"var(--inputBg)",outline:"none",boxSizing:"border-box",fontFamily:"inherit",marginBottom:14}}/>
            {pwError&&<div style={{fontSize:12,fontWeight:700,color:pwError.startsWith("✓")?"#16a34a":"#dc2626",marginBottom:14,textAlign:"center"}}>{pwError}</div>}
            <Btn onClick={changePassword} full>Update Password</Btn>
          </div>
          <div style={{fontSize:11,color:"var(--textFaint)",textAlign:"center",lineHeight:1.6}}>Your User ID stays the same — only your password changes. Use something you'll remember.</div>
        </div>}
      </div>
      <StudentPortalNav tab={tab} setTab={setTab} theme={theme} onLogout={onLogout}/>
    </div>
  );
};

const StudentPortalNav=({tab,setTab,theme,onLogout})=>{
  const items=[{id:"home",icon:"home",label:"Home"},{id:"attendance",icon:"checkbig",label:"Attendance"},{id:"homework",icon:"edit",label:"Homework"},{id:"marks",icon:"book",label:"Marks"},{id:"fees",icon:"rupee",label:"Fees"}];
  return(
    <div style={{position:"fixed",bottom:0,left:"50%",transform:"translateX(-50%)",width:"100%",maxWidth:480,background:"var(--navBg)",borderTop:"1px solid var(--navBorder)",display:"flex",justifyContent:"space-around",padding:"6px 0 calc(14px + env(safe-area-inset-bottom))",zIndex:100,boxShadow:theme.bg==="#0b0b1a"?"0 -4px 24px rgba(0,0,0,.3)":"0 -4px 24px rgba(30,58,138,.08)"}}>
      {items.map(n=>{
        const isActive=tab===n.id;
        return(
          <button key={n.id} onClick={()=>setTab(n.id)} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:3,background:"none",border:"none",cursor:"pointer",padding:"4px 2px",borderRadius:12,flex:1,minWidth:0}}>
            <div style={{background:isActive?(theme.bg==="#0b0b1a"?"#2d2a5e":"#ede9fe"):"transparent",borderRadius:11,padding:"5px 9px",transition:"background .15s"}}><I n={n.icon} s={21} c={isActive?"#3b82f6":theme.textFaint}/></div>
            <span style={{fontSize:10,fontWeight:700,color:isActive?"#3b82f6":theme.textFaint,letterSpacing:.3}}>{n.label}</span>
          </button>
        );
      })}
    </div>
  );
};

// ══════════════════════════════════════════════════════════════
// PARENT PORTAL — parents log in with an ID/password given by admin and see
// their child's attendance, fees, homework, marks, schedule & messages.
// Parents can pay fees by UPI; admin verifies the UPI reference and the
// system then issues the official receipt.
// ══════════════════════════════════════════════════════════════
const SERIF="'Fraunces','Iowan Old Style','Palatino Linotype',Georgia,serif";
const GOLD="#f5b93a";
const money=(cur,n)=>`${cur||"₹"}${(+n||0).toLocaleString("en-IN")}`;
const greetingNow=()=>{const h=new Date().getHours();return h<12?"Good morning":h<17?"Good afternoon":"Good evening";};
const isIOS=()=>typeof navigator!=="undefined"&&/iPhone|iPad|iPod/i.test(navigator.userAgent||"");
const upiLink=(settings,amount,note,app)=>{
  const q=`pa=${encodeURIComponent(settings.upiId||"")}&pn=${encodeURIComponent(settings.upiName||settings.institute||"")}&am=${(+amount).toFixed(2)}&cu=INR&tn=${encodeURIComponent(note||"Tuition fee")}`;
  const base={any:"upi://pay",gpay:isIOS()?"gpay://upi/pay":"tez://upi/pay",phonepe:"phonepe://pay",paytm:"paytmmp://pay"}[app||"any"];
  return `${base}?${q}`;
};
const upiReady=settings=>!!(settings?.upiId&&/^[\w.\-]{2,}@[A-Za-z]{2,}$/.test(String(settings.upiId).trim())&&settings?.enabledFeatures?.onlinePayments!==false);
const parentFirstName=p=>String(p?.name||"").trim().split(/\s+/)[0]||"there";
const cssVarsFor=theme=>({"--bg":theme.bg,"--card":theme.card,"--cardBorder":theme.cardBorder,"--text":theme.text,"--textMuted":theme.textMuted,"--textFaint":theme.textFaint,"--inputBg":theme.inputBg,"--navBg":theme.navBg,"--navBorder":theme.navBorder,"--shadow":theme.shadow});

// ── Pay fees online (UPI) ──────────────────────────────────────
// No payment gateway is involved: the parent pays with any UPI app straight to
// the institute's UPI ID, then submits the UPI reference number. Admin checks it
// against the bank/UPI statement and approves — that creates the real payment
// and the receipt.
const PayOnlineSheet=({store,student,payerName,onClose,toast})=>{
  const{settings,students,payments,paymentClaims,setPaymentClaims}=store;
  const cur=settings.currency||"₹";
  const mk=curMK();
  const{total,currentDue,carryForward}=calcOutstanding(student.id,mk,students,payments);
  const[step,setStep]=useState("amount"); // amount | pay | confirm | done
  const[amount,setAmount]=useState(total>0?String(total):"");
  const[utr,setUtr]=useState("");
  const[err,setErr]=useState("");
  const[qrFailed,setQrFailed]=useState(false);
  const[copied,setCopied]=useState(false);
  const amt=Math.round((+amount||0)*100)/100;
  const note=`${student.name} fee ${monthLabel(mk)}`;
  const ready=upiReady(settings);
  const openClaims=(paymentClaims||[]).filter(c=>c.studentId===student.id&&c.status==="pending");
  const openClaimsTotal=openClaims.reduce((a,c)=>a+c.amount,0);

  const goPay=()=>{
    setErr("");
    if(!(amt>0)){setErr("Enter the amount you want to pay");return;}
    if(amt>total){setErr(`Amount can't be more than the ${money(cur,total)} due`);return;}
    setStep("pay");
  };
  const copyUpi=()=>{
    try{navigator.clipboard?.writeText(settings.upiId);setCopied(true);setTimeout(()=>setCopied(false),1800);}catch{}
  };
  const submitRef=()=>{
    setErr("");
    const ref=utr.trim().toUpperCase();
    if(!/^[A-Z0-9]{8,24}$/.test(ref)){setErr("Enter the UPI reference / transaction ID (8–24 letters or digits) shown in your payment app");return;}
    const dup=(paymentClaims||[]).some(c=>c.utr===ref&&c.status!=="rejected")||payments.some(p=>(p.note||"").toUpperCase().includes(ref));
    if(dup){setErr("This reference number has already been submitted");return;}
    setPaymentClaims(cs=>[{id:uid(),studentId:student.id,monthKey:mk,amount:amt,method:"UPI",utr:ref,status:"pending",payerName:payerName||"",createdAt:Date.now()},...(cs||[])]);
    setStep("done");
  };
  const box={background:"var(--inputBg)",border:"1.5px solid var(--cardBorder)",borderRadius:14,padding:"12px 14px"};

  return(
    <Sheet title={step==="done"?"Payment submitted":"Pay fees online"} onClose={onClose}>
      {!ready&&(
        <div style={{...box,textAlign:"center",padding:"22px 16px"}}>
          <div style={{width:46,height:46,borderRadius:14,background:"#fef3c7",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 10px"}}><I n="wallet" s={22} c="#b45309"/></div>
          <div style={{fontSize:14,fontWeight:800,color:"var(--text)",marginBottom:4}}>Online payment isn't set up yet</div>
          <div style={{fontSize:12,color:"var(--textMuted)",lineHeight:1.6}}>The institute hasn't added a UPI ID. Please pay at the institute for now, or ask them to enable online payment.</div>
        </div>
      )}
      {ready&&total<=0&&step!=="done"&&(
        <div style={{...box,textAlign:"center",padding:"22px 16px"}}>
          <div style={{fontSize:30,marginBottom:6}}>✓</div>
          <div style={{fontSize:14,fontWeight:800,color:"#15803d"}}>Nothing is due for {student.name}</div>
          <div style={{fontSize:12,color:"var(--textMuted)",marginTop:4}}>All fees up to {monthLabel(mk)} are cleared.</div>
        </div>
      )}

      {ready&&total>0&&step==="amount"&&(
        <>
          <div style={{background:"linear-gradient(135deg,#0a1f4d,#1e3a8a)",borderRadius:18,padding:"18px 18px 16px",color:"#fff",marginBottom:14}}>
            <div style={{fontSize:12,opacity:.7}}>Fees due for {student.name}</div>
            <div style={{fontFamily:SERIF,fontSize:34,fontWeight:600,letterSpacing:-1,marginTop:2}}>{money(cur,total)}</div>
            <div style={{fontSize:11.5,opacity:.75,marginTop:6,lineHeight:1.6}}>
              {monthFull(mk)}: {money(cur,currentDue)}{carryForward>0?` · Earlier months: ${money(cur,carryForward)}`:""}
            </div>
          </div>
          {openClaims.length>0&&(
            <div style={{background:"#fef9c3",border:"1.5px solid #fde68a",borderRadius:12,padding:"10px 12px",fontSize:12,color:"#854d0e",lineHeight:1.5,marginBottom:14}}>
              {openClaims.length} payment{openClaims.length!==1?"s":""} of {money(cur,openClaimsTotal)} already submitted and waiting for the institute to confirm. Only pay again for what's still unpaid.
            </div>
          )}
          <label style={{display:"block",fontSize:12,fontWeight:700,color:"var(--textMuted)",marginBottom:6}}>Amount to pay</label>
          <div style={{display:"flex",alignItems:"center",gap:8,border:"1.5px solid var(--cardBorder)",background:"var(--inputBg)",borderRadius:14,padding:"4px 14px"}}>
            <span style={{fontFamily:SERIF,fontSize:24,fontWeight:600,color:"var(--textMuted)"}}>{cur}</span>
            <input value={amount} onChange={e=>{setAmount(e.target.value.replace(/[^\d.]/g,""));setErr("");}} inputMode="decimal" placeholder="0" style={{flex:1,minWidth:0,border:"none",outline:"none",background:"transparent",fontFamily:SERIF,fontSize:28,fontWeight:600,color:"var(--text)",padding:"10px 0"}}/>
          </div>
          <div style={{display:"flex",gap:8,marginTop:10,flexWrap:"wrap"}}>
            <Chip label={`Full ${money(cur,total)}`} active={amt===total} onClick={()=>setAmount(String(total))}/>
            {currentDue>0&&currentDue!==total&&<Chip label={`This month ${money(cur,currentDue)}`} active={amt===currentDue} onClick={()=>setAmount(String(currentDue))}/>}
          </div>
          {err&&<div style={{marginTop:12,background:"#fef2f2",border:"1px solid #fecaca",borderRadius:11,padding:"9px 12px",fontSize:12,fontWeight:600,color:"#b91c1c"}}>{err}</div>}
          <div style={{marginTop:16}}><Btn onClick={goPay} full>Continue to pay {amt>0?money(cur,amt):""}</Btn></div>
        </>
      )}

      {ready&&total>0&&step==="pay"&&(
        <>
          <div style={{textAlign:"center",marginBottom:14}}>
            <div style={{fontSize:12,color:"var(--textMuted)"}}>You are paying</div>
            <div style={{fontFamily:SERIF,fontSize:38,fontWeight:600,color:"var(--text)",letterSpacing:-1}}>{money(cur,amt)}</div>
            <div style={{fontSize:12,color:"var(--textMuted)"}}>to {settings.upiName||settings.institute}</div>
          </div>
          <a href={upiLink(settings,amt,note,"any")} style={{display:"flex",alignItems:"center",justifyContent:"center",gap:8,textDecoration:"none",background:"linear-gradient(135deg,#1e3a8a,#2563eb)",color:"#fff",borderRadius:14,padding:"14px",fontSize:15,fontWeight:800,boxShadow:"0 6px 16px rgba(37,99,235,.28)"}}>
            <I n="rupee" s={18} c="#fff"/> Pay with a UPI app
          </a>
          <div style={{display:"flex",gap:8,marginTop:10}}>
            {[["gpay","Google Pay"],["phonepe","PhonePe"],["paytm","Paytm"]].map(([k,l])=>(
              <a key={k} href={upiLink(settings,amt,note,k)} style={{flex:1,textAlign:"center",textDecoration:"none",border:"1.5px solid var(--cardBorder)",background:"var(--card)",borderRadius:12,padding:"10px 4px",fontSize:12,fontWeight:700,color:"var(--text)"}}>{l}</a>
            ))}
          </div>
          <div style={{...box,marginTop:16,display:"flex",alignItems:"center",gap:14}}>
            {!qrFailed?(
              <img alt="UPI QR code" width={112} height={112} onError={()=>setQrFailed(true)} src={`https://api.qrserver.com/v1/create-qr-code/?size=224x224&margin=6&data=${encodeURIComponent(upiLink(settings,amt,note,"any"))}`} style={{borderRadius:10,background:"#fff",flexShrink:0}}/>
            ):(
              <div style={{width:112,height:112,borderRadius:10,background:"var(--card)",border:"1.5px dashed var(--cardBorder)",display:"flex",alignItems:"center",justifyContent:"center",textAlign:"center",fontSize:11,color:"var(--textFaint)",padding:8,flexShrink:0}}>QR needs internet</div>
            )}
            <div style={{minWidth:0,flex:1}}>
              <div style={{fontSize:12,fontWeight:700,color:"var(--text)"}}>On another phone?</div>
              <div style={{fontSize:11.5,color:"var(--textMuted)",lineHeight:1.5,marginTop:2}}>Scan this QR, or pay to the UPI ID:</div>
              <button onClick={copyUpi} style={{marginTop:6,background:"var(--card)",border:"1.5px solid var(--cardBorder)",borderRadius:9,padding:"6px 10px",fontSize:12,fontWeight:800,color:"var(--text)",cursor:"pointer",fontFamily:"inherit",display:"flex",alignItems:"center",gap:6,maxWidth:"100%"}}>
                <span style={{overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{settings.upiId}</span><I n="copy" s={13} c="#2563eb"/>
              </button>
              {copied&&<div style={{fontSize:10.5,color:"#16a34a",fontWeight:700,marginTop:3}}>Copied</div>}
            </div>
          </div>
          <div style={{fontSize:12,color:"var(--textMuted)",lineHeight:1.6,margin:"14px 2px 12px"}}>After the payment goes through, come back and tap the button below to send us the reference number. Your receipt is issued once the institute confirms it.</div>
          <Btn onClick={()=>setStep("confirm")} full c="#16a34a">I have paid</Btn>
          <button onClick={()=>setStep("amount")} style={{width:"100%",background:"none",border:"none",marginTop:8,padding:8,fontSize:12,fontWeight:700,color:"var(--textMuted)",cursor:"pointer",fontFamily:"inherit"}}>Change amount</button>
        </>
      )}

      {ready&&total>0&&step==="confirm"&&(
        <>
          <div style={{...box,marginBottom:14,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <span style={{fontSize:13,color:"var(--textMuted)"}}>Amount paid</span>
            <span style={{fontFamily:SERIF,fontSize:22,fontWeight:600,color:"var(--text)"}}>{money(cur,amt)}</span>
          </div>
          <label style={{display:"block",fontSize:12,fontWeight:700,color:"var(--textMuted)",marginBottom:6}}>UPI reference / transaction ID</label>
          <input value={utr} onChange={e=>{setUtr(e.target.value.replace(/[^A-Za-z0-9]/g,""));setErr("");}} placeholder="e.g. 412345678901" autoCapitalize="characters" autoCorrect="off" spellCheck={false} style={{width:"100%",boxSizing:"border-box",padding:"13px 14px",border:"1.5px solid var(--cardBorder)",borderRadius:12,fontSize:16,fontWeight:700,letterSpacing:1,color:"var(--text)",background:"var(--inputBg)",outline:"none",fontFamily:"inherit"}}/>
          <div style={{fontSize:11.5,color:"var(--textFaint)",marginTop:6,lineHeight:1.5}}>Find it in your payment app under the payment details. It is called UTR, UPI Ref No. or Transaction ID.</div>
          {err&&<div style={{marginTop:12,background:"#fef2f2",border:"1px solid #fecaca",borderRadius:11,padding:"9px 12px",fontSize:12,fontWeight:600,color:"#b91c1c"}}>{err}</div>}
          <div style={{display:"flex",gap:10,marginTop:16}}>
            <Btn onClick={()=>setStep("pay")} outline c="#64748b" full>Back</Btn>
            <Btn onClick={submitRef} full>Submit for confirmation</Btn>
          </div>
        </>
      )}

      {step==="done"&&(
        <div style={{textAlign:"center",padding:"14px 6px 6px"}}>
          <div style={{width:64,height:64,borderRadius:20,background:"#dcfce7",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 14px"}}><I n="check" s={30} c="#16a34a"/></div>
          <div style={{fontFamily:SERIF,fontSize:22,fontWeight:600,color:"var(--text)"}}>{money(cur,amt)} submitted</div>
          <div style={{fontSize:13,color:"var(--textMuted)",lineHeight:1.65,margin:"8px 0 18px"}}>The institute will match reference <b style={{color:"var(--text)"}}>{utr.trim().toUpperCase()}</b> with their account and confirm. You'll see the receipt under Payment history as soon as they do.</div>
          <Btn onClick={onClose} full>Done</Btn>
        </div>
      )}
    </Sheet>
  );
};

// ── Admin: create parent accounts, hand children over, verify UPI payments ──
const ParentsManager=({store,toast,onBack})=>{
  const{parents,setParents,students,paymentClaims,setPaymentClaims,payments,setPayments,settings}=store;
  const cur=settings.currency||"₹";
  const[tab,setTab]=useState("parents");
  const[q,setQ]=useState("");
  const[form,setForm]=useState(null); // {id?,name,phone,studentIds,childQ}
  const[detailId,setDetailId]=useState(null);
  const[confirmDel,setConfirmDel]=useState(null);
  const[rejecting,setRejecting]=useState(null);
  const[rejectReason,setRejectReason]=useState("");
  const[receipt,setReceipt]=useState(null);
  const list=parents||[];
  const claims=paymentClaims||[];
  const active=students.filter(s=>!s.archived);
  const pendingClaims=claims.filter(c=>c.status==="pending").sort((a,b)=>a.createdAt-b.createdAt);
  const doneClaims=claims.filter(c=>c.status!=="pending").sort((a,b)=>(b.reviewedAt||b.createdAt)-(a.reviewedAt||a.createdAt)).slice(0,25);
  const nameOf=id=>students.find(s=>s.id===id)?.name||"Removed student";
  const detail=list.find(p=>p.id===detailId)||null;
  const shown=list.filter(p=>{
    const t=q.trim().toLowerCase();
    if(!t) return true;
    return (p.name||"").toLowerCase().includes(t)||(p.phone||"").includes(t)||(p.studentIds||[]).some(id=>nameOf(id).toLowerCase().includes(t));
  });
  const withoutParent=active.filter(s=>!list.some(p=>(p.studentIds||[]).includes(s.id)));

  const openNew=(preIds=[])=>setForm({name:"",phone:"",studentIds:preIds,childQ:""});
  const openEdit=p=>{setDetailId(null);setForm({id:p.id,name:p.name,phone:p.phone||"",studentIds:[...(p.studentIds||[])],childQ:""});};
  const toggleChild=id=>setForm(f=>({...f,studentIds:f.studentIds.includes(id)?f.studentIds.filter(x=>x!==id):[...f.studentIds,id]}));
  const saveForm=()=>{
    if(!form.name.trim()) return toast.error("Enter the parent's name");
    if(!form.studentIds.length) return toast.error("Select at least one child");
    if(form.id){
      setParents(ps=>ps.map(p=>p.id===form.id?{...p,name:form.name.trim(),phone:form.phone.trim(),studentIds:form.studentIds}:p));
      toast.success("Parent updated","Saved");
      setForm(null);
    }else{
      const loginId=genLoginId(form.name,form.phone,list.map(p=>p.loginId));
      const rec={id:uid(),name:form.name.trim(),phone:form.phone.trim(),studentIds:form.studentIds,loginId,pin:genPin4(),portalEnabled:true,createdAt:Date.now()};
      setParents(ps=>[...(ps||[]),rec]);
      toast.success("Parent account created","Ready to hand over");
      setForm(null);setDetailId(rec.id);
    }
  };
  const credText=p=>`${settings.institute}\nParent Portal Login\n\nUser ID: ${p.loginId}\nPassword: ${p.pin}\n\nOpen the app → choose the Parent tab → log in. You can see ${(p.studentIds||[]).map(nameOf).join(" & ")}'s attendance, homework, test marks and fees, and pay fees online by UPI.`;
  const shareWA=p=>{
    const ph=(p.phone||"").replace(/\D/g,"");
    window.open(`https://wa.me/${ph?(ph.length===10?"91"+ph:ph):""}?text=${encodeURIComponent(credText(p))}`,"_blank");
  };
  const copyCreds=p=>{try{navigator.clipboard?.writeText(credText(p));toast.success("Login details copied","Copied");}catch{toast.error("Couldn't copy");}};
  const regen=p=>{const pin=genPin4();setParents(ps=>ps.map(x=>x.id===p.id?{...x,pin}:x));toast.info("New password generated","Regenerated");};
  const toggleEnabled=p=>setParents(ps=>ps.map(x=>x.id===p.id?{...x,portalEnabled:x.portalEnabled===false}:x));
  const removeParent=p=>{setParents(ps=>ps.filter(x=>x.id!==p.id));setConfirmDel(null);setDetailId(null);toast.info("Parent account removed");};

  const approve=c=>{
    const st=students.find(s=>s.id===c.studentId);
    if(!st) return toast.error("This student no longer exists");
    const pay={id:uid(),studentId:c.studentId,monthKey:c.monthKey,amount:c.amount,date:todayStr(),method:"UPI",note:`UPI Ref ${c.utr} · paid via parent portal`,created:Date.now(),receiptNo:genReceiptNo(payments),claimId:c.id};
    setPayments(ps=>[...ps,pay]);
    setPaymentClaims(cs=>cs.map(x=>x.id===c.id?{...x,status:"approved",reviewedAt:Date.now(),paymentId:pay.id}:x));
    toast.success(`${money(cur,c.amount)} added for ${st.name}`,"Payment confirmed");
    setReceipt({payment:pay,student:st});
  };
  const reject=()=>{
    setPaymentClaims(cs=>cs.map(x=>x.id===rejecting.id?{...x,status:"rejected",reviewedAt:Date.now(),reason:rejectReason.trim()||"Payment not found in the account"}:x));
    setRejecting(null);setRejectReason("");toast.info("Payment marked as not received");
  };

  const tabBtn=(id,label,count)=>{
    const on=tab===id;
    return <button onClick={()=>setTab(id)} style={{flex:1,padding:"10px 6px",borderRadius:12,border:"none",cursor:"pointer",fontFamily:"inherit",fontSize:13,fontWeight:800,background:on?"var(--card)":"transparent",color:on?"var(--text)":"var(--textMuted)",boxShadow:on?"0 2px 8px var(--shadow)":"none",display:"flex",alignItems:"center",justifyContent:"center",gap:6}}>
      {label}{count>0&&<span style={{background:id==="payments"?"#f59e0b":"#1e3a8a",color:"#fff",borderRadius:20,minWidth:18,height:18,padding:"0 5px",display:"inline-flex",alignItems:"center",justifyContent:"center",fontSize:10,fontWeight:800}}>{count}</span>}
    </button>;
  };

  return(
    <div>
      <PageHeader title="Parents & payments" onBack={onBack} right={tab==="parents"?<Btn sm onClick={()=>openNew()}><I n="plus" s={14} c="#fff"/> Add parent</Btn>:null}/>
      <div style={{padding:"0 16px 24px"}}>
        <div style={{display:"flex",gap:4,padding:4,borderRadius:16,background:"var(--inputBg)",border:"1px solid var(--cardBorder)",marginBottom:14}}>
          {tabBtn("parents","Parents",0)}
          {tabBtn("payments","Payments to verify",pendingClaims.length)}
        </div>

        {tab==="parents"&&(
          <>
            {!upiReady(settings)&&(
              <div style={{background:"#fff7ed",border:"1.5px solid #fed7aa",borderRadius:14,padding:"12px 14px",marginBottom:14,fontSize:12,color:"#9a3412",lineHeight:1.55}}>
                <b>Online fee payment is off.</b> Add your UPI ID in Settings → Online fee payment so parents can pay from their portal.
              </div>
            )}
            {withoutParent.length>0&&list.length>0&&(
              <button onClick={()=>openNew([])} style={{width:"100%",textAlign:"left",background:"var(--card)",border:"1.5px dashed var(--cardBorder)",borderRadius:14,padding:"11px 14px",marginBottom:12,cursor:"pointer",fontFamily:"inherit",fontSize:12,color:"var(--textMuted)"}}>
                <b style={{color:"var(--text)"}}>{withoutParent.length} student{withoutParent.length!==1?"s":""}</b> have no parent login yet. Tap to create one.
              </button>
            )}
            {list.length>3&&(
              <div style={{position:"relative",marginBottom:12}}>
                <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search parent, phone or child…" style={{width:"100%",boxSizing:"border-box",padding:"11px 13px",border:"1.5px solid var(--cardBorder)",borderRadius:12,fontSize:14,background:"var(--card)",color:"var(--text)",outline:"none",fontFamily:"inherit"}}/>
              </div>
            )}
            {list.length===0&&(
              <div style={{textAlign:"center",padding:"34px 18px",background:"var(--card)",border:"1.5px solid var(--cardBorder)",borderRadius:18}}>
                <div style={{width:54,height:54,borderRadius:18,background:"#1e3a8a14",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 12px"}}><I n="users" s={26} c="#1e3a8a"/></div>
                <div style={{fontFamily:SERIF,fontSize:19,fontWeight:600,color:"var(--text)"}}>No parent logins yet</div>
                <div style={{fontSize:12.5,color:"var(--textMuted)",lineHeight:1.6,margin:"6px 0 16px"}}>Create a login, choose which children the parent can see, then send the ID and password on WhatsApp.</div>
                <Btn onClick={()=>openNew()}><I n="plus" s={15} c="#fff"/> Create first parent login</Btn>
              </div>
            )}
            {shown.map(p=>{
              const kids=(p.studentIds||[]).map(nameOf);
              const dues=(p.studentIds||[]).reduce((a,id)=>a+calcOutstanding(id,curMK(),students,payments).total,0);
              return(
                <button key={p.id} onClick={()=>setDetailId(p.id)} style={{width:"100%",textAlign:"left",background:"var(--card)",border:"1.5px solid var(--cardBorder)",borderRadius:16,padding:"14px",marginBottom:10,display:"flex",alignItems:"center",gap:12,cursor:"pointer",fontFamily:"inherit",boxShadow:"0 2px 8px var(--shadow)",opacity:p.portalEnabled===false?.6:1}}>
                  <Avatar name={p.name} size={44} g="135deg,#0a1f4d,#2563eb"/>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{fontSize:14,fontWeight:800,color:"var(--text)",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{p.name}</div>
                    <div style={{fontSize:12,color:"var(--textMuted)",marginTop:1,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{kids.join(", ")||"No children linked"}</div>
                    <div style={{fontSize:11,color:"var(--textFaint)",marginTop:3}}>{p.lastLoginAt?`Last login ${fmtDate(new Date(p.lastLoginAt).toISOString().split("T")[0])}`:"Hasn't logged in yet"}</div>
                  </div>
                  <div style={{textAlign:"right",flexShrink:0}}>
                    {p.portalEnabled===false?<span style={{fontSize:10,fontWeight:800,color:"#64748b",background:"#f1f5f9",borderRadius:20,padding:"2px 9px"}}>OFF</span>
                      :dues>0?<span style={{fontSize:11,fontWeight:800,color:"#dc2626"}}>{money(cur,dues)} due</span>:<span style={{fontSize:11,fontWeight:800,color:"#16a34a"}}>Paid up</span>}
                  </div>
                </button>
              );
            })}
          </>
        )}

        {tab==="payments"&&(
          <>
            {pendingClaims.length===0&&(
              <div style={{textAlign:"center",padding:"30px 18px",background:"var(--card)",border:"1.5px solid var(--cardBorder)",borderRadius:18,marginBottom:14}}>
                <div style={{fontSize:30,marginBottom:6}}>✓</div>
                <div style={{fontSize:14,fontWeight:800,color:"var(--text)"}}>Nothing waiting for you</div>
                <div style={{fontSize:12,color:"var(--textMuted)",marginTop:4,lineHeight:1.55}}>When a parent pays by UPI and submits the reference number, it shows up here for you to confirm.</div>
              </div>
            )}
            {pendingClaims.map(c=>{
              const st=students.find(s=>s.id===c.studentId);
              return(
                <div key={c.id} style={{background:"var(--card)",border:"1.5px solid #fde68a",borderRadius:16,padding:"14px",marginBottom:10}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:10}}>
                    <div style={{minWidth:0}}>
                      <div style={{fontSize:14,fontWeight:800,color:"var(--text)"}}>{st?.name||"Removed student"}</div>
                      <div style={{fontSize:11.5,color:"var(--textMuted)",marginTop:1}}>{monthFull(c.monthKey)}{c.payerName?` · sent by ${c.payerName}`:""}</div>
                    </div>
                    <div style={{fontFamily:SERIF,fontSize:22,fontWeight:600,color:"var(--text)",flexShrink:0}}>{money(cur,c.amount)}</div>
                  </div>
                  <div style={{background:"var(--inputBg)",borderRadius:10,padding:"9px 12px",marginTop:10,display:"flex",justifyContent:"space-between",alignItems:"center",fontSize:12}}>
                    <span style={{color:"var(--textMuted)"}}>UPI reference</span>
                    <b style={{color:"var(--text)",letterSpacing:.8}}>{c.utr}</b>
                  </div>
                  <div style={{fontSize:11,color:"var(--textFaint)",marginTop:6}}>Submitted {new Date(c.createdAt).toLocaleString("en-IN",{day:"2-digit",month:"short",hour:"2-digit",minute:"2-digit"})}. Match this reference and amount with your UPI app or bank before confirming.</div>
                  <div style={{display:"flex",gap:8,marginTop:12}}>
                    <Btn sm outline c="#dc2626" onClick={()=>{setRejecting(c);setRejectReason("");}}>Not received</Btn>
                    <div style={{flex:1}}><Btn sm full c="#16a34a" onClick={()=>approve(c)}>Confirm & issue receipt</Btn></div>
                  </div>
                </div>
              );
            })}
            {doneClaims.length>0&&(
              <>
                <div style={{fontWeight:800,fontSize:13,color:"var(--text)",margin:"18px 2px 10px"}}>Recently reviewed</div>
                <div style={{background:"var(--card)",border:"1.5px solid var(--cardBorder)",borderRadius:16,padding:"4px 14px"}}>
                  {doneClaims.map((c,i)=>{
                    const st=students.find(s=>s.id===c.studentId);
                    const pay=c.paymentId?payments.find(p=>p.id===c.paymentId):null;
                    return(
                      <div key={c.id} onClick={()=>pay&&st&&setReceipt({payment:pay,student:st})} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"11px 0",borderBottom:i<doneClaims.length-1?"1px solid var(--cardBorder)":"none",cursor:pay?"pointer":"default"}}>
                        <div style={{minWidth:0}}>
                          <div style={{fontSize:13,fontWeight:700,color:"var(--text)"}}>{st?.name||"Removed student"} · {money(cur,c.amount)}</div>
                          <div style={{fontSize:11,color:"var(--textFaint)"}}>{c.utr}{c.status==="rejected"&&c.reason?` · ${c.reason}`:""}</div>
                        </div>
                        <span style={{fontSize:10,fontWeight:800,borderRadius:20,padding:"3px 10px",background:c.status==="approved"?"#dcfce7":"#fee2e2",color:c.status==="approved"?"#166534":"#991b1b",flexShrink:0}}>{c.status==="approved"?"CONFIRMED":"NOT RECEIVED"}</span>
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </>
        )}
      </div>

      {form&&(
        <Sheet title={form.id?"Edit parent":"New parent login"} onClose={()=>setForm(null)}>
          <Inp label="Parent name" req value={form.name} onChange={v=>setForm(f=>({...f,name:v}))} placeholder="e.g. Suresh Sharma"/>
          <Inp label="Mobile number" value={form.phone} onChange={v=>setForm(f=>({...f,phone:v.replace(/[^\d+ ]/g,"")}))} placeholder="Used as their User ID and for WhatsApp" type="tel" hint={form.id?"":"The User ID is made from this number. Leave it blank to use their name."}/>
          <div style={{fontSize:11,fontWeight:700,color:"var(--textMuted)",marginBottom:6,textTransform:"uppercase",letterSpacing:.6}}>Children this parent can see <span style={{color:"#ef4444"}}>*</span></div>
          {active.length>6&&<input value={form.childQ} onChange={e=>setForm(f=>({...f,childQ:e.target.value}))} placeholder="Search students…" style={{width:"100%",boxSizing:"border-box",padding:"10px 12px",border:"1.5px solid var(--cardBorder)",borderRadius:11,fontSize:14,background:"var(--inputBg)",color:"var(--text)",outline:"none",fontFamily:"inherit",marginBottom:8}}/>}
          <div style={{maxHeight:240,overflowY:"auto",border:"1.5px solid var(--cardBorder)",borderRadius:14,marginBottom:6}}>
            {active.filter(s=>!form.childQ||s.name.toLowerCase().includes(form.childQ.toLowerCase())).map((s,i,arr)=>{
              const on=form.studentIds.includes(s.id);
              return(
                <button key={s.id} type="button" onClick={()=>toggleChild(s.id)} style={{width:"100%",display:"flex",alignItems:"center",gap:10,padding:"10px 12px",background:on?"#1e3a8a12":"transparent",border:"none",borderBottom:i<arr.length-1?"1px solid var(--cardBorder)":"none",cursor:"pointer",fontFamily:"inherit",textAlign:"left"}}>
                  <span style={{width:22,height:22,borderRadius:7,border:`2px solid ${on?"#1e3a8a":"#b8c5e6"}`,background:on?"#1e3a8a":"transparent",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>{on&&<I n="check" s={13} c="#fff"/>}</span>
                  <Avatar name={s.name} size={30} photo={s.photo}/>
                  <span style={{flex:1,minWidth:0}}>
                    <span style={{display:"block",fontSize:13,fontWeight:700,color:"var(--text)"}}>{s.name}</span>
                    <span style={{display:"block",fontSize:11,color:"var(--textFaint)"}}>{[s.studentClass,s.fatherName&&`Father: ${s.fatherName}`].filter(Boolean).join(" · ")||"—"}</span>
                  </span>
                </button>
              );
            })}
            {active.length===0&&<div style={{padding:16,textAlign:"center",fontSize:12,color:"var(--textFaint)"}}>Add students first</div>}
          </div>
          <div style={{fontSize:11,color:"var(--textFaint)",marginBottom:16}}>{form.studentIds.length} selected. Choose more than one child for a family with siblings.</div>
          <Btn onClick={saveForm} full>{form.id?"Save changes":"Create login"}</Btn>
        </Sheet>
      )}

      {detail&&!form&&(
        <Sheet title={detail.name} onClose={()=>setDetailId(null)}>
          <div style={{background:"linear-gradient(135deg,#0a1f4d,#1e3a8a)",borderRadius:18,padding:"16px",color:"#fff",marginBottom:14}}>
            <div style={{fontSize:11.5,opacity:.7,marginBottom:10}}>Give these to {parentFirstName(detail)} so they can log in under the Parent tab</div>
            <div style={{display:"flex",gap:10}}>
              <div style={{flex:1,background:"rgba(255,255,255,.12)",borderRadius:12,padding:"10px 12px"}}>
                <div style={{fontSize:10.5,opacity:.7}}>User ID</div>
                <div style={{fontSize:17,fontWeight:800,letterSpacing:.6,marginTop:2,wordBreak:"break-all"}}>{detail.loginId}</div>
              </div>
              <div style={{width:112,background:"rgba(255,255,255,.12)",borderRadius:12,padding:"10px 12px"}}>
                <div style={{fontSize:10.5,opacity:.7}}>Password</div>
                <div style={{fontFamily:SERIF,fontSize:22,fontWeight:600,letterSpacing:2,marginTop:0}}>{detail.pin}</div>
              </div>
            </div>
          </div>
          <div style={{fontWeight:800,fontSize:13,color:"var(--text)",marginBottom:8}}>Children they can see</div>
          <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:16}}>
            {(detail.studentIds||[]).map(id=>{
              const st=students.find(s=>s.id===id);
              if(!st) return null;
              const d=calcOutstanding(id,curMK(),students,payments).total;
              return(
                <div key={id} style={{display:"flex",alignItems:"center",gap:10,background:"var(--inputBg)",borderRadius:12,padding:"9px 12px"}}>
                  <Avatar name={st.name} size={32} photo={st.photo}/>
                  <div style={{flex:1,minWidth:0,fontSize:13,fontWeight:700,color:"var(--text)"}}>{st.name}<div style={{fontSize:11,fontWeight:500,color:"var(--textFaint)"}}>{st.studentClass||"—"}</div></div>
                  <span style={{fontSize:11,fontWeight:800,color:d>0?"#dc2626":"#16a34a"}}>{d>0?`${money(cur,d)} due`:"Paid up"}</span>
                </div>
              );
            })}
          </div>
          <div style={{display:"flex",gap:8,marginBottom:8}}>
            <button onClick={()=>shareWA(detail)} style={{flex:1,background:"#dcfce7",border:"none",borderRadius:12,padding:"12px",cursor:"pointer",fontFamily:"inherit",fontSize:13,fontWeight:800,color:"#166534"}}>Send on WhatsApp</button>
            <button onClick={()=>copyCreds(detail)} style={{flex:1,background:"var(--inputBg)",border:"1.5px solid var(--cardBorder)",borderRadius:12,padding:"12px",cursor:"pointer",fontFamily:"inherit",fontSize:13,fontWeight:800,color:"var(--text)"}}>Copy details</button>
          </div>
          <div style={{display:"flex",gap:8,marginBottom:14}}>
            <button onClick={()=>openEdit(detail)} style={{flex:1,background:"var(--inputBg)",border:"1.5px solid var(--cardBorder)",borderRadius:12,padding:"11px",cursor:"pointer",fontFamily:"inherit",fontSize:12.5,fontWeight:700,color:"var(--textMuted)"}}>Change children</button>
            <button onClick={()=>regen(detail)} style={{flex:1,background:"var(--inputBg)",border:"1.5px solid var(--cardBorder)",borderRadius:12,padding:"11px",cursor:"pointer",fontFamily:"inherit",fontSize:12.5,fontWeight:700,color:"var(--textMuted)"}}>New password</button>
          </div>
          <label style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"12px 14px",background:"var(--inputBg)",borderRadius:12,cursor:"pointer",marginBottom:14}}>
            <span style={{fontSize:13,fontWeight:700,color:"var(--text)"}}>Portal access<span style={{display:"block",fontSize:11,fontWeight:500,color:"var(--textFaint)"}}>{detail.portalEnabled===false?"Parent can't log in right now":"Parent can log in"}</span></span>
            <input type="checkbox" checked={detail.portalEnabled!==false} onChange={()=>toggleEnabled(detail)} style={{width:20,height:20,accentColor:"#16a34a"}}/>
          </label>
          <button onClick={()=>setConfirmDel(detail)} style={{width:"100%",background:"none",border:"none",padding:"8px",cursor:"pointer",fontFamily:"inherit",fontSize:12.5,fontWeight:700,color:"#dc2626"}}>Remove this parent account</button>
        </Sheet>
      )}

      {rejecting&&(
        <Sheet title="Payment not received" onClose={()=>setRejecting(null)}>
          <div style={{fontSize:13,color:"var(--textMuted)",lineHeight:1.6,marginBottom:12}}>{money(cur,rejecting.amount)} with reference <b style={{color:"var(--text)"}}>{rejecting.utr}</b> will be marked as not received. The parent will see your reason.</div>
          <Inp label="Reason (shown to parent)" value={rejectReason} onChange={setRejectReason} placeholder="e.g. Reference number not found in our account"/>
          <div style={{display:"flex",gap:10}}>
            <Btn onClick={()=>setRejecting(null)} outline c="#64748b" full>Cancel</Btn>
            <Btn onClick={reject} c="#dc2626" full>Mark not received</Btn>
          </div>
        </Sheet>
      )}
      {confirmDel&&<Confirm msg={`Remove ${confirmDel.name}'s parent login? Their children's records are not affected.`} onYes={()=>removeParent(confirmDel)} onNo={()=>setConfirmDel(null)} yesLabel="Remove"/>}
      {receipt&&<PaymentReceipt store={store} payment={receipt.payment} student={receipt.student} onClose={()=>setReceipt(null)} toast={toast}/>}
    </div>
  );
};

// ── Parent portal shell ────────────────────────────────────────
const ParentPortalNav=({tab,setTab,theme})=>{
  const items=[{id:"home",icon:"home",label:"Home"},{id:"attendance",icon:"checkbig",label:"Attendance"},{id:"fees",icon:"rupee",label:"Fees"},{id:"marks",icon:"book",label:"Marks"},{id:"more",icon:"dots",label:"More"}];
  const activeId=items.some(i=>i.id===tab)?tab:"more";
  return(
    <div style={{position:"fixed",bottom:0,left:"50%",transform:"translateX(-50%)",width:"100%",maxWidth:480,background:"var(--navBg)",borderTop:"1px solid var(--navBorder)",display:"flex",justifyContent:"space-around",padding:"6px 0 calc(14px + env(safe-area-inset-bottom))",zIndex:100,boxShadow:theme.bg==="#0b0b1a"?"0 -4px 24px rgba(0,0,0,.3)":"0 -4px 24px rgba(30,58,138,.08)"}}>
      {items.map(n=>{
        const on=activeId===n.id;
        return(
          <button key={n.id} onClick={()=>setTab(n.id)} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:3,background:"none",border:"none",cursor:"pointer",padding:"4px 2px",flex:1,minWidth:0}}>
            <div style={{background:on?(theme.bg==="#0b0b1a"?"#2d2a5e":"#e8efff"):"transparent",borderRadius:11,padding:"5px 9px",transition:"background .15s"}}><I n={n.icon} s={21} c={on?"#2563eb":theme.textFaint}/></div>
            <span style={{fontSize:10,fontWeight:700,color:on?"#2563eb":theme.textFaint}}>{n.label}</span>
          </button>
        );
      })}
    </div>
  );
};

const ParentPortal=({store,parent,onLogout,theme,toast})=>{
  const{shifts,students,payments,marks,holidays,settings,announcements,teachers,leaveRequests,setLeaveRequests,homework,setParents,feeReminders,setFeeReminders,paymentClaims,attend}=store;
  const cur=settings.currency||"₹";
  const kids=students.filter(s=>!s.archived&&(parent.studentIds||[]).includes(s.id));
  const[childId,setChildId]=useState(()=>kids[0]?.id||null);
  const[tab,setTab]=useState("home");
  const[showPay,setShowPay]=useState(false);
  const[receipt,setReceipt]=useState(null);
  const[showLeaveForm,setShowLeaveForm]=useState(false);
  const[leaveFrom,setLeaveFrom]=useState(todayStr());
  const[leaveTo,setLeaveTo]=useState(todayStr());
  const[leaveReason,setLeaveReason]=useState("");
  const[curPw,setCurPw]=useState("");
  const[newPw,setNewPw]=useState("");
  const[confirmPw,setConfirmPw]=useState("");
  const[pwMsg,setPwMsg]=useState("");
  const s=kids.find(k=>k.id===childId)||kids[0];

  useEffect(()=>{
    if(tab!=="fees"||!s) return;
    if(!(feeReminders||[]).some(r=>r.studentId===s.id&&!r.read)) return;
    setFeeReminders(list=>(list||[]).map(r=>r.studentId===s.id&&!r.read?{...r,read:true}:r));
    // eslint-disable-next-line
  },[tab,s?.id]);

  const shell=(children)=>(
    <div style={{...cssVarsFor(theme),maxWidth:480,margin:"0 auto",minHeight:"var(--app-h,100vh)",background:"var(--bg)",fontFamily:"'Inter',-apple-system,BlinkMacSystemFont,sans-serif",paddingBottom:"calc(88px + env(safe-area-inset-bottom))",paddingTop:"env(safe-area-inset-top)"}}>
      {children}
      <ParentPortalNav tab={tab} setTab={goTab} theme={theme}/>
    </div>
  );

  if(!s){
    return(
      <div style={{...cssVarsFor(theme),maxWidth:480,margin:"0 auto",minHeight:"var(--app-h,100vh)",background:"var(--bg)",padding:"60px 24px",textAlign:"center"}}>
        <div style={{fontFamily:SERIF,fontSize:22,fontWeight:600,color:"var(--text)"}}>No child linked yet</div>
        <div style={{fontSize:13,color:"var(--textMuted)",lineHeight:1.6,margin:"8px 0 20px"}}>Ask {settings.institute} to link your child to this parent account.</div>
        <Btn onClick={onLogout} outline c="#64748b">Log out</Btn>
      </div>
    );
  }

  // ── data for the selected child ──
  const myShifts=getShiftIds(s).map(id=>shifts.find(sh=>sh.id===id)).filter(Boolean);
  const myShiftIds=getShiftIds(s);
  const mk=curMK();
  const[mkY,mkM]=mk.split("-").map(Number);
  const{currentDue,carryForward,total,curPaid,breakdown,fee}=calcOutstanding(s.id,mk,students,payments);
  const feeStatus=total===0?"Paid":curPaid>0?"Partially Paid":"Pending";
  const allPays=payments.filter(p=>p.studentId===s.id).sort((a,b)=>new Date(b.date)-new Date(a.date)||(b.created||0)-(a.created||0));
  const claims=(paymentClaims||[]).filter(c=>c.studentId===s.id&&(c.status==="pending"||(c.status==="rejected"&&Date.now()-(c.reviewedAt||0)<14*86400000))).sort((a,b)=>b.createdAt-a.createdAt);
  const att=studentMonthAttendance(s,myShifts,mkY,mkM,attend||{});
  const studentMarks=marks.filter(m=>m.studentId===s.id&&m.status!=="pending").sort((a,b)=>new Date(b.date)-new Date(a.date));
  const avgPct=studentMarks.length>0?Math.round(studentMarks.reduce((a,m)=>a+(m.marksObtained/m.maxMarks*100),0)/studentMarks.length):null;
  const gradeColor=pct=>pct>=90?"#10b981":pct>=75?"#1e3a8a":pct>=50?"#f59e0b":"#ef4444";
  const gradeLabel=pct=>pct>=90?"A+":pct>=80?"A":pct>=70?"B":pct>=60?"C":pct>=40?"D":"F";
  const myAnnouncements=getAnnouncementsFor(announcements||[],"student",s.id,myShiftIds);
  const myHomework=(homework||[]).filter(h=>myShiftIds.includes(h.shiftId)).sort((a,b)=>b.createdAt-a.createdAt);
  const openHomework=myHomework.filter(h=>!h.dueDate||h.dueDate>=todayStr());
  const shiftNameFor=id=>shifts.find(sh=>sh.id===id)?.name||"Batch";
  const teacherNamesFor=shId=>{const l=teachersForShift(shId,teachers||[]);return l.length?l.map(t=>t.name).join(", "):"Not assigned yet";};
  const myLeaves=(leaveRequests||[]).filter(lr=>lr.studentId===s.id).sort((a,b)=>new Date(b.createdAt||b.date)-new Date(a.createdAt||a.date));
  const unreadMsgs=(store.messages||[]).filter(m=>m.studentId===s.id&&m.from==="staff"&&!m.read);
  const myFeeReminders=(feeReminders||[]).filter(r=>r.studentId===s.id).sort((a,b)=>b.createdAt-a.createdAt);
  const latestReminder=myFeeReminders[0];
  const todayHoliday=getHoliday(todayStr(),holidays);
  const now=new Date();
  const dayAbbr=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"][now.getDay()];
  const hm=`${String(now.getHours()).padStart(2,"0")}:${String(now.getMinutes()).padStart(2,"0")}`;
  const todaysClasses=myShifts.filter(sh=>sh.days?.includes(dayAbbr)).map(sh=>({...sh,...getShiftTime(sh,dayAbbr)}));
  const liveClass=todaysClasses.find(sh=>hm>=sh.start&&hm<=sh.end);
  const nextClass=todaysClasses.find(sh=>sh.start>hm);
  const canPay=upiReady(settings);
  const attColorV=att.applicable===0?"#94a3b8":att.pct>=75?"#10b981":att.pct>=50?"#f59e0b":"#ef4444";

  // ── notifications ──
  const viewerKey=`parent:${parent.id}:${s.id}`;
  const annSeen=getSeenTs(store,viewerKey+":announcements");
  const hwSeen=getSeenTs(store,viewerKey+":homework");
  const marksSeen=getSeenTs(store,viewerKey+":marks");
  const newAnn=myAnnouncements.filter(a=>a.createdAt>annSeen);
  const newHw=myHomework.filter(h=>h.createdAt>hwSeen);
  const newMarks=studentMarks.filter(m=>(m.verifiedAt||m.created||0)>marksSeen);
  const bellItems=[
    ...unreadMsgs.slice(0,6).map(m=>({icon:"phone",color:"#0ea5e9",title:m.authorName||"Teacher",desc:m.text,unread:true,onClick:()=>setTab("messages")})),
    ...myFeeReminders.filter(r=>!r.read).slice(0,6).map(r=>({icon:"bell",color:"#f59e0b",title:"Fee reminder",desc:r.message,unread:true,onClick:()=>setTab("fees")})),
    ...newAnn.slice(0,6).map(a=>({icon:"mail",color:"#1e3a8a",title:a.title,desc:a.message,unread:true,onClick:()=>setTab("announcements")})),
    ...newHw.slice(0,6).map(h=>({icon:"edit",color:"#0ea5e9",title:"New homework: "+h.title,desc:h.text,unread:true,onClick:()=>setTab("homework")})),
    ...newMarks.slice(0,6).map(m=>({icon:"book",color:"#10b981",title:"New result: "+m.subject,desc:`${m.marksObtained}/${m.maxMarks} · ${m.testName||"Test"}`,unread:true,onClick:()=>setTab("marks")})),
  ];
  const openBell=()=>{
    if(newAnn.length) markSeenNow(store,viewerKey+":announcements");
    if(newHw.length) markSeenNow(store,viewerKey+":homework");
    if(newMarks.length) markSeenNow(store,viewerKey+":marks");
  };

  const goTab=id=>{
    if(id==="announcements"&&newAnn.length) markSeenNow(store,viewerKey+":announcements");
    if(id==="homework"&&newHw.length) markSeenNow(store,viewerKey+":homework");
    if(id==="marks"&&newMarks.length) markSeenNow(store,viewerKey+":marks");
    setPwMsg("");setTab(id);
  };
  const submitLeave=()=>{
    if(!leaveReason.trim()||leaveTo<leaveFrom) return;
    setLeaveRequests(lr=>[...(lr||[]),{id:uid(),studentId:s.id,date:leaveFrom,fromDate:leaveFrom,toDate:leaveTo,reason:leaveReason.trim(),status:"pending",createdAt:new Date().toISOString(),requestedBy:`${parent.name} (Parent)`}]);
    setLeaveReason("");setLeaveFrom(todayStr());setLeaveTo(todayStr());setShowLeaveForm(false);
    toast.success("Leave request sent to the teacher","Submitted");
  };
  const changePassword=()=>{
    setPwMsg("");
    if(curPw!==parent.pin) return setPwMsg("Current password is incorrect");
    if(!newPw||newPw.length<4) return setPwMsg("New password must be at least 4 characters");
    if(newPw!==confirmPw) return setPwMsg("New passwords don't match");
    setParents(ps=>ps.map(x=>x.id===parent.id?{...x,pin:newPw}:x));
    setCurPw("");setNewPw("");setConfirmPw("");setPwMsg("✓ Password updated");
  };

  const childSwitcher=kids.length>1?(
    <div style={{display:"flex",gap:8,overflowX:"auto",padding:"0 16px 12px"}}>
      {kids.map(k=>{
        const on=k.id===s.id;
        return(
          <button key={k.id} onClick={()=>setChildId(k.id)} style={{flexShrink:0,display:"flex",alignItems:"center",gap:8,padding:"6px 14px 6px 6px",borderRadius:30,border:`1.5px solid ${on?"#1e3a8a":"var(--cardBorder)"}`,background:on?"#1e3a8a":"var(--card)",color:on?"#fff":"var(--text)",cursor:"pointer",fontFamily:"inherit",fontSize:13,fontWeight:700}}>
            <Avatar name={k.name} size={26} photo={k.photo} g="135deg,#f5b93a,#f59e0b"/>{k.name.split(" ")[0]}
          </button>
        );
      })}
    </div>
  ):null;
  const back=(to="home")=>()=>setTab(to);
  const card={background:"var(--card)",border:"1.5px solid var(--cardBorder)",borderRadius:18};
  const secTitle={fontWeight:800,fontSize:14,color:"var(--text)",margin:"0 2px 10px"};

  // Screens that reuse existing student components
  if(tab==="attendance") return shell(<>{childSwitcher&&<div style={{paddingTop:12}}>{childSwitcher}</div>}<StudentAttendanceDetail store={store} student={s} onBack={back()}/></>);
  if(tab==="schedule") return shell(<StudentWeeklySchedule store={store} student={s} myShifts={myShifts} toast={toast} onBack={back("more")}/>);
  if(tab==="messages") return shell(<MessagesThread store={store} student={s} role="student" authorName={`${parent.name} (Parent)`} title={`Message ${s.name.split(" ")[0]}'s teachers`} placeholder="Write to the teacher…" onBack={back("more")}/>);

  if(tab==="fees") return shell(
    <div>
      <PageHeader title="Fees" onBack={back()}/>
      {childSwitcher}
      <div style={{padding:"0 16px"}}>
        {latestReminder&&total>0&&(
          <div style={{background:"linear-gradient(135deg,#b45309,#f59e0b)",borderRadius:18,padding:"14px 16px",marginBottom:14,color:"#fff"}}>
            <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:6}}><I n="bell" s={16} c="#fff"/><span style={{fontSize:13,fontWeight:800}}>Reminder from {latestReminder.senderName||"the institute"}</span></div>
            <div style={{fontSize:13,lineHeight:1.55,opacity:.96}}>{latestReminder.message}</div>
            {latestReminder.dueDate&&<div style={{fontSize:11.5,marginTop:8,fontWeight:700,opacity:.9}}>Due by {fmtDateNice(latestReminder.dueDate)}{latestReminder.lateFee>0?` · ${money(cur,latestReminder.lateFee)} late fee after`:""}</div>}
          </div>
        )}
        <div style={{...card,padding:"18px",marginBottom:14,boxShadow:"0 8px 24px var(--shadow)"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
            <div>
              <div style={{fontSize:12,color:"var(--textMuted)"}}>{total>0?"Total due":"Fees status"} · {monthFull(mk)}</div>
              <div style={{fontFamily:SERIF,fontSize:40,fontWeight:600,letterSpacing:-1.5,color:total>0?"var(--text)":"#16a34a",marginTop:2}}>{total>0?money(cur,total):"All clear"}</div>
            </div>
            <Badge s={feeStatus}/>
          </div>
          {s.discount?.value>0&&<div style={{background:"#dcfce7",borderRadius:10,padding:"7px 11px",margin:"6px 0 4px",fontSize:12,color:"#166534",fontWeight:700}}>{s.discount.type==="percent"?`${s.discount.value}% discount applied`:`${money(cur,s.discount.value)} discount applied`}</div>}
          <div style={{margin:"12px 0 4px"}}>
            {[["Monthly fee",money(cur,fee)],["Paid this month",money(cur,curPaid)],["Due this month",money(cur,currentDue)]].map(([l,v])=>(
              <div key={l} style={{display:"flex",justifyContent:"space-between",padding:"5px 0",fontSize:13}}><span style={{color:"var(--textMuted)"}}>{l}</span><b style={{color:"var(--text)"}}>{v}</b></div>
            ))}
          </div>
          {carryForward>0&&<div style={{marginTop:6}}><CarryBreakdown breakdown={breakdown} currency={cur}/></div>}
          {total>0&&(canPay?(
            <div style={{marginTop:14}}><Btn onClick={()=>setShowPay(true)} full><I n="rupee" s={16} c="#fff"/> Pay {money(cur,total)} online</Btn></div>
          ):(
            <div style={{marginTop:12,fontSize:12,color:"var(--textMuted)",lineHeight:1.55,background:"var(--inputBg)",borderRadius:11,padding:"10px 12px"}}>Online payment isn't available yet. Please pay at the institute and you'll get a receipt here.</div>
          ))}
        </div>

        {claims.length>0&&(
          <div style={{marginBottom:14}}>
            <div style={secTitle}>Payments being checked</div>
            {claims.map(c=>(
              <div key={c.id} style={{...card,padding:"12px 14px",marginBottom:8,borderColor:c.status==="pending"?"#fde68a":"#fecaca"}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                  <b style={{fontSize:14,color:"var(--text)"}}>{money(cur,c.amount)}</b>
                  <span style={{fontSize:10,fontWeight:800,borderRadius:20,padding:"3px 10px",background:c.status==="pending"?"#fef9c3":"#fee2e2",color:c.status==="pending"?"#854d0e":"#991b1b"}}>{c.status==="pending"?"WAITING FOR CONFIRMATION":"NOT RECEIVED"}</span>
                </div>
                <div style={{fontSize:11.5,color:"var(--textMuted)",marginTop:4,lineHeight:1.5}}>UPI ref {c.utr} · {new Date(c.createdAt).toLocaleDateString("en-IN",{day:"2-digit",month:"short"})}{c.status==="rejected"?`. ${c.reason||""} Please contact the institute.`:""}</div>
              </div>
            ))}
          </div>
        )}

        <div style={secTitle}>Payment history</div>
        <div style={{...card,padding:"4px 16px",marginBottom:8}}>
          {allPays.length===0?<div style={{padding:"22px 0",textAlign:"center",fontSize:13,color:"var(--textFaint)"}}>No payments recorded yet</div>
            :allPays.map((p,i)=>(
              <button key={p.id} onClick={()=>setReceipt(p)} style={{width:"100%",background:"none",border:"none",borderBottom:i<allPays.length-1?"1px solid var(--cardBorder)":"none",padding:"12px 0",display:"flex",alignItems:"center",gap:12,cursor:"pointer",fontFamily:"inherit",textAlign:"left"}}>
                <div style={{width:38,height:38,borderRadius:12,background:"#10b98118",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><I n="receipt" s={18} c="#10b981"/></div>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{fontSize:14,fontWeight:800,color:"var(--text)"}}>{money(cur,p.amount)}</div>
                  <div style={{fontSize:11.5,color:"var(--textFaint)"}}>{fmtDate(p.date)} · {p.method} · {monthLabel(p.monthKey)}</div>
                </div>
                <span style={{fontSize:11,fontWeight:800,color:"#2563eb"}}>Receipt</span>
              </button>
            ))}
        </div>
      </div>
      {showPay&&<PayOnlineSheet store={store} student={s} payerName={parent.name} onClose={()=>setShowPay(false)} toast={toast}/>}
      {receipt&&<PaymentReceipt store={store} payment={receipt} student={s} onClose={()=>setReceipt(null)} toast={toast}/>}
    </div>
  );

  if(tab==="marks") return shell(
    <div>
      <PageHeader title="Test marks" onBack={back()}/>
      {childSwitcher}
      <div style={{padding:"0 16px"}}>
        {avgPct!==null&&(
          <div style={{background:"linear-gradient(135deg,#0a1f4d,#1e3a8a)",borderRadius:20,padding:"18px 20px",marginBottom:14,color:"#fff",display:"flex",justifyContent:"space-around"}}>
            <div style={{textAlign:"center"}}><div style={{fontFamily:SERIF,fontSize:30,fontWeight:600}}>{avgPct}%</div><div style={{fontSize:11,opacity:.7}}>Average</div></div>
            <div style={{textAlign:"center"}}><div style={{fontFamily:SERIF,fontSize:30,fontWeight:600,color:GOLD}}>{gradeLabel(avgPct)}</div><div style={{fontSize:11,opacity:.7}}>Grade</div></div>
            <div style={{textAlign:"center"}}><div style={{fontFamily:SERIF,fontSize:30,fontWeight:600}}>{studentMarks.length}</div><div style={{fontSize:11,opacity:.7}}>Tests</div></div>
          </div>
        )}
        {studentMarks.length===0&&<div style={{textAlign:"center",padding:"44px 0",color:"var(--textFaint)"}}><div style={{fontSize:34,marginBottom:8}}>📝</div><div style={{fontSize:14}}>No test results yet</div></div>}
        {studentMarks.map(m=>{
          const pct=Math.round(m.marksObtained/m.maxMarks*100);
          return(
            <div key={m.id} style={{...card,padding:"14px 16px",marginBottom:10,borderRadius:16}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"baseline"}}>
                <div style={{fontSize:14,fontWeight:800,color:"var(--text)"}}>{m.subject}</div>
                <span style={{fontSize:12,fontWeight:900,color:gradeColor(pct)}}>{pct}%</span>
              </div>
              <div style={{fontSize:11.5,color:"var(--textFaint)",margin:"2px 0 10px"}}>{m.testName||"Test"} · {fmtDate(m.date)}</div>
              <div style={{display:"flex",alignItems:"center",gap:12}}>
                <div style={{fontSize:18,fontWeight:900,color:"var(--text)"}}>{m.marksObtained}<span style={{fontSize:12,color:"var(--textFaint)",fontWeight:600}}>/{m.maxMarks}</span></div>
                <div style={{flex:1,background:"var(--inputBg)",borderRadius:6,height:8,overflow:"hidden"}}><div style={{background:gradeColor(pct),height:"100%",width:`${pct}%`,borderRadius:6}}/></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  if(tab==="homework") return shell(
    <div>
      <PageHeader title="Homework" onBack={back("more")}/>
      {childSwitcher}
      <div style={{padding:"0 16px"}}>
        {myHomework.length===0&&<div style={{textAlign:"center",padding:"44px 0",color:"var(--textFaint)"}}><div style={{fontSize:34,marginBottom:8}}>📚</div><div style={{fontSize:14}}>No homework assigned yet</div></div>}
        {myHomework.map(h=>{
          const overdue=h.dueDate&&h.dueDate<todayStr();
          return(
            <div key={h.id} style={{...card,padding:"14px 16px",marginBottom:10,borderRadius:16}}>
              <div style={{fontSize:14,fontWeight:800,color:"var(--text)",marginBottom:6}}>{h.title}</div>
              {h.text&&<div style={{fontSize:13,color:"var(--textMuted)",marginBottom:8,lineHeight:1.55,whiteSpace:"pre-wrap"}}>{h.text}</div>}
              {h.image&&<img src={h.image} alt="Homework attachment" style={{width:"100%",borderRadius:10,marginBottom:8,display:"block"}}/>}
              <div style={{display:"flex",gap:8,alignItems:"center",flexWrap:"wrap"}}>
                <span style={{background:"#e0f2fe",color:"#075985",borderRadius:20,padding:"2px 10px",fontSize:10,fontWeight:800}}>{shiftNameFor(h.shiftId)}</span>
                {h.dueDate&&<span style={{background:overdue?"#f1f5f9":"#fef9c3",color:overdue?"#64748b":"#92400e",borderRadius:20,padding:"2px 10px",fontSize:10,fontWeight:800}}>{overdue?"Was due":"Due"} {fmtDate(h.dueDate)}</span>}
                <span style={{fontSize:11,color:"var(--textFaint)"}}>{new Date(h.createdAt).toLocaleDateString("en-IN",{day:"2-digit",month:"short"})}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  if(tab==="announcements") return shell(
    <div>
      <PageHeader title="Announcements" onBack={back("more")}/>
      <div style={{padding:"0 16px"}}>
        {myAnnouncements.length===0&&<div style={{textAlign:"center",padding:"44px 0",color:"var(--textFaint)"}}><div style={{fontSize:34,marginBottom:8}}>📣</div><div style={{fontSize:14}}>No announcements yet</div></div>}
        {myAnnouncements.map(a=>(
          <div key={a.id} style={{...card,padding:"14px 16px",marginBottom:10,borderRadius:16,borderColor:"#1e3a8a40"}}>
            <div style={{fontSize:14,fontWeight:800,color:"var(--text)",marginBottom:4}}>{a.title}</div>
            <div style={{fontSize:13,color:"var(--textMuted)",lineHeight:1.6,whiteSpace:"pre-wrap"}}>{a.message}</div>
            <div style={{fontSize:11,color:"var(--textFaint)",marginTop:6}}>{new Date(a.createdAt).toLocaleDateString("en-IN",{day:"2-digit",month:"short",year:"numeric"})}</div>
          </div>
        ))}
      </div>
    </div>
  );

  if(tab==="leave") return shell(
    <div>
      <PageHeader title="Leave request" onBack={back("more")}/>
      {childSwitcher}
      <div style={{padding:"0 16px"}}>
        {!showLeaveForm?(
          <div style={{marginBottom:16}}><Btn full onClick={()=>setShowLeaveForm(true)}><I n="plus" s={16} c="#fff"/> Request leave for {s.name.split(" ")[0]}</Btn></div>
        ):(
          <div style={{...card,padding:"16px",marginBottom:16}}>
            <div style={{display:"flex",gap:10,marginBottom:12}}>
              {[["From",leaveFrom,v=>{setLeaveFrom(v);if(v>leaveTo)setLeaveTo(v);}],["To",leaveTo,setLeaveTo]].map(([l,val,fn])=>(
                <div key={l} style={{flex:1}}>
                  <label style={{display:"block",fontSize:12,fontWeight:700,color:"var(--textMuted)",marginBottom:5}}>{l}</label>
                  <input type="date" value={val} min={l==="To"?leaveFrom:undefined} onChange={e=>fn(e.target.value)} style={{width:"100%",boxSizing:"border-box",padding:"11px 12px",border:"1.5px solid var(--cardBorder)",borderRadius:11,fontSize:13,color:"var(--text)",background:"var(--inputBg)",outline:"none",fontFamily:"inherit"}}/>
                </div>
              ))}
            </div>
            <label style={{display:"block",fontSize:12,fontWeight:700,color:"var(--textMuted)",marginBottom:5}}>Reason</label>
            <textarea value={leaveReason} onChange={e=>setLeaveReason(e.target.value)} rows={3} placeholder="e.g. Fever, family function…" style={{width:"100%",boxSizing:"border-box",padding:"11px 13px",border:"1.5px solid var(--cardBorder)",borderRadius:11,fontSize:14,color:"var(--text)",background:"var(--inputBg)",outline:"none",fontFamily:"inherit",resize:"vertical",marginBottom:14}}/>
            <div style={{display:"flex",gap:10}}>
              <Btn outline c="#64748b" full onClick={()=>{setShowLeaveForm(false);setLeaveReason("");}}>Cancel</Btn>
              <Btn full disabled={!leaveReason.trim()||leaveTo<leaveFrom} onClick={submitLeave}>Send request</Btn>
            </div>
          </div>
        )}
        <div style={secTitle}>Requests for {s.name.split(" ")[0]}</div>
        {myLeaves.length===0&&<div style={{textAlign:"center",padding:"26px 0",color:"var(--textFaint)",fontSize:13}}>No leave requests yet</div>}
        {myLeaves.map(lr=>{
          const st={pending:["#fef9c3","#92400e","PENDING"],approved:["#dcfce7","#166534","APPROVED"],rejected:["#fee2e2","#991b1b","REJECTED"]}[lr.status]||["#f1f5f9","#64748b",String(lr.status).toUpperCase()];
          return(
            <div key={lr.id} style={{...card,padding:"12px 14px",marginBottom:10,borderRadius:14}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:5}}>
                <b style={{fontSize:13,color:"var(--text)"}}>{lr.toDate&&lr.toDate!==lr.fromDate?`${fmtDate(lr.fromDate||lr.date)} – ${fmtDate(lr.toDate)}`:fmtDate(lr.fromDate||lr.date)}</b>
                <span style={{fontSize:10,fontWeight:800,background:st[0],color:st[1],borderRadius:20,padding:"3px 10px"}}>{st[2]}</span>
              </div>
              <div style={{fontSize:12,color:"var(--textMuted)",lineHeight:1.5}}>{lr.reason}</div>
            </div>
          );
        })}
      </div>
    </div>
  );

  if(tab==="password") return shell(
    <div>
      <PageHeader title="Change password" onBack={back("more")}/>
      <div style={{padding:"0 16px"}}>
        <div style={{...card,padding:"16px",marginBottom:14}}>
          <Inp label="Current password" type="password" value={curPw} onChange={v=>{setCurPw(v);setPwMsg("");}} placeholder="Current password"/>
          <Inp label="New password" type="password" value={newPw} onChange={v=>{setNewPw(v);setPwMsg("");}} placeholder="At least 4 characters"/>
          <Inp label="Confirm new password" type="password" value={confirmPw} onChange={v=>{setConfirmPw(v);setPwMsg("");}} placeholder="Re-enter new password"/>
          {pwMsg&&<div style={{fontSize:12,fontWeight:700,color:pwMsg.startsWith("✓")?"#16a34a":"#dc2626",marginBottom:12,textAlign:"center"}}>{pwMsg}</div>}
          <Btn full onClick={changePassword}>Update password</Btn>
        </div>
        <div style={{fontSize:12,color:"var(--textFaint)",textAlign:"center",lineHeight:1.6}}>Your User ID stays the same. Only the password changes.</div>
      </div>
    </div>
  );

  if(tab==="more"){
    const rows=[
      {id:"homework",icon:"edit",c:"#0ea5e9",label:"Homework",desc:openHomework.length>0?`${openHomework.length} open`:"Nothing pending"},
      {id:"schedule",icon:"cal",c:"#ec4899",label:"Class schedule",desc:"Days and timings of every class"},
      {id:"messages",icon:"phone",c:"#0ea5e9",label:"Teacher messages",desc:unreadMsgs.length>0?`${unreadMsgs.length} new`:"Talk to the teacher directly",badge:unreadMsgs.length},
      {id:"leave",icon:"note",c:"#2563eb",label:"Leave request",desc:myLeaves.some(l=>l.status==="pending")?"1 pending":"Ask for leave, track the answer"},
      {id:"announcements",icon:"mail",c:"#1e3a8a",label:"Announcements",desc:newAnn.length>0?`${newAnn.length} new`:"Notices from the institute",badge:newAnn.length},
      {id:"password",icon:"lock",c:"#64748b",label:"Change password",desc:"Update your login password"},
    ];
    return shell(
      <div>
        <PageHeader title="More"/>
        <div style={{padding:"0 16px"}}>
          <div style={{...card,padding:"14px 16px",marginBottom:14,display:"flex",alignItems:"center",gap:12}}>
            <Avatar name={parent.name} size={44} g="135deg,#0a1f4d,#2563eb"/>
            <div style={{flex:1,minWidth:0}}><div style={{fontSize:15,fontWeight:800,color:"var(--text)"}}>{parent.name}</div><div style={{fontSize:12,color:"var(--textFaint)"}}>Parent · ID {parent.loginId}</div></div>
          </div>
          {rows.map(r=>(
            <button key={r.id} onClick={()=>goTab(r.id)} style={{width:"100%",...card,borderRadius:16,padding:"14px 16px",display:"flex",alignItems:"center",gap:14,cursor:"pointer",marginBottom:10,textAlign:"left",fontFamily:"inherit"}}>
              <div style={{background:r.c+"18",borderRadius:14,padding:11}}><I n={r.icon} s={20} c={r.c}/></div>
              <div style={{flex:1,minWidth:0}}><div style={{fontWeight:800,color:"var(--text)",fontSize:14}}>{r.label}</div><div style={{fontSize:11.5,color:"var(--textFaint)",marginTop:2}}>{r.desc}</div></div>
              {r.badge>0?<span style={{background:"#ef4444",color:"#fff",borderRadius:20,minWidth:20,height:20,display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,fontWeight:800,padding:"0 5px"}}>{r.badge}</span>:<I n="back" s={16} c="var(--cardBorder)"/>}
            </button>
          ))}
          <button onClick={onLogout} style={{width:"100%",background:"none",border:"1.5px solid var(--cardBorder)",borderRadius:14,padding:"13px",cursor:"pointer",fontFamily:"inherit",fontSize:13,fontWeight:800,color:"#dc2626",marginTop:6}}>Log out</button>
          <div style={{textAlign:"center",fontSize:11,color:"var(--textFaint)",marginTop:14}}>{settings.institute}</div>
        </div>
      </div>
    );
  }

  // ── HOME ──
  const tiles=[
    {id:"attendance",icon:"checkbig",c:"#10b981",label:"Attendance",val:att.applicable>0?`${att.pct}%`:"—",sub:att.applicable>0?`${att.present} present · ${att.absent} absent`:"No classes yet this month"},
    {id:"fees",icon:"rupee",c:"#2563eb",label:"Fees",val:total>0?money(cur,total):"Paid",sub:total>0?"Due · tap to pay":"All fees cleared"},
    {id:"marks",icon:"book",c:"#f59e0b",label:"Test marks",val:avgPct!==null?`${avgPct}%`:"—",sub:studentMarks.length?`${studentMarks.length} result${studentMarks.length!==1?"s":""}`:"No results yet"},
    {id:"homework",icon:"edit",c:"#0ea5e9",label:"Homework",val:String(openHomework.length),sub:openHomework.length?"Open right now":"Nothing pending"},
    {id:"schedule",icon:"cal",c:"#ec4899",label:"Schedule",val:String(myShifts.length),sub:myShifts.length===1?"batch":"batches"},
    {id:"messages",icon:"phone",c:"#0ea5e9",label:"Teacher chat",val:unreadMsgs.length?String(unreadMsgs.length):"—",sub:unreadMsgs.length?"New message":"Say hello"},
    {id:"leave",icon:"note",c:"#7c3aed",label:"Leave",val:myLeaves.filter(l=>l.status==="pending").length?String(myLeaves.filter(l=>l.status==="pending").length):"—",sub:"Request leave"},
    {id:"announcements",icon:"mail",c:"#1e3a8a",label:"Notices",val:newAnn.length?String(newAnn.length):String(myAnnouncements.length),sub:newAnn.length?"New":"From the institute"},
  ];
  return shell(
    <div>
      <div style={{padding:"18px 16px 0",display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
        <div style={{minWidth:0}}>
          <div style={{fontSize:12,color:"var(--textFaint)",fontWeight:600}}>{settings.institute}</div>
          <div style={{fontFamily:SERIF,fontSize:26,fontWeight:600,color:"var(--text)",letterSpacing:-.5,marginTop:1}}>{greetingNow()}, {parentFirstName(parent)}</div>
        </div>
        <div style={{display:"flex",gap:8,alignItems:"center",flexShrink:0}}>
          {isFeatureOn(settings,"notifications")&&<NotificationBell items={bellItems} onOpen={openBell}/>}
        </div>
      </div>
      {childSwitcher}
      <div style={{padding:"0 16px"}}>
        <div style={{position:"relative",overflow:"hidden",background:"linear-gradient(140deg,#071a44 0%,#12307a 60%,#1e4fc4 100%)",borderRadius:26,padding:"20px 20px 18px",color:"#fff",boxShadow:"0 16px 36px rgba(7,26,68,.32)",marginBottom:14}}>
          <div style={{position:"absolute",right:-34,top:-34,width:150,height:150,borderRadius:"50%",border:"1.5px solid rgba(245,185,58,.35)"}}/>
          <div style={{position:"absolute",right:-8,top:-8,width:98,height:98,borderRadius:"50%",border:"1.5px solid rgba(245,185,58,.25)"}}/>
          <div style={{position:"relative",display:"flex",alignItems:"center",gap:14}}>
            <Avatar name={s.name} size={56} photo={s.photo} g="135deg,#f5b93a,#f59e0b"/>
            <div style={{minWidth:0,flex:1}}>
              <div style={{fontFamily:SERIF,fontSize:22,fontWeight:600,letterSpacing:-.3,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{s.name}</div>
              <div style={{fontSize:12,opacity:.75,marginTop:2}}>{[s.studentClass,myShifts.map(sh=>sh.name).join(", ")].filter(Boolean).join(" · ")||"No batch assigned yet"}</div>
            </div>
          </div>
          <div style={{position:"relative",display:"flex",marginTop:18,paddingTop:14,borderTop:"1px solid rgba(255,255,255,.16)"}}>
            {[[att.applicable>0?`${att.pct}%`:"—","Attendance",att.applicable>0?(att.pct>=75?"#86efac":att.pct>=50?"#fcd34d":"#fca5a5"):"#fff"],[total>0?money(cur,total):"Paid","Fees due",total>0?"#fca5a5":"#86efac"],[avgPct!==null?`${avgPct}%`:"—","Test average","#fff"]].map(([v,l,col],i)=>(
              <div key={l} style={{flex:1,textAlign:"center",borderLeft:i?"1px solid rgba(255,255,255,.16)":"none"}}>
                <div style={{fontFamily:SERIF,fontSize:23,fontWeight:600,color:col,letterSpacing:-.5}}>{v}</div>
                <div style={{fontSize:11,opacity:.7,marginTop:1}}>{l}</div>
              </div>
            ))}
          </div>
        </div>

        {total>0&&(
          <button onClick={()=>setTab("fees")} style={{width:"100%",textAlign:"left",background:"linear-gradient(135deg,#fff7e0,#ffeeba)",border:"1.5px solid #f5d27a",borderRadius:18,padding:"13px 16px",marginBottom:14,display:"flex",alignItems:"center",gap:12,cursor:"pointer",fontFamily:"inherit"}}>
            <div style={{width:38,height:38,borderRadius:12,background:"#f5b93a",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><I n="rupee" s={19} c="#5b3a00"/></div>
            <div style={{flex:1,minWidth:0}}>
              <div style={{fontSize:14,fontWeight:800,color:"#5b3a00"}}>{money(cur,total)} fees due</div>
              <div style={{fontSize:12,color:"#8a5a00"}}>{canPay?"Pay online with any UPI app":"Tap to see the breakdown"}</div>
            </div>
            <span style={{fontSize:12,fontWeight:800,color:"#5b3a00"}}>{canPay?"Pay now":"View"}</span>
          </button>
        )}

        {todayHoliday?(
          <div style={{background:"linear-gradient(135deg,#c2410c,#ea580c)",borderRadius:16,padding:"13px 16px",marginBottom:14,color:"#fff",display:"flex",alignItems:"center",gap:10}}>
            <I n="holiday" s={18} c="#fff"/><div><div style={{fontSize:13,fontWeight:800}}>Holiday today: {todayHoliday.name}</div><div style={{fontSize:11,opacity:.9}}>No classes today</div></div>
          </div>
        ):(liveClass||nextClass)?(
          <div style={{...card,borderRadius:16,padding:"12px 16px",marginBottom:14,display:"flex",alignItems:"center",gap:12}}>
            <div style={{width:9,height:9,borderRadius:"50%",background:liveClass?"#22c55e":GOLD,boxShadow:liveClass?"0 0 0 4px rgba(34,197,94,.2)":"0 0 0 4px rgba(245,185,58,.2)",flexShrink:0}}/>
            <div style={{flex:1,minWidth:0}}>
              <div style={{fontSize:13,fontWeight:800,color:"var(--text)"}}>{liveClass?`${s.name.split(" ")[0]} is in class now`:`Next class today at ${fmtTime(nextClass.start)}`}</div>
              <div style={{fontSize:11.5,color:"var(--textFaint)"}}>{(liveClass||nextClass).name} · {teacherNamesFor((liveClass||nextClass).id)}</div>
            </div>
          </div>
        ):null}

        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:16}}>
          {tiles.map(t=>(
            <button key={t.id} onClick={()=>goTab(t.id)} style={{...card,borderRadius:18,padding:"14px 14px 13px",textAlign:"left",cursor:"pointer",fontFamily:"inherit",display:"flex",flexDirection:"column",gap:2,boxShadow:"0 2px 10px var(--shadow)"}}>
              <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:6}}>
                <div style={{background:t.c+"18",borderRadius:10,padding:6,display:"flex"}}><I n={t.icon} s={15} c={t.c}/></div>
                <span style={{fontSize:12.5,fontWeight:700,color:"var(--textMuted)"}}>{t.label}</span>
              </div>
              <div style={{fontFamily:SERIF,fontSize:24,fontWeight:600,color:"var(--text)",letterSpacing:-.5}}>{t.val}</div>
              <div style={{fontSize:11,color:"var(--textFaint)",lineHeight:1.35}}>{t.sub}</div>
            </button>
          ))}
        </div>

        {myAnnouncements.length>0&&(
          <div style={{marginBottom:14}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"baseline",marginBottom:10}}>
              <div style={{...secTitle,margin:0}}>Latest notices</div>
              <button onClick={()=>goTab("announcements")} style={{background:"none",border:"none",fontSize:12,fontWeight:800,color:"#2563eb",cursor:"pointer",fontFamily:"inherit"}}>See all</button>
            </div>
            {myAnnouncements.slice(0,2).map(a=>(
              <div key={a.id} style={{...card,borderRadius:16,padding:"12px 14px",marginBottom:8}}>
                <div style={{fontSize:13,fontWeight:800,color:"var(--text)",marginBottom:2}}>{a.title}</div>
                <div style={{fontSize:12,color:"var(--textMuted)",lineHeight:1.5,display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical",overflow:"hidden"}}>{a.message}</div>
              </div>
            ))}
          </div>
        )}
        <div style={{textAlign:"center",fontSize:11,color:"var(--textFaint)",padding:"4px 0 6px"}}>Signed in as {parent.name}</div>
      </div>
    </div>
  );
};

// ══════════════════════════════════════════════════════════════
// GLOBAL SEARCH — search students, payments, notes from anywhere
// ══════════════════════════════════════════════════════════════
const GlobalSearch=({store,onClose,onGoToStudent})=>{
  const{students,payments,notes,shifts}=store;
  const[q,setQ]=useState("");
  const inputRef=useRef(null);
  useEffect(()=>{inputRef.current?.focus();},[]);

  const ql=q.trim().toLowerCase();
  const active=students.filter(s=>!s.archived);

  const matchedStudents=ql?active.filter(s=>s.name.toLowerCase().includes(ql)||s.phone?.includes(ql)||s.parent?.toLowerCase().includes(ql)):[];
  const matchedNotes=ql?notes.filter(n=>!n.done&&n.text.toLowerCase().includes(ql)).slice(0,5):[];
  const matchedPayments=ql?payments.filter(p=>{
    const st=students.find(s=>s.id===p.studentId);
    return st?.name.toLowerCase().includes(ql)||p.receiptNo?.toLowerCase().includes(ql)||p.method.toLowerCase().includes(ql);
  }).slice(0,5):[];

  const hasResults=matchedStudents.length>0||matchedNotes.length>0||matchedPayments.length>0;

  return(
    <div style={{position:"fixed",inset:0,background:"var(--bg)",zIndex:2000,display:"flex",flexDirection:"column",paddingTop:"env(safe-area-inset-top)",paddingBottom:"env(safe-area-inset-bottom)"}}>
      <div style={{padding:"20px 16px 14px",display:"flex",alignItems:"center",gap:10,borderBottom:"1px solid var(--cardBorder)"}}>
        <div style={{flex:1,position:"relative"}}>
          <div style={{position:"absolute",left:12,top:"50%",transform:"translateY(-50%)"}}><I n="search" s={17} c="var(--textFaint)"/></div>
          <input ref={inputRef} value={q} onChange={e=>setQ(e.target.value)} placeholder="Search students, payments, notes..."
            style={{width:"100%",padding:"12px 12px 12px 38px",border:"1.5px solid var(--cardBorder)",borderRadius:13,fontSize:14,color:"var(--text)",background:"var(--inputBg)",outline:"none",boxSizing:"border-box",fontFamily:"inherit"}}/>
        </div>
        <button onClick={onClose} style={{background:"var(--card)",border:"1.5px solid var(--cardBorder)",borderRadius:12,padding:"10px 14px",cursor:"pointer",fontSize:13,fontWeight:700,color:"var(--textMuted)",fontFamily:"inherit"}}>Cancel</button>
      </div>

      <div style={{flex:1,overflowY:"auto",padding:"16px"}}>
        {!ql&&<div style={{textAlign:"center",padding:"60px 20px",color:"var(--textFaint)"}}>
          <I n="search2" s={40} c="var(--cardBorder)"/>
          <div style={{fontSize:14,marginTop:14}}>Search across students, payments and reminders</div>
        </div>}

        {ql&&!hasResults&&<div style={{textAlign:"center",padding:"60px 20px",color:"var(--textFaint)",fontSize:14}}>No results for "{q}"</div>}

        {matchedStudents.length>0&&<>
          <div style={{fontWeight:800,fontSize:11,color:"var(--textFaint)",textTransform:"uppercase",letterSpacing:.7,marginBottom:10}}>Students</div>
          {matchedStudents.map(s=>{
            const shIdx=shifts.findIndex(x=>x.id===s.shiftId);
            const col=shIdx>=0?getShiftColor(shIdx):{grad:"135deg,#94a3b8,#64748b"};
            return(
              <button key={s.id} onClick={()=>onGoToStudent(s)} style={{width:"100%",background:"var(--card)",border:"1.5px solid var(--cardBorder)",borderRadius:14,padding:"12px 14px",marginBottom:8,display:"flex",alignItems:"center",gap:12,cursor:"pointer",textAlign:"left",fontFamily:"inherit"}}>
                <Avatar name={s.name} size={36} g={col.grad}/>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{fontSize:13,fontWeight:800,color:"var(--text)"}}>{s.name}</div>
                  <div style={{fontSize:11,color:"var(--textFaint)"}}>{s.phone||"No phone"}{s.parent?` · ${s.parent}`:""}</div>
                </div>
                <I n="back" s={15} c="var(--cardBorder)"/>
              </button>
            );
          })}
        </>}

        {matchedPayments.length>0&&<>
          <div style={{fontWeight:800,fontSize:11,color:"var(--textFaint)",textTransform:"uppercase",letterSpacing:.7,marginBottom:10,marginTop:matchedStudents.length>0?18:0}}>Payments</div>
          {matchedPayments.map(p=>{
            const st=students.find(s=>s.id===p.studentId);
            return(
              <div key={p.id} style={{background:"var(--card)",border:"1.5px solid var(--cardBorder)",borderRadius:14,padding:"12px 14px",marginBottom:8,display:"flex",alignItems:"center",gap:12}}>
                <div style={{background:"#ede9fe",borderRadius:10,padding:8}}><I n="receipt" s={15} c="#1e3a8a"/></div>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{fontSize:13,fontWeight:800,color:"var(--text)"}}>{store.settings.currency}{p.amount} · {st?.name||"Unknown"}</div>
                  <div style={{fontSize:11,color:"var(--textFaint)"}}>{fmtDate(p.date)} · {p.method} {p.receiptNo?`· #${p.receiptNo}`:""}</div>
                </div>
              </div>
            );
          })}
        </>}

        {matchedNotes.length>0&&<>
          <div style={{fontWeight:800,fontSize:11,color:"var(--textFaint)",textTransform:"uppercase",letterSpacing:.7,marginBottom:10,marginTop:(matchedStudents.length>0||matchedPayments.length>0)?18:0}}>Reminders</div>
          {matchedNotes.map(n=>{
            const st=students.find(s=>s.id===n.studentId);
            return(
              <div key={n.id} style={{background:"var(--card)",border:"1.5px solid var(--cardBorder)",borderRadius:14,padding:"12px 14px",marginBottom:8,display:"flex",alignItems:"center",gap:12}}>
                <div style={{background:"#fef9c3",borderRadius:10,padding:8}}><I n="note" s={15} c="#b45309"/></div>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{fontSize:13,fontWeight:700,color:"var(--text)"}}>{n.text}</div>
                  <div style={{fontSize:11,color:"var(--textFaint)"}}>{st?.name||"Unknown"}{n.dueDate?` · Due ${fmtDate(n.dueDate)}`:""}</div>
                </div>
              </div>
            );
          })}
        </>}
      </div>
    </div>
  );
};

// ══════════════════════════════════════════════════════════════
// QUICK ATTENDANCE WIDGET — one-tap shortcut for fast marking
// ══════════════════════════════════════════════════════════════
const QuickAttendanceWidget=({store,onClose,toast})=>{
  const{students,shifts,attend,setAttend}=store;
  const today=todayStr();
  const now=new Date();
  const dayAbbr=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"][now.getDay()];
  const hm=`${String(now.getHours()).padStart(2,"0")}:${String(now.getMinutes()).padStart(2,"0")}`;
  const active=students.filter(s=>!s.archived);
  const scheduledToday=shifts.filter(sh=>sh.days?.includes(dayAbbr)).map(sh=>({...sh,...getShiftTime(sh,dayAbbr)}));
  const currentShift=scheduledToday.find(sh=>hm>=sh.start&&hm<=sh.end)||scheduledToday[0]||shifts[0];
  const[shiftId,setShiftId]=useState(currentShift?.id||"all");
  const[local,setLocal]=useState(()=>{
    const init={};
    const targets=shiftId==="all"?active:active.filter(s=>hasShift(s,shiftId));
    targets.forEach(s=>{init[s.id]=getAttStatus(attend,s.id,today,shiftId);});
    return init;
  });
  const[saving,setSaving]=useState(false);
  const[saved,setSaved]=useState(false);

  const currentStudents=shiftId==="all"?active:active.filter(s=>hasShift(s,shiftId));

  useEffect(()=>{
    const init={};
    currentStudents.forEach(s=>{init[s.id]=getAttStatus(attend,s.id,today,shiftId);});
    setLocal(init);
    // eslint-disable-next-line
  },[shiftId]);

  const mark=(id,val)=>setLocal(l=>({...l,[id]:l[id]===val?"":val}));
  const markAll=val=>{const n={};currentStudents.forEach(s=>n[s.id]=val);setLocal(n);};

  const save=async()=>{
    setSaving(true);
    await new Promise(r=>setTimeout(r,400));
    const upd={...attend};
    Object.entries(local).forEach(([id,val])=>{const key=attKey(id,today,shiftId);if(val)upd[key]=val;else delete upd[key];});
    setAttend(upd);setSaving(false);setSaved(true);
    const p=Object.values(local).filter(v=>v==="present").length;
    const a=Object.values(local).filter(v=>v==="absent").length;
    toast.success(`${p} present, ${a} absent`,"Quick Attendance Saved ✓");
    setTimeout(onClose,700);
  };

  const present=Object.values(local).filter(v=>v==="present").length;
  const absent=Object.values(local).filter(v=>v==="absent").length;

  return(
    <div style={{position:"fixed",inset:0,background:"rgba(15,15,35,.6)",zIndex:3000,display:"flex",alignItems:"flex-end"}} onClick={onClose}>
      <div style={{background:"var(--card)",borderRadius:"24px 24px 0 0",width:"100%",maxHeight:"calc(var(--app-h,100vh)*.85)",overflowY:"auto",overscrollBehavior:"contain",paddingBottom:"env(safe-area-inset-bottom)"}} onClick={e=>e.stopPropagation()}>
        <div style={{background:"linear-gradient(135deg,#1e3a8a,#2563eb)",borderRadius:"24px 24px 0 0",padding:"20px 20px 16px",color:"#fff"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4}}>
            <div style={{display:"flex",alignItems:"center",gap:8}}>
              <I n="zap" s={18} c="#fff"/>
              <span style={{fontSize:16,fontWeight:900}}>Quick Attendance</span>
            </div>
            <button onClick={onClose} style={{background:"rgba(255,255,255,.15)",border:"none",borderRadius:9,padding:"6px 8px",cursor:"pointer"}}><I n="x" s={16} c="#fff"/></button>
          </div>
          <div style={{fontSize:12,opacity:.8}}>{now.toLocaleDateString("en-IN",{weekday:"long",day:"numeric",month:"long"})}</div>
        </div>

        <div style={{padding:"16px 20px 24px"}}>
          {shifts.length>1&&(
            <div style={{display:"flex",gap:8,overflowX:"auto",marginBottom:14,paddingBottom:2}}>
              <Chip label="All" active={shiftId==="all"} onClick={()=>setShiftId("all")}/>
              {shifts.map((sh,i)=><Chip key={sh.id} label={sh.name} active={shiftId===sh.id} onClick={()=>setShiftId(sh.id)} c={getShiftColor(i).dot}/>)}
            </div>
          )}

          <div style={{display:"flex",gap:8,marginBottom:14}}>
            <div style={{flex:1,background:"#dcfce7",borderRadius:11,padding:"9px 8px",textAlign:"center"}}>
              <div style={{fontSize:18,fontWeight:900,color:"#166534"}}>{present}</div>
              <div style={{fontSize:9,color:"#166534",fontWeight:700}}>PRESENT</div>
            </div>
            <div style={{flex:1,background:"#fee2e2",borderRadius:11,padding:"9px 8px",textAlign:"center"}}>
              <div style={{fontSize:18,fontWeight:900,color:"#991b1b"}}>{absent}</div>
              <div style={{fontSize:9,color:"#991b1b",fontWeight:700}}>ABSENT</div>
            </div>
            <div style={{flex:1,background:"var(--inputBg)",borderRadius:11,padding:"9px 8px",textAlign:"center"}}>
              <div style={{fontSize:18,fontWeight:900,color:"var(--textMuted)"}}>{currentStudents.length-present-absent}</div>
              <div style={{fontSize:9,color:"var(--textMuted)",fontWeight:700}}>LEFT</div>
            </div>
          </div>

          <div style={{display:"flex",gap:8,marginBottom:14}}>
            <button onClick={()=>markAll("present")} style={{flex:1,background:"#10b981",border:"none",borderRadius:11,padding:"10px",fontSize:12,fontWeight:800,color:"#fff",cursor:"pointer",fontFamily:"inherit"}}>All Present</button>
            <button onClick={()=>markAll("absent")} style={{flex:1,background:"#ef4444",border:"none",borderRadius:11,padding:"10px",fontSize:12,fontWeight:800,color:"#fff",cursor:"pointer",fontFamily:"inherit"}}>All Absent</button>
          </div>

          {currentStudents.length===0&&<div style={{textAlign:"center",padding:"30px 0",color:"var(--textFaint)",fontSize:13}}>No students in this batch</div>}

          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,maxHeight:"calc(var(--app-h,100vh)*.38)",overflowY:"auto"}}>
            {currentStudents.map(s=>{
              const status=local[s.id];
              const isPresent=status==="present", isAbsent=status==="absent";
              return(
                <div key={s.id} style={{background:"var(--inputBg)",borderRadius:13,padding:"10px",border:`2px solid ${isPresent?"#86efac":isAbsent?"#fca5a5":"var(--cardBorder)"}`}}>
                  <div style={{fontSize:11,fontWeight:700,color:"var(--text)",marginBottom:6,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{s.name}</div>
                  <div style={{display:"flex",gap:5}}>
                    <button onClick={()=>mark(s.id,"present")} style={{flex:1,padding:"6px 0",borderRadius:8,border:"none",background:isPresent?"#10b981":"var(--card)",color:isPresent?"#fff":"var(--textMuted)",fontSize:11,fontWeight:800,cursor:"pointer",fontFamily:"inherit"}}>P</button>
                    <button onClick={()=>mark(s.id,"absent")} style={{flex:1,padding:"6px 0",borderRadius:8,border:"none",background:isAbsent?"#ef4444":"var(--card)",color:isAbsent?"#fff":"var(--textMuted)",fontSize:11,fontWeight:800,cursor:"pointer",fontFamily:"inherit"}}>A</button>
                  </div>
                </div>
              );
            })}
          </div>

          {currentStudents.length>0&&(
            <button onClick={save} disabled={saving} style={{width:"100%",marginTop:16,background:saved?"#10b981":saving?"#3b82f6":"linear-gradient(135deg,#1e3a8a,#2563eb)",border:"none",borderRadius:14,padding:"14px",fontSize:14,fontWeight:800,color:"#fff",cursor:saving?"not-allowed":"pointer",fontFamily:"inherit",display:"flex",alignItems:"center",justifyContent:"center",gap:8}}>
              {saved?<><I n="check" s={17}/> Saved!</>:saving?"Saving...":<><I n="zap" s={16}/> Save Now</>}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

// ══════════════════════════════════════════════════════════════
// ROOT APP
// ══════════════════════════════════════════════════════════════
export default function App(){
  const store=useStore();
  const{toasts,dismiss,toast}=useToast();
  const[tab,setTab]=useState("dashboard");
  const[act,setAct]=useState(null);
  const[unlocked,setUnlocked]=useState(false);
  const[staffEntered,setStaffEntered]=useState(false); // used only when no PIN / multi-login protection is configured
  const[authChoice,setAuthChoice]=useState(null); // null | "staff" | "student" — which door was picked on the AuthChooser
  const[showSearch,setShowSearch]=useState(false);
  const[showQuickAttend,setShowQuickAttend]=useState(false);
  const[showStudentLogin,setShowStudentLogin]=useState(false);
  const[splashDone,setSplashDone]=useState(false);
  // Make layout follow the real visible screen: sets --app-h (address bar / keyboard aware) and viewport meta
  useEffect(()=>{
    let m=document.querySelector('meta[name="viewport"]');
    if(!m){m=document.createElement("meta");m.name="viewport";document.head.appendChild(m);}
    m.setAttribute("content","width=device-width, initial-scale=1, viewport-fit=cover");
    if(!document.querySelector('meta[name="theme-color"]')){const t=document.createElement("meta");t.name="theme-color";t.content="#1e3a8a";document.head.appendChild(t);}
    const setH=()=>document.documentElement.style.setProperty("--app-h",window.innerHeight+"px");
    setH();
    window.addEventListener("resize",setH);window.addEventListener("orientationchange",setH);
    return()=>{window.removeEventListener("resize",setH);window.removeEventListener("orientationchange",setH);};
  },[]);
  useEffect(()=>{const t=setTimeout(()=>setSplashDone(true),2800);return()=>clearTimeout(t);},[]);
  const goTo=(t,a=null)=>{setTab(t);setAct(a);};
  const goTab=(t)=>{setTab(t);setAct(null);};
  const theme=useTheme(store.settings);

  const multiLogin=store.settings.multiLogin;
  const currentTeacher=multiLogin&&store.session?store.teachers.find(t=>t.id===store.session.teacherId):null;
  const needsTeacherLogin=multiLogin&&!currentTeacher;
  const pinProtected=!multiLogin&&store.settings.pinEnabled&&store.settings.pin;
  const noStaffProtection=!multiLogin&&!pinProtected;
  const isTeacherLimited=!!(currentTeacher&&currentTeacher.role==="teacher");

  // ── STUDENT SESSION — if a student is logged in, show the portal only ──
  const loggedInStudent=store.studentSession?store.students.find(s=>s.id===store.studentSession.studentId&&!s.archived):null;
  const studentLogout=()=>{store.setStudentSession(null);toast.info("Logged out");};
  // ── PARENT SESSION — a logged-in parent sees only the parent portal ──
  const loggedInParent=store.parentSession?(store.parents||[]).find(p=>p.id===store.parentSession.parentId&&p.portalEnabled!==false):null;
  const parentLogout=()=>{store.setParentSession(null);toast.info("Logged out");};
  const onParentLogin=(p)=>{store.setParents(ps=>(ps||[]).map(x=>x.id===p.id?{...x,lastLoginAt:Date.now()}:x));store.setParentSession({parentId:p.id});toast.success(`Welcome, ${String(p.name||"").split(" ")[0]}!`,"Logged in");};

  const switchAccount=()=>{store.setSession(null);setTab("dashboard");};
  const onLogin=(teacherId)=>{store.setSession({teacherId});toast.success("Logged in successfully","Welcome!");};
  const onStudentLogin=(student)=>{store.setStudentSession({studentId:student.id});setShowStudentLogin(false);toast.success(`Welcome, ${student.name}!`,"Logged in");};

  useEffect(()=>{if(isTeacherLimited&&!["dashboard","attendance","shifts","more"].includes(tab))setTab("dashboard");},[isTeacherLimited]); // eslint-disable-line

  // ── ONE-TIME SEED: pre-built Teaching Eligibility Test (TET) 2026 practice test,
  // so admin doesn't have to type it in — just open Tests → Assign to pick who gets it.
  useEffect(()=>{
    if(LS.get("tp4_seeded_tet2026")) return;
    const already=(store.tests||[]).some(t=>t.id==="tet2026seed");
    if(!already){
      const mkQ=(text,options,correctIndex)=>({id:uid(),text,options,correctIndex});
      const questions=[
        mkQ("Which of the following is most important for effective learning?",["Memorization","Fear of punishment","Active participation","Strict discipline"],2),
        mkQ("A child learns best when the teacher:",["Only lectures","Encourages questions and exploration","Gives frequent punishment","Focuses only on examinations"],1),
        mkQ("Individual differences among learners mean that:",["All children learn at the same speed","Every child has identical abilities","Children may learn in different ways and at different rates","Only intelligent children can learn effectively"],2),
        mkQ("Formative assessment is mainly used to:",["Rank students","Improve the learning process","Conduct final examinations","Punish weak students"],1),
        mkQ("Choose the correctly spelled word:",["Enviroment","Envirnment","Environment","Environmant"],2),
        mkQ("Choose the synonym of \u201CRapid\u201D:",["Slow","Fast","Weak","Late"],1),
        mkQ("Choose the antonym of \u201CAncient\u201D:",["Old","Historic","Modern","Traditional"],2),
        mkQ("Choose the correct sentence:",["She go to school every day.","She going to school every day.","She goes to school every day.","She gone to school every day."],2),
        mkQ("What is 25% of 200?",["25","40","50","75"],2),
        mkQ("If 5 notebooks cost \u20B9100, what is the cost of 1 notebook?",["\u20B910","\u20B915","\u20B920","\u20B925"],2),
        mkQ("What is the next number in the sequence? 2, 4, 8, 16, ___",["20","24","32","36"],2),
        mkQ("A rectangle has a length of 10 cm and a breadth of 5 cm. What is its area?",["15 cm\u00B2","30 cm\u00B2","50 cm\u00B2","100 cm\u00B2"],2),
        mkQ("Which organ helps humans to breathe?",["Heart","Lungs","Stomach","Kidney"],1),
        mkQ("Which of the following is a renewable source of energy?",["Coal","Petroleum","Solar energy","Natural gas"],2),
        mkQ("Plants prepare their food through:",["Respiration","Photosynthesis","Digestion","Evaporation"],1),
        mkQ("The main purpose of teaching is to:",["Complete the syllabus only","Help students develop knowledge and skills","Give homework every day","Maintain silence in the classroom"],1),
        mkQ("Which method encourages students to learn through practical experience?",["Lecture method","Activity-based learning","Dictation method","Rote learning"],1),
        mkQ("Inclusive education means:",["Teaching only high-performing students","Separating students according to ability","Providing learning opportunities to all children","Teaching only children with disabilities"],2),
        mkQ("A good teacher should primarily be:",["Unapproachable","Patient and supportive","Strict at all times","Focused only on marks"],1),
        mkQ("Which type of question encourages higher-order thinking?",["Yes/No question","Recall question","\u201CWhy do you think this happened?\u201D","Fill-in-the-blank question"],2),
      ];
      store.setTests(list=>[{id:"tet2026seed",title:"Teaching Eligibility Test (TET) 2026 — Practice",instructions:"Time: 30 Minutes · Total Questions: 20 · Choose the correct answer.",questions,audience:"teacher",forTeacherIds:[],forStudentIds:[],createdAt:Date.now()},...(list||[])]);
    }
    LS.set("tp4_seeded_tet2026",true);
    // eslint-disable-next-line
  },[]);

  // ── AUTO FEE REMINDERS — once per day, check every active student: once their
  // batch's scheduled classes for the current month are all done, if fee is still
  // due, drop a professional reminder on their portal (skips if already sent this month).
  useEffect(()=>{
    const runKey="tp4_last_auto_fee_reminder_run";
    const todayKey=todayStr();
    if(LS.get(runKey)===todayKey) return;
    const mk=curMK();
    const[cy,cm]=mk.split("-").map(Number);
    const newReminders=[];
    store.students.filter(s=>!s.archived).forEach(s=>{
      const relevantShifts=getShiftIds(s).map(id=>store.shifts.find(sh=>sh.id===id)).filter(Boolean);
      if(!relevantShifts.length) return;
      const anyShiftDone=relevantShifts.some(sh=>shiftMonthClassesDone(sh,cy,cm));
      if(!anyShiftDone) return;
      const{total}=calcOutstanding(s.id,mk,store.students,store.payments);
      if(total<=0) return;
      const already=(store.feeReminders||[]).some(r=>r.studentId===s.id&&r.monthKey===mk&&r.sentBy==="auto");
      if(already) return;
      newReminders.push({
        id:uid(),studentId:s.id,monthKey:mk,amount:total,
        message:`This month's classes are complete. Your pending fee for ${monthFull(mk)} is ${store.settings.currency}${total.toLocaleString("en-IN")}. Please clear it by ${fmtDateNice(addDaysStr(5))}. If unpaid by then, a late fee of ${store.settings.currency}100 will apply.`,
        dueDate:addDaysStr(5),lateFee:100,
        createdAt:Date.now(),sentBy:"auto",senderName:store.settings.institute||"Admin",read:false
      });
    });
    if(newReminders.length) store.setFeeReminders(list=>[...newReminders,...(list||[])]);
    LS.set(runKey,todayKey);
    // eslint-disable-next-line
  },[]);

  const fullNavItems=[
    {id:"dashboard",icon:"home",   label:"Home"},
    {id:"students", icon:"users",  label:"Students"},
    {id:"attendance",icon:"checkbig",label:"Attendance"},
    {id:"fees",     icon:"rupee",  label:"Fees"},
    {id:"more",     icon:"dots",   label:"More"},
  ];
  const limitedNavItems=[
    {id:"dashboard",icon:"home",   label:"Home"},
    {id:"attendance",icon:"checkbig",label:"Attendance"},
    {id:"shifts",   icon:"cal",     label:"Schedule"},
    {id:"more",     icon:"dots",   label:"More"},
  ];
  const navItems=isTeacherLimited?limitedNavItems:fullNavItems;

  const Page=()=>{
    if(isTeacherLimited){
      switch(tab){
        case "dashboard":  return <TeacherHome store={store} toast={toast} currentTeacher={currentTeacher} goTo={goTo}/>;
        case "attendance":  return <Attendance  store={store} toast={toast} currentTeacher={currentTeacher}/>;
        case "shifts":      return <Schedule    store={store} onBack={()=>setTab("attendance")} currentTeacher={currentTeacher}/>;
        case "more":        return <More        store={store} toast={toast} currentTeacher={currentTeacher} onSwitchAccount={switchAccount} limited initSub={act}/>;
        default:            return <TeacherHome store={store} toast={toast} currentTeacher={currentTeacher} goTo={goTo}/>;
      }
    }
    switch(tab){
      case "dashboard":   return <Dashboard   store={store} goTo={goTo} toast={toast} currentTeacher={currentTeacher} onStudentLogin={()=>setShowStudentLogin(true)}/>;
      case "students":    return <Students    store={store} toast={toast} initAct={act}/>;
      case "attendance":  return <Attendance  store={store} toast={toast} currentTeacher={currentTeacher}/>;
      case "fees":        return <Fees        store={store} toast={toast} initAct={act}/>;
      case "shifts":      return <More        store={store} toast={toast} currentTeacher={currentTeacher} onSwitchAccount={multiLogin?switchAccount:null} initSub={act||"shifts"} goTab={goTab}/>;
      case "reports":     return <More        store={store} toast={toast} currentTeacher={currentTeacher} onSwitchAccount={multiLogin?switchAccount:null} initSub={act||"reports"} goTab={goTab}/>;
      case "settings":    return <More        store={store} toast={toast} currentTeacher={currentTeacher} onSwitchAccount={multiLogin?switchAccount:null} initSub={act||"settings"} goTab={goTab}/>;
      default:            return <More        store={store} toast={toast} currentTeacher={currentTeacher} onSwitchAccount={multiLogin?switchAccount:null} initSub={act} goTab={goTab}/>;
    }
  };

  const locked=pinProtected&&!unlocked;
  // Staff (admin/teacher) side is authenticated once: multi-login picks a
  // profile, PIN unlocks it, or — if no protection is configured — the
  // admin just confirms through the "Admin / Teacher" door once per visit.
  const staffAuthed=multiLogin?!!currentTeacher:(pinProtected?unlocked:staffEntered);
  const needsAuthGate=!store.studentSession&&!staffAuthed;

  // ── SPLASH — branded intro shown on every app open ──
  if(!splashDone) return <><AppGlobalStyles/><SplashScreen settings={store.settings} duration={2800}/></>;

  // ── PARENT PORTAL MODE ──
  if(loggedInParent){
    return <><AppGlobalStyles/><ParentPortal store={store} parent={loggedInParent} onLogout={parentLogout} theme={theme} toast={toast}/><Toast toasts={toasts} dismiss={dismiss}/></>;
  }

  // ── STUDENT PORTAL MODE — completely separate UI, no admin/teacher chrome ──
  if(loggedInStudent){
    return <><AppGlobalStyles/><StudentPortal store={store} student={loggedInStudent} onLogout={studentLogout} theme={theme} toast={toast}/></>;
  }

  return(
    <div style={{
      "--bg":theme.bg,"--card":theme.card,"--cardBorder":theme.cardBorder,"--text":theme.text,
      "--textMuted":theme.textMuted,"--textFaint":theme.textFaint,"--inputBg":theme.inputBg,
      "--navBg":theme.navBg,"--navBorder":theme.navBorder,"--shadow":theme.shadow,
      maxWidth:480,margin:"0 auto",background:"var(--bg)",minHeight:"var(--app-h,100vh)",fontFamily:"'Inter',-apple-system,BlinkMacSystemFont,sans-serif",position:"relative",paddingBottom:"calc(72px + env(safe-area-inset-bottom))",paddingTop:"env(safe-area-inset-top)",transition:"background .25s"
    }}>
      <AppGlobalStyles/>
      {needsAuthGate&&authChoice===null&&<LoginScreen store={store} multiLogin={!!multiLogin} pinProtected={!!pinProtected}
        onStaffLogin={(id)=>onLogin(id)}
        onPinUnlock={()=>setUnlocked(true)}
        onStaffContinue={()=>setStaffEntered(true)}
        onStudentLogin={onStudentLogin}
        onParentLogin={onParentLogin}
        onForgot={()=>setAuthChoice("reset")}
        onApply={isFeatureOn(store.settings,"onlinePortal")?()=>setAuthChoice("apply"):null}
        onBypass={multiLogin&&store.teachers.filter(t=>!t.archived).length===0?()=>{store.setSettings(s=>({...s,multiLogin:false}));setStaffEntered(true);}:null}/>}
      {needsAuthGate&&authChoice==="apply"&&<AdmissionApplyScreen store={store} toast={toast} onBack={()=>setAuthChoice(null)}/>}
      {needsAuthGate&&authChoice==="reset"&&<TeacherSelectScreen initialMode="reset-pick" store={store} onLogin={()=>{}} onBack={()=>setAuthChoice(null)}/>}
      {/* "Peek as student" shortcut from the Dashboard while already logged in as staff */}
      {showStudentLogin&&<StudentLoginScreen store={store} onLogin={onStudentLogin} onClose={()=>setShowStudentLogin(false)}/>}
      <div style={{minHeight:"calc(var(--app-h,100vh) - 72px)",overflowY:"auto"}}>{Page()}</div>

      {/* Floating action buttons */}
      {!isTeacherLimited&&<div style={{position:"fixed",bottom:"calc(84px + env(safe-area-inset-bottom))",right:"max(16px, calc(50% - 240px + 16px))",display:"flex",flexDirection:"column",gap:10,zIndex:90}}>
        <button onClick={()=>setShowQuickAttend(true)} style={{background:"linear-gradient(135deg,#10b981,#34d399)",border:"none",borderRadius:16,width:50,height:50,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",boxShadow:"0 4px 16px rgba(16,185,129,.4)"}} title="Quick Attendance">
          <I n="zap" s={21} c="#fff"/>
        </button>
        <button onClick={()=>setShowSearch(true)} style={{background:"linear-gradient(135deg,#1e3a8a,#2563eb)",border:"none",borderRadius:16,width:50,height:50,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",boxShadow:"0 4px 16px rgba(30,58,138,.4)"}} title="Search">
          <I n="search2" s={21} c="#fff"/>
        </button>
      </div>}

      <div style={{position:"fixed",bottom:0,left:"50%",transform:"translateX(-50%)",width:"100%",maxWidth:480,background:"var(--navBg)",borderTop:"1px solid var(--navBorder)",display:"flex",justifyContent:"space-around",padding:"6px 0 calc(14px + env(safe-area-inset-bottom))",zIndex:100,boxShadow:theme.bg==="#0b0b1a"?"0 -4px 24px rgba(0,0,0,.3)":"0 -4px 24px rgba(30,58,138,.08)"}}>
        {navItems.map(n=>{
          const isActive=tab===n.id;
          return(
            <button key={n.id} onClick={()=>{setTab(n.id);setAct(null);}} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:3,background:"none",border:"none",cursor:"pointer",padding:"4px 2px",borderRadius:12,flex:1,minWidth:0}}>
              <div style={{background:isActive?(theme.bg==="#0b0b1a"?"#2d2a5e":"#ede9fe"):"transparent",borderRadius:11,padding:"5px 9px",transition:"background .15s"}}><I n={n.icon} s={21} c={isActive?"#3b82f6":theme.textFaint}/></div>
              <span style={{fontSize:10,fontWeight:700,color:isActive?"#3b82f6":theme.textFaint,letterSpacing:.3}}>{n.label}</span>
            </button>
          );
        })}
      </div>
      {showSearch&&<GlobalSearch store={store} onClose={()=>setShowSearch(false)} onGoToStudent={()=>{setShowSearch(false);setTab("students");}}/>}
      {showQuickAttend&&<QuickAttendanceWidget store={store} onClose={()=>setShowQuickAttend(false)} toast={toast}/>}
      <Toast toasts={toasts} dismiss={dismiss}/>
    </div>
  );
}

