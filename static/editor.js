document.addEventListener('DOMContentLoaded', () => {
    const editor = grapesjs.init({
        container: '#gjs',
        height: '100%',
        fromElement: false,
        storageManager: false,
        panels: { defaults: [] }, // نشيل كل البانلز العشوائية
        blockManager: {
            appendTo: '#blocks-panel'
        },
        plugins: [],
        pluginsOpts: {}
    });

    // ✅ بلوكات منظمة تشبه Gutenberg

    editor.BlockManager.add('section-hero', {
        label: 'Hero',
        category: 'Layout',
        attributes: { class: 'fa fa-header' },
        content: `<section style="padding:60px;text-align:center;background:#f9f9f9;">
                    <h1>عنوان رئيسي</h1>
                    <p>وصف مختصر للمحتوى</p>
                </section>`
    });

    editor.BlockManager.add('paragraph', {
        label: 'نص عادي',
        category: 'Content',
        content: `<p style="font-size:16px;">هذا نص عادي</p>`,
        attributes: { class: 'fa fa-paragraph' }
    });

    editor.BlockManager.add('image-block', {
        label: 'صورة',
        category: 'Content',
        content: '<img src="https://via.placeholder.com/400x200" style="max-width:100%"/>',
        attributes: { class: 'fa fa-image' }
    });

    editor.BlockManager.add('button-block', {
        label: 'زر CTA',
        category: 'Content',
        content: `<a href="#" style="padding:10px 20px;display:inline-block;background:#0073aa;color:#fff;border-radius:5px;text-decoration:none;">اضغط هنا</a>`,
        attributes: { class: 'fa fa-hand-pointer-o' }
    });

    // ✅ تخزين البيانات داخل الفورم وقت الإنشاء
    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', () => {
            const html = editor.getHtml();
            document.getElementById('contentField').value = html;
        });
    }
});
