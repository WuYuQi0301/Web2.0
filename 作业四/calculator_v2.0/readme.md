#### tips
0. 键入+-*/后，在show_box中展示当前算式， input_box在键入下一个数字时候清除前一组数字
1. 完成一个运算之后进行下一个运算，输入框自动清空
2. 第一个输入为+-*/., 默认第一个操作数为0，或者视为0. 
3. 关于hover：鼠标移动到按键上时改变阴影和颜色
4. 关于label样式：起始状态为灰色大字号居下， 末状态为白色小字号居上，点击输入框或者点击按钮均可以触发，点击“CE”按键恢复初始状态

#### tips for v2.0
5. 通过html和css的w3c验证
6. 修改了.js中的入侵式代码，从直接修改css样式转变为修改类名
7. after pressing "=", "<-" is not valid;
---
#### JS:
##### euqation:
convey to eval() as paraphrase to calculate (no space)
1.  append operator automatically
2.  add number through 
##### temp_content:  
what to show in input box, commonly the last most number
1. use to see that the point is valid or not
2. added to eqution and show_box_content
##### show_bow_content

what to show in show box, commonly the former numbers and operators (spaced)
1. append  operator automatically
2. append number through temp_content
---
