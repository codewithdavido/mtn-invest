import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { ref, set, get } from 'firebase/database';
import { auth, db } from './firebase';

// ---- SIGN UP ----
export async function signUp(email: string, password: string, fullName: string) {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

  // Save user profile in Realtime Database
  await set(ref(db, `users/${user.uid}`), {
    fullName,
    email,
    role: 'investor',
    createdAt: new Date().toISOString(),
    walletBalance: 0,
  });

  return user;
}

// ---- SIGN IN ----
export async function signIn(email: string, password: string) {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  return userCredential.user;
}

// ---- SIGN OUT ----
export async function logOut() {
  await signOut(auth);
}

// ---- GET USER PROFILE ----
export async function getUserProfile(uid: string) {
  const snapshot = await get(ref(db, `users/${uid}`));
  if (snapshot.exists()) {
    return snapshot.val();
  }
  return null;
}

// ---- DEPOSIT ----
export async function depositFunds(uid: string, amount: number) {
  const userRef = ref(db, `users/${uid}`);
  const snapshot = await get(userRef);
  const currentBalance = snapshot.val()?.walletBalance || 0;

  // Update wallet balance
  await set(userRef, {
    ...snapshot.val(),
    walletBalance: currentBalance + amount,
  });

  // Save transaction record
  const txRef = ref(db, `transactions/${uid}/${Date.now()}`);
  await set(txRef, {
    type: 'Deposit',
    amount,
    description: 'Card deposit',
    date: new Date().toISOString(),
    status: 'Success',
    positive: true,
  });
}

// ---- GET TRANSACTIONS ----
export async function getTransactions(uid: string) {
  const snapshot = await get(ref(db, `transactions/${uid}`));
  if (snapshot.exists()) {
    const data = snapshot.val();
    // Convert object to array and sort by date (newest first)
    return Object.values(data).sort((a: any, b: any) =>
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }
  return [];
}

// ---- INVEST ----
export async function createInvestment(uid: string, shares: number, investment: number, monthlyReturn: number, planName: string) {
  const userRef = ref(db, `users/${uid}`);
  const snapshot = await get(userRef);
  const currentBalance = snapshot.val()?.walletBalance || 0;

  if (currentBalance < investment) {
    throw new Error('Insufficient wallet balance');
  }

  // Deduct from wallet
  await set(userRef, {
    ...snapshot.val(),
    walletBalance: currentBalance - investment,
  });

  // Save investment plan
  const planRef = ref(db, `investments/${uid}/${Date.now()}`);
  await set(planRef, {
    planName,
    shares,
    investment,
    monthlyReturn,
    startDate: new Date().toISOString(),
    totalEarned: 0,
    status: 'Active',
  });

  // Save transaction record
  const txRef = ref(db, `transactions/${uid}/${Date.now()}`);
  await set(txRef, {
    type: 'Investment',
    amount: investment,
    description: `${planName} — ${shares} shares`,
    date: new Date().toISOString(),
    status: 'Success',
    positive: false,
  });
}

// ---- GET INVESTMENTS ----
export async function getInvestments(uid: string) {
  const snapshot = await get(ref(db, `investments/${uid}`));
  if (snapshot.exists()) {
    return Object.values(snapshot.val());
  }
  return [];
}

// ---- WITHDRAW ----
export async function withdrawFunds(uid: string, amount: number, bankName: string) {
  const userRef = ref(db, `users/${uid}`);
  const snapshot = await get(userRef);
  const currentBalance = snapshot.val()?.walletBalance || 0;

  if (currentBalance < amount) {
    throw new Error('Insufficient wallet balance');
  }

  // Deduct from wallet
  await set(userRef, {
    ...snapshot.val(),
    walletBalance: currentBalance - amount,
  });

  // Save transaction record
  const txRef = ref(db, `transactions/${uid}/${Date.now()}`);
  await set(txRef, {
    type: 'Withdrawal',
    amount,
    description: `Withdrawal to ${bankName}`,
    date: new Date().toISOString(),
    status: 'Processed',
    positive: false,
  });
}

// ---- UPDATE PROFILE ----
export async function updateProfile(uid: string, data: { fullName: string; phone: string }) {
  const userRef = ref(db, `users/${uid}`);
  const snapshot = await get(userRef);
  await set(userRef, {
    ...snapshot.val(),
    ...data,
  });
}

// ---- CHANGE PASSWORD ----
export async function changePassword(currentPassword: string, newPassword: string) {
  const { reauthenticateWithCredential, EmailAuthProvider, updatePassword } = await import('firebase/auth');
  const user = auth.currentUser;
  if (!user || !user.email) throw new Error('No user logged in');

  // Re-authenticate first
  const credential = EmailAuthProvider.credential(user.email, currentPassword);
  await reauthenticateWithCredential(user, credential);

  // Then update password
  await updatePassword(user, newPassword);
}

// ---- SAVE BANK ACCOUNT ----
export async function saveBankAccount(uid: string, bankData: { bankName: string; accountNumber: string; accountName: string }) {
  const userRef = ref(db, `users/${uid}`);
  const snapshot = await get(userRef);
  await set(userRef, {
    ...snapshot.val(),
    bankAccount: bankData,
  });
}

// ---- REMOVE BANK ACCOUNT ----
export async function removeBankAccount(uid: string) {
  const userRef = ref(db, `users/${uid}`);
  const snapshot = await get(userRef);
  const data = snapshot.val();
  delete data.bankAccount;
  await set(userRef, data);
}

// ---- DELETE ACCOUNT ----
export async function deleteAccount(uid: string) {
  const { deleteUser } = await import('firebase/auth');
  const user = auth.currentUser;
  if (!user) throw new Error('No user logged in');

  // Delete user data from database
  await set(ref(db, `users/${uid}`), null);
  await set(ref(db, `transactions/${uid}`), null);
  await set(ref(db, `investments/${uid}`), null);

  // Delete Firebase Auth account
  await deleteUser(user);
}