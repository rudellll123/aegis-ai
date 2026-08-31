from langchain_core.tools import tool

@tool
def multiply(a: int, b: int) -> int:
    """Multiply two integers together."""
    return a * b

@tool
def add(a: int, b: int) -> int:
    """Add two integers together."""
    return a + b

# This exports the list your agent.py file is expecting
ALL_TOOLS = [multiply, add]
