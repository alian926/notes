# coding=utf-8
# -*- codeing:utf-8 -*-
print('Hello World')
print('你好 世界')

'''
标识符规范
1. 区分大小写
2. 首字符可以是下划线/字母,不能是数字
3. 除首字符其他字符必须是下划线/字母/数字
4. 关键字不能作为标识符
5. 不要使用内置函数作为标识符
'''

'''
33个关键字,其中None,True,False首字符大写
False, def, if, raise,
None, del, import, return,
True, elif, in, try,
and, else, is ,while,
as, except, lambda, with,
assert, finally, nonlocal, yield,
break, for, not,
class, from, or,
continue, global, pass
'''

'''
赋值即声明了变量, 不限制类型
'''
greeting = "Hello world"
student_score = 0.0

# python中一般不加分号

'''
python中一个模块就是一个文件,模块是保存代码的最小单位,模块中可以声明变量,函数,属性和类等Python代码元素

导入语句有三种形式:
import m2: 通过这种方式会导入m2模块的所有代码元素, 访问时需要加前缀"m2."

from m2 import x : 导入m2中的x变量,直接使用x

from m2 import x as x2: 给x别名x2来使用
'''

'''
Python 中所有的数据类型都是类,每个数据值都是类的'实例'
主要有6中内置数据类型: 数字, 字符串, 列表, 元组, 集合, 字典
数字类型有4种: 整数类型, 浮点类型, 复数类型, 布尔类型

'''
type(28)  # type()函数返回数据的类型 <class 'int'>

0b1100  # 二进制表示形式 0B/0b + 1/0
0O347  # 八进制表示形式 0O/0o + 0~7
0xff  # 十六进制表示形式 0x/0X + 0~F

type(0.0)  # <class 'float'> 只支持双精度

c = 1 + 2j
type(c)  # <class 'complex'> 复数类型, j部分为虚部

bool(1)  # bool() 函数转换成布尔值

'''
数字类型,不包含复数的隐私转换: 布尔->整数->浮点
显示转换: bool(),int(),float()
'''

'''
一元运算: + -
二元运算: + - * / % ** //
比较运算: == != > < >= <=
逻辑运算符: not and or, 有短路设计
位运算: ~ & | ^ >> <<
赋值运算: = += -= *= /= %= **= //= &= |= ^= <<= >>=
'''

'''
流程控制
if-
if-else-
if-elif-else-
'''

score = int(input('输入一个整数'))

if score > 10:
    print('大了')
else:
    print('小了')

'''
循环
while, for
while,for可以配合else执行正常退出循环的语句,中断情况不执行(break,return,异常)
'''
i = 0
while i * i < 10:
    i += 1
    print(str(i) + '*' + str(i) + '=', i * i)
else:
    print('while over!')

for item in 'Hello':  # 可迭代对象包括字符串, 元组吗集合, 列表, 字典等
    print(item)
else:
    print('for over!')

'''
跳转语句: break, continue, return
'''
for item in range(10):  # range(10):0~9
    if item == 3:
        break
    print(item)

# 计算水仙花数
i = 100
r = 0
s = 0
t = 0
while i < 1000:
    r = i // 100
    s = (i - r * 100) // 10
    t = i - r * 100 - s * 10
    if i == (r ** 3 + s ** 3 + t ** 3):
        print('i = ' + str(i))
    i += 1

'''
序列: 列表list, 字符串str, 元组tuple, 字节序列bytes, 序列中的元素都是有索引的,正索引和负索引,越界会报IndexError错 
'''
a = 'hello'
a[0]
a[-1]  # -1是最后一个
max(a)  # 返回最后一个元素: o
min(a)  # 返回第一个元素: h
len(a)  # 返回序列的长度: 5
a * 2  # 将序列重复n次; hellohello
a + ','  # 拼接: hello,
a[1:3]  # 切片操作, [start,end,step]  得到 el
a[:3]  # 得到 Hel
a[0:]  # 得到 hello
a[1:-1]  # 得到 ell
a[1:5:2]  # 得出 el
a[0:3:2]  # 得到 hl
a[::-1]  # olleh 步长为负值,从右向左获取元素

'''
成员测试
in, not in
'''
'e' in a  # True
'c' not in a  # True
