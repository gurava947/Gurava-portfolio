import unittest

from support import run_solution


class PrintCharactersTest(unittest.TestCase):
    def test_case_01_abc_with_positions_0_1_2(self):
        """abc with positions 0, 1, 2."""
        result = run_solution('print-characters', 'abc\n0\n1\n2\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'a\nb\nc\n')

    def test_case_02_code_with_positions_3_2_1_0(self):
        """code with positions 3, 2, 1, 0."""
        result = run_solution('print-characters', 'code\n3\n2\n1\n0\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'e\nd\no\nc\n')


if __name__ == "__main__":
    unittest.main()
