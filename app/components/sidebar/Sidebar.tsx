import getCurrentUser from "@/app/actions/getCurrentUser";
import DesktopSidebar from "./DesktopSidebar";
import MobileBar from "./MobileBar";

async function Sidebar({ children }: { children: React.ReactNode }) {
  const currentUser = await getCurrentUser();
  return (
    <div className="h-full">
        <DesktopSidebar currentUser={currentUser!}/>
        <MobileBar />
      <main className="lg:pl-20 h-full">{children}</main>
    </div>
  );
}

export default Sidebar;
