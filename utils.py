import json
import os
import pandas as pd

def get_data_info6():
    path = './static/data/data_info6'
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
    res_type = {0:[12,9,2,0,12,0,5,0,0],1:[0,1,0,0,0,0,0,0,0],2:[470,86,3,0,0,0,26,0,2],3:[143,63,4,0,0,0,0,0,0],4:[66,119,1,0,0,0,4,0,0],
                5:[126,131,0,0,0,0,0,0,0],6:[0,0,0,0,0,0,234,0,0],7:[3,0,0,0,0,0,1,0,46],8:[25,406,4,0,0,0,4,0,1],9:[99,320,9,0,0,0,15,0,28],10:[198,539,113,0,102,0,2,0,0]}
    # print(res_node)
    return res_node,res_link,res_type
get_data_info6()

def get_data_info7():
    path = './static/data/data_info7/1-temp.json'
    with open(path,'r') as f:
        info7_data = json.load(f)
    res_node = info7_data['nodes']
    res_link = info7_data['links']
    res_category = info7_data['category']
    return res_node,res_link,res_category
get_data_info7()
# print(get_data_info7())
