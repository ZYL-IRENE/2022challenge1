import pandas as pd
import numpy as np
from igraph import *
import time
from typing import Dict, Union, List, Tuple, Any

pd_link = pd.read_csv('./Link.csv')
pd_node = pd.read_csv('./Node.csv')
links_all = ['r_cert', 'r_subdomain', 'r_request_jump', 'r_dns_a', 'r_whois_name', 'r_whois_email', 'r_whois_phone',
             'r_cert_chain', 'r_cname', 'r_asn', 'r_cidr']
nodes_all = ['Domain', 'IP', 'Cert', 'Whois_Name', 'Whois_Phone', 'Whois_Email', 'IP_C', 'ASN']
industry_all = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I']

links_dict = {}  # links_dict[relation name] will show the corresponding data
nodes_dict = {}  # nodes_dict[relation name] will show the corresponding data
nodes_industry = {}  # show the data sorted by industry
samples = [
      {'Domain_c58c149eec59bb14b0c102a0f303d4c20366926b5c3206555d2937474124beb9',
       'Domain_f3554b666038baffa5814c319d3053ee2c2eb30d31d0ef509a1a463386b69845'},
      {'IP_400c19e584976ff2a35950659d4d148a3d146f1b71692468132b849b0eb8702c',
       'Domain_b10f98a9b53806ccd3a5ee45676c7c09366545c5b12aa96955cde3953e7ad058'},
      {'Domain_24acfd52f9ceb424d4a2643a832638ce1673b8689fa952d9010dd44949e6b1d9',
       'Domain_9c72287c3f9bb38cb0186acf37b7054442b75ac32324dfd245aed46a03026de1',
       'Domain_717aa5778731a1f4d6f0218dd3a27b114c839213b4af781427ac1e22dc9a7dea',
       'Domain_8748687a61811032f0ed1dcdb57e01efef9983a6d9c236b82997b07477e66177',
       'Whois_Phone_f4a84443fb72da27731660695dd00877e8ce25b264ec418504fface62cdcbbd7'},
      {'IP_7e730b193c2496fc908086e8c44fc2dbbf7766e599fabde86a4bcb6afdaad66e',
       'Cert_6724539e5c0851f37dcf91b7ac85cb35fcd9f8ba4df0107332c308aa53d63bdb'},
      {'Whois_Phone_fd0a3f6712ff520edae7e554cb6dfb4bdd2af1e4a97a39ed9357b31b6888b4af',
       'IP_21ce145cae6730a99300bf677b83bbe430cc0ec957047172e73659372f0031b8',
       'Domain_7939d01c5b99c39d2a0f2b418f6060b917804e60c15309811ef4059257c0818a',
       'Domain_587da0bac152713947db682a5443ef639e35f77a3b59e246e8a07c5eccae67e5'}
        ]
test_nodes = samples[1]

def init() -> None:
    """
    Store nodes and links in different types or relations

    """
    for i in links_all:
        links_dict[i] = pd_link[pd_link['relation'] == i]
    for i in nodes_all:
        nodes_dict[i] = pd_node[pd_node['type'] == i]
    for i in industry_all:
        nodes_industry[i] = pd_node[pd_node['industry'].str.contains(i)]
    nodes_industry['Null'] = pd_node[pd_node['industry'] == "[]"]


def search_source(node: str):
    return pd_link[pd_link['source'] == node]


def search_target(node: str):
    return pd_link[pd_link['target'] == node]


edges_all = {}
def get_jump(node: str) -> set:
    """
    Get the neighbor nodes of node within one jump

    :param node: node_id
    :return: List[node-id(str)]
    """
    res_set = set([])

    if node[0] == 'D' or (node[0] == 'I' and node[3] != 'C'):
        for _, row1 in search_source(node).iterrows():
            res_set.add(row1['target'])
        for _, row2 in search_target(node).iterrows():
            res_set.add(row2['source'])
    else :
        for _, row1 in search_source(node).iterrows():
            res_set.add(row1['target'])
    edges_all[node] = res_set
    return res_set

def get_all_jump(node: str) -> set:
    """
    Get the neighbor nodes of node within one jump

    :param node: node_id
    :return: List[node-id(str)]
    """
    res_set = set([])
    for _, row1 in search_source(node).iterrows():
        res_set.add(row1['target'])
    for _, row2 in search_target(node).iterrows():
        res_set.add(row2['source'])
    edges_all[node] = res_set
    return res_set

def get_jump1(node: str):
    """
    For the first link between node and the neighbor node in one-jump, need to judge by the relation of link

    :param node: node-id
    :return: dict[node-id(str):relation(str)]
    """
    res_dict = {}
    res_set = set([])
    for _, row1 in search_source(node).iterrows():
        res_dict[row1['target']] = row1['relation']
        res_set.add(row1['target'])
    for _, row2 in search_target(node).iterrows():
        res_dict[row2['source']] = row2['relation']
        res_set.add(row2['source'])
    edges_all[node] = res_set
    return res_dict


def get_node_by_bfs(node: str) -> Tuple[set, set, set]:
    """
    Get the neighbor nodes of node within three jumps
    1. for node in one-jump, judge by relation
    2. get other jumps

    :param node: node-id
    :return:set_a[node-id(1),...node-id(1)],set_b[node-id(2),...node-id(2)],set_c[node-id(3),...node-id(3)]
    """


    set_a = get_all_jump(test_node)
    print(set_a)
    set_b_1 = set([])
    set_b_2 = set([])
    set_c = set([])
    dict_a = get_jump1(test_node)
    print(dict_a)
    for A in dict_a:
        print('begin {}'.format(A))
        if dict_a[A][2] == 's' or dict_a[A][2] == 'r' or dict_a[A][2] == 'd' or dict_a[A] == 'r_cert':
            for i in get_jump(A):
                set_b_2.add(i)
        elif dict_a[A][2] == 'w':
            for i in get_jump(A):
                set_b_1.add(i)
        else:
            continue
    print("-------------------------------------")
    for B2 in set_b_2:
        print('begin {}'.format(B2))
        for j in get_jump(B2):
            set_c.add(j)
    set_b = set_b_1 | set_b_2
    return set_a, set_b, set_c

time_start = time.time()
list_set = []
for test_node in test_nodes:
    res_bfs = get_node_by_bfs(test_node)
    set_temp = res_bfs[0] | res_bfs[1] | res_bfs[2]
    list_set.append(set_temp)

set = set([])
for i in list_set:
    set = set | i
time_end = time.time()
time_c = time_end - time_start

print(len(set))
i = 0
for key in edges_all:
    for j in edges_all[key]:
        i += 1
print(i)

print('time cost', time_c, 's')


