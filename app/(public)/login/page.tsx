import LoginContainer from "@/app/components/authentication/login/loginContainer";

export default function Login() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen p-4 bg-gray-50">
      <div>Faça seu login com alguma das opções</div>
      <div className="flex flex-col justify-center items-center">
        <LoginContainer />
      </div>
    </div>
  );
}
