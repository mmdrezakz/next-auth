import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";

// برای دیباگ - چک کن متغیرها لود شدن
console.log("GITHUB_ID exists:", !!process.env.GITHUB_ID);
console.log("GITHUB_ID value:", process.env.GITHUB_ID ? "SET" : "NOT SET");
console.log("GITHUB_SECRET exists:", !!process.env.GITHUB_SECRET);
const handler = NextAuth({
    providers:[
        GitHubProvider({
            clientId:process.env.GITHUB_ID as string,
            clientSecret:process.env.GITHUB_SECRET as string
        })
    ],
  pages: {
    signIn: "/login",  // صفحه لاگین خودمون
  },
})
export { handler as GET, handler as POST };