import unittest

from support import run_solution


class ListConcatenationTest(unittest.TestCase):
    def test_case_01_n_5(self):
        """n = 5."""
        result = run_solution('list-concatenation', '5\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '[5, 10, 20, 40, 100]\n[10, 20, 40, 100, 5]\n')

    def test_case_02_n_0(self):
        """n = 0."""
        result = run_solution('list-concatenation', '0\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '[0, 10, 20, 40, 100]\n[10, 20, 40, 100, 0]\n')


if __name__ == "__main__":
    unittest.main()
