import unittest

from support import run_solution


class ArmstrongNumbersFrom1ToNTest(unittest.TestCase):
    def test_case_01_n_10(self):
        """N = 10."""
        result = run_solution('armstrong-numbers-from-1-to-n', '10\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '1\n2\n3\n4\n5\n6\n7\n8\n9\n')

    def test_case_02_n_500(self):
        """N = 500."""
        result = run_solution('armstrong-numbers-from-1-to-n', '500\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '1\n2\n3\n4\n5\n6\n7\n8\n9\n153\n370\n371\n407\n')


if __name__ == "__main__":
    unittest.main()
