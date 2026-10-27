import unittest

from support import run_solution


class WordTriangleTest(unittest.TestCase):
    def test_case_01_cat(self):
        """cat."""
        result = run_solution('word-triangle', 'cat\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'c\nca\ncat\n')

    def test_case_02_ab(self):
        """ab."""
        result = run_solution('word-triangle', 'ab\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'a\nab\n')


if __name__ == "__main__":
    unittest.main()
