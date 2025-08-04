import { Button } from "@/shared/ui/button"
import { Input } from "@/shared/ui/input"
import { Send, Linkedin, Facebook, Instagram } from "lucide-react"
import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-blue-900 text-white py-10 px-6 container m-auto">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <h2 className="text-2xl font-bold mb-4">MEDPOINT</h2>
            <p className="text-gray-200 leading-relaxed">Лидеры в медицинском совершенстве и надёжной заботе</p>
          </div>

          {/* Important Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Полезные ссылки</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/profile" className="text-gray-200 hover:text-white transition-colors">
                  Личный кабинет
                </Link>
              </li>
              <li>
                <Link href="/doctors" className="text-gray-200 hover:text-white transition-colors">
                  Врачи
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-200 hover:text-white transition-colors">
                  Свяжитесь с нами
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-200 hover:text-white transition-colors">
                  О нас
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Свяжитесь с нами</h3>
            <div className="space-y-2 text-gray-200">
              <p>Телефон: (992) 977-27-55-99</p>
              <p>Email: medpoint.tj@gmail.com</p>
              <p>Адрес: улица 13</p>
              <p>Душанбе, Таджикистан</p>
            </div>
          </div>


          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Рассылка новостей</h3>
            <div className="flex gap-2">
              <Input
                type="email"
                placeholder="Введите ваш адрес электронной почты"
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-300 focus:border-white"
              />
              <Button size="icon" className="bg-white/20 hover:bg-white/30 border-0">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/20 pt-5">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-200 text-sm">© 2025 MedPoint.  Все права защищены. Разработка — Kholmurod Khairulloev & Siyovush Kurbonov</p>
            <div className="flex gap-3">
              <a
                href="#"
                className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
              >
                <Instagram className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
