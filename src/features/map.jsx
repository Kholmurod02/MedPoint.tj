export default function MapIframe() {
  return (
  <div className="w-[90%]  rounded-2xl overflow-hidden shadow-lg border border-gray-200">
  <iframe
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3119.6849703638836!2d68.75896505277812!3d38.56407145586354!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38b5d1e787e0d7f1%3A0xf9e530d3017a4375!2z0JDQutCw0LTQtdC80LjRj9C4INCx0LDRgNC90L7QvNCw0YHQvtC30LjQuCBTb2Z0Y2x1Yg!5e0!3m2!1sen!2s!4v1751954738307!5m2!1sen!2s"
    width="100%"
    height="450"
    style={{ border: 0 }}
    allowFullScreen=""
    loading="lazy"
    referrerPolicy="no-referrer-when-downgrade"
  ></iframe>
</div>

  );
}
