import { defineStore } from "pinia";
import { watchEffect, ref } from "vue";
import type { QuizQuestions } from "@/stores/quiz";
import {
  doc,
  getDoc,
  type DocumentData,
  updateDoc,
  DocumentReference,
} from "firebase/firestore";
import { db } from "@/main";

type User = {
  uid: string;
  email: string | null;
  title: string;
  experience: number;
  // quizes: QuizQuestions[];
};

export const useUserStore = defineStore("user", () => {
  const isLoggedIn = ref(false);

  const user = ref<DocumentData>();

  async function updateUserData(user_id: string) {
    const userDocReference = doc(db, "users", user_id);
    const documentSnapshot = await getDoc(userDocReference);

    if (!documentSnapshot.exists()) return;

    console.log(documentSnapshot.data());

    // user.value.uid = documentSnapshot.data().uid;
    // user.value.email = documentSnapshot.data().email;
    // user.value.title = documentSnapshot.data().title;
    // user.value.experience = documentSnapshot.data().experience;
  }

  async function fetchUserData(user_id: string) {
    try {
      const userDocReference = doc(db, "users", user_id);
      const documentSnapshot = await getDoc(userDocReference);

      if (documentSnapshot.exists()) {
        let userData = documentSnapshot.data();
        console.log(userData);

        user.value = userData;
        console.log(user.value);
      }
    } catch (error: any) {
      console.log("Error fetching user data", error.code);
    }
  }

  async function updateFirebaseUserData(user_id: string, scoreExp: number) {
    const userDocReference = doc(db, "users", user_id);
    const documentSnapshot = await getDoc(userDocReference);

    const currentExp: number = user.value?.experience;

    let newExp: number = currentExp + scoreExp;

    await updateTitle(documentSnapshot, newExp);
    await updateExp(documentSnapshot, newExp);
  }

  async function updateTitle(docSnapshot: any, currentExp: number) {
    let newTitle: string = "";

    if (currentExp >= 250) {
      newTitle = "PRO Quizzer";
    } else if (currentExp >= 100) {
      newTitle = "Amateur Quizzer";
    }

    await updateDoc(docSnapshot, { title: newTitle });
  }

  async function updateExp(docSnapshot: any, exp: number) {
    let userExp: DocumentData = user.value?.experience;
    userExp = user.value?.experience + exp;
    await updateDoc(docSnapshot, { experience: userExp });
  }
  return { user, isLoggedIn, fetchUserData, updateFirebaseUserData };
});
