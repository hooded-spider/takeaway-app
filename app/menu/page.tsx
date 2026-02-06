import { menu } from "@/lib/menu"
import { MenuItem } from "@/lib/types"

export default function MenuPage() {
    return (
        <main className="p-4">
            <h1 className="text-2xl font-bold">Menu</h1>

            <ul className="space-y-4">
                {menu.map(item => (
                    <li
                        key={item.id}
                        className="border rounded p-4"
                    >
                        <h2 className="text-xl font-semibold">
                            {item.name}
                        </h2>

                        <p className="mt-2 font-bold">
                            £{(item.price / 100).toFixed(2)}
                        </p>
                    </li>
                ))}
            </ul>
        </main>
    )
}