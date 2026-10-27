import unittest

from support import run_solution


class ShuffleStringTest(unittest.TestCase):
    def test_case_01_abc_with_positions_0_1_2(self):
        """abc with positions 0, 1, 2."""
        result = run_solution('shuffle-string', 'abc\n0\n1\n2\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'abc\n')

    def test_case_02_hello_reversed(self):
        """hello reversed."""
        result = run_solution('shuffle-string', 'hello\n4\n3\n2\n1\n0\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'olleh\n')


if __name__ == "__main__":
    unittest.main()
