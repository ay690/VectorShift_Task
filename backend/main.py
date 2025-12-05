from fastapi import FastAPI, Form
from pydantic import BaseModel
from typing import List, Dict, Any
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # The origin of your frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class PipelineData(BaseModel):
    nodes: List[Dict[str, Any]]
    edges: List[Dict[str, Any]]

def is_dag(nodes, edges):
    """
    Check if the graph is a Directed Acyclic Graph (DAG)
    using Kahn's algorithm for topological sorting
    """
    if not nodes:
        return True
    
    # Build adjacency list and in-degree count
    adjacency = {}
    in_degree = {}
    
    # Initialize all nodes
    for node in nodes:
        node_id = node.get('id')
        adjacency[node_id] = []
        in_degree[node_id] = 0
    
    # Build edges
    for edge in edges:
        source = edge.get('source')
        target = edge.get('target')
        if source in adjacency and target in in_degree:
            adjacency[source].append(target)
            in_degree[target] += 1
    
    # Kahn's algorithm
    queue = [node_id for node_id in in_degree if in_degree[node_id] == 0]
    visited_count = 0
    
    while queue:
        current = queue.pop(0)
        visited_count += 1
        
        for neighbor in adjacency[current]:
            in_degree[neighbor] -= 1
            if in_degree[neighbor] == 0:
                queue.append(neighbor)
    
    # If we visited all nodes, it's a DAG
    return visited_count == len(nodes)

@app.get('/')
def read_root():
    return {'Ping': 'Pong'}

@app.post('/pipelines/parse')
def parse_pipeline(pipeline: PipelineData):
    try:
        num_nodes = len(pipeline.nodes)
        num_edges = len(pipeline.edges)
        is_dag_result = is_dag(pipeline.nodes, pipeline.edges)
        
        return {
            "num_nodes": num_nodes,
            "num_edges": num_edges,
            "is_dag": is_dag_result
        }
    except Exception as e:
        return {
            "num_nodes": 0,
            "num_edges": 0,
            "is_dag": False,
            "error": str(e)
        }
