import unittest

from support import run_solution


class ListRepetitionTest(unittest.TestCase):
    def test_case_01_twice(self):
        """twice."""
        result = run_solution('list-repetition', '2\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, "[1, 'two', '3', 4.0, 1, 'two', '3', 4.0]\n")

    def test_case_02_once(self):
        """once."""
        result = run_solution('list-repetition', '1\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, "[1, 'two', '3', 4.0]\n")


if __name__ == "__main__":
    unittest.main()
