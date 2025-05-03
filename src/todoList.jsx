
import React, { useState, useEffect } from 'react';
import { useTodoStore } from './store/todoStore';

export default function Todo() {
  const { items, input, setInput, addItem, removeItem, toggleItem, handleEditItem } = useTodoStore();
  const [editingItemId, setEditingItemId] = useState(null);
  const [editingText, setEditingText] = useState('');
  const [dark, setdark] = useState(false);

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [dark]);

  const handleAddItem = () => {
    addItem();
  };

  const handleEditItemClick = (id, name) => {
    setEditingItemId(id);
    setEditingText(name);
  };

  const handleSaveEdit = () => {
    if (editingText.trim()) {
      handleEditItem(editingItemId, editingText);  // استخدام دالة التعديل من المتجر
      setEditingItemId(null);  // إيقاف التعديل
      setEditingText('');  // مسح النص المعدل
    }
  };

  return (
    <div className='flex justify-center items-center min-h-screen flex-col'>
      <div className={`border-2 text-red-900 border-gray-400 p-4 rounded-lg w-96 h-auto flex justify-center items-center flex-col shadow-lg bg-white dark:bg-black text-black dark:text-white`}>
        <h1 className='text-4xl font-extrabold mb-10 bg-gradient-to-r from-pink-500 via-yellow-400 to-purple-500 
  text-transparent bg-clip-text animate-bounce shadow-lg shadow-green-200'>
          مهامي
        </h1>
        <div className='mb-10'>
          <input
            placeholder="اضف المهمه"
            value={input}
            onChange={(e) => setInput(e.target.value)}  // تحديث النص المدخل
            className='outline-none p-2 border-2 border-gray-400 rounded-md placeholder-red-900 shadow-md'
          />
          <button className='border-2 border-gray-400 shadow-md rounded-md p-2 ml-5 text-red-900 transition duration-300 hover:text-white hover:bg-blue-500' onClick={handleAddItem}>اضافه</button>
        </div>

        {items.length > 0 ? (
          <ul>
            {items.map((item) => (
              <li key={item.id} className='mb-8 transition transform duration-300 hover:scale-105'>
                {editingItemId === item.id ? (  // إذا كانت المهمة تحت التعديل
                  <div>
                    <input
                      type="text"
                      value={editingText}
                      onChange={(e) => setEditingText(e.target.value)}  // تحديث النص أثناء التعديل
                    />
                    <button onClick={handleSaveEdit}>حفظ</button>  {/* زر حفظ التعديل */}
                  </div>
                ) : (
                  <>
                    <span className='mr-5'>{item.name}</span>
                    <button onClick={() => toggleItem(item.id)}>✅</button>
                    <button onClick={() => handleEditItemClick(item.id, item.name)}>✏️</button>  {/* زر القلم لتعديل */}
                    <button onClick={() => removeItem(item.id)}>❌</button>
                  </>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p>لا توجد مهام حالياً.</p>
        )}
      </div>
      <button
        className="mb-4 mt-5 p-2 px-4 rounded-full text-sm bg-gray-200 dark:bg-gray-700 text-black dark:text-white shadow"
        onClick={() => setdark(!dark)}
      >
        {dark ? '☀️ وضع النهار' : '🌙 الوضع الداكن'}
      </button>
    </div>
  );
}
