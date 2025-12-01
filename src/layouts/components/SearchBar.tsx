import { Icon } from "@/components/icon";
import { Button } from "@/ui/Button";

export default function SearchBar() {

  const handleOpen = () => {
    
  }

  return (
    <div className="flex items-center justify-center">
      <Button variant="ghost" className="bg-secondary px-2 rounded-lg" size={"sm"} onClick={handleOpen}>
        <div>
          <Icon icon="mdi:magnify" size={20}/>
          <span>
            {" "}
            ⌘K{" "}
          </span>
        </div>
      </Button>
    </div>
  )
}