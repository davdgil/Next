import Theme from "@/components/theme";

export default function Home() {

  async function fetchUsers() {
    const res = await fetch('https://reqres.in/api/users');
    const data = await res.json();
    return data;
  }



  return (
    <Theme>
      
    </Theme>
  );
}
