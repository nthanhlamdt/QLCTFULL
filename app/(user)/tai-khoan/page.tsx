import PersonalInfo from "./components/personal-info"
import AccountInfo from "./components/account-infor"

export default function ProfilePage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Hồ sơ người dùng</h1>
      <div className="space-y-8">
        <PersonalInfo />
        <AccountInfo />
      </div>
    </div>
  )
}

