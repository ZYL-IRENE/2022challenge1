import json
import os
import pandas as pd

def get_data_info3():
    path = './static/data/data_info3'
    count = 0
    for file in os.listdir(path):  # file 表示的是文件名
        count = count + 1
    res_node = {}
    res_link = {}
    for i in range(int(count/2)):
        file_path1 = path + '/' + str(i+1) + '_node_type.csv'
        pd_node_types = pd.read_csv(file_path1)
        res_node[i] = pd_node_types['num'].values.tolist()
        file_path2 = path + '/' + str(i + 1) + '_link_type.csv'
        pd_link_types = pd.read_csv(file_path2)
        res_link[i] = pd_link_types['num'].values.tolist()
    return res_node,res_link
get_data_info3()
