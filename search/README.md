### 流程：

test_node => 调用get_first_jump函数___得到dict_a_：存储test_node_所在的边的强弱关系

for loop in dict_a_: 根据强弱关系判断

 强 => 调用get_jump或get_all_jump，将结果加入set_b1中__

 较强 => 调用get_jump或get_all_jump，将结果加入set_b2中_

 弱 => continue

for loop in set_b1:

 调用get_jump或get_all_jump，将结果加入set_c中__

函数：

- get_jump
  
- get_all_jump
  
- get_first_jump
  

整体的策略是基于bfs完成的，但在搜索时有几个可以改动的位置

1. 在选择domain节点时，是否只选择有industry选项的节点（yes / no)
  
2. 对于Cert，IP_CIDR等节点，同时使用search_source和search_target（对于这种类型的节点，往往连接了上万个Domain或者IP）(all / one)
  
3. 经过探究：CERT_节点_往往连接了大量的Domain节点，所以在算法中对cert节点进行1次或者2次延申（cert1 / cert2）
  

|     | yes + one + cert1 | yes + one + cert2 | yes + all + cert1 | yes + all cert2 | no + one + cert1 | no + one + cert2 | EXPECT |
| --- | --- | --- | --- | --- | --- | --- | --- |
| py  | /   | search_node1.py | search_node2.py | search_node3.py | search_node4.py | search_node5.py |     |
| 1   |     | ***22 / 35 / 17s*** | /   | /   | ***<u>67 / 150 / 35s</u>*** | /   | 0-400 / 0-800 |
| 2   |     | 9 / 11 / 92s | 97 / 148 / 73s | ***<u>365 / 417 / 72s</u>*** | ***<u>223 / 1958 / 225s</u>*** |   844 / 3188 / 186s  | 400-800  / 800-1600 |
| 3   |     | ***<u>227 / 625 / 446s</u>*** | 16793 / 18963 / 563s | ... | 12312 / 21669 / 975s |     | 400-800 / 800-1600 |
| 4   |     | <u>***1525 / 2481 / 1235 s***</u> | 459 / 1005 / 705s |     |     |     | 800-3000 / 1600-6000 |
| 5   |     | 345 / ... | *<u>**3909 / 4614 / 939s**</u>* | 5450 / ... | 10865 / ... |     | 800-3000 / 1600-6000 |
