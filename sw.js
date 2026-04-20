// 🔥 Helper para guardar resultados reales de tests en Firebase

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-auth.js";
import { getFirestore, doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-firestore.js";

// ⚠️ TU CONFIG (la que me pasaste)
const firebaseConfig = {
  apiKey: "AIzaSyAS1Ad4wBNn2HDufn1fZJiteHZGXZcX_No",
  authDomain: "formacion-481a0.firebaseapp.com",
  projectId: "formacion-481a0",
  databaseURL: "https://formacion-481a0-default-rtdb.europe-west1.firebasedatabase.app",
  storageBucket: "formacion-481a0.firebasestorage.app",
  messagingSenderId: "850316210880",
  appId: "1:850316210880:web:f18e91f053bf4d133a7325",
  measurementId: "G-MTLW5R8MSZ"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// 🔥 FUNCIÓN CLAVE
async function guardarResultadoTest({ asignatura, test, nota, tiempo = null }) {
  const user = auth.currentUser;

  if (!user) {
    alert("❌ Tienes que iniciar sesión");
    return;
  }

  const ref = doc(db, "resultados", user.uid);
  const snap = await getDoc(ref);
  const data = snap.exists() ? snap.data() : {};

  const history = Array.isArray(data.history) ? data.history : [];

  const nuevo = {
    asignatura: asignatura || "General",
    test: test || "Test",
    nota: Number(nota || 0),
    tiempo: tiempo,
    fecha: Date.now()
  };

  const clave = `${asignatura}_${test}`.replace(/\s+/g, "_");

  await setDoc(ref, {
    uid: user.uid,
    email: user.email,
    updatedAt: Date.now(),
    [clave]: nota,
    history: [...history, nuevo]
  }, { merge: true });

  console.log("✅ Resultado guardado");
}

window.guardarResultadoTest = guardarResultadoTest;
