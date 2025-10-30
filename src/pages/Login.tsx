import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

export default function Login() {
  const { user, signInWithGoogle, signOut } = useAuth();
  const nav = useNavigate();
  const loc = useLocation() as { state?: { from?: Location } };

  const goBackTo = (loc.state?.from as Location | undefined)?.pathname ?? "/";

  async function handleSignIn() {
    await signInWithGoogle();
    nav(goBackTo, { replace: true });
  }

  async function handleSignOut() {
    await signOut();
  }

  return (
    <section>
      <h1>Login</h1>
      {user ? (
        <>
          <p>
            Signed in as{" "}
            <strong>{user.displayName ?? user.email ?? user.uid}</strong>
          </p>
          <button onClick={handleSignOut}>Sign out</button>
        </>
      ) : (
        <>
          <p>Please sign in to continue.</p>
          <button onClick={handleSignIn}>Sign in with Google (dev stub)</button>
        </>
      )}
    </section>
  );
}
