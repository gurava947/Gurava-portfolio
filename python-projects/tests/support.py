from pathlib import Path
import os
import subprocess
import sys

ROOT = Path(__file__).resolve().parents[1]


def normalize_newlines(value):
    return value.replace("\r\n", "\n").replace("\r", "\n")


def run_solution(slug, stdin_text=""):
    solution = ROOT / slug / "solution.py"
    completed = subprocess.run(
        [sys.executable, str(solution)],
        input=stdin_text.encode("utf-8"),
        capture_output=True,
        cwd=str(solution.parent),
        env={**os.environ, "PYTHONUTF8": "1", "PYTHONIOENCODING": "utf-8"},
    )
    return subprocess.CompletedProcess(
        completed.args,
        completed.returncode,
        stdout=normalize_newlines(completed.stdout.decode("utf-8")),
        stderr=normalize_newlines(completed.stderr.decode("utf-8")),
    )
