import { defineStore } from "pinia";
import { ref } from "vue";
import {
  doc,
  getDoc,
  type DocumentData,
  updateDoc,
  DocumentReference,
  arrayUnion,
} from "firebase/firestore";
import { db } from "@/main";
import { type QuizQuestions } from "@/stores/quiz";

export const useUserStore = defineStore("user", () => {
  const isLoggedIn = ref(false);
  const user = ref<DocumentData>();

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

    const userData = documentSnapshot.data();
    let currentExp: number = userData?.experience;

    let updatedExp: number = currentExp + scoreExp;

    await updateTitle(userDocReference, updatedExp);
    await updateExp(userDocReference, updatedExp);
  }

  async function saveQuiz(
    user_id: string,
    questions: QuizQuestions[],
    score: number
  ) {
    const quizesDocReference = doc(db, "quizes", user_id);

    const quizData = questions.map((question) => {
      let correctAnswer = question.options.find(
        (option) => option.value === question.correctAnswer
      )?.text;

      return {
        question: question.question,
        correctAnswer: correctAnswer,
      };
    });

    const quizObject = {
      score: `${score}/${questions.length}`,
      questions: quizData,
    };

    console.log(quizObject, "quiz object");

    await updateDoc(quizesDocReference, { quizes: arrayUnion(quizObject) });
  }

  async function updateTitle(
    docReference: DocumentReference,
    updatedExp: number
  ) {
    let newTitle: string = "";

    if (updatedExp < 100) return;

    if (updatedExp >= 250) {
      newTitle = "Pro Quizzer";
    } else {
      newTitle = "Amateur Quizzer";
    }

    await updateDoc(docReference, { title: newTitle });
  }

  async function updateExp(docReference: DocumentReference, exp: number) {
    await updateDoc(docReference, { experience: exp });
  }
  return { user, isLoggedIn, fetchUserData, updateFirebaseUserData, saveQuiz };
});
